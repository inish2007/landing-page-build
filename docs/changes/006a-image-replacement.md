# Image replacement after Stage 06

## 1. What changed and why
Every configured site image now uses the single user-supplied dark image. Previous source assets remain on disk.

## 2. Functions added
None.

## 3. Functions changed
None.

## 4. Functions removed/renamed
None.

## 5. Components/routes changed
None; ResponsiveImage continues to consume the centralized dictionary.

## 6. Strings/images/design changed
All 15 images.json records use /images/client-placeholder.png with measured source dimensions and accurate alt text. Removed prior srcset entries so no viewport can select an old photograph. Existing component ratios/crops remain unchanged. Asset manifest records the active user override.

## 7. Checks actually run
Content validation and production build passed. Built root page verified to contain 15 image elements, all pointing to the supplied PNG, with no old image srcset.

## 8. Remaining work/risks
No later stage work. Existing source assets remain available for future content replacement.
