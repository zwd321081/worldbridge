const DEFAULT_SETTINGS = {
  enabled: true,
  triggerMode: "modifier-double-click",
  triggerModifier: "alt",
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
    "triggerMode": "触发方式",
    "triggerSelection": "选中后自动翻译",
    "triggerModifierSelection": "按住修饰键选中",
    "triggerModifierDoubleClick": "按住修饰键双击",
    "triggerModifier": "修饰键",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "已保存。现在可以在网页里选中文字试用。",
    "saving": "正在保存...",
    "autoSaved": "已自动保存。"
  },
  "zh-TW": {
    "pageTitle": "WordBridge 設定",
    "heroDesc": "架起通往世界語言的橋。",
    "uiLanguage": "介面語言",
    "extensionEnabled": "啟用選詞翻譯",
    "triggerMode": "觸發方式",
    "triggerSelection": "選取後自動翻譯",
    "triggerModifierSelection": "按住修飾鍵選取",
    "triggerModifierDoubleClick": "按住修飾鍵雙擊",
    "triggerModifier": "修飾鍵",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "已儲存。現在可以在網頁中選取文字試用。",
    "saving": "正在儲存...",
    "autoSaved": "已自動儲存。"
  },
  "en": {
    "pageTitle": "WordBridge Settings",
    "heroDesc": "A bridge to the world through language.",
    "uiLanguage": "Interface language",
    "extensionEnabled": "Enable selection lookup",
    "triggerMode": "Trigger",
    "triggerSelection": "Translate on selection",
    "triggerModifierSelection": "Hold modifier and select",
    "triggerModifierDoubleClick": "Hold modifier and double-click",
    "triggerModifier": "Modifier key",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Saved. Select text on a page to try it.",
    "saving": "Saving...",
    "autoSaved": "Auto-saved."
  },
  "ja": {
    "pageTitle": "WordBridge 設定",
    "heroDesc": "言葉で世界へ橋をかける。",
    "uiLanguage": "表示言語",
    "extensionEnabled": "選択翻訳を有効にする",
    "triggerMode": "起動方法",
    "triggerSelection": "選択時に自動翻訳",
    "triggerModifierSelection": "修飾キーを押しながら選択",
    "triggerModifierDoubleClick": "修飾キーを押しながらダブルクリック",
    "triggerModifier": "修飾キー",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "保存しました。ページ上の文字を選択して試せます。",
    "saving": "保存中...",
    "autoSaved": "自動保存しました。"
  },
  "ko": {
    "pageTitle": "WordBridge 설정",
    "heroDesc": "언어로 세계를 잇는 다리.",
    "uiLanguage": "화면 언어",
    "extensionEnabled": "선택 번역 사용",
    "triggerMode": "실행 방식",
    "triggerSelection": "선택하면 자동 번역",
    "triggerModifierSelection": "보조 키를 누르고 선택",
    "triggerModifierDoubleClick": "보조 키를 누르고 더블 클릭",
    "triggerModifier": "보조 키",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "저장했습니다. 웹페이지에서 텍스트를 선택해 보세요.",
    "saving": "저장 중...",
    "autoSaved": "자동 저장됨."
  },
  "fr": {
    "pageTitle": "Paramètres WordBridge",
    "heroDesc": "Un pont vers le monde par les langues.",
    "uiLanguage": "Langue de l’interface",
    "extensionEnabled": "Activer la sélection",
    "triggerMode": "Déclencheur",
    "triggerSelection": "Traduire à la sélection",
    "triggerModifierSelection": "Maintenir la touche modificatrice et sélectionner",
    "triggerModifierDoubleClick": "Maintenir la touche modificatrice et double-cliquer",
    "triggerModifier": "Touche modificatrice",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Enregistré. Sélectionnez du texte sur une page pour essayer.",
    "saving": "Enregistrement...",
    "autoSaved": "Enregistré automatiquement."
  },
  "de": {
    "pageTitle": "WordBridge Einstellungen",
    "heroDesc": "Eine Brücke zur Welt durch Sprache.",
    "uiLanguage": "Oberflächensprache",
    "extensionEnabled": "Auswahlübersetzung aktivieren",
    "triggerMode": "Auslöser",
    "triggerSelection": "Beim Markieren übersetzen",
    "triggerModifierSelection": "Zusatztaste halten und markieren",
    "triggerModifierDoubleClick": "Zusatztaste halten und doppelklicken",
    "triggerModifier": "Zusatztaste",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Gespeichert. Markieren Sie Text auf einer Seite zum Testen.",
    "saving": "Wird gespeichert...",
    "autoSaved": "Automatisch gespeichert."
  },
  "es": {
    "pageTitle": "Configuración de WordBridge",
    "heroDesc": "Un puente al mundo a través del idioma.",
    "uiLanguage": "Idioma de la interfaz",
    "extensionEnabled": "Activar selección",
    "triggerMode": "Activación",
    "triggerSelection": "Traducir al seleccionar",
    "triggerModifierSelection": "Mantener modificador y seleccionar",
    "triggerModifierDoubleClick": "Mantener modificador y doble clic",
    "triggerModifier": "Tecla modificadora",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Guardado. Selecciona texto en una página para probarlo.",
    "saving": "Guardando...",
    "autoSaved": "Guardado automático."
  },
  "pt": {
    "pageTitle": "Configurações do WordBridge",
    "heroDesc": "Uma ponte para o mundo por meio dos idiomas.",
    "uiLanguage": "Idioma da interface",
    "extensionEnabled": "Ativar seleção",
    "triggerMode": "Acionamento",
    "triggerSelection": "Traduzir ao selecionar",
    "triggerModifierSelection": "Segurar modificador e selecionar",
    "triggerModifierDoubleClick": "Segurar modificador e clicar duas vezes",
    "triggerModifier": "Tecla modificadora",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Salvo. Selecione texto em uma página para testar.",
    "saving": "Salvando...",
    "autoSaved": "Salvo automaticamente."
  },
  "it": {
    "pageTitle": "Impostazioni WordBridge",
    "heroDesc": "Un ponte verso il mondo attraverso le lingue.",
    "uiLanguage": "Lingua interfaccia",
    "extensionEnabled": "Attiva selezione",
    "triggerMode": "Attivazione",
    "triggerSelection": "Traduci alla selezione",
    "triggerModifierSelection": "Tieni il modificatore e seleziona",
    "triggerModifierDoubleClick": "Tieni il modificatore e fai doppio clic",
    "triggerModifier": "Tasto modificatore",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Salvato. Seleziona testo in una pagina per provare.",
    "saving": "Salvataggio...",
    "autoSaved": "Salvato automaticamente."
  },
  "ru": {
    "pageTitle": "Настройки WordBridge",
    "heroDesc": "Мост к миру через языки.",
    "uiLanguage": "Язык интерфейса",
    "extensionEnabled": "Включить перевод выделения",
    "triggerMode": "Запуск",
    "triggerSelection": "Переводить при выделении",
    "triggerModifierSelection": "Удерживать модификатор и выделить",
    "triggerModifierDoubleClick": "Удерживать модификатор и дважды щелкнуть",
    "triggerModifier": "Клавиша-модификатор",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Сохранено. Выделите текст на странице, чтобы попробовать.",
    "saving": "Сохранение...",
    "autoSaved": "Автосохранено."
  },
  "ar": {
    "pageTitle": "إعدادات WordBridge",
    "heroDesc": "جسر إلى العالم عبر اللغات.",
    "uiLanguage": "لغة الواجهة",
    "extensionEnabled": "تفعيل ترجمة التحديد",
    "triggerMode": "طريقة التشغيل",
    "triggerSelection": "الترجمة عند التحديد",
    "triggerModifierSelection": "اضغط مفتاح التعديل وحدد النص",
    "triggerModifierDoubleClick": "اضغط مفتاح التعديل وانقر مرتين",
    "triggerModifier": "مفتاح التعديل",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "تم الحفظ. حدد نصًا في صفحة لتجربته.",
    "saving": "جارٍ الحفظ...",
    "autoSaved": "تم الحفظ تلقائيًا."
  },
  "hi": {
    "pageTitle": "WordBridge सेटिंग्स",
    "heroDesc": "भाषाओं के ज़रिए दुनिया तक एक पुल।",
    "uiLanguage": "इंटरफ़ेस भाषा",
    "extensionEnabled": "चयन अनुवाद चालू करें",
    "triggerMode": "ट्रिगर",
    "triggerSelection": "चयन पर अनुवाद",
    "triggerModifierSelection": "मॉडिफ़ायर दबाकर चुनें",
    "triggerModifierDoubleClick": "मॉडिफ़ायर दबाकर डबल-क्लिक करें",
    "triggerModifier": "मॉडिफ़ायर कुंजी",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "सहेजा गया। आज़माने के लिए पेज पर पाठ चुनें।",
    "saving": "सहेजा जा रहा है...",
    "autoSaved": "अपने आप सहेजा गया।"
  },
  "vi": {
    "pageTitle": "Cài đặt WordBridge",
    "heroDesc": "Cây cầu đến thế giới qua ngôn ngữ.",
    "uiLanguage": "Ngôn ngữ giao diện",
    "extensionEnabled": "Bật tra cứu vùng chọn",
    "triggerMode": "Cách kích hoạt",
    "triggerSelection": "Dịch khi chọn",
    "triggerModifierSelection": "Giữ phím bổ trợ và chọn",
    "triggerModifierDoubleClick": "Giữ phím bổ trợ và nhấp đúp",
    "triggerModifier": "Phím bổ trợ",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "Đã lưu. Chọn văn bản trên trang để thử.",
    "saving": "Đang lưu...",
    "autoSaved": "Đã tự động lưu."
  },
  "th": {
    "pageTitle": "การตั้งค่า WordBridge",
    "heroDesc": "สะพานสู่โลกผ่านภาษา",
    "uiLanguage": "ภาษาอินเทอร์เฟซ",
    "extensionEnabled": "เปิดใช้การแปลที่เลือก",
    "triggerMode": "วิธีเรียกใช้",
    "triggerSelection": "แปลเมื่อเลือกข้อความ",
    "triggerModifierSelection": "กดปุ่มปรับแต่งค้างแล้วเลือก",
    "triggerModifierDoubleClick": "กดปุ่มปรับแต่งค้างแล้วดับเบิลคลิก",
    "triggerModifier": "ปุ่มปรับแต่ง",
    "modifierAlt": "Alt / Option (⌥)",
    "modifierCtrl": "Ctrl / Command (⌘)",
    "modifierShift": "Shift",
    "modifierCtrlShift": "Ctrl / Command (⌘) + Shift",
    "modifierAltShift": "Alt / Option (⌥) + Shift",
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
    "saved": "บันทึกแล้ว เลือกข้อความบนหน้าเว็บเพื่อทดลองใช้",
    "saving": "กำลังบันทึก...",
    "autoSaved": "บันทึกอัตโนมัติแล้ว"
  }
};

const form = document.getElementById("settings-form");
const statusEl = document.getElementById("status");
const testButton = document.getElementById("test-button");
let autoSaveTimer = null;
let isLoadingSettings = true;

loadSettings();

form.elements.uiLanguage.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

form.addEventListener("input", (event) => {
  if (!isSettingsField(event.target)) return;
  scheduleAutoSave();
});

form.addEventListener("change", (event) => {
  if (!isSettingsField(event.target)) return;
  scheduleAutoSave({ immediate: true });
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

function scheduleAutoSave(options = {}) {
  if (isLoadingSettings) return;

  window.clearTimeout(autoSaveTimer);

  const delay = options.immediate ? 0 : 500;
  autoSaveTimer = window.setTimeout(async () => {
    setStatus(t("saving"));
    try {
      await saveSettings({ silent: true });
      setStatus(t("autoSaved"), "ok");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error), "error");
    }
  }, delay);
}

function isSettingsField(element) {
  return Boolean(element?.name && Object.hasOwn(DEFAULT_SETTINGS, element.name));
}

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

  isLoadingSettings = false;
}

async function saveSettings(options = {}) {
  const settings = {
    enabled: form.elements.enabled.checked,
    triggerMode: form.elements.triggerMode.value,
    triggerModifier: form.elements.triggerModifier.value,
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
