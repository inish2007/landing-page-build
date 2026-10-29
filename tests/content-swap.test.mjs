import fs from 'node:fs';

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { launchBrowser } from './test-helper.mjs';
import {createFixture} from './fixture-helper.mjs';
/** Verify dictionary/image edits in an isolated source/output/server fixture. */
async function verifyContentSwap(){
  const fixture=createFixture('content-swap');
  const paths=['text.en.json','images.json','navigation.json','pages.json','artworks.json','media.json'].map(p=>fixture.file('src/content/'+p));
  const backups=new Map(paths.map(p=>[p,fs.readFileSync(p)]));let browser;
  try{
    const text=JSON.parse(backups.get(paths[0]));text.common.siteName='Independent Creative Studio';text.home.statement.statementSegments.push({text:' A longer editable passage checks natural wrapping while preserving the chosen typography.'});fs.writeFileSync(paths[0],JSON.stringify(text,null,2));
    const images=JSON.parse(backups.get(paths[1]));images.homeHero={...images.homeHero,src:'/media/video-placeholder-poster.png',width:1160,height:653,alt:'Temporary source-swap test.'};fs.writeFileSync(paths[1],JSON.stringify(images,null,2));fixture.build();const BASE_URL=await fixture.serve();
    browser=await launchBrowser();const page=await browser.newPage({viewport:{width:360,height:844},reducedMotion:'reduce'});await page.goto(BASE_URL + '/');await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('.brand .wordmark-text').textContent(),'Independent Creative Studio');assert.match(await page.locator('#intro').innerText(),/longer editable passage/);assert.equal(await page.locator('#hero img').getAttribute('src'),'/media/video-placeholder-poster.png');
    assert.equal(await page.locator('#hero .image-frame').evaluate(e=>getComputedStyle(e).aspectRatio),'4 / 5');assert.match(await page.locator('.brand').evaluate(e=>getComputedStyle(e).fontFamily),/Caveat Brush/);
    assert.ok(await page.locator('.site-header').evaluate(e=>e.scrollWidth<=e.clientWidth));
  }finally{await browser?.close();await fixture.close();}
}
test('source content/image edits preserve typography, ratio, wrapping and leave live source and preview unchanged',verifyContentSwap);
