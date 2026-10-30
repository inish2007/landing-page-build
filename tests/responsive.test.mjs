import {SITE_TEST_URL as TEST_URL} from './test-helper.mjs';
const BASE_URL = process.env.SITE_TEST_URL || TEST_URL;
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { launchBrowser, decodeImages } from './test-helper.mjs';
/** Check homepage composition, local media/fonts, editing resilience and reduced motion. @returns {Promise<void>} Launches/closes browser and writes ignored captures; requires preview port 4321. */
async function verifyResponsiveHome() {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    const errors = []; const badResponses = []; const external = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if(response.status() >= 400) badResponses.push(response.url()); });
    await page.route('**/*', route => { const url = new URL(route.request().url()); if(url.hostname !== '127.0.0.1') { external.push(url.href); return route.abort(); } return route.continue(); });
    for (const [width,height] of [[2560,1440],[1920,1080],[1440,1000],[1280,800],[768,1024],[390,844],[360,844],[430,844]]) {
      await page.setViewportSize({width,height}); await page.goto(BASE_URL + '/');
      await page.evaluate(() => document.fonts.ready); await decodeImages(page);
      assert.equal(await page.locator('.home-collaborations').evaluate(section=>{const image=section.querySelector('.image-frame').getBoundingClientRect(),bounds=section.getBoundingClientRect();return Math.abs(image.left-bounds.left)<1&&Math.abs(image.right-bounds.right)<1;}),true,'collaboration image must fill section at '+width);
      assert.equal(await page.locator('main h1').count(),1);
      assert.equal(await page.locator('main > section').count(),5);
      assert.equal(await page.locator('main img').count(),15);
      assert.equal(await page.locator('main img').evaluateAll(es=>es.every(e=>e.complete&&e.naturalWidth>0)),true);
      assert.equal(await page.evaluate(() => document.fonts.check('24px "Caveat Brush"')),true);
      assert.match(await page.locator('.brand').evaluate(e=>getComputedStyle(e).fontFamily),/Caveat Brush/);
      assert.doesNotMatch(await page.locator('.intro-copy').evaluate(e=>getComputedStyle(e).fontFamily),/Caveat Brush/);
      assert.equal(await page.locator('main').innerText().then(t=>t.includes('Aura Creative Studio')),false);
      assert.deepEqual(await page.locator('main > section').evaluateAll(es=>es.map(e=>e.id)),['hero','intro','collaborations','features','cta']);
      const overflow = await page.locator('main a, main .image-frame, .site-header, .site-footer').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.left < -1 || r.right > innerWidth+1;}).map(e=>e.className));
      assert.deepEqual(overflow,[], 'overflow at ' + width);
      await page.screenshot({path:'evidence/local/stage06-'+width+'.png',fullPage:true});
    }
    await page.setViewportSize({width:390,height:844});
    const originalRatio=await page.locator('#hero .image-frame').evaluate(e=>getComputedStyle(e).aspectRatio);
    await page.locator('#intro h2').evaluate(e=>e.textContent += ' A longer replacement passage should wrap naturally and keep the same fonts and comfortable spacing.');
    await page.locator('.brand .wordmark-text').evaluate(e=>e.textContent='A Longer Client Brand');
    assert.equal(await page.locator('#hero .image-frame').evaluate(e=>getComputedStyle(e).aspectRatio),originalRatio);
    assert.ok(await page.locator('#intro').evaluate(e=>e.scrollWidth<=e.clientWidth));
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
    assert.ok(await page.locator('main img').first().evaluate(e=>parseFloat(getComputedStyle(e).transitionDuration)<=0.00001));
    const link=page.locator('#intro a');await link.focus();assert.equal(await link.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
    assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.deepEqual(external,[]);
  } finally { await browser.close(); }
}
test('responsive homepage: eight widths, local assets, brush scope, content wrapping and reduced motion',verifyResponsiveHome);
