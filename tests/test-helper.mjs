import { chromium } from '@playwright/test';
/** Launch installed Edge for local production checks. @returns {Promise<import('@playwright/test').Browser>} Creates a headless browser; caller must close it. */
export async function launchBrowser() { return chromium.launch({channel:'msedge',headless:true}); }
/** Decode every local page image, scrolling to trigger native lazy loading. @param {import('@playwright/test').Page} page Test page. @returns {Promise<void>} Changes scroll position, then returns to top. */
export async function decodeImages(page) {
  for (const image of await page.locator('main img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(el => el.decode()); }
  await page.evaluate(() => { document.activeElement?.blur(); scrollTo({top:0,behavior:"instant"}); });
  await page.waitForFunction(() => scrollY === 0);
}
