import fs from 'node:fs';import {test} from 'node:test';import assert from 'node:assert/strict';import {launchBrowser,enableShineForTest} from './test-helper.mjs';import site from '../src/config/site.ts';import {getFontPreloads,createThemeCss} from '../src/config/theme.ts';
const URL=process.env.SITE_TEST_URL||'http://127.0.0.1:4333';
/** Real central choices, duplicate families and opt-out must control preload markup without extra assets. */
test('font preloads follow central normal faces, deduplicate and preserve bounded block fallback',()=>{
  const config=structuredClone(site);assert.equal(getFontPreloads(config).length,3);assert.match(createThemeCss(config),/font-display:block/);
  config.theme.typography.fonts.primary=config.theme.typography.fonts.brand;config.theme.typography.fonts.secondary=config.theme.typography.fonts.brand;assert.equal(getFontPreloads(config).length,1);
  config.theme.typography.loading.preload=false;assert.deepEqual(getFontPreloads(config),[]);
});
/** Text effects must replace each other while layout/hitboxes and the permanent underline stay still. */
test('scoped text jelly replays independently of gold and background jelly without moving hitboxes',async()=>{
  const browser=await launchBrowser();try{const page=await browser.newPage({viewport:{width:1440,height:900}});await enableShineForTest(page);await page.goto(URL);await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('.desktop-nav [data-text-jelly]').count(),6);assert.equal(await page.locator('.footer-group [data-text-jelly],main h1.jelly-text').count(),0);
    for(const selector of ['.desktop-nav a:first-child','.small-link','.collage-about','.collage-press','.collage-archive','.collage-contact']){
      const owner=page.locator(selector).first();await owner.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.mouse.move(0,0);
      const box=await owner.evaluate(e=>[e.offsetLeft,e.offsetTop,e.offsetWidth,e.offsetHeight]);await (selector.startsWith('.collage-')?owner.locator('.outline-base'):owner).hover();
      await page.waitForFunction(selector=>[...document.querySelector(selector).querySelector('.jelly-text').getAnimations()].some(a=>a.effect.getTiming().duration===600),selector);
      const target=owner.locator('.jelly-text');let calls=await target.evaluate(e=>e.getAnimations().filter(a=>a.effect.getTiming().duration===600).length);assert.equal(calls,1);
      assert.deepEqual(await owner.evaluate(e=>[e.offsetLeft,e.offsetTop,e.offsetWidth,e.offsetHeight]),box);
      assert.equal(await owner.evaluate(e=>getComputedStyle(e).transform),'none');
      if(selector==='.small-link')assert.equal(await owner.locator('.process-underline').evaluate(e=>e.getAnimations().length),0);
      if(selector==='.pill-link')assert.equal(await owner.locator('.jelly-surface').evaluate(e=>e.getAnimations().some(a=>a.effect.getTiming().duration===600)),true);
      await page.mouse.move(0,0);await owner.focus();await page.waitForFunction(selector=>document.querySelector(selector+' .jelly-text').getAnimations().some(a=>a.effect.getTiming().duration===600),selector);
      await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(selector=>document.querySelector(selector+' .jelly-text').getAnimations().length===0,selector,{timeout:250});assert.equal(await target.evaluate(e=>e.getAnimations().length),0);await page.emulateMedia({reducedMotion:'no-preference'});await owner.evaluate(e=>e.blur());
    }
    const nav=page.locator('.desktop-nav a').first();await nav.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await nav.hover();await page.mouse.move(0,0);await nav.hover();assert.equal(await nav.locator('.jelly-text').evaluate(e=>e.getAnimations().filter(a=>a.effect.getTiming().duration===600).length),1);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});assert.equal(await page.locator('.jelly-text').evaluateAll(es=>es.reduce((n,e)=>n+e.getAnimations().length,0)),0);
  }finally{await browser.close();}
});
/** Touch, missing animation APIs, no JavaScript and disabled motion keep readable static text. */
test('text jelly is touch-safe and preserves focusable static fallbacks and mobile navigation',async()=>{
  const browser=await launchBrowser();try{for(const mode of ['touch','api','nojs','disabled']){const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,javaScriptEnabled:mode!=='nojs'});
    if(mode==='api')await page.addInitScript(()=>{Element.prototype.animate=undefined;});if(mode==='disabled')await page.route('**/*',async route=>{if(route.request().resourceType()!=='document')return route.continue();const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('--motion-enabled:1','--motion-enabled:0')});});await enableShineForTest(page);await page.goto(URL);
    if(mode!=='nojs'){await page.locator('[data-menu-open]').click();const link=page.locator('#mobile-drawer nav a').first();await link.evaluate(e=>e.dispatchEvent(new PointerEvent('pointerover',{bubbles:true,pointerType:'touch'})));assert.equal(await link.locator('.jelly-text').evaluate(e=>e.getAnimations().filter(a=>a.effect.getTiming().duration===600).length),0);if(mode==='touch'){await link.focus();assert.equal(await link.locator('.jelly-text').evaluate(e=>e.getAnimations().some(a=>a.effect.getTiming().duration===600)),true);}}
    assert.ok(await page.locator('.jelly-text').evaluateAll(es=>es.every(e=>getComputedStyle(e).color!=='rgba(0, 0, 0, 0)')));await page.close();
  }}finally{await browser.close();}
});
/** Capture native cold/warm screencast frames; delay/fail fonts without hiding the page or changing CSS tokens. */
test('cold/warm loads keep configured styles; font errors leave readable content and reserved branding',async()=>{
  const browser=await launchBrowser();try{fs.mkdirSync('evidence/font-loading',{recursive:true});const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();const session=await context.newCDPSession(page);let mode='cold',index=0;const frames=[];
    session.on('Page.screencastFrame',event=>{const file='evidence/font-loading/'+mode+'-'+String(index++).padStart(3,'0')+'.jpg';fs.writeFileSync(file,Buffer.from(event.data,'base64'));frames.push({file,mode,timestamp:event.metadata.timestamp});void session.send('Page.screencastFrameAck',{sessionId:event.sessionId}).catch(()=>{});});
    await session.send('Page.startScreencast',{format:'jpeg',quality:70,maxWidth:1440,maxHeight:900,everyNthFrame:1});
    const signatures=[];for(const load of ['cold','warm']){mode=load;index=0;if(load==='cold'){await enableShineForTest(page);await page.goto(URL);}else await page.reload();await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('link[rel="preload"][as="font"]').count(),3);signatures.push(await page.evaluate(()=>{const s=getComputedStyle(document.body),r=getComputedStyle(document.documentElement),b=document.querySelector('.wordmark-box');return{font:s.fontFamily,size:s.fontSize,color:s.color,gutter:r.getPropertyValue('--page-gutter'),brand:[b.offsetWidth,b.offsetHeight]};}));await page.waitForTimeout(150);await page.screenshot({path:'evidence/font-loading/'+load+'-settled.png'});}
    await session.send('Page.stopScreencast');assert.deepEqual(signatures[0],signatures[1]);fs.writeFileSync('evidence/font-loading/frames.json',JSON.stringify({frames,signatures},null,2));await context.close();
    for(const failure of [false,true]){const p=await browser.newPage({viewport:{width:390,height:844}});await p.route('**/fonts/*',async route=>{if(failure)return route.abort();await new Promise(resolve=>setTimeout(resolve,700));await route.continue();});await p.goto(URL);await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>!document.querySelector('.brand [data-shining]'));assert.equal(await p.locator('body').evaluate(e=>getComputedStyle(e).visibility),'visible');assert.equal(await p.locator('.wordmark-text').first().evaluate(e=>getComputedStyle(e).color),'rgb(23, 23, 23)');assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:'evidence/font-loading/'+(failure?'failed':'delayed')+'-mobile.png'});await p.close();}
  }finally{await browser.close();}
});

/** Moving from a photograph onto its caption must start the effect, not consume it early. */
test('caption hover and visibility belong to the lettering rather than its photograph',async()=>{
 const browser=await launchBrowser();try{const page=await browser.newPage({viewport:{width:1440,height:900}});await enableShineForTest(page);await page.goto(URL);const card=page.locator('.collage-about'),label=card.locator('.jelly-text');await card.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForFunction(()=>!document.querySelector('.collage-about .outline-sweep[data-shining]'));await card.locator('img').hover();assert.equal(await label.evaluate(e=>e.getAnimations().filter(a=>a.effect.getTiming().duration===600).length),0);await card.locator('.outline-base').hover();assert.equal(await label.evaluate(e=>e.getAnimations().filter(a=>a.effect.getTiming().duration===600).length),1);await card.locator('img').hover();assert.equal(await label.evaluate(e=>e.getAnimations().filter(a=>a.effect.getTiming().duration===600).length),0);
 await label.evaluate(e=>scrollTo({top:scrollY+e.getBoundingClientRect().bottom-innerHeight-100,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('.collage-about').dataset.glowVisible==='false');assert.equal(await label.evaluate(e=>getComputedStyle(e).animationName),'none');assert.equal(await card.locator('.outline-sweep').evaluate(e=>e.getAnimations().length),0);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('.collage-about').dataset.glowVisible==='false');await card.focus();await page.waitForFunction(()=>document.querySelector('.collage-about .outline-sweep').getAnimations().some(a=>a.effect.getTiming().duration===1000));await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.collage-about .outline-sweep').getAnimations().length===0,null,{timeout:250});assert.equal(await card.locator('.outline-sweep').evaluate(e=>e.getAnimations().length),0);
 }finally{await browser.close();}
});
