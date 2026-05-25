const ROOT_ID = "openai-selection-translator-root";
let selectionTimer = null;
let activeRequest = 0;
let currentAudio = null;
let wordBridgeEnabled = true;
let triggerMode = "modifier-double-click";

loadEnabledState();

if (globalThis.chrome?.storage?.onChanged) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;

    if (changes.enabled) {
      wordBridgeEnabled = changes.enabled.newValue !== false;
      if (!wordBridgeEnabled) closeCard();
    }

    if (changes.triggerMode) {
      triggerMode = normalizeTriggerMode(changes.triggerMode.newValue);
    }
  });
}

async function loadEnabledState() {
  if (!globalThis.chrome?.storage?.sync) return;

  try {
    const saved = await chrome.storage.sync.get({ enabled: true, triggerMode: "modifier-double-click" });
    wordBridgeEnabled = saved.enabled !== false;
    triggerMode = normalizeTriggerMode(saved.triggerMode);
    if (!wordBridgeEnabled) closeCard();
  } catch {
    wordBridgeEnabled = true;
  }
}
document.addEventListener("mouseup", scheduleSelectionLookup);
document.addEventListener("dblclick", scheduleSelectionLookup);
document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeCard();
    return;
  }
  scheduleSelectionLookup();
});

function scheduleSelectionLookup(event) {
  if (!wordBridgeEnabled || !shouldTranslateForEvent(event)) return;

  const root = document.getElementById(ROOT_ID);
  if (root && event?.composedPath?.().includes(root)) return;

  window.clearTimeout(selectionTimer);
  selectionTimer = window.setTimeout(() => {
    if (!wordBridgeEnabled) return;
    const selected = getSelectedText();
    if (!selected) return;

    const range = getSelectionRange();
    if (!range) return;

    const rect = getSelectionAnchorRect(range);
    if (!rect || (!rect.width && !rect.height)) return;

    const selectionKind = getSelectionKind(selected);
    openCard({ state: "loading", source: selected, rect, selectionKind });
    requestTranslation(selected, rect, selectionKind).catch(() => {});
  }, 260);
}

function shouldTranslateForEvent(event) {
  if (!event) return triggerMode === "selection";

  if (triggerMode === "selection") {
    return event.type !== "dblclick";
  }

  if (triggerMode === "modifier-selection") {
    return event.type === "mouseup" && isModifierPressed(event);
  }

  if (triggerMode === "modifier-double-click") {
    return event.type === "dblclick" && isModifierPressed(event);
  }

  return false;
}

function isModifierPressed(event) {
  return Boolean(event?.ctrlKey || event?.metaKey);
}

function normalizeTriggerMode(value) {
  return ["selection", "modifier-selection", "modifier-double-click"].includes(value) ? value : "modifier-double-click";
}

async function requestTranslation(text, rect, selectionKind) {
  const requestId = ++activeRequest;
  let response;
  try {
    response = await sendRuntimeMessage({
      type: "translate-selection",
      text,
      selectionKind
    });
  } catch (error) {
    if (requestId !== activeRequest) return;
    openCard({
      state: "error",
      source: text,
      rect,
      error: error instanceof Error ? error.message : String(error)
    });
    return;
  }

  if (requestId !== activeRequest) return;

  if (!response?.ok) {
    openCard({
      state: "error",
      source: text,
      rect,
      error: response?.error || "Translation failed."
    });
    return;
  }

  openCard({
    state: "ready",
    source: text,
    rect,
    selectionKind,
    data: response.data
  });
}

function openCard(model) {
  const root = getRoot();
  const shadow = root.shadowRoot;
  shadow.innerHTML = renderCard(model);

  const card = shadow.querySelector(".translator-card");
  positionCard(root, card, model.rect);

  const closeButton = shadow.querySelector("[data-action='close']");
  closeButton?.addEventListener("click", closeCard);

  const speakButton = shadow.querySelector("[data-action='speak']");
  speakButton?.addEventListener("click", () => playSpeech(model.data?.pronunciationText || model.data?.translation));

  const optionsButton = shadow.querySelector("[data-action='options']");
  optionsButton?.addEventListener("click", () => {
    sendRuntimeMessage({ type: "open-options" }).catch(() => closeCard());
  });
}

function sendRuntimeMessage(message) {
  if (!globalThis.chrome?.runtime?.sendMessage) {
    return Promise.reject(extensionContextError());
  }

  try {
    return Promise.resolve(chrome.runtime.sendMessage(message)).catch((error) => {
      throw normalizeRuntimeError(error);
    });
  } catch (error) {
    return Promise.reject(normalizeRuntimeError(error));
  }
}

function normalizeRuntimeError(error) {
  const message = error instanceof Error ? error.message : String(error || "");
  if (message.includes("Extension context invalidated") || message.includes("context invalidated")) {
    return extensionContextError();
  }
  return error instanceof Error ? error : new Error(message || "Extension message failed.");
}

function extensionContextError() {
  return new Error("Extension was reloaded. Refresh this page and try again.");
}

function getRoot() {
  let host = document.getElementById(ROOT_ID);
  if (host) return host;

  host = document.createElement("div");
  host.id = ROOT_ID;
  host.style.position = "fixed";
  host.style.zIndex = "2147483647";
  host.style.left = "0";
  host.style.top = "0";
  host.style.width = "0";
  host.style.height = "0";
  host.attachShadow({ mode: "open" });
  document.documentElement.appendChild(host);
  return host;
}

function renderCard(model) {
  const data = model.data || {};
  const alternatives = Array.isArray(data.alternatives) ? data.alternatives : [];
  const antonyms = Array.isArray(data.antonyms) ? data.antonyms : [];

  return `
    <style>${cardStyles()}</style>
    <aside class="translator-card is-${model.state} ${model.selectionKind === "sentence" ? "is-sentence" : ""}" role="dialog" aria-live="polite">
      <button class="icon-button floating-close" data-action="close" title="Close" type="button">×</button>
      ${renderBody(model, data, alternatives, antonyms)}
    </aside>
  `;
}

function renderBody(model, data, alternatives, antonyms) {
  if (model.state === "loading") {
    return `
      <section class="loading">
        <span class="spinner" aria-hidden="true"></span>
        <span>Looking up...</span>
      </section>
    `;
  }

  if (model.state === "error") {
    return `
      <section class="error">
        <strong>Could not translate</strong>
        <p>${escapeHtml(model.error)}</p>
        <button data-action="options" type="button">Open settings</button>
      </section>
    `;
  }

  const term = model.source || data.pronunciationText || data.translation || "";
  const isSentence = model.selectionKind === "sentence" || data.selectionKind === "sentence";

  if (isSentence) {
    return `
      <section class="result sentence-result">
        <div class="word-row">
          <p class="selected-sentence">${escapeHtml(term)}</p>
          <button class="speak-button" data-action="speak" title="Play pronunciation" type="button">
            <span aria-hidden="true">▶</span>
            <span>Voice</span>
          </button>
        </div>
        ${data.translation ? `<p class="definition sentence-translation">${escapeHtml(data.translation)}</p>` : ""}
        ${renderStructure(data.structure)}
      </section>
    `;
  }

  return `
    <section class="result dictionary-result">
      <div class="word-row">
        <h2>${escapeHtml(term)}</h2>
        <button class="speak-button" data-action="speak" title="Play pronunciation" type="button">
          <span aria-hidden="true">▶</span>
          <span>Voice</span>
        </button>
      </div>
      ${data.ipa ? `<p class="ipa">${escapeHtml(data.ipa)}</p>` : ""}
      ${data.translation ? `<p class="definition">${escapeHtml(data.translation)}</p>` : ""}
      ${data.notes ? `<p class="example">${escapeHtml(data.notes)}</p>` : ""}
      ${alternatives.length ? `
        <div class="word-list">
          <span class="list-label">Synonyms</span>
          ${alternatives.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
        </div>
      ` : ""}
      ${antonyms.length ? `
        <div class="word-list">
          <span class="list-label">Antonyms</span>
          ${antonyms.map((item) => `<span class="pill">${escapeHtml(item)}</span>`).join("")}
        </div>
      ` : ""}
    </section>
  `;
}

function renderStructure(structure) {
  if (!structure) return "";

  if (typeof structure === "string") {
    const summary = structure.trim();
    if (!summary) return "";
    return `<div class="structure"><strong>Structure</strong><p class="structure-summary">${escapeHtml(summary)}</p></div>`;
  }

  const rows = [
    ["Label", structure.label],
    ["Main clause", structure.mainClause],
    ["Subject", structure.subject],
    ["Verb", structure.verb],
    ["Object", structure.object],
    ["Modifier", structure.modifier],
    ["Summary", structure.summary]
  ]
    .map(([label, value]) => [label, String(value || "").trim()])
    .filter(([, value]) => value);

  if (!rows.length) return "";

  return `
    <div class="structure">
      <strong>Structure</strong>
      <div class="structure-grid">
        ${rows.map(([label, value]) => `
          <div class="structure-row">
            <span>${escapeHtml(label)}</span>
            <p>${escapeHtml(value)}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

async function playSpeech(text) {
  const cleanText = String(text || "").trim();
  if (!cleanText) return;

  const speakButton = getRoot().shadowRoot.querySelector("[data-action='speak']");
  speakButton?.setAttribute("disabled", "true");

  try {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    const response = await sendRuntimeMessage({
      type: "speak-text",
      text: cleanText
    });

    if (response?.ok && response.data?.mode === "remote") {
      const src = `data:${response.data.mimeType};base64,${response.data.audioBase64}`;
      currentAudio = new Audio(src);
      await currentAudio.play();
      return;
    }

    speakWithBrowser(response?.data?.text || cleanText, response?.data?.lang);
  } catch {
    speakWithBrowser(cleanText);
  } finally {
    speakButton?.removeAttribute("disabled");
  }
}

function speakWithBrowser(text, lang = "en-US") {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}

function positionCard(host, card, rect) {
  const margin = 12;
  const gap = 10;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isSentence = card.classList.contains("is-sentence");
  const width = Math.min(isSentence ? 460 : 380, viewportWidth - margin * 2);
  card.style.width = `${width}px`;

  const desiredLeft = rect.left + rect.width / 2 - width / 2;
  const left = clamp(desiredLeft, margin, viewportWidth - width - margin);
  const cardHeight = card.getBoundingClientRect().height || 180;
  const maxTop = Math.max(margin, viewportHeight - cardHeight - margin);
  const top = clamp(rect.bottom + gap, margin, maxTop);

  const arrowLeft = clamp(rect.left + rect.width / 2 - left - 7, 18, width - 18);
  card.style.setProperty("--wordbridge-arrow-left", `${Math.round(arrowLeft)}px`);

  host.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
}

function closeCard() {
  activeRequest++;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  const root = document.getElementById(ROOT_ID);
  root?.remove();
}

function getSelectionKind(text) {
  const value = String(text || "").trim();
  const words = value.split(/\s+/).filter(Boolean);
  const hasSentencePunctuation = /[.!?。！？]/.test(value);
  return words.length > 5 || hasSentencePunctuation ? "sentence" : "word";
}

function getSelectedText() {
  const text = window.getSelection()?.toString() || "";
  return text.replace(/\s+/g, " ").trim();
}

function getSelectionRange() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  return selection.getRangeAt(0);
}

function getSelectionAnchorRect(range) {
  const rects = Array.from(range.getClientRects()).filter((rect) => rect.width > 0 && rect.height > 0);
  if (rects.length) return rects[rects.length - 1];
  return range.getBoundingClientRect();
}

function shorten(text, maxLength) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function cardStyles() {
  return `
    :host {
      color-scheme: light;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    .translator-card {
      position: relative;
      border: 1px solid #1e2a24;
      background: #fbf8ee;
      color: #17231d;
      border-radius: 8px;
      overflow: hidden;
      animation: enter 150ms ease-out;
    }

    .translator-card::before {
      content: "";
      position: absolute;
      top: -7px;
      left: var(--wordbridge-arrow-left, 24px);
      width: 12px;
      height: 12px;
      background: #fbf8ee;
      border-left: 1px solid #1e2a24;
      border-top: 1px solid #1e2a24;
      transform: rotate(45deg);
    }


    button {
      appearance: none;
      border: 1px solid #17231d;
      background: #d6f05d;
      color: #17231d;
      border-radius: 999px;
      cursor: pointer;
      font: inherit;
      font-weight: 750;
    }

    button:hover {
      background: #e0f86c;
    }

    button:disabled {
      cursor: progress;
      opacity: 0.65;
    }

    .icon-button {
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      padding: 0;
      font-size: 20px;
      line-height: 1;
      background: #fbf8ee;
    }

    .floating-close {
      position: absolute;
      top: var(--wordbridge-close-top, 12px);
      right: 12px;
      z-index: 1;
    }

    .translator-card.is-loading {
      --wordbridge-close-top: 4px;
    }

    .loading,
    .error,
    .result {
      padding: 14px;
    }

    .loading {
      display: flex;
      align-items: center;
      min-height: 40px;
      gap: 10px;
      padding-right: 54px;
      font-size: 13px;
      color: #4e594f;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(23, 35, 29, 0.18);
      border-top-color: #17231d;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }

    .error strong {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
    }

    .error p {
      margin: 0 0 12px;
      color: #7a281e;
      font-size: 13px;
      line-height: 1.4;
    }

    .error button {
      padding: 8px 12px;
    }

    .word-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 48px;
      padding-right: 40px;
    }

    h2 {
      margin: 0;
      font-size: 22px;
      line-height: 1.12;
      letter-spacing: 0;
      overflow-wrap: anywhere;
    }

    .speak-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
      gap: 6px;
      flex: 0 0 auto;
      padding: 0 12px;
      font-size: 12px;
    }

    .ipa {
      margin: 8px 0 0;
      color: #6d503a;
      font-size: 15px;
      font-weight: 720;
    }

    .selected-sentence {
      margin: 0;
      color: #4e594f;
      font-size: 13px;
      line-height: 1.35;
      overflow-wrap: anywhere;
    }

    .sentence-translation {
      font-size: 16px;
      font-weight: 720;
      line-height: 1.35;
    }

    .structure {
      margin-top: 12px;
      border-top: 1px solid rgba(23, 35, 29, 0.14);
      padding-top: 10px;
    }

    .structure strong {
      display: block;
      color: #6d503a;
      font-size: 12px;
      line-height: 1.2;
      margin-bottom: 7px;
    }

    .structure-grid {
      display: grid;
      gap: 6px;
    }

    .structure-row {
      display: grid;
      grid-template-columns: 86px minmax(0, 1fr);
      gap: 8px;
      align-items: start;
    }

    .structure-row span {
      color: #6d503a;
      font-size: 12px;
      font-weight: 760;
      line-height: 1.35;
    }

    .structure-row p,
    .structure-summary {
      margin: 0;
      color: #34443a;
      font-size: 13px;
      line-height: 1.42;
      overflow-wrap: anywhere;
    }

    .definition,
    .example {
      margin: 10px 0 0;
      color: #34443a;
      font-size: 13px;
      line-height: 1.42;
    }

    .definition {
      color: #17231d;
    }

    .word-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
    }

    .list-label {
      color: #6d503a;
      font-size: 12px;
      font-weight: 760;
      margin-right: 2px;
    }

    .pill {
      border: 1px solid rgba(23, 35, 29, 0.22);
      border-radius: 999px;
      padding: 5px 8px;
      background: #fffdf6;
      font-size: 12px;
      color: #34443a;
    }

    @keyframes enter {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
}
