# Chrome Web Store Publish Checklist

## Account

- Register in the Chrome Web Store Developer Dashboard.
- Pay the one-time developer registration fee.
- Complete identity/payment verification if required.
- Enable 2-Step Verification on the Google account.

## Package

- Confirm `manifest_version` is 3.
- Confirm only necessary permissions are requested.
- Build a clean ZIP package containing only extension runtime files.
- Upload the ZIP in Developer Dashboard.

## Store Listing

- Name: WordBridge
- Category: Productivity
- Short description: use `store/listing.en.md` or `store/listing.zh.md`.
- Full description: use `store/listing.en.md` or `store/listing.zh.md`.
- Upload 128x128 icon.
- Upload at least one screenshot; ideally upload 3-5 screenshots.
- Add small promotional image: 440x280.
- Optional but recommended for better featuring chances: marquee promotional image 1400x560.

## Privacy

- Fill out privacy fields truthfully.
- Link to `store/privacy-policy.md` rendered on GitHub or GitHub Pages.
- Disclose that selected text is sent to the user-configured API endpoint.
- Disclose storage usage: sync settings and local 10-minute cache.

## Review Notes

- Paste relevant content from `store/review-notes.md` into the review instructions field.

## Featured Badge

- Publish first and wait for approval.
- After the item is live and stable, use `store/featured-application.md` as the nomination draft.
- Make sure listing images and privacy policy are polished before nominating.

## Featured Nomination Route

After the extension is approved and publicly listed, open Chrome Web Store One Stop Support:

https://support.google.com/chrome_webstore/contact/one_stop_support

Use the Featured Badge nomination option. Do this only after the listing is polished and stable.
