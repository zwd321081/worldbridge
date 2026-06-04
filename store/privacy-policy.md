# WordBridge Privacy Policy

Effective date: 2026-06-04

WordBridge is a Chrome extension that explains, translates, and reads selected text on webpages using an OpenAI-compatible API endpoint configured by the user.

## Data WordBridge Handles

WordBridge may handle the following data only when needed for its user-facing features:

- Selected text: the word, phrase, or sentence the user chooses to explain or translate.
- API settings: API Base URL, API Key, model name, source language, target language, trigger settings, and popup behavior settings.
- Translation cache: recent lookup results stored locally to avoid repeated API requests.

## How Data Is Used

Selected text is used only to generate the explanation, translation, pronunciation text, examples, related words, and sentence structure shown to the user.

API settings are used only to call the user-configured OpenAI-compatible API endpoint.

Translation cache entries are used only to return recent repeated lookup results faster and reduce duplicate API requests.

## Data Storage

API settings are stored in Chrome extension sync storage (`chrome.storage.sync`). If Chrome account sync is enabled, these settings may sync to other Chrome browsers signed in with the same Google account.

Translation cache entries are stored in Chrome local extension storage (`chrome.storage.local`). Cache entries expire after 10 minutes by default and are capped at 300 items.

WordBridge does not write API keys or selected text to files in the project directory.

## Data Sharing

WordBridge does not sell user data, does not use user data for advertising, and does not transfer user data to data brokers or advertising platforms.

When the user triggers a lookup, the selected text is sent to the OpenAI-compatible API endpoint configured by the user. The handling of that request by the API provider is governed by that provider's own terms and privacy policy.

## Browsing Activity

WordBridge runs on webpages so it can detect user-selected text. It does not collect browsing history. It only processes the selected text after the user triggers the extension according to the configured trigger mode.

## Limited Use Statement

The use of information received from Google APIs will adhere to the Chrome Web Store User Data Policy, including the Limited Use requirements.

## Contact

For questions or issues, use the GitHub repository issue tracker:

https://github.com/zwd321081/worldbridge/issues
