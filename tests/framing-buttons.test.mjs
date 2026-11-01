import {test} from 'node:test';import assert from 'node:assert/strict';import site from '../src/config/site.ts';import {launchBrowser,SITE_TEST_URL as URL} from './test-helper.mjs';
test('shared framing is consistent across routes, narrow widths and landscape',async()=>{const b=await launchBrowser();try{for(const width of [320,390,768,1024,1440]){const p=await b.newPage({viewport:{width,height:width===768?390:900},reducedMotion:'reduce'});for(const page of Object.values(site.pages)){await p.goto(URL+(page.path||'/'));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const frames=p.locator('.home-hero,.page-shell,.framed-section');assert.ok(await frames.count());assert.ok(await frames.evaluateAll((es,r)=>es.every(e=>getComputedStyle(e).borderTopWidth==='1px'&&getComputedStyle(e).borderTopLeftRadius===r),width<1024?'18px':'24px'));}await p.close();}}finally{await b.close();}});
test('yellow buttons lift and bold without rolling or resizing, with keyboard and reduced-motion support',async()=>{
 const b=await launchBrowser();try{
 const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto(URL);await p.evaluate(()=>document.fonts.ready);
 const button=p.locator('.hero-work'),label=button.locator('[data-button-original]');const box=await button.boundingBox();
 assert.equal(await label.evaluate(e=>getComputedStyle(e).fontWeight),'600');assert.equal(await button.locator('[data-button-reserve]').getAttribute('aria-hidden'),'true');
 await button.hover();await p.waitForTimeout(300);assert.equal(await label.evaluate(e=>getComputedStyle(e).fontWeight),'700');assert.equal(await label.evaluate(e=>getComputedStyle(e).transform),'none');assert.deepEqual(await button.boundingBox(),box);
 assert.ok(await button.locator('.jelly-text').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).f<0));
 await p.mouse.move(0,0);await p.waitForTimeout(300);assert.equal(await label.evaluate(e=>getComputedStyle(e).fontWeight),'600');
 await button.focus();assert.equal(await label.evaluate(e=>getComputedStyle(e).fontWeight),'700');assert.notEqual(await button.evaluate(e=>getComputedStyle(e).outlineStyle),'none');
 await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await button.locator('.jelly-text').evaluate(e=>getComputedStyle(e).transform),'none');assert.equal(await label.evaluate(e=>getComputedStyle(e).transform),'none');
 for(const brand of ['.brand','.footer-brand']){const e=p.locator(brand);await e.hover();assert.equal(await e.locator('.wordmark-text').evaluate(e=>getComputedStyle(e).textDecorationLine),'none');}
 await p.goto(URL+'/the-process/');const media=p.locator('[data-media-toggle]');await media.scrollIntoViewIfNeeded();await media.click();assert.equal(await media.locator('[data-button-original]').textContent(),await media.locator('[data-button-reserve]').textContent());
 await p.close();const touch=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await touch.goto(URL);assert.equal(await touch.locator('.hero-work [data-button-original]').evaluate(e=>getComputedStyle(e).fontWeight),'600');assert.equal(await touch.locator('.button-roll').count(),0);await touch.close();
 }finally{await b.close();}
});
