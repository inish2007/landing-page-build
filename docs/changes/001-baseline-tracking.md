# Change Note 001: Project Baseline & Tracking Setup

## 1. What changed and why
Established the baseline Git tracking repository and froze the reference project scope for the editable Astro portfolio website.
- Initialized contributor tracking registries: `docs/FUNCTION_INDEX.md`, `docs/progress.md`, and this change note `docs/changes/001-baseline-tracking.md`.
- Tracked core project foundation files: `.gitignore`, `package.json`, `package-lock.json`, `prd.md`, `design.md`, and `docs/implementation-plan.md`.
- Verified repository boundaries to guarantee that all private agent instructions (`AGENTS.md`, `agent.md`, `AGENT_BUILD_INSTRUCTIONS.md`, `AGENT_HANDOFF.md`, `.agents/`), private design reference materials (`ref.md`, `scripts/*reference*`, `evidence/`), and internal measurement files (`docs/design-measurements.md`, `docs/route-inventory.md`) are strictly untracked and excluded by `.gitignore`.
- Froze the 13-stage implementation roadmap without creating any premature application routes or modifying runtime dependencies.

## 2. Functions added
None. (Baseline tracking and scope documentation only; zero application or tooling functions added to the repository in Stage 01).

## 3. Functions changed
None. (Initial commit; zero pre-existing functions modified).

## 4. Functions removed/renamed
None. (Initial commit; zero pre-existing functions removed or renamed).

## 5. Components/routes changed
None. (No Astro components, layouts, or routes created in Stage 01. Application scaffolding begins in Stage 02).

## 6. Strings/images/design changed
None. (Centralized content schemas and design tokens are scheduled for Stage 03).
- Contributor design specification frozen: `prd.md` and `design.md` establish neutral branding ("Aura Creative Studio"), target typography (Fraunces serif, Plus Jakarta Sans sans-serif), responsive viewport requirements (1440px, 1280px, 768px, 390px, with 360px and 430px overflow checks), and color palette.

## 7. Checks actually run
- `git status`: Confirmed untracked baseline files and no pre-existing commits on branch `main`.
- `git check-ignore -v AGENTS.md agent.md AGENT_BUILD_INSTRUCTIONS.md AGENT_HANDOFF.md .agents/ ref.md evidence/ docs/design-measurements.md docs/route-inventory.md scripts/capture-reference.py`: Confirmed 100% of private paths match active ignore patterns.
- `git diff --cached --check`: Staged changes inspected; zero whitespace or line-ending errors observed.
- `git diff --cached --stat`: Staged file list verified against expected baseline file manifest.
- `node -v` & `npm -v`: Verified Node.js v24.19.0 and npm 11.17.0 runtime environment.
- Unrun checks (not applicable at Stage 01): Application dev server, production build, visual regression, interaction tests, and content validation are not runnable at Stage 01 because application source and test scripts will be scaffolded in subsequent stages.

## 8. Remaining work/risks
- Stage 02: Scaffold minimal Astro project (`astro.config.mjs`, `src/layouts/SiteLayout.astro`, `src/pages/index.astro`) and verify dev server and production static build.
- Stages 03–13: Implement centralized content schemas, shared chrome, responsive homepage, subpages, gallery with lightbox, contact form mock, polish, test suite, and client editing documentation.
- Environment note: Playwright standalone Chromium binary is not cached; testing scripts in Stage 06/11/12 will use `tests/test-helper.mjs` with `{ channel: 'msedge' }` or `{ channel: 'chrome' }` workstation fallback.
