const BASE_URL = process.env.SITE_TEST_URL || 'http://127.0.0.1:4321';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

/** Verify shared chrome in production preview. @returns {Promise<void>} Launches/closes Edge, reads DOM, exercises keyboard/pointer and writes ignored screenshots. Requires preview on port 4321. */
async function verifyNavigation() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of [1440, 1280, 768, 390, 360, 430]) {
      await page.setViewportSize({width, height: width === 1440 ? 1000 : width === 1280 ? 800 : width === 768 ? 1024 : 844});
      await page.goto(BASE_URL + '/');
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('header').count(), 1);
      assert.equal(await page.locator('footer nav a[href^="/"]').count(), 8);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const opener = page.locator('[data-menu-open]');
      assert.equal(await opener.isVisible(), width < 1024);
      if (width < 1024) {
        await opener.focus(); await page.keyboard.press('Enter');
        assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
        assert.equal(await opener.getAttribute('aria-expanded'), 'true');
        assert.equal(await page.locator('body').evaluate(el => el.style.overflow), 'hidden');
        assert.equal(await page.locator('[data-menu-close]').evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Shift+Tab');
        assert.equal(await page.locator('dialog nav a').last().evaluate(el => el === document.activeElement), true);
        await page.keyboard.press('Tab');
        assert.equal(await page.locator('[data-menu-close]').evaluate(el => el === document.activeElement), true);
        await page.screenshot({path: 'evidence/local/navigation-' + width + '-open.png', fullPage:true});
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
        assert.equal(await opener.evaluate(el => el === document.activeElement), true);
        assert.equal(await page.locator('body').evaluate(el => el.style.overflow), '');
        await opener.click(); await page.locator('[data-menu-close]').click();
        await page.waitForFunction(() => document.querySelector('[data-menu-open]').getAttribute('aria-expanded') === 'false');
        await opener.click(); await page.setViewportSize({width:1440,height:1000});
        await page.waitForFunction(() => !document.querySelector('dialog').open);
        assert.equal(await page.locator('body').evaluate(el => el.style.overflow), '');
        await page.setViewportSize({width,height:844});
      }
      await page.screenshot({path:'evidence/local/navigation-' + width + '.png',fullPage:true});
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await page.setViewportSize({width:360,height:844});
    await page.locator('.brand span').evaluate(el => { el.textContent = 'A much longer creative studio name for client editing'; });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const fallback = await noJs.newPage(); await fallback.goto(BASE_URL + '/');
    assert.equal(await fallback.locator('.desktop-nav').isVisible(),true);
    assert.equal(await fallback.locator('[data-menu-open]').isVisible(),false);
    await noJs.close();
  } finally { await browser.close(); }
}
test('shared navigation: viewports, focus, Escape, scroll lock, resize, reduced motion and no-JS fallback', verifyNavigation);
