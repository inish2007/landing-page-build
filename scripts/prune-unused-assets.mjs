/** Remove inactive image copies from production output; preserve all source originals. */
import site from '../src/config/site.ts';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
/** Filter dist/images to active configured image paths. @returns {number} Removed file count; deletes only resolved files inside dist/images. */
export function pruneUnusedAssets(){
  const root=path.resolve('dist/images');const images=site.images;const keep=new Set();for(const image of Object.values(images)){keep.add(path.resolve('dist'+image.src));for(const source of image.sources||[])keep.add(path.resolve('dist'+source.src));}
  for(const media of Object.values(site.media))for(const file of [media.src,media.poster])keep.add(path.resolve('dist'+file));
  if(site.branding.logo)keep.add(path.resolve('dist'+site.branding.logo.src));
  for(const icon of Object.values(site.icons))if(icon.src)keep.add(path.resolve('dist'+icon.src));
  if(site.branding.favicon)keep.add(path.resolve('dist'+site.branding.favicon));
  let removed=0;
  /** Walk a resolved output directory. @param {string} directory Absolute directory inside image output. @returns {void} Removes inactive files only. */
  function visitImages(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const target=path.resolve(directory,entry.name);const relative=path.relative(root,target);if(relative.startsWith('..')||path.isAbsolute(relative))throw new Error('Image output path escaped');if(entry.isDirectory())visitImages(target);else if(!keep.has(target)){fs.unlinkSync(target);removed++;}}}
  if(fs.existsSync(root))visitImages(root);return removed;
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log('Pruned inactive production image copies: '+pruneUnusedAssets());
