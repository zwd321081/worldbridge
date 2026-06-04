# Chrome Web Store Review Notes

## Single Purpose

WordBridge explains, translates, and reads selected webpage text using a user-configured OpenAI-compatible chat API.

## How To Test

1. Install the extension.
2. Open the extension popup/options page.
3. Enter an OpenAI-compatible API Base URL, API Key, and chat model.
4. Keep the default trigger mode, or choose another trigger mode.
5. Open any webpage with readable text.
6. Select a word or sentence according to the configured trigger mode.
7. Confirm that a popup appears with explanation or translation, IPA when applicable, examples, related words, structure for sentences, and a Voice button.
8. Click the Voice button to verify browser speech synthesis.

## Permissions Justification

### storage

Used to save user settings in `chrome.storage.sync` and short-lived translation cache entries in `chrome.storage.local`.

### host permissions: <all_urls>

Required because the extension's content script needs to detect selected text and display the popup on user-visited webpages. The extension only processes selected text after the user triggers lookup according to the configured trigger mode.

## Remote Code

WordBridge does not load or execute remote JavaScript. It sends selected text to the user-configured OpenAI-compatible API endpoint as JSON and renders the returned JSON response in the extension popup.

## Privacy

WordBridge does not collect browsing history, does not sell data, does not show ads, and does not track users. Selected text is sent only to the API endpoint configured by the user when a lookup is triggered.
