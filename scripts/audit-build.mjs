/** Audit built output, route links, media paths and private-file exclusion. */
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
/** Inspect static output without external requests. @returns {{routes:number,files:number}} Counts; throws useful errors on invalid output. */
export function auditBuild(){const root=path.resolve('dist');const errors=[];const files=[];
  /** Collect generated files. @param {string} dir Directory. @returns {void} Reads filesystem only. */
  function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())walk(p);else files.push(p);}}
  walk(root);let routes=0;
  for(const file of files){const relative=path.relative(root,file).replaceAll('\\','/');if(/(?:AGENT|HANDOFF|implementation.plan|evidence|\.map$)/i.test(relative))errors.push('Private artifact: '+relative);if(!/\.(html|js|css)$/.test(file))continue;const content=fs.readFileSync(file,'utf8');if(/googletagmanager|google-analytics|connect\.facebook\.net|squarespace\.com\/universal\/scripts/i.test(content))errors.push('Hosted runtime/tracking: '+relative);
    if(file.endsWith('.html')){routes++;for(const match of content.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)){const url=match[1];const target=path.join(root,url);if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html')))errors.push(relative+' missing local destination '+url);}}
  }
  const images=JSON.parse(fs.readFileSync('src/content/images.json'));for(const image of Object.values(images)){if(image.src!=='/images/client-placeholder.png')errors.push('Dark image override lost');}
  const media=JSON.parse(fs.readFileSync('src/content/media.json'));for(const item of Object.values(media))for(const key of ['src','poster'])if(!fs.existsSync(path.join(root,item[key])))errors.push('Missing media '+item[key]);
  if(errors.length)throw new Error(errors.join('\n'));return{routes,files:files.length};
}
if(process.argv[1]===fileURLToPath(import.meta.url))console.log(JSON.stringify(auditBuild()));
