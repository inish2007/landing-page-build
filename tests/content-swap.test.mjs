const BASE_URL = process.env.SITE_TEST_URL || 'http://127.0.0.1:4321';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { launchBrowser } from './test-helper.mjs';
/** Build Astro synchronously for isolated source-edit verification. @returns {void} Writes dist; throws on build/validation failure. */
function buildFixture(){execFileSync(process.execPath,['scripts/validate-content.mjs'],{stdio:'pipe'});execFileSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'pipe'});execFileSync(process.execPath,['scripts/prune-unused-assets.mjs'],{stdio:'pipe'});}
/** Verify real dictionary/image edits while preserving every original byte. @returns {Promise<void>} Temporarily writes content/builds, launches browser, restores six files and baseline output in finally. */
async function verifyContentSwap(){
  const paths=['text.en.json','images.json','navigation.json','pages.json','artworks.json','media.json'].map(p=>'src/content/'+p);
  const backups=new Map(paths.map(p=>[p,fs.readFileSync(p)]));let restored=false;
  /** Restore saved source bytes after normal/interrupt exit. @returns {void} Writes only backed-up content paths. */
  function restoreContent(){if(restored)return;for(const[p,bytes]of backups)fs.writeFileSync(p,bytes);restored=true;}
  process.once('exit',restoreContent);process.once('SIGINT',restoreContent);
  let browser;
  try{
    const text=JSON.parse(backups.get(paths[0]));text.common.siteName='Independent Creative Studio';text.home.statement.statementSegments.push({text:' A longer editable passage checks natural wrapping while preserving the chosen typography.'});fs.writeFileSync(paths[0],JSON.stringify(text,null,2));
    const images=JSON.parse(backups.get(paths[1]));images.homeHero={...images.homeHero,src:'/media/video-placeholder-poster.png',width:1160,height:653,alt:'Temporary source-swap test.'};fs.writeFileSync(paths[1],JSON.stringify(images,null,2));buildFixture();
    browser=await launchBrowser();const page=await browser.newPage({viewport:{width:360,height:844},reducedMotion:'reduce'});await page.goto(BASE_URL + '/');await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('.brand span').textContent(),'Independent Creative Studio');assert.match(await page.locator('#intro').innerText(),/longer editable passage/);assert.equal(await page.locator('#hero img').getAttribute('src'),'/media/video-placeholder-poster.png');
    assert.equal(await page.locator('#hero .image-frame').evaluate(e=>getComputedStyle(e).aspectRatio),'4 / 5');assert.match(await page.locator('.brand').evaluate(e=>getComputedStyle(e).fontFamily),/Caveat Brush/);
    assert.ok(await page.locator('.site-header').evaluate(e=>e.scrollWidth<=e.clientWidth));
  }finally{await browser?.close();restoreContent();process.removeListener('exit',restoreContent);process.removeListener('SIGINT',restoreContent);buildFixture();for(const[p,bytes]of backups)assert.deepEqual(fs.readFileSync(p),bytes);}
}
test('source content/image edits preserve typography, ratio, wrapping and restore baseline',verifyContentSwap);
