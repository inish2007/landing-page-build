# Client editing — start here

## One place for your business details
Open `src/content/client.json` and replace the values inside quotes:

- `brandName`: your name or studio. This updates wordmarks, page titles, accessible names, brand mentions and copyright wherever the brand template is used.
- `brandMark`: leave empty, or enter your chosen `™` / `®` suffix. This appears with the wordmark. Include `{brandMark}` in your copyright sentence if desired.
- `contactEmail`: your receiving Gmail or other email. Leave empty until ready; the contact form then stays inactive.
- `instagramUrl` / `facebookUrl`: paste the full `https://...` profile URL. Leave empty to hide that social link. The homepage social images follow the Instagram setting.
- `copyright`: edit the sentence, keeping exactly one `{year}`. `{brandName}` and `{brandMark}` follow your settings. The year updates automatically.
- `designCredit`: editable footer credit. Preserve any credit required by your agreement or asset licenses.

Example:
```json
{
  "brandName": "Your Studio",
  "brandMark": "",
  "contactEmail": "your-studio@gmail.com",
  "instagramUrl": "https://www.instagram.com/your-studio/",
  "facebookUrl": "https://www.facebook.com/your-studio/",
  "copyright": "© {year} {brandName}. All Rights Reserved.",
  "designCredit": "Design credit agreed with your designer"
}
```
These are public website settings. Never add an email password or secret API key.

## Activate enquiries once
1. Add the receiving address to `contactEmail`, save, then rebuild/publish the chosen version.
2. From the published website, send one setup enquiry yourself.
3. Open the confirmation email from **FormSubmit** in that receiving inbox and activate the form. Check spam if necessary.
4. Send a second enquiry and verify it arrives; use Reply to answer the visitor.

The visitor supplies their own name, email and message. Their email is the reply address, not the receiving inbox. The form posts to FormSubmit and may show its security/confirmation page. No email password, new website library or custom server is required. Activation and service availability are controlled by FormSubmit; adding the address alone does not verify the inbox. A different receiving address needs activation again. See https://formsubmit.co/ for service instructions. No automatic test messages are sent by this project.

## Replace words on any page
Edit `src/content/text.en.json`. The `home`, `editorial`, `contact`, `footer`, `legal` and `artworks` groups contain page copy and labels. Keep `{brandName}`, `{brandUpperName}` or `{brandDisplayName}` in sentences that should follow your brand setting. Edit product names and historical/editorial wording separately; they are not automatically renamed. Route addresses remain stable when the brand changes.

## Replace photographs on any page
1. Add your photo to `public/images/`.
2. Open `src/content/images.json`; locate the image slot.
3. Change `src`, `alt`, `width` and `height` to the new file and its real dimensions. Remove old `sources` entries if present.
4. Keep `fit: "cover"` and adjust `position.desktop` / `position.mobile` to move the crop without stretching.

Useful slots: `homeHero`, `homeIntroSide`, `collaborationBackdrop`, `aboutPreview`, `pressPreview`, `contactPreview`, `social1`–`social6`. Supporting-page slots are listed in `src/content/pages.json` under `imageKeys`; artwork images are referenced in `src/content/artworks.json`. Every page uses these central files. Keep source/license information for any third-party images.

## Preview and check
Run `npm run check` and `npm run build`. A static production preview must be rebuilt after edits. Editing local files does not update a published site until the approved version is published. See `CUSTOMIZATION.md` for fonts, colors, logos, crops, navigation and advanced controls.

Both main and quiet-luxury support these settings independently. Neither automatically edits the other branch. Frozen tags/backups stay unchanged.
