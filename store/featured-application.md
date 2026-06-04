# Featured Badge Nomination Draft

## Product

WordBridge

## What WordBridge Does

WordBridge helps users understand selected text on webpages. It explains or translates selected words, phrases, and sentences with a user-configured OpenAI-compatible API, then shows a compact popup with IPA, examples, related words, sentence structure, and browser speech.

## Target Users

- Language learners reading web content
- Users who prefer simple English explanations
- Readers of documentation, papers, articles, and social posts
- Users who want to bring their own AI API key instead of depending on a hosted translation service

## Why It Is Useful

WordBridge keeps the reading flow on the current page. Users do not need to open another tab, copy text, or switch tools. It supports both quick word lookup and sentence-level understanding, while keeping control of the API provider and model in the user's hands.

## Quality And UX Notes

- Manifest V3 extension
- Minimal UI that appears near the selected text
- Configurable trigger modes to avoid accidental lookups
- Configurable popup close behavior
- Multilingual settings UI
- Uses browser built-in speech synthesis
- Short-lived local cache to avoid repeated requests
- No ads, no tracking, no hosted user database

## Privacy And Security Notes

WordBridge only sends selected text to the OpenAI-compatible API endpoint configured by the user. API keys are stored in Chrome extension storage. Translation cache entries are local, expire after 10 minutes, and are capped. The extension does not collect browsing history and does not sell or transfer user data for advertising.

## Nomination Route

After the extension is published publicly, submit the nomination through Chrome Web Store One Stop Support:

https://support.google.com/chrome_webstore/contact/one_stop_support

Choose the Featured Badge nomination option for the published item.

## Pre-Nomination Checklist

- The item is a public Chrome extension.
- The nominating account owns the extension.
- English language support is available.
- There are no active policy violations.
- Core features are accessible without additional credentials or payments beyond the user's own optional API provider setup.
- Store listing includes clear description, polished screenshots, and required promotional image.
