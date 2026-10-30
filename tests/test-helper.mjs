/** Every integration test targets this worktree's explicit preview, never the frozen server. */
export const SITE_TEST_URL=(process.env.SITE_TEST_URL||'http://127.0.0.1:4335').replace(/\/$/,'');
import { chromium } from '@playwright/test';
/** Launch installed Edge for local production checks. @returns {Promise<import('@playwright/test').Browser>} Creates a headless browser; caller must close it. */
export async function launchBrowser() { return chromium.launch({channel:'msedge',headless:true}); }
/** Decode every local page image, scrolling to trigger native lazy loading. @param {import('@playwright/test').Page} page Test page. @returns {Promise<void>} Changes scroll position, then returns to top. */
export async function decodeImages(page) {
  for (const image of await page.locator('main img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate(el => el.decode()); }
  await page.evaluate(() => { document.activeElement?.blur(); scrollTo({top:0,behavior:"instant"}); });
  await page.waitForFunction(() => scrollY === 0);
}

/** Exercise the retained opt-in shine capability without changing the client baseline default. */
export async function enableShineForTest(page){await page.route('**/*',async route=>{if(route.request().resourceType()!=='document')return route.continue();const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('--shine-enabled:0','--shine-enabled:1').replace('data-shine-enabled="false"','data-shine-enabled="true"')});});}
