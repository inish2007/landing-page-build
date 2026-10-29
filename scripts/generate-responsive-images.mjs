/** Generate local responsive WebP derivatives from selected source images. */
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
/** Read image metadata and write width variants plus srcset entries. @returns {Promise<void>} Reads sources, writes derivative files and updates images.json; original files remain unchanged. */
async function generateResponsiveImages() {
  const file = new URL('../src/content/images.json', import.meta.url);
  const images = JSON.parse(await fs.readFile(file, 'utf8'));
  for (const image of Object.values(images)) {
    const base = image.src.replace(/\.[^.]+$/, '');
    const sources = [];
    for (const width of [480, 960, 1600]) {
      if (width > image.width) continue;
      const destination = base + '-' + width + '.webp';
      await sharp(fileURLToPath(new URL('../public' + image.src, import.meta.url))).resize({width, withoutEnlargement:true}).webp({quality:82}).toFile(fileURLToPath(new URL('../public' + destination, import.meta.url)));
      sources.push({src:destination,width});
    }
    image.sources = sources;
  }
  await fs.writeFile(file, JSON.stringify(images,null,2) + '\n');
}
await generateResponsiveImages();
