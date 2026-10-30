import {test} from 'node:test';
import assert from 'node:assert/strict';
import {launchBrowser} from './test-helper.mjs';
const URL=process.env.SITE_TEST_URL||'http://127.0.0.1:4333';

test('touch/pen link feedback clears on scrolling, re-entry and page lifecycle without consuming input',async()=>{
  const browser=await launchBrowser();
  try {
    const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    await page.goto(URL+'/about/');
    const first=page.locator('.footer-group a[data-link-feedback]').first();
    const second=page.locator('.footer-group a[data-link-feedback]').nth(1);
    const href=await first.getAttribute('href');
    const down={pointerType:'touch',isPrimary:true,button:0,pointerId:21};
    const count=()=>page.locator('[data-link-pressed]').count();
    for(const type of ['pointermove','pointercancel','pointerup']){
      await first.dispatchEvent('pointerdown',down);
      assert.equal(await count(),1);
      await first.dispatchEvent(type,{...down,clientY:30});
      assert.equal(await count(),0);
    }
    await first.dispatchEvent('pointerdown',down);
    await second.dispatchEvent('pointerdown',{...down,pointerId:22,pointerType:'pen'});
    assert.equal(await count(),1);
    assert.equal(await first.getAttribute('data-link-pressed'),null);
    assert.equal(await second.getAttribute('data-link-pressed'),'');
    await page.evaluate(()=>dispatchEvent(new Event('blur')));
    assert.equal(await count(),0);
    for(const type of ['pagehide','pageshow']){
      await first.dispatchEvent('pointerdown',down);
      await page.evaluate(type=>dispatchEvent(new PageTransitionEvent(type,{persisted:true})),type);
      assert.equal(await count(),0);
    }
    await first.dispatchEvent('pointerdown',down);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
    assert.equal(await count(),0);
    await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
    await first.dispatchEvent('pointerdown',down);
    const consumed=await first.evaluate(e=>!e.dispatchEvent(new Event('contextmenu',{bubbles:true,cancelable:true})));
    assert.equal(consumed,false);
    assert.equal(await count(),0);
    await first.dispatchEvent('pointerdown',{...down,pointerType:'mouse'});
    assert.equal(await count(),0);
    await first.dispatchEvent('pointerdown',{...down,isPrimary:false});
    assert.equal(await count(),0);
    assert.equal(await first.getAttribute('href'),href);
  } finally {await browser.close();}
});
