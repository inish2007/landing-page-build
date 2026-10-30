import fs from 'node:fs';import {test} from 'node:test';import assert from 'node:assert/strict';
import site from '../src/config/site.ts';import {assertSafeLinkUrl,assertLocalAssetPath,validateSiteUrls} from '../src/utils/urls.ts';
import {createFixture} from './fixture-helper.mjs';import {launchBrowser} from './test-helper.mjs';
const URL=process.env.SITE_TEST_URL||'http://127.0.0.1:4333';

test('configured links allow expected destinations and reject executable or ambiguous schemes',()=>{
 for(const value of ['/', '/about/','#top','/about/?source=nav#intro','https://example.com/art','http://localhost:4321/','mailto:studio@example.com'])assert.equal(assertSafeLinkUrl(value),value);
 for(const value of ['javascript:alert(1)','JaVaScRiPt:alert(1)','java\nscript:alert(1)','\tjavascript:alert(1)','data:text/html,<script>alert(1)</script>','vbscript:msgbox(1)','file:///C:/Windows/','//example.com','/\\example.com','/%2fexample.com','https:example.com','https://user:pass@example.com','mailto:studio@example.com?bcc=other@example.com','mailto:studio%0a@example.com','/%ZZ','',null])assert.throws(()=>assertSafeLinkUrl(value),undefined,String(value));
});

test('local assets cannot become remote requests or traverse outside public',()=>{
 for(const value of ['/images/artwork.webp','/icons/instagram.svg','/fonts/brand.woff2','/images/my%20art.webp'])assert.equal(assertLocalAssetPath(value),value);
 for(const value of ['https://example.com/image.png','//example.com/image.png','data:image/svg+xml,abc','../secret','/../secret','/%2e%2e/secret','/images/../../secret','/images/%2fsecret','/images/%5csecret','/image.png?x=1','/image.png#x','/%00.png','/%ZZ'])assert.throws(()=>assertLocalAssetPath(value),undefined,value);
});

test('central URL checks cover editorial links, all navigation groups, mail, branding, fonts and media',()=>{
 assert.deepEqual(validateSiteUrls(site),[]);
 for(const [context,mutate]of [
 ['text.editorial.about.links',c=>c.text.editorial.about.links=[{label:'Unsafe',href:'javascript:void(0)'}]],
 ['navigation.social',c=>c.navigation.social[0].url='data:text/html,unsafe'],
 ['navigation.header',c=>c.navigation.header[0].path='javascript:void(0)'],
 ['text.contact.email',c=>c.text.contact.email='studio@example.com?bcc=other@example.com'],
 ['branding.favicon',c=>c.branding.favicon='//remote.example/icon.svg'],
 ['images.homeHero',c=>c.images.homeHero.src='/../private.png'],
 ['media.processVideo',c=>c.media.processVideo.poster='https://remote.example/a.png'],
 ['fonts.primary',c=>c.theme.typography.fonts.primary.faces[0].src='https://remote.example/font.woff2'],
 ['links.home',c=>c.links.home='javascript:void(0)']
 ]){const config=structuredClone(site);mutate(config);assert.ok(validateSiteUrls(config).some(error=>error.includes(context)),context);}
});

test('malicious content fails both validation and direct Astro build in an isolated fixture',async()=>{
 const fixture=createFixture('unsafe-link-after');try{const file=fixture.file('src/content/text.en.json');const text=JSON.parse(fs.readFileSync(file));text.editorial.about.links=[{label:'Harmless regression probe',href:'javascript:document.documentElement.dataset.linkProbe="executed";void(0)'}];fs.writeFileSync(file,JSON.stringify(text));
 for(const args of [['scripts/validate-content.mjs'],['node_modules/astro/bin/astro.mjs','build']]){let rejected=false;try{fixture.run(args)}catch(error){rejected=true;assert.match(String(error.stdout)+String(error.stderr),/text\.editorial\.about\.links\.0\.href/)}assert.equal(rejected,true,'unsafe build must fail: '+args.join(' '));}fixture.assertUnchanged();
 }finally{await fixture.close()}
});

test('URL/hash and contact-field HTML remain inert, with no submission or input storage',async()=>{
 const browser=await launchBrowser();try{const page=await browser.newPage({reducedMotion:'reduce'});const requests=[];page.on('request',r=>requests.push({url:r.url(),method:r.method()}));const payload='<img src=x onerror="document.documentElement.dataset.inputProbe=1">';await page.goto(URL+'/contact/?q='+encodeURIComponent(payload)+'#'+encodeURIComponent(payload));const scriptCount=await page.locator('script').count();await page.locator('[name="name"]').fill(payload);await page.locator('[name="email"]').fill('tester@example.test');await page.locator('[name="message"]').fill('</textarea><script>document.documentElement.dataset.inputProbe=1</script>');await page.locator('[data-contact-submit]').click();assert.equal(await page.locator('[data-contact-status]').textContent(),site.text.contact.success);assert.equal(await page.evaluate(()=>document.documentElement.dataset.inputProbe),undefined);assert.equal(await page.locator('img[onerror]').count(),0);assert.equal(await page.locator('script').count(),scriptCount);assert.ok(requests.every(r=>r.method==='GET'));assert.deepEqual(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookies:document.cookie})),{local:0,session:0,cookies:''});
 }finally{await browser.close()}
});
