# contact-media-secondary

## 1. What changed and why
ContactForm and AnimatedMedia added; EditorialPage and dynamic route updated; home/process redirect aliases.

## 2. Functions added
initContactForm(), handleInquirySubmit(event), clearInquiryStatus() in contact.js: local validation/status only. initAnimatedMedia(), setPlayback(value), togglePlayback(), handleMediaPreference() in media.js: GIF/poster pause and reduced motion.

## 3. Functions changed
getStaticPaths adds configured contact/legal/home-1 routes; EditorialPage supports optional media.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
ContactForm and AnimatedMedia added; EditorialPage and dynamic route updated; home/process redirect aliases.

## 6. Strings/images/design changed
Centralized contact/legal/media copy; user GIF hosted locally in The Process and home-1 video slots. Dark ordinary images unchanged. GIF ownership unverified; original URL recorded.

## 7. Checks actually run
npm run build passed; browser verification follows Stage 12.

## 8. Remaining work/risks
Stages 11–13 remain; no email delivery or commerce backend.
