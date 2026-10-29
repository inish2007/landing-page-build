/**
 * Automated Content & Asset Validator
 * Local artist portfolio
 *
 * Validates the 5 centralized JSON content schemas:
 * - JSON syntax & structural integrity
 * - Chrome copy keys (common, nav, footer, contact)
 * - Component name whitelist in pages.json
 * - Image file existence on disk, positive dimensions, and valid focal percentages
 * - Cross-referenced text and image keys across all content files
 *
 * Exits with code 0 on success; exits with code 1 with actionable diagnostics on error.
 */

import site from '../src/config/site.ts';
import { createThemeCss } from '../src/config/theme.ts';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

/**
 * Whitelist of supported Astro section components.
 */
export const COMPONENT_WHITELIST = [
  'HeroSection',
  'StatementSection',
  'SelectedWorkSection',
  'ContactCtaSection',
  'EditorialHeader',
  'BiographySection',
  'PhilosophyGrid',
  'ProcessStep',
  'Gallery',
  'ContactForm',
];

/**
 * Required chrome copy keys in text.en.json.
 */
export const REQUIRED_CHROME_KEYS = [
  'common.siteName',
  'common.skipToContent',
  'common.menuOpenLabel',
  'common.menuCloseLabel',
  'common.scrollDown',
  'common.backToTop',
  'common.statusIndicator',
  'nav.home',
  'nav.about',
  'nav.process',
  'nav.work',
  'nav.contact',
  'footer.colophonLabel',
  'footer.privacyLabel',
  'footer.copyright',
];

/**
 * Resolves a dot-notation path into a nested JavaScript object.
 *
 * @param {object} obj - The root object to search
 * @param {string} keyPath - Dot-separated key path (e.g. 'common.siteName')
 * @returns {*} The resolved value, or undefined if not found
 */
export function resolvePath(obj, keyPath) {
  if (!obj || typeof obj !== 'object' || !keyPath) {
    return undefined;
  }
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * Validates root chrome copy keys in text.en.json.
 *
 * @param {object} textData - Parsed text.en.json object
 * @returns {Array<string>} Array of error messages, empty if all valid
 */
export function validateChromeKeys(textData) {
  const errors = [];
  for (const key of REQUIRED_CHROME_KEYS) {
    const val = resolvePath(textData, key);
    if (val === undefined || val === null || val === '') {
      errors.push(`Missing or empty required chrome copy key: "${key}"`);
    }
  }
  return errors;
}

/**
 * Validates section components in pages.json against the component whitelist.
 *
 * @param {object} pagesData - Parsed pages.json object
 * @returns {Array<string>} Array of error messages, empty if all valid
 */
export function validateComponentWhitelist(pagesData) {
  const errors = [];
  if (!pagesData || typeof pagesData !== 'object') {
    errors.push('pages.json is not a valid object');
    return errors;
  }

  for (const [pageId, pageConfig] of Object.entries(pagesData)) {
    if (!pageConfig || !Array.isArray(pageConfig.sections)) {
      errors.push(`Page "${pageId}" is missing a valid "sections" array`);
      continue;
    }
    for (const [idx, section] of pageConfig.sections.entries()) {
      if (!section.component) {
        errors.push(`Page "${pageId}" section #${idx} (id: "${section.id || 'unknown'}") is missing "component"`);
      } else if (!COMPONENT_WHITELIST.includes(section.component)) {
        errors.push(
          `Page "${pageId}" section #${idx} has unauthorized component "${section.component}". Allowed: [${COMPONENT_WHITELIST.join(', ')}]`
        );
      }
    }
  }
  return errors;
}

/**
 * Validates image metadata in images.json including existence on disk, dimensions, and focal points.
 *
 * @param {object} imageData - Parsed images.json object
 * @param {string} rootDir - Workspace root directory path
 * @returns {Array<string>} Array of error messages, empty if all valid
 */
export function validateImageMetadata(imageData, rootDir = PROJECT_ROOT) {
  const errors = [];
  const percentRegex = /^\d{1,3}%\s+\d{1,3}%$/;

  if (!imageData || typeof imageData !== 'object') {
    errors.push('images.json is not a valid object');
    return errors;
  }

  for (const [imageKey, meta] of Object.entries(imageData)) {
    if (!meta || typeof meta !== 'object') {
      errors.push(`Image key "${imageKey}" is not a valid metadata object`);
      continue;
    }

    // Source path & disk existence
    if (!meta.src || typeof meta.src !== 'string') {
      errors.push(`Image key "${imageKey}" is missing a valid "src" path`);
    } else {
      const diskPath = path.join(rootDir, 'public', meta.src.replace(/^\//, ''));
      if (!fs.existsSync(diskPath)) {
        errors.push(`Image key "${imageKey}" references file not found on disk: "${diskPath}"`);
      }
    }

    // Alt text
    if (!meta.alt || typeof meta.alt !== 'string' || meta.alt.trim() === '') {
      errors.push(`Image key "${imageKey}" is missing descriptive "alt" text`);
    }

    // Dimensions
    if (!Number.isInteger(meta.width) || meta.width <= 0) {
      errors.push(`Image key "${imageKey}" has invalid width: ${meta.width} (must be positive integer)`);
    }
    if (!Number.isInteger(meta.height) || meta.height <= 0) {
      errors.push(`Image key "${imageKey}" has invalid height: ${meta.height} (must be positive integer)`);
    }

    // Focal positioning format
    if (meta.position && typeof meta.position === 'object') {
      if (meta.position.desktop && !percentRegex.test(meta.position.desktop.trim())) {
        errors.push(`Image key "${imageKey}" has invalid desktop position: "${meta.position.desktop}"`);
      }
      if (meta.position.mobile && !percentRegex.test(meta.position.mobile.trim())) {
        errors.push(`Image key "${imageKey}" has invalid mobile position: "${meta.position.mobile}"`);
      }
    }
  }

  return errors;
}

/**
 * Validates cross-referenced keys between content schemas.
 *
 * @param {object} schemas - Object containing all parsed schemas
 * @returns {Array<string>} Array of error messages, empty if all valid
 */
export function validateCrossReferences({ textData, imageData, navigationData, pagesData, artworksData }) {
  const errors = [];

  // 1. Validate pages.json references
  if (pagesData && typeof pagesData === 'object') {
    for (const [pageId, pageConfig] of Object.entries(pagesData)) {
      if (pageConfig.titleKey && resolvePath(textData, pageConfig.titleKey) === undefined) {
        errors.push(`Page "${pageId}" references non-existent titleKey: "${pageConfig.titleKey}"`);
      }
      if (pageConfig.metaDescriptionKey && resolvePath(textData, pageConfig.metaDescriptionKey) === undefined) {
        errors.push(`Page "${pageId}" references non-existent metaDescriptionKey: "${pageConfig.metaDescriptionKey}"`);
      }
      if (Array.isArray(pageConfig.sections)) {
        for (const section of pageConfig.sections) {
          if (section.imageKey && (!imageData || !imageData[section.imageKey])) {
            errors.push(`Page "${pageId}" section "${section.id}" references non-existent imageKey: "${section.imageKey}"`);
          }
          if (section.textNamespace && resolvePath(textData, section.textNamespace) === undefined) {
            errors.push(`Page "${pageId}" section "${section.id}" references non-existent textNamespace: "${section.textNamespace}"`);
          }
        }
      }
    }
  }

  // 2. Validate navigation.json references
  if (navigationData && typeof navigationData === 'object') {
    for (const area of ['header', 'footer']) {
      if (Array.isArray(navigationData[area])) {
        for (const item of navigationData[area]) {
          if (item.labelKey && resolvePath(textData, item.labelKey) === undefined) {
            errors.push(`Navigation area "${area}" item "${item.id}" references non-existent labelKey: "${item.labelKey}"`);
          }
        }
      }
    }
  }

  // 3. Validate artworks.json references
  if (Array.isArray(artworksData)) {
    for (const art of artworksData) {
      if (art.imageKey && (!imageData || !imageData[art.imageKey])) {
        errors.push(`Artwork "${art.id}" references non-existent imageKey: "${art.imageKey}"`);
      }
      if (art.captionKey && resolvePath(textData, art.captionKey) === undefined) {
        errors.push(`Artwork "${art.id}" references non-existent captionKey: "${art.captionKey}"`);
      }
    }
  }

  return errors;
}

/** Validate configured local routes, media files and gallery title references.
 * @param {object} schemas Parsed six content dictionaries.
 * @param {string} rootDir Project root.
 * @returns {string[]} Diagnostics; reads local media/font files without writing.
 */
export function validateRoutesAndMedia(schemas, rootDir = PROJECT_ROOT) {
  const errors=[];const routes=new Set(['/', '/home/', '/process/', ...Object.values(schemas.pages).map(p=>p.path).filter(Boolean)]);
  for(const [area,links] of Object.entries(schemas.navigation))for(const link of links){if(link.labelKey&&resolvePath(schemas.text,link.labelKey)===undefined)errors.push('Missing navigation label '+area+':'+link.labelKey);const destination=link.path||link.url;if(destination?.startsWith('/')){const pathname=destination.split('#')[0];if(!routes.has(pathname))errors.push('Unknown route '+destination);}}
  for(const [key,item] of Object.entries(schemas.media)){for(const field of ['src','poster'])if(!item[field]?.startsWith('/')||!fs.existsSync(path.join(rootDir,'public',item[field])))errors.push('Missing media '+key+'.'+field);if(!(item.width>0&&item.height>0))errors.push('Invalid media dimensions '+key);if(resolvePath(schemas.text,item.altKey)===undefined)errors.push('Missing media alt '+key);}
  for(const page of Object.values(schemas.pages))if(page.mediaKey&&!schemas.media[page.mediaKey])errors.push('Unknown mediaKey '+page.mediaKey);
  for(const artwork of schemas.artworks)if(resolvePath(schemas.text,artwork.titleKey)===undefined)errors.push('Missing artwork title '+artwork.id);
  for(const definition of Object.values(site.theme.typography.fonts))for(const face of definition.faces)if(!face.src.startsWith('/')||!fs.existsSync(path.join(rootDir,'public',face.src)))errors.push('Missing configured font '+face.src);
  for(const asset of [site.branding.logo?.src,site.branding.favicon,...Object.values(site.icons).map(icon=>icon.src)].filter(Boolean))if(!asset.startsWith('/')||!fs.existsSync(path.join(rootDir,'public',asset)))errors.push('Missing branding/icon asset '+asset);
  try{createThemeCss(site);}catch(error){errors.push(error.message);}
  const fonts=fs.readFileSync(path.join(rootDir,'src/styles/fonts.css'),'utf8');for(const match of fonts.matchAll(/url\("([^"\)]+)"\)/g))if(!fs.existsSync(path.join(rootDir,'public',match[1])))errors.push('Missing local font '+match[1]);
  return errors;
}

/**
 * Main content validation orchestrator.
 * Loads all schemas, runs validation suites, and logs results.
 *
 * @param {string} rootDir - Workspace root directory
 * @returns {boolean} True if all validations passed, false otherwise
 */
export function validateContent(rootDir = PROJECT_ROOT) {
  const contentDir = path.join(rootDir, 'src', 'content');
  const files = {
    text: 'text.en.json',
    images: 'images.json',
    navigation: 'navigation.json',
    pages: 'pages.json',
    artworks: 'artworks.json',
    media: 'media.json',
  };

  const parsed = {};
  const loadErrors = [];

  for (const [key, filename] of Object.entries(files)) {
    const fullPath = path.join(contentDir, filename);
    if (!fs.existsSync(fullPath)) {
      loadErrors.push(`Required content schema file missing: "${fullPath}"`);
      continue;
    }
    try {
      const raw = fs.readFileSync(fullPath, 'utf8');
      parsed[key] = JSON.parse(raw);
    } catch (err) {
      loadErrors.push(`JSON syntax error in "${filename}": ${err.message}`);
    }
  }

  if (loadErrors.length > 0) {
    console.error('❌ Content Schema Load Failures:');
    for (const err of loadErrors) {
      console.error(`  - ${err}`);
    }
    return false;
  }

  const configured = rootDir === PROJECT_ROOT ? {text:site.text,images:site.images,navigation:site.navigation,pages:site.pages,artworks:site.artworks,media:site.media} : parsed;
  const { text: textData, images: imageData, navigation: navigationData, pages: pagesData, artworks: artworksData } = configured;

  const chromeErrors = validateChromeKeys(textData);
  const componentErrors = validateComponentWhitelist(pagesData);
  const imageErrors = validateImageMetadata(imageData, rootDir);
  const crossRefErrors = validateCrossReferences({ textData, imageData, navigationData, pagesData, artworksData });

  const routeMediaErrors = validateRoutesAndMedia(configured, rootDir);
  const allErrors = [...chromeErrors, ...componentErrors, ...imageErrors, ...crossRefErrors, ...routeMediaErrors];

  if (allErrors.length > 0) {
    console.error(`\n❌ Content validation failed with ${allErrors.length} error(s):`);
    for (const err of allErrors) {
      console.error(`  - ${err}`);
    }
    return false;
  }

  console.log('✅ Content validation passed:');
  console.log(`  - 6 content schemas parsed cleanly`);
  console.log(`  - ${REQUIRED_CHROME_KEYS.length} required chrome keys verified`);
  console.log(`  - Section components verified against whitelist [${COMPONENT_WHITELIST.join(', ')}]`);
  console.log(`  - ${Object.keys(imageData).length} image assets verified on disk with positive dimensions`);
  console.log(`  - ${artworksData.length} artwork records verified with valid cross-references`);
  return true;
}

// CLI execution handling
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const success = validateContent(PROJECT_ROOT);
  if (!success) {
    process.exit(1);
  }
}
