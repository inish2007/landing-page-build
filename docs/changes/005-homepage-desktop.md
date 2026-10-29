# Stage 05 — Artist homepage

## 1. What changed and why
Replaced the Aura architecture direction with temporary user-supplied artist copy/media. Built original Astro sections following the supplied homepage sequence. Added locally hosted Caveat Brush for brand lettering.

## 2. Functions added
None. Astro inline mapping callbacks belong to their documented owner components.

## 3. Functions changed
validateChromeKeys in scripts/validate-content.mjs: same textData→errors signature, revised required chrome list removes unimplemented contact header/form/info and unused tagline. Callers remain validateContent. No new side effects.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
Added HeroSection, StatementSection, SelectedWorkSection, ContactCtaSection, FormattedText, ResponsiveImage; props and consumers documented in FUNCTION_INDEX and source. Index now renders the home configuration. Footer now groups source navigation/credits. Only root route implemented.

## 6. Strings/images/design changed
Replaced home/common/nav/footer dictionaries and removed unused architecture-page copy/configuration/artwork records. Retained supplied copy and reference identity temporarily as requested. Replaced images dictionary with selected local reference images using actual measured dimensions and descriptive alt text. Renamed local copies in public/images/reference; no source executable code or source logo/font copied. Added --font-brand/--text-brand, local Caveat Brush TTF/OFL, provenance and notices. Header/footer/drawer name is uppercase brush lettering. Existing serif/sans retained. Historical docs retain earlier facts.

## 7. Checks actually run
Content validator and npm run build passed. Desktop preview screenshot reviewed in ignored evidence/local/stage05-desktop.png. Full responsive and browser verification belongs to Stage 06.

## 8. Remaining work/risks
Stage 06 responsive/motion checks next. Supporting routes are still pending. Reference copy/images remain original-owner material with unverified reuse license; local-only and no publication. Previous architecture media remain on disk but are no longer selected by content.
