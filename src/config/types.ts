/** Shared configuration contracts. Content stays in canonical JSON dictionaries imported by site.ts. */
export interface ImageAsset { src: string; alt: string; width: number; height: number; fit?: string; position?: { desktop?: string; mobile?: string }; credit?: string; sources?: {src:string;width:number}[] }
export interface MediaAsset { src:string; poster:string; width:number; height:number; altKey:string; source?:string; license?:string }
export interface NavigationLink { id:string; path?:string; url?:string; labelKey:string; isExternal?:boolean }
export interface FontFace { src:string; format:string; weight:string; style:'normal'|'italic' }
export interface FontDefinition { family:string; fallback:string; faces:FontFace[] }
export interface TextSegment { text:string; emphasis?:string; highlight?:string }
export interface EditorialBlock { tag:string; text:string; highlight?:'press-marker' }
export interface EditorialCopy { title:string; blocks:EditorialBlock[]; links?:{label:string;href:string}[] }
export interface PageSection { id:string; component:string; imageKey?:string; textNamespace?:string }
export interface PageConfiguration { path?:string; titleKey:string; kind?:string; textNamespace?:string; imageCount?:number; imageKeys?:string[]; collection?:string; mediaKey?:string; sections:PageSection[]; metaDescriptionKey?:string }
export interface Artwork { id:string; collection:string; titleKey:string; captionKey:string; imageKey:string; order:number }
export interface SiteTheme {
  colors: Record<'aboutFill'|'aboutOutline'|'aboutShadow'|'plaque'|'plaqueText'|'goldDark'|'goldMid'|'goldLight'|'circle'|'primary'|'secondary'|'background'|'surface'|'text'|'border'|'accentText'|'focus'|'subtleBackground'|'onMedia'|'shadow'|'overlay'|'modalOverlay',string>;
  typography: { loading:{preload:boolean;display:'block'|'swap'|'fallback'|'optional'}; fonts:Record<'primary'|'secondary'|'brand'|'footer',FontDefinition>; sizes:Record<'labelStroke'|'aboutStroke'|'plaquePadding'|'footer'|'processLink'|'brand'|'display'|'statement'|'h1'|'h2'|'body'|'caption'|'nav'|'root',string>; weights:Record<'navigation'|'regular'|'heading'|'brand'|'strong',string>; lineHeights:Record<'footer'|'body'|'heading'|'display'|'brand',string>; tracking:Record<'heading'|'editorial',string> };
  pressLinks:{normalThickness:number;hoverThickness:number;duration:number};
  pressMarker:{color:string;opacity:number;thickness:number;overhang:number;edgeCurve:number;duration:number;stagger:number};
  spacing:Record<'1'|'2'|'3'|'4'|'5'|'6',string>;
  layout: { maxWidth:string; narrowWidth:string; pageGutter:string };
  motion: { enabled:boolean; pageTransitions:boolean; entryDuration:number; entryStagger:number; maxStagger:number; maxConcurrent:number; dialogOpen:number; dialogClose:number; pageDuration:number; fast:string; standard:string; easing:string; playful:{enabled:boolean;labelGlowDuration:number;labelGlowLow:number;labelGlowHigh:number;aboutGlowDuration:number;jellyDuration:number;shineDuration:number;jellyWide:number;jellyNarrow:number;socialDrop:{enabled:boolean;duration:number;stagger:number;distance:number;alternateOnLoad:boolean};imageRevealDuration:number;imageNearDistance:number;imageDecodeTimeout:number;imageHoverDuration:number;imageEasing:string;circleDrawDuration:number;hoverDuration:number;cardLift:number;cardTilt:number;cardScale:number;pressScale:number;arrowTravel:number;revealTravel:number;accentDuration:number} };
}
