import fs from 'node:fs';
import {test} from 'node:test';import assert from 'node:assert/strict';import {launchBrowser} from './test-helper.mjs';
fs.mkdirSync('evidence/motion',{recursive:true});
const URL=process.env.SITE_TEST_URL||'http://127.0.0.1:4333';
/** Verify native preparation, a delayed decode gate and unchanged reserved geometry. */
test('strip is prepared invisible before entry, waits for decoding and settles without moving slots',async()=>{
  const browser=await launchBrowser();try{const page=await browser.newPage({viewport:{width:1440,height:900}});
    await page.addInitScript(()=>{const original=HTMLImageElement.prototype.decode;window.releaseStrip=[];HTMLImageElement.prototype.decode=function(){if(this.closest('[data-social-drop-item]'))return new Promise((resolve,reject)=>window.releaseStrip.push(()=>original.call(this).then(resolve,reject)));return original.call(this);};});
    await page.goto(URL);const strip=page.locator('.social-strip');assert.equal(await strip.getAttribute('data-social-drop-state'),'pending');
    assert.ok(await strip.locator(':scope > a').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='0')));
    const geometry=await strip.locator(':scope > a').evaluateAll(es=>es.map(e=>[e.offsetLeft,e.offsetTop,e.offsetWidth,e.offsetHeight]));
    await strip.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForFunction(()=>window.releaseStrip.length===6);
    assert.ok(await strip.locator(':scope > a').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='0'&&e.getAnimations().length===0)));
    await page.evaluate(()=>window.releaseStrip.forEach(release=>release()));await page.waitForFunction(()=>document.querySelector('.social-strip').dataset.socialDropState==='revealing');
    await page.waitForFunction(()=>!document.querySelector('.social-strip').hasAttribute('data-social-drop-state'));
    assert.deepEqual(await strip.locator(':scope > a').evaluateAll(es=>es.map(e=>[e.offsetLeft,e.offsetTop,e.offsetWidth,e.offsetHeight])),geometry);
    await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));assert.equal(await strip.getAttribute('data-social-drop-state'),null);
  }finally{await browser.close();}
});
/** Focus, backgrounding, navigation and decode failure must release even not-yet-started preparation. */
test('pending strip settles on focus, inactivity, navigation, decode rejection and timeout',async()=>{
  const browser=await launchBrowser();try{for(const mode of ['focus','hidden','pagehide','failure','timeout']){const page=await browser.newPage({viewport:{width:1440,height:900}});
    if(mode==='failure'||mode==='timeout')await page.addInitScript(mode=>{const original=HTMLImageElement.prototype.decode;HTMLImageElement.prototype.decode=function(){if(this.closest('[data-social-drop-item]'))return mode==='failure'?Promise.reject(Error('decode probe')):new Promise(()=>{});return original.call(this);};},mode);
    if(mode==='timeout')await page.route('**/*',async route=>{if(route.request().resourceType()!=='document')return route.continue();const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('--image-decode-timeout:4000','--image-decode-timeout:100')});});
    await page.goto(URL);assert.equal(await page.locator('.social-strip').getAttribute('data-social-drop-state'),'pending');
    if(mode==='focus')await page.locator('[data-social-drop-item="2"]').focus();else if(mode==='hidden')await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});else if(mode==='pagehide')await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pagehide')));else await page.locator('.social-strip').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
    await page.waitForFunction(()=>!document.querySelector('.social-strip').hasAttribute('data-social-drop-state'));
    assert.ok(await page.locator('[data-social-drop-item]').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='1'&&e.getAnimations().length===0)));await page.close();
  }}finally{await browser.close();}
});
/** Verify normal-flow caption placement and capture desktop/mobile reference images. */
test('About caption is below an unchanged photo and fits desktop/mobile without overflow',async()=>{
  const browser=await launchBrowser();try{for(const width of [1440,390]){const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});await page.goto(URL);await page.evaluate(()=>document.fonts.ready);
    const card=page.locator('.collage-about');await card.scrollIntoViewIfNeeded();await card.locator('img').evaluate(e=>e.decode());
    const values=await card.evaluate(e=>{const frame=e.querySelector('.image-frame'),h=e.querySelector('h2'),label=h.querySelector('.outlined-label');return{photo:frame.getBoundingClientRect().toJSON(),caption:h.getBoundingClientRect().toJSON(),ratio:getComputedStyle(frame).aspectRatio,position:getComputedStyle(h).position,color:getComputedStyle(label).color};});
    assert.ok(values.caption.top>=values.photo.bottom);assert.equal(values.position,'static');assert.equal(values.ratio,'4 / 3');assert.equal(values.color,'rgb(23, 23, 23)');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await card.screenshot({path:'evidence/motion/about-caption-'+width+'.png'});await page.close();
  }}finally{await browser.close();}
});
