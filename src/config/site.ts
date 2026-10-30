/**
 * MAIN CLIENT CUSTOMIZATION ENTRY POINT.
 * Content tabs below import the canonical dictionaries: edit them, not components.
 * Theme, branding, media overrides, icons and route links are managed here.
 * See CUSTOMIZATION.md for practical examples and local font-license requirements.
 */
import text from '../content/text.en.json' with { type:'json' };
import images from '../content/images.json' with { type:'json' };
import navigation from '../content/navigation.json' with { type:'json' };
import pages from '../content/pages.json' with { type:'json' };
import artworks from '../content/artworks.json' with { type:'json' };
import media from '../content/media.json' with { type:'json' };
import type { ImageAsset, SiteTheme, PageConfiguration, NavigationLink, MediaAsset, Artwork } from './types.ts';

export const site = {
  // Canonical editable copy: headings, paragraphs, labels, buttons, credits, copyright.
  text,
  images: images satisfies Record<string,ImageAsset>,
  media: media satisfies Record<string,MediaAsset>,
  navigation: navigation satisfies Record<string,NavigationLink[]>,
  pages: pages satisfies Record<string,PageConfiguration>,
  artworks: artworks satisfies Artwork[],
  branding: {
    wordmarkScale:{width:1.3,height:1.55},
    // null preserves the current text wordmark. To enable an image, provide its metadata here.
    logo: null as ImageAsset | null,
    favicon: null as string | null,
  },
  // Optional icon assets use local paths; text symbols preserve today's appearance.
  icons: {
    instagram:{text:'Instagram',src:'/icons/instagram.svg' as string|null},
    facebook:{text:'Facebook',src:'/icons/facebook.svg' as string|null},
    menu:{text:'☰',src:null as string|null}, close:{text:'×',src:null as string|null},
    next:{text:'→',src:null as string|null}, previous:{text:'←',src:null as string|null}, external:{text:'↗',src:null as string|null},
  },
  links: { home:'/', colophon:'/colophon/', privacy:'/privacy/' },
  theme: {
    // Ordinary text links: distances/thickness in px, durations in ms. Legacy pressLinks still controls the Process SVG.
    refinement:{proseMaxWidth:'60ch',proseLineHeight:'1.6',headingGapDesktop:'56px',headingGapMobile:'40px',captionGap:'16px',galleryCaptionGap:'12px',galleryMetadataGap:'4px',fieldGap:'8px',fieldGroupGap:'24px'},
    textLinks:{underlineThickness:1,underlineDuration:180,arrowDistance:3,arrowDuration:220,pressOpacity:0.82,pressDuration:90,releaseDuration:160},
    pressLinks:{normalThickness:1,hoverThickness:3,duration:160},
    pressMarker:{color:'#fff230',opacity:0.55,thickness:28,overhang:2,edgeCurve:2,duration:900,stagger:1000},
    colors: {
      aboutFill:'#ffffff', aboutOutline:'#d4a72c', aboutShadow:'0 1px 2px #171717, 0 0 1px #171717', plaque:'#171717', plaqueText:'#ffffff', goldDark:'#8a5a00', goldMid:'#d4a72c', goldLight:'#fff0ad',
      primary:'#ffe600', circle:'#ffe600', secondary:'#545454', background:'#ffffff', surface:'#ffffff',
      text:'#171717', border:'#e6e4df', accentText:'#171717', focus:'#171717',
      subtleBackground:'#fafafa', onMedia:'white', shadow:'#000',
      overlay:'rgb(23 23 23 / .45)', modalOverlay:'rgb(0 0 0 / .7)',
    },
    typography: {
      loading:{preload:true as boolean,display:'block' as 'block'|'swap'|'fallback'|'optional'},
      fonts: {
        // Footer reference uses a plain Arial-style face; system fonts need no download.
        footer: {family:'Arial',fallback:'Helvetica, sans-serif',faces:[]},
        primary: {family:'Fraunces',fallback:'Georgia, Cambria, "Times New Roman", serif',faces:[
          {src:'/fonts/fraunces-opsz-wght.woff2',format:'woff2-variations',weight:'300 700',style:'normal'},
          {src:'/fonts/fraunces-italic-opsz-wght.woff2',format:'woff2-variations',weight:'300 700',style:'italic'},
        ]},
        secondary: {family:'Plus Jakarta Sans',fallback:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',faces:[
          {src:'/fonts/plus-jakarta-sans-wght.woff2',format:'woff2-variations',weight:'400 700',style:'normal'},
        ]},
        brand: {family:'Caveat Brush',fallback:'cursive',faces:[
          {src:'/fonts/caveat-brush-regular.ttf',format:'truetype',weight:'400',style:'normal'},
        ]},
      },
      sizes: {menuControl:'1rem',labelStroke:'0px',aboutStroke:'0px',plaquePadding:'.18em .38em',footer:'clamp(0.875rem, 2.25vw, 1.125rem)',processLink:'clamp(1.125rem, 1.7vw, 1.5rem)',brand:'clamp(1.7rem, 2.5vw, 2.6rem)',display:'clamp(2.25rem, 5vw + 1rem, 5.5rem)',statement:'clamp(1.75rem, 3.5vw + 0.8rem, 4rem)',h1:'clamp(1.625rem, 2.5vw + 0.8rem, 3rem)',h2:'clamp(1.375rem, 1.8vw + 0.6rem, 2.25rem)',body:'clamp(1rem, 0.4vw + 0.9rem, 1.125rem)',caption:'clamp(0.8125rem, 0.2vw + 0.75rem, 0.875rem)',nav:'0.875rem',root:'100%'},
      weights:{menuControl:'600',menuControlActive:'700',navigation:'600',regular:'400',heading:'400',brand:'400',strong:'700'},
      lineHeights:{footer:'1.25',body:'1.5',heading:'1.15',display:'1.05',brand:'.95'},
      tracking:{heading:'-.04em',editorial:'-.035em'},
    },
    spacing:{'1':'0.5rem','2':'1rem','3':'1.5rem','4':'2.5rem','5':'4rem','6':'6rem'},
    layout:{maxWidth:'90rem',narrowWidth:'56rem',pageGutter:'clamp(1.25rem, 3vw, 3rem)'},
    motion:{enabled:true as boolean,pageTransitions:true as boolean,entryDuration:500,entryStagger:70,maxStagger:210,maxConcurrent:6,dialogOpen:300,dialogClose:160,pageDuration:240,fast:'160ms',standard:'160ms',easing:'cubic-bezier(0.16, 1, 0.3, 1)',
      // Playful interactions: distances in px, tilt in degrees, durations in ms.
      playful:{enabled:true as boolean,shineEnabled:false as boolean,glowEnabled:false as boolean,brandWobbleEnabled:false as boolean,buttonHoverLift:2,buttonHoverDuration:220,buttonHoverShadow:'0 5px 14px rgb(0 0 0 / .12)',buttonOpacity:1,buttonPressDistance:1,buttonDuration:160,menuJiggleDuration:500,menuJiggleTravel:1.5,menuJiggleTilt:2,drawerBrandGlowDuration:1800,labelGlowDuration:1800,labelGlowLow:3,labelGlowHigh:6,aboutGlowDuration:1800,jellyDuration:600,shineDuration:1000,jellyWide:1.04,jellyNarrow:0.96,socialDrop:{enabled:true as boolean,duration:1100,stagger:120,distance:48,alternateOnLoad:true as boolean},imageRevealDuration:1400,imageNearDistance:100,imageDecodeTimeout:4000,imageHoverDuration:700,imageEasing:'cubic-bezier(0.45, 0, 0.55, 1)',circleDrawDuration:900,hoverDuration:220,cardLift:0,cardTilt:0,cardScale:1.015,pressScale:0.98,arrowTravel:4,revealTravel:18,accentDuration:420}},
  } satisfies SiteTheme,
};
export type SiteConfiguration = typeof site;
export type SiteText = typeof site.text;
export default site;
