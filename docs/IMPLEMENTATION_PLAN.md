# Current implementation plan

## Current scope and stop point
Stages 05 and 06 are complete. Only the homepage route exists. All 15 configured images currently use the user-supplied dark PNG, and that override must remain intact. The user explicitly clarified on 29 October 2026 that this request is to update the agent instructions and implementation plan only: do not build additional pages or animation code now. No publish or push.

## Planned shared animation implementation — not implemented

| Behavior | Evidence from supplied saved site | Future implementation requirement |
|---|---|---|
| Content entry | Global fade style; opacity transition; inline 1.5s duration, ease curve | Shared once-per-element viewport fades; no invented slide/scale/parallax |
| Header entry | Header element delays advance by about 0.0111111s | Small entry stagger using centralized settings; preserve navigation usability |
| Content staggering | Inspected content delays around 0.222222–0.266667s | Short bounded staggering within groups; no cumulative page-length delay |
| Circle highlight | Draw configuration has duration 0.5s but isAnimationEnabled=false | Static circle; drawing animation requires new evidence or user direction |
| Navigation | Local snapshot toggles menu visibility; original hosted runtime disabled | Preserve existing accessible drawer focus, Escape and scroll restoration; do not copy hosted code |

These values describe saved source configuration. They are not proof that all original runtime animations execute in the local snapshot, nor measurements from a live site. Source contains unused animation classes; their presence alone does not authorize new effects.

### Architecture for a future authorized implementation
- Load one shared motion module/stylesheet from SiteLayout so every implemented route inherits the same policy.
- Centralize fade duration, easing and bounded stagger values in tokens.css. Record actual named functions/components when written; none are added by this plan.
- Use original vanilla JavaScript and authored CSS. Do not bundle copied hosted scripts, third-party tracking or private reference material.
- Keep content visible without JavaScript and when APIs/initialization fail. Reduced motion bypasses animation, including when preferences change during the session. Avoid persistent hidden states, layout shifts and nested duplicate fades.
- Preserve the dark placeholder image in all slots and keep existing brand/font/content settings unchanged.

### Coverage when future routes are authorized
Home; About; The Process; Work/Available/Archived; Press; Collaborations and its detail pages; Contact. Reuse SiteLayout on every route. This is future coverage, not a claim these routes already exist or permission to create them now.

### Future verification gate
Check opacity progression and once-only entry; actual duration/stagger; normal and reduced motion; no-JS and missing-observer fallback; keyboard focus and drawer dismissal; desktop/mobile scroll; console/request failures; every implemented route. Keep captures private and report only executed checks. Full accessibility and asset audits remain separate later milestones.

## Existing implementation references
- Stage 05: d7d5ccf; source artist homepage content/sequence is temporary user-supplied material.
- Stage 06: f5b46ad; responsive composition and limited hover motion are implemented.
- Image override: 41b18b2; every image uses /images/client-placeholder.png.
- Current request: documentation only; source animation inspection completed, no runtime changes or new pages.
