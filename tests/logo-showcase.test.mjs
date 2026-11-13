import test from 'node:test';
import assert from 'node:assert/strict';
import { launchBrowser } from './test-helper.mjs';

const BASE_URL = process.env.SITE_TEST_URL || 'http://127.0.0.1:4339';

test('logo showcase page renders and responds to user interaction', async (t) => {
  const browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await t.test('loads /logo/ successfully', async () => {
    const res = await page.goto(`${BASE_URL}/logo/`, { waitUntil: 'networkidle' });
    assert.equal(res?.status(), 200, 'Page should return 200 OK');
    const title = await page.title();
    assert.match(title, /Brand Identity, Logos & Font Options/);
  });

  await t.test('verifies all logo options and font specimen cards are rendered', async () => {
    const logoCards = await page.locator('.logo-card').count();
    assert.equal(logoCards, 8, 'Should render exactly 8 logo and lockup cards');

    const specimenCards = await page.locator('.specimen-card').count();
    assert.equal(specimenCards, 6, 'Should render 6 typography specimen cards');

    const iconCards = await page.locator('.icon-card').count();
    assert.equal(iconCards, 4, 'Should render 4 brand icon cards');
  });

  await t.test('verifies live text input updates all dynamic texts', async () => {
    const input = page.locator('#brand-text-input');
    await input.fill('Lana Studio');

    const firstPreview = await page.locator('.logo-card[data-card-id="logo-1"] .preview-content').innerText();
    assert.equal(firstPreview, 'Lana Studio');

    const uppercasePreview = await page.locator('.logo-card[data-card-id="logo-3"] .preview-content').innerText();
    assert.equal(uppercasePreview, 'LANA STUDIO');
  });

  await t.test('verifies preset buttons work', async () => {
    await page.click('.preset-btn[data-preset="LG STUDIO"]');
    const inputVal = await page.inputValue('#brand-text-input');
    assert.equal(inputVal, 'LG STUDIO');
  });

  await t.test('verifies atmosphere theme switcher', async () => {
    await page.click('.theme-pill-group .pill-btn[data-theme="theme-obsidian"]');
    let hasObsidian = await page.locator('#showcase-root').evaluate(el => el.classList.contains('theme-obsidian'));
    assert.equal(hasObsidian, true);

    await page.click('.theme-pill-group .pill-btn[data-theme="theme-gold"]');
    let hasGold = await page.locator('#showcase-root').evaluate(el => el.classList.contains('theme-gold'));
    assert.equal(hasGold, true);

    await page.click('.theme-pill-group .pill-btn[data-theme="theme-light"]');
    let hasLight = await page.locator('#showcase-root').evaluate(el => el.classList.contains('theme-light'));
    assert.equal(hasLight, true);
  });

  await t.test('verifies live preview in nav header', async () => {
    await page.click('.logo-card[data-card-id="logo-2"] .header-preview-btn');
    const navText = await page.locator('.site-header .brand .wordmark-text').innerText();
    assert.equal(navText, 'LG STUDIO');
  });

  await t.test('verifies selection summary updates', async () => {
    await page.click('.logo-card[data-card-id="logo-2"] .select-choice-btn');
    const selectedLogo = await page.locator('#selected-logo-text').innerText();
    assert.match(selectedLogo, /Option 2/);
  });

  await t.test('verifies SVG icon assets load cleanly', async () => {
    const icons = [
      '/icons/brand/monogram-seal-lg.svg',
      '/icons/brand/stamp-authenticity.svg',
      '/icons/brand/wordmark-symbol-lg.svg',
      '/icons/brand/artist-palette-mark.svg'
    ];
    for (const iconPath of icons) {
      const res = await page.request.get(`${BASE_URL}${iconPath}`);
      assert.equal(res.status(), 200, `${iconPath} should be accessible`);
    }
  });

  // Capture screenshot of the showcase page in the artifact directory
  await page.screenshot({ 
    path: 'C:/Users/K INISH KUMAR/.gemini/antigravity/brain/14a63eca-fddb-4a4f-9600-1b4d0402dea4/logo-showcase-desktop.png',
    fullPage: false 
  });

  // Switch to Gold Leaf and capture another screenshot
  await page.click('.theme-pill-group .pill-btn[data-theme="theme-gold"]');
  await page.waitForTimeout(400);
  await page.screenshot({ 
    path: 'C:/Users/K INISH KUMAR/.gemini/antigravity/brain/14a63eca-fddb-4a4f-9600-1b4d0402dea4/logo-showcase-gold.png',
    fullPage: false 
  });

  // Scroll to Typography specimens
  await page.locator('#fonts').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ 
    path: 'C:/Users/K INISH KUMAR/.gemini/antigravity/brain/14a63eca-fddb-4a4f-9600-1b4d0402dea4/logo-showcase-specimens.png',
    fullPage: false 
  });

  // Scroll to Icons section
  await page.locator('#icons').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ 
    path: 'C:/Users/K INISH KUMAR/.gemini/antigravity/brain/14a63eca-fddb-4a4f-9600-1b4d0402dea4/logo-showcase-icons.png',
    fullPage: false 
  });

  await browser.close();
});
