import {SITE_TEST_URL as TEST_URL} from './test-helper.mjs';
import fs from 'node:fs';import {execFile} from 'node:child_process';import {test} from 'node:test';import assert from 'node:assert/strict';import {createFixture} from './fixture-helper.mjs';import {launchBrowser} from './test-helper.mjs';
fs.mkdirSync('evidence/font-loading',{recursive:true});
const URL=process.env.SITE_TEST_URL||TEST_URL;
/** Reload the real preview while an intentionally different private theme builds. */
test('live preview remains unchanged while a private customization fixture builds',async()=>{
  const fixture=createFixture('preview-stability');let browser;
  try{
    fs.appendFileSync(fixture.file('src/config/site.ts'),"\nsite.theme.colors.text='#ff00ff';site.theme.typography.sizes.body='28px';site.text.common.siteName='Private Fixture Only';\n");
    browser=await launchBrowser();const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:1440,height:900}});
    async function readLive(){await page.goto(URL);await page.evaluate(()=>document.fonts.ready);return page.evaluate(()=>{const css=getComputedStyle(document.body);return{font:css.fontFamily,size:css.fontSize,color:css.color,brand:document.querySelector('.brand').getAttribute('aria-label'),gutter:getComputedStyle(document.documentElement).getPropertyValue('--page-gutter')};});}
    const baseline=await readLive();let finished=false,buildError;const build=new Promise(resolve=>execFile(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{cwd:fixture.root},error=>{buildError=error;finished=true;resolve();}));
    let reloads=0;do{assert.deepEqual(await readLive(),baseline);reloads++;}while(!finished&&reloads<12);
    await build;assert.ifError(buildError);assert.ok(reloads>=1);fixture.assertUnchanged();
    const privateUrl=await fixture.serve();await page.goto(privateUrl);assert.equal(await page.locator('.brand').getAttribute('aria-label'),'Private Fixture Only');assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).fontSize),'28px');assert.deepEqual(await readLive(),baseline);
    fs.writeFileSync('evidence/font-loading/preview-isolation.json',JSON.stringify({reloads,baseline,privateBrand:'Private Fixture Only'},null,2));
  }finally{await browser?.close();await fixture.close();}
});
