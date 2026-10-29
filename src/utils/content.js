/**
 * Content Query Utilities
 * Aura Creative Studio
 * Centralized helpers to safely retrieve copy, image metadata, navigation structures, and page compositions.
 */

import textData from '../content/text.en.json' with { type: 'json' };
import imageData from '../content/images.json' with { type: 'json' };
import navigationData from '../content/navigation.json' with { type: 'json' };
import pagesData from '../content/pages.json' with { type: 'json' };
import artworksData from '../content/artworks.json' with { type: 'json' };

/**
 * Resolves a dot-notation path into the centralized text dictionary.
 * Supports strings, structured segment arrays, and nested copy objects.
 *
 * @param {string} keyPath - Dot-separated path to copy key (e.g. 'home.hero.subheadline')
 * @param {*} [fallback=''] - Optional fallback value if key does not resolve
 * @returns {*} The resolved value from text.en.json, or fallback
 */
export function getCopy(keyPath, fallback = '') {
  if (!keyPath || typeof keyPath !== 'string') {
    return fallback;
  }
  const parts = keyPath.split('.');
  let current = textData;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return fallback;
    }
  }
  return current !== undefined ? current : fallback;
}

/**
 * Retrieves image metadata from images.json by key.
 *
 * @param {string} imageKey - The unique identifier for the image (e.g. 'homeHero')
 * @returns {object} The image metadata object containing src, alt, width, height, position, credit
 * @throws {Error} If imageKey does not exist in images.json
 */
export function getImage(imageKey) {
  if (!imageKey || typeof imageKey !== 'string') {
    throw new Error(`getImage: Invalid or missing imageKey parameter: "${imageKey}"`);
  }
  const image = imageData[imageKey];
  if (!image) {
    throw new Error(`getImage: Image key "${imageKey}" not found in images.json`);
  }
  return image;
}

/**
 * Retrieves navigation link array for a specified site area.
 *
 * @param {'header' | 'footer' | 'social'} area - The navigation section identifier
 * @returns {Array<object>} Array of navigation link items
 */
export function getNavigation(area) {
  if (!area || typeof area !== 'string' || !navigationData[area]) {
    return [];
  }
  return navigationData[area];
}

/**
 * Retrieves page layout composition and section sequence from pages.json.
 *
 * @param {string} pageId - The route identifier (e.g. 'home', 'about', 'process', 'work', 'contact')
 * @returns {object|undefined} The page configuration object
 */
export function getPageConfig(pageId) {
  if (!pageId || typeof pageId !== 'string') {
    return undefined;
  }
  return pagesData[pageId];
}

/**
 * Retrieves all portfolio artworks or a single artwork by ID.
 *
 * @param {string} [artworkId] - Optional artwork identifier to lookup
 * @returns {Array<object>|object|undefined} Array of all artworks, or matching artwork object
 */
export function getArtworks(artworkId) {
  if (!artworkId) {
    return artworksData;
  }
  return artworksData.find((item) => item.id === artworkId);
}
