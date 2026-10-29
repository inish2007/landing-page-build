import site from '../config/site';
import type { SiteText } from '../config/site';
import type { ImageAsset, NavigationLink, PageConfiguration, Artwork } from '../config/types';
type CopyPath<T> = T extends readonly unknown[] ? never : { [K in keyof T & string]: T[K] extends object ? K | `${K}.${CopyPath<T[K]>}` : K }[keyof T & string];
type CopyAt<T,P extends string> = P extends `${infer K}.${infer R}` ? K extends keyof T ? CopyAt<T[K],R> : never : P extends keyof T ? T[P] : never;
/** Resolve canonical text, structured segments or objects. Known literal paths infer their exact result; dynamic namespaces may supply a type. Pure lookup with optional fallback. */
export function getCopy<P extends CopyPath<SiteText>>(keyPath:P):CopyAt<SiteText,P>;
export function getCopy<T=string>(keyPath:string,fallback?:T):T;
export function getCopy(keyPath:string,fallback:unknown=''):unknown {
  if(!keyPath||typeof keyPath!=='string')return fallback;
  let value:unknown=site.text;
  for(const part of keyPath.split('.')){if(value&&typeof value==='object'&&part in value)value=(value as Record<string,unknown>)[part];else return fallback;}
  return value===undefined?fallback:value;
}
/** Retrieve validated local image metadata. @param imageKey Canonical key. @returns Image metadata; throws for missing keys, no writes. */
export function getImage(imageKey:string|undefined):ImageAsset {if(!imageKey||!(imageKey in site.images))throw new Error('getImage: Unknown image key '+imageKey);return (site.images as Record<string,ImageAsset>)[imageKey];}
/** Read a configured navigation group. @param area Group key. @returns Canonical links or empty array; no writes. */
export function getNavigation(area:string):NavigationLink[]{return (site.navigation as Record<string,NavigationLink[]>)[area]||[];}
/** Read a configured page. @param pageId Page key. @returns Page configuration or undefined; no writes. */
export function getPageConfig(pageId:string):PageConfiguration|undefined{return (site.pages as Record<string,PageConfiguration>)[pageId];}
/** Read all artwork records or one record. @param artworkId Optional ID. @returns Ordered records or matching record; no writes. */
export function getArtworks():Artwork[];
export function getArtworks(artworkId:string):Artwork|undefined;
export function getArtworks(artworkId?:string):Artwork[]|Artwork|undefined{return artworkId?site.artworks.find(item=>item.id===artworkId):site.artworks;}
