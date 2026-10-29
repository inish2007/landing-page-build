import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
/** Fingerprint real source/output so fixture builds cannot silently alter the visible preview. */
export function liveFingerprint(){
  const hash=createHash('sha256');
  function visit(directory){if(!fs.existsSync(directory))return;for(const item of fs.readdirSync(directory,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const file=path.join(directory,item.name);if(item.isDirectory())visit(file);else{hash.update(file);hash.update(fs.readFileSync(file));}}}
  visit('src');visit('dist');return hash.digest('hex');
}
/** Copy editable inputs into an ignored private root; never build or edit the working project. */
export function createFixture(name){
  const original=liveFingerprint();fs.mkdirSync('evidence/fixtures',{recursive:true});
  const root=fs.mkdtempSync(path.resolve('evidence/fixtures',name+'-'));
  for(const directory of ['src','public','scripts'])fs.cpSync(directory,path.join(root,directory),{recursive:true});
  for(const file of ['astro.config.mjs','package.json','tsconfig.json'])fs.copyFileSync(file,path.join(root,file));
  fs.symlinkSync(path.resolve('node_modules'),path.join(root,'node_modules'),'junction');
  let server;
  const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.gif':'image/gif','.woff2':'font/woff2','.ttf':'font/ttf'};
  return {
    root,
    file(relative){return path.join(root,relative);},
    run(args){execFileSync(process.execPath,args,{cwd:root,stdio:'pipe'});},
    build(){for(const args of [['scripts/validate-content.mjs'],['node_modules/astro/bin/astro.mjs','build'],['scripts/prune-unused-assets.mjs'],['scripts/audit-build.mjs']])this.run(args);this.assertUnchanged();},
    assertUnchanged(){assert.equal(liveFingerprint(),original,'fixture must leave working source and live dist byte-identical');},
    async serve(){
      const output=path.join(root,'dist');
      server=http.createServer((request,response)=>{try{let file=path.resolve(output,'.'+decodeURIComponent(new URL(request.url,'http://localhost').pathname));const relative=path.relative(output,file);if(relative.startsWith('..')||path.isAbsolute(relative))throw Error('Outside fixture');if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');response.end(fs.readFileSync(file));}catch{response.writeHead(404);response.end();}});
      await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
      return 'http://127.0.0.1:'+server.address().port;
    },
    async close(){if(server)await new Promise(resolve=>server.close(resolve));this.assertUnchanged();}
  };
}
