const DEFAULT_SETTINGS = {
  enabled: true,
  baseUrl: "https://api.openai.com/v1",
  apiKey: "",
  model: "gpt-4o-mini",
  uiLanguage: "zh-CN",
  sourceLanguage: "Auto detect",
  targetLanguage: "English"
};


const I18N = {
  "zh-CN": {
    "pageTitle": "WordBridge 设置",
    "heroDesc": "架起通往世界语言的桥。",
    "uiLanguage": "界面语言",
    "extensionEnabled": "启用选词翻译",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "聊天模型",
    "sourceLanguage": "源语言",
    "targetLanguage": "目标语言",
    "autoDetect": "自动识别",
    "saveSettings": "保存设置",
    "testTranslation": "测试翻译",
    "testing": "正在测试接口...",
    "testFailed": "测试失败",
    "testOk": "测试成功：",
    "saved": "已保存。现在可以在网页里选中文字试用。"
  },
  "zh-TW": {
    "pageTitle": "WordBridge 設定",
    "heroDesc": "架起通往世界語言的橋。",
    "uiLanguage": "介面語言",
    "extensionEnabled": "啟用選詞翻譯",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "聊天模型",
    "sourceLanguage": "來源語言",
    "targetLanguage": "目標語言",
    "autoDetect": "自動識別",
    "saveSettings": "儲存設定",
    "testTranslation": "測試翻譯",
    "testing": "正在測試 API...",
    "testFailed": "測試失敗",
    "testOk": "測試成功：",
    "saved": "已儲存。現在可以在網頁中選取文字試用。"
  },
  "en": {
    "pageTitle": "WordBridge Settings",
    "heroDesc": "A bridge to the world through language.",
    "uiLanguage": "Interface language",
    "extensionEnabled": "Enable selection lookup",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Chat model",
    "sourceLanguage": "From",
    "targetLanguage": "To",
    "autoDetect": "Auto detect",
    "saveSettings": "Save",
    "testTranslation": "Test",
    "testing": "Testing API...",
    "testFailed": "Test failed",
    "testOk": "Test passed: ",
    "saved": "Saved. Select text on a page to try it."
  },
  "ja": {
    "pageTitle": "WordBridge 設定",
    "heroDesc": "言葉で世界へ橋をかける。",
    "uiLanguage": "表示言語",
    "extensionEnabled": "選択翻訳を有効にする",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "チャットモデル",
    "sourceLanguage": "元の言語",
    "targetLanguage": "翻訳先",
    "autoDetect": "自動検出",
    "saveSettings": "保存",
    "testTranslation": "テスト",
    "testing": "API をテスト中...",
    "testFailed": "テスト失敗",
    "testOk": "テスト成功: ",
    "saved": "保存しました。ページ上の文字を選択して試せます。"
  },
  "ko": {
    "pageTitle": "WordBridge 설정",
    "heroDesc": "언어로 세계를 잇는 다리.",
    "uiLanguage": "화면 언어",
    "extensionEnabled": "선택 번역 사용",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "채팅 모델",
    "sourceLanguage": "원문 언어",
    "targetLanguage": "대상 언어",
    "autoDetect": "자동 감지",
    "saveSettings": "저장",
    "testTranslation": "테스트",
    "testing": "API 테스트 중...",
    "testFailed": "테스트 실패",
    "testOk": "테스트 성공: ",
    "saved": "저장했습니다. 웹페이지에서 텍스트를 선택해 보세요."
  },
  "fr": {
    "pageTitle": "Paramètres WordBridge",
    "heroDesc": "Un pont vers le monde par les langues.",
    "uiLanguage": "Langue de l’interface",
    "extensionEnabled": "Activer la sélection",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Modèle de chat",
    "sourceLanguage": "Source",
    "targetLanguage": "Cible",
    "autoDetect": "Détection auto",
    "saveSettings": "Enregistrer",
    "testTranslation": "Tester",
    "testing": "Test de l’API...",
    "testFailed": "Échec du test",
    "testOk": "Test réussi : ",
    "saved": "Enregistré. Sélectionnez du texte sur une page pour essayer."
  },
  "de": {
    "pageTitle": "WordBridge Einstellungen",
    "heroDesc": "Eine Brücke zur Welt durch Sprache.",
    "uiLanguage": "Oberflächensprache",
    "extensionEnabled": "Auswahlübersetzung aktivieren",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Chatmodell",
    "sourceLanguage": "Quelle",
    "targetLanguage": "Ziel",
    "autoDetect": "Automatisch erkennen",
    "saveSettings": "Speichern",
    "testTranslation": "Testen",
    "testing": "API wird getestet...",
    "testFailed": "Test fehlgeschlagen",
    "testOk": "Test erfolgreich: ",
    "saved": "Gespeichert. Markieren Sie Text auf einer Seite zum Testen."
  },
  "es": {
    "pageTitle": "Configuración de WordBridge",
    "heroDesc": "Un puente al mundo a través del idioma.",
    "uiLanguage": "Idioma de la interfaz",
    "extensionEnabled": "Activar selección",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Modelo de chat",
    "sourceLanguage": "Origen",
    "targetLanguage": "Destino",
    "autoDetect": "Detectar automáticamente",
    "saveSettings": "Guardar",
    "testTranslation": "Probar",
    "testing": "Probando API...",
    "testFailed": "Prueba fallida",
    "testOk": "Prueba correcta: ",
    "saved": "Guardado. Selecciona texto en una página para probarlo."
  },
  "pt": {
    "pageTitle": "Configurações do WordBridge",
    "heroDesc": "Uma ponte para o mundo por meio dos idiomas.",
    "uiLanguage": "Idioma da interface",
    "extensionEnabled": "Ativar seleção",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Modelo de chat",
    "sourceLanguage": "Origem",
    "targetLanguage": "Destino",
    "autoDetect": "Detectar automaticamente",
    "saveSettings": "Salvar",
    "testTranslation": "Testar",
    "testing": "Testando API...",
    "testFailed": "Teste falhou",
    "testOk": "Teste OK: ",
    "saved": "Salvo. Selecione texto em uma página para testar."
  },
  "it": {
    "pageTitle": "Impostazioni WordBridge",
    "heroDesc": "Un ponte verso il mondo attraverso le lingue.",
    "uiLanguage": "Lingua interfaccia",
    "extensionEnabled": "Attiva selezione",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Modello chat",
    "sourceLanguage": "Origine",
    "targetLanguage": "Destinazione",
    "autoDetect": "Rileva automaticamente",
    "saveSettings": "Salva",
    "testTranslation": "Test",
    "testing": "Test API...",
    "testFailed": "Test non riuscito",
    "testOk": "Test riuscito: ",
    "saved": "Salvato. Seleziona testo in una pagina per provare."
  },
  "ru": {
    "pageTitle": "Настройки WordBridge",
    "heroDesc": "Мост к миру через языки.",
    "uiLanguage": "Язык интерфейса",
    "extensionEnabled": "Включить перевод выделения",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Чат-модель",
    "sourceLanguage": "Исходный",
    "targetLanguage": "Целевой",
    "autoDetect": "Автоопределение",
    "saveSettings": "Сохранить",
    "testTranslation": "Тест",
    "testing": "Проверка API...",
    "testFailed": "Тест не пройден",
    "testOk": "Тест пройден: ",
    "saved": "Сохранено. Выделите текст на странице, чтобы попробовать."
  },
  "ar": {
    "pageTitle": "إعدادات WordBridge",
    "heroDesc": "جسر إلى العالم عبر اللغات.",
    "uiLanguage": "لغة الواجهة",
    "extensionEnabled": "تفعيل ترجمة التحديد",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "نموذج المحادثة",
    "sourceLanguage": "من",
    "targetLanguage": "إلى",
    "autoDetect": "اكتشاف تلقائي",
    "saveSettings": "حفظ",
    "testTranslation": "اختبار",
    "testing": "جارٍ اختبار API...",
    "testFailed": "فشل الاختبار",
    "testOk": "نجح الاختبار: ",
    "saved": "تم الحفظ. حدد نصًا في صفحة لتجربته."
  },
  "hi": {
    "pageTitle": "WordBridge सेटिंग्स",
    "heroDesc": "भाषाओं के ज़रिए दुनिया तक एक पुल।",
    "uiLanguage": "इंटरफ़ेस भाषा",
    "extensionEnabled": "चयन अनुवाद चालू करें",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "चैट मॉडल",
    "sourceLanguage": "स्रोत",
    "targetLanguage": "लक्ष्य",
    "autoDetect": "स्वतः पहचानें",
    "saveSettings": "सहेजें",
    "testTranslation": "टेस्ट",
    "testing": "API टेस्ट हो रहा है...",
    "testFailed": "टेस्ट विफल",
    "testOk": "टेस्ट सफल: ",
    "saved": "सहेजा गया। आज़माने के लिए पेज पर पाठ चुनें।"
  },
  "vi": {
    "pageTitle": "Cài đặt WordBridge",
    "heroDesc": "Cây cầu đến thế giới qua ngôn ngữ.",
    "uiLanguage": "Ngôn ngữ giao diện",
    "extensionEnabled": "Bật tra cứu vùng chọn",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "Mô hình chat",
    "sourceLanguage": "Nguồn",
    "targetLanguage": "Đích",
    "autoDetect": "Tự phát hiện",
    "saveSettings": "Lưu",
    "testTranslation": "Kiểm tra",
    "testing": "Đang kiểm tra API...",
    "testFailed": "Kiểm tra thất bại",
    "testOk": "Kiểm tra thành công: ",
    "saved": "Đã lưu. Chọn văn bản trên trang để thử."
  },
  "th": {
    "pageTitle": "การตั้งค่า WordBridge",
    "heroDesc": "สะพานสู่โลกผ่านภาษา",
    "uiLanguage": "ภาษาอินเทอร์เฟซ",
    "extensionEnabled": "เปิดใช้การแปลที่เลือก",
    "apiBaseUrl": "API Base URL",
    "apiKey": "API Key",
    "chatModel": "โมเดลแชต",
    "sourceLanguage": "ต้นทาง",
    "targetLanguage": "ปลายทาง",
    "autoDetect": "ตรวจจับอัตโนมัติ",
    "saveSettings": "บันทึก",
    "testTranslation": "ทดสอบ",
    "testing": "กำลังทดสอบ API...",
    "testFailed": "ทดสอบไม่สำเร็จ",
    "testOk": "ทดสอบสำเร็จ: ",
    "saved": "บันทึกแล้ว เลือกข้อความบนหน้าเว็บเพื่อทดลองใช้"
  }
};

const form = document.getElementById("settings-form");
const statusEl = document.getElementById("status");
const testButton = document.getElementById("test-button");

loadSettings();

form.elements.uiLanguage.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveSettings();
});


testButton.addEventListener("click", async () => {
  await saveSettings({ silent: true });
  setStatus(t("testing"));
  testButton.disabled = true;

  try {
    const response = await chrome.runtime.sendMessage({ type: "test-settings" });
    if (!response?.ok) {
      throw new Error(response?.error || t("testFailed"));
    }
    setStatus(`${t("testOk")}${response.data.translation} ${response.data.ipa || ""}`, "ok");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error), "error");
  } finally {
    testButton.disabled = false;
  }
});

async function loadSettings() {
  const saved = await chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS));
  const settings = { ...DEFAULT_SETTINGS, ...saved };
  applyLanguage(settings.uiLanguage);

  for (const [key, value] of Object.entries(settings)) {
    const field = form.elements[key];
    if (!field) continue;
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
    } else {
      field.value = value;
    }
  }
}

async function saveSettings(options = {}) {
  const settings = {
    enabled: form.elements.enabled.checked,
    baseUrl: form.elements.baseUrl.value.trim().replace(/\/+$/, ""),
    apiKey: form.elements.apiKey.value.trim(),
    model: form.elements.model.value.trim(),
    uiLanguage: form.elements.uiLanguage.value,
    sourceLanguage: form.elements.sourceLanguage.value,
    targetLanguage: form.elements.targetLanguage.value
  };

  await chrome.storage.sync.set(settings);
  if (!options.silent) {
    setStatus(t("saved"), "ok");
  }
}

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${type ? `is-${type}` : ""}`.trim();
}


function applyLanguage(language) {
  const lang = I18N[language] ? language : DEFAULT_SETTINGS.uiLanguage;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t("pageTitle", lang);
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n, lang);
  }
}

function t(key, language = form?.elements?.uiLanguage?.value || DEFAULT_SETTINGS.uiLanguage) {
  const dict = I18N[language] || I18N[DEFAULT_SETTINGS.uiLanguage];
  return dict[key] || I18N[DEFAULT_SETTINGS.uiLanguage][key] || key;
}
