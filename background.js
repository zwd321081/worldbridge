const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_MAX_ITEMS = 300;

const DEFAULT_SETTINGS = {
  enabled: true,
  baseUrl: "https://api.openai.com/v1",
  apiKey: "",
  model: "gpt-4o-mini",
  temperature: 0.2,
  sourceLanguage: "Auto detect",
  targetLanguage: "English"
};

function buildTranslationPrompt(settings, selectionKind = "word") {
  const sourceLanguage = settings.sourceLanguage || "Auto detect";
  const targetLanguage = settings.targetLanguage || "English";
  const isSentence = selectionKind === "sentence";
  const formatRules = isSentence
    ? `- The selected text is a sentence or multiple clauses. Translate or explain the whole sentence, not individual words.
- Do not return IPA for sentence selections. Use an empty string for ipa.
- Do not return synonyms or antonyms for sentence selections. Use empty arrays.
- Use an empty string for notes in sentence selections.
- structure must be a compact object with sentence parts: label, mainClause, subject, verb, object, modifier. Use empty strings for missing parts.
- Keep each structure field short and simple. Do not put all structure analysis in one long paragraph.`
    : `- The selected text is a word or short phrase. Use a dictionary-style response.
- Add IPA when the selected text or the target result is English. Otherwise use an empty string for ipa.
- Add one short, simple example sentence using the selected word, phrase, or translated result.
- Put the example sentence in notes and start it with "Example: " when Target language is English. If Target language is not English, start it with "例句: ".
- Put 2 or 3 simple synonyms, near-synonyms, or related phrases in alternatives. Use the Target language.
- Put 1 or 2 simple antonyms in antonyms when they exist. If none exist, return an empty array.
- If there is no good synonym, return a short related phrase instead.`;

  return `You are WordBridge, a simple dictionary, translation, and pronunciation assistant.

Language direction:
- Source language: ${sourceLanguage}
- Target language: ${targetLanguage}

Task:
- If Source language is Auto detect, detect the selected text language first.
- If Target language is English, explain the selected text in simple English. For sentence selections, explain the whole sentence meaning; for word selections, explain the word or phrase.
- If Target language is not English, translate the selected text into Target language and keep the meaning clear and natural.
- If the selected text is not English and Target language is English, translate it into English first, then explain the English meaning simply.
- Use common words a middle-school language learner can understand.
- Keep the main definition or translation short: one sentence, ideally under 24 words.
${formatRules}
- pronunciationText should be the selected word, phrase, or short target result to speak aloud.
- Return compact JSON only. No Markdown.

JSON shape:
{
  "detectedLanguage": "language name",
  "translation": "short definition or translation in ${targetLanguage}",
  "ipa": "/IPA/ or empty string",
  "pronunciationText": "word or short phrase to speak aloud",
  "notes": "short example sentence or note",
  "structure": {
    "label": "lead-in label or empty string",
    "mainClause": "main clause in simple terms",
    "subject": "subject",
    "verb": "verb or verb phrase",
    "object": "object or complement",
    "modifier": "important modifier/context or empty string"
  },
  "alternatives": ["synonym 1", "synonym 2", "synonym 3"],
  "antonyms": ["antonym 1", "antonym 2"]
}`;
}

chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS));
  const next = {};
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    if (existing[key] === undefined) next[key] = value;
  }
  if (Object.keys(next).length) {
    await chrome.storage.sync.set(next);
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "translate-selection") {
    translateSelection(message.text, message.selectionKind)
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: readableError(error) }));
    return true;
  }

  if (message?.type === "speak-text") {
    synthesizeSpeech(message.text)
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: readableError(error) }));
    return true;
  }

  if (message?.type === "test-settings") {
    translateSelection("你好，世界", "word", { ignoreEnabled: true })
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: readableError(error) }));
    return true;
  }

  if (message?.type === "open-options") {
    chrome.runtime.openOptionsPage();
    sendResponse({ ok: true });
    return false;
  }

  return false;
});

async function getSettings() {
  const saved = await chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS));
  return { ...DEFAULT_SETTINGS, ...saved };
}

async function translateSelection(text, selectionKind = "word", options = {}) {
  const cleanText = normalizeSelection(text);
  if (!cleanText) {
    throw new Error("No text selected.");
  }

  const settings = await getSettings();
  if (!options.ignoreEnabled && settings.enabled === false) {
    throw new Error("WordBridge is disabled.");
  }
  assertApiSettings(settings);

  const cacheKey = await buildCacheKey(cleanText, selectionKind, settings);
  const cached = await readTranslationCache(cacheKey);
  if (cached) return { ...cached, cached: true };

  const response = await fetch(buildEndpoint(settings.baseUrl, "chat/completions"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: settings.model,
      temperature: 0.2,
      messages: [
        { role: "system", content: buildTranslationPrompt(settings, selectionKind) },
        { role: "user", content: cleanText }
      ]
    })
  });

  const payload = await readJsonResponse(response);
  const content = payload?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("The model returned an empty translation.");
  }

  const parsed = parseModelJson(content);
  const translation = String(parsed.translation || "").trim();
  if (!translation) {
    throw new Error("The model response did not include a translation.");
  }

  const result = {
    detectedLanguage: String(parsed.detectedLanguage || "Unknown").trim(),
    translation,
    ipa: String(parsed.ipa || "").trim(),
    pronunciationText: String(parsed.pronunciationText || cleanText || translation).trim(),
    notes: String(parsed.notes || "").trim(),
    structure: normalizeStructure(parsed.structure),
    alternatives: Array.isArray(parsed.alternatives)
      ? parsed.alternatives.map((item) => String(item).trim()).filter(Boolean).slice(0, 3)
      : [],
    antonyms: Array.isArray(parsed.antonyms)
      ? parsed.antonyms.map((item) => String(item).trim()).filter(Boolean).slice(0, 2)
      : [],
    selectionKind: selectionKind === "sentence" ? "sentence" : "word"
  };

  await writeTranslationCache(cacheKey, result);
  return result;
}

async function buildCacheKey(text, selectionKind, settings) {
  const payload = JSON.stringify({
    version: 1,
    text,
    selectionKind: selectionKind === "sentence" ? "sentence" : "word",
    baseUrl: String(settings.baseUrl || "").trim().replace(/\/+$/, ""),
    model: String(settings.model || "").trim(),
    sourceLanguage: settings.sourceLanguage || "Auto detect",
    targetLanguage: settings.targetLanguage || "English"
  });

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(payload));
  const hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `wb-cache-${hash}`;
}

async function readTranslationCache(key) {
  try {
    const item = (await chrome.storage.local.get(key))[key];
    if (!item?.value || !item?.createdAt) return null;

    if (Date.now() - item.createdAt > CACHE_TTL_MS) {
      await chrome.storage.local.remove(key);
      return null;
    }

    return item.value;
  } catch {
    return null;
  }
}

async function writeTranslationCache(key, value) {
  try {
    await chrome.storage.local.set({
      [key]: {
        createdAt: Date.now(),
        value
      }
    });
    await trimTranslationCache();
  } catch {
    // Cache failures should never block translation.
  }
}

async function trimTranslationCache() {
  const items = await chrome.storage.local.get(null);
  const entries = Object.entries(items)
    .filter(([key, item]) => key.startsWith("wb-cache-") && item?.createdAt)
    .sort((a, b) => b[1].createdAt - a[1].createdAt);

  const expiredKeys = entries
    .filter(([, item]) => Date.now() - item.createdAt > CACHE_TTL_MS)
    .map(([key]) => key);
  const overflowKeys = entries.slice(CACHE_MAX_ITEMS).map(([key]) => key);
  const keysToRemove = [...new Set([...expiredKeys, ...overflowKeys])];

  if (keysToRemove.length) {
    await chrome.storage.local.remove(keysToRemove);
  }
}

async function synthesizeSpeech(text) {
  const settings = await getSettings();
  const cleanText = normalizeSpeechText(text);
  if (!cleanText) {
    throw new Error("No speech text.");
  }

  return { mode: "browser", text: cleanText, lang: speechLangFor(settings.targetLanguage) };
}

function normalizeStructure(value) {
  if (!value) return null;

  if (typeof value === "string") {
    const summary = value.trim();
    return summary ? { summary } : null;
  }

  if (typeof value !== "object") return null;

  const result = {};
  for (const key of ["label", "mainClause", "subject", "verb", "object", "modifier", "summary"]) {
    const text = String(value[key] || "").trim();
    if (text) result[key] = text;
  }

  return Object.keys(result).length ? result : null;
}

function speechLangFor(language) {
  const value = String(language || "").toLowerCase();
  if (value.includes("chinese")) return "zh-CN";
  if (value.includes("japanese")) return "ja-JP";
  if (value.includes("korean")) return "ko-KR";
  if (value.includes("french")) return "fr-FR";
  if (value.includes("german")) return "de-DE";
  if (value.includes("spanish")) return "es-ES";
  if (value.includes("portuguese")) return "pt-PT";
  if (value.includes("italian")) return "it-IT";
  if (value.includes("russian")) return "ru-RU";
  if (value.includes("arabic")) return "ar-SA";
  if (value.includes("hindi")) return "hi-IN";
  if (value.includes("vietnamese")) return "vi-VN";
  if (value.includes("thai")) return "th-TH";
  if (value.includes("indonesian")) return "id-ID";
  if (value.includes("malay")) return "ms-MY";
  if (value.includes("turkish")) return "tr-TR";
  if (value.includes("dutch")) return "nl-NL";
  if (value.includes("swedish")) return "sv-SE";
  if (value.includes("polish")) return "pl-PL";
  return "en-US";
}

function assertApiSettings(settings) {
  if (!settings.apiKey?.trim()) {
    throw new Error("Please set your API key in the extension options.");
  }
  if (!settings.baseUrl?.trim()) {
    throw new Error("Please set a compatible API base URL.");
  }
  if (!settings.model?.trim()) {
    throw new Error("Please set a chat model.");
  }
}

function buildEndpoint(baseUrl, path) {
  const normalizedBase = baseUrl.trim().replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${normalizedBase}/${normalizedPath}`;
}

async function readJsonResponse(response) {
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`API returned non-JSON response (${response.status}): ${shorten(text, 240)}`);
  }

  if (!response.ok) {
    const message = json?.error?.message || JSON.stringify(json);
    throw new Error(`API request failed (${response.status}): ${shorten(message, 240)}`);
  }
  return json;
}

function parseModelJson(content) {
  const text = String(content).trim();
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("The model did not return JSON.");
    return JSON.parse(match[0]);
  }
}

function normalizeSelection(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 4000);
}

function normalizeSpeechText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 800);
}

function shorten(text, maxLength) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

function readableError(error) {
  return error instanceof Error ? error.message : String(error);
}

