import type {SiteConfiguration} from '../config/site';
import type {ImageAsset,PageConfiguration,NavigationLink} from '../config/types';
type UrlConfiguration=Omit<SiteConfiguration,'images'|'pages'|'navigation'> & {images:Record<string,ImageAsset>;pages:Record<string,PageConfiguration>;navigation:Record<string,NavigationLink[]>};

/** Accept navigation destinations, never executable schemes, protocol-relative URLs or control-character tricks. */
export function assertSafeLinkUrl(value:unknown,context='link'):string {
  const fail=()=>{throw new Error(context+': use a site-relative path, fragment, HTTP(S) URL or plain mailto address');};
  if(typeof value!=='string'||!value||/[\\\u0000-\u0020\u007f]/.test(value))return fail();
  if(value.startsWith('#'))return value;
  if(value.startsWith('/')){if(value.startsWith('//')||/%(?:2f|5c|0[0-9a-f]|1[0-9a-f]|7f)/i.test(value))return fail();let pathname;try{pathname=decodeURIComponent(new URL(value,'https://site.invalid').pathname);}catch{return fail();}if(pathname.split('/').some(part=>part==='.'||part==='..'))return fail();return value;}
  let url:URL;try{url=new URL(value);}catch{return fail();}
  if((url.protocol==='https:'||url.protocol==='http:')&&/^https?:\/\//i.test(value)&&url.hostname&&!url.username&&!url.password)return value;
  if(url.protocol==='mailto:'&&!url.search&&!url.hash){let address;try{address=decodeURIComponent(url.pathname);}catch{return fail();}if(/^[^@\s<>?,;:]+@[^@\s<>?,;:]+\.[^@\s<>?,;:]+$/.test(address))return value;}
  return fail();
}

/** Local asset paths cannot fetch remote resources or escape public through dot segments/encoded separators. */
export function assertLocalAssetPath(value:unknown,context='asset'):string {
  const fail=()=>{throw new Error(context+': use a local /path inside public without traversal, query or fragment');};
  if(typeof value!=='string'||!value.startsWith('/')||value.startsWith('//')||/[\\?#\u0000-\u0020\u007f]/.test(value)||/%(?:2f|5c)/i.test(value))return fail();
  let decoded;try{decoded=decodeURIComponent(value);}catch{return fail();}
  if(/[\\\u0000-\u001f\u007f]/.test(decoded)||decoded.split('/').some(part=>part==='.'||part==='..'))return fail();
  return value;
}

/** Check every configured URL consumed by markup. Returns contextual diagnostics; no content mutation or I/O. */
export function validateSiteUrls(config:UrlConfiguration):string[] {
  const errors:string[]=[];
  const check=(value:unknown,context:string,asset=false)=>{try{(asset?assertLocalAssetPath:assertSafeLinkUrl)(value,context);}catch(error){errors.push((error as Error).message);}};
  const textLinks=(value:unknown,context:string)=>{if(!value||typeof value!=='object')return;for(const[key,child]of Object.entries(value)){const at=context+'.'+key;if(key==='href'||key==='url')check(child,at);else textLinks(child,at);}};
  textLinks(config.text,'text');check('mailto:'+config.text.contact.email,'text.contact.email');
  for(const[area,links]of Object.entries(config.navigation))for(const[index,link]of links.entries())for(const key of ['path','url'] as const)if(link[key]!==undefined)check(link[key],`navigation.${area}.${index}.${key}`);
  for(const[key,value]of Object.entries(config.links))check(value,'links.'+key);
  for(const[key,page]of Object.entries(config.pages))if(page.path!==undefined){check(page.path,'pages.'+key+'.path');if(!page.path.startsWith('/')||page.path.startsWith('//'))errors.push('pages.'+key+'.path: use a local route');}
  for(const[key,image]of Object.entries(config.images)){check(image.src,'images.'+key+'.src',true);for(const[index,source]of(image.sources||[]).entries())check(source.src,`images.${key}.sources.${index}.src`,true);}
  for(const[key,media]of Object.entries(config.media))for(const field of ['src','poster'] as const)check(media[field],`media.${key}.${field}`,true);
  if(config.branding.logo)check(config.branding.logo.src,'branding.logo.src',true);
  if(config.branding.favicon)check(config.branding.favicon,'branding.favicon',true);
  for(const[key,icon]of Object.entries(config.icons))if(icon.src)check(icon.src,'icons.'+key+'.src',true);
  for(const[key,font]of Object.entries(config.theme.typography.fonts))for(const[index,face]of font.faces.entries())check(face.src,`fonts.${key}.${index}.src`,true);
  return errors;
}
