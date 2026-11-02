/**
 * MAIN CLIENT CUSTOMIZATION ENTRY POINT.
 * Content tabs below import the canonical dictionaries: edit them, not components.
 * Theme, branding, media overrides, icons and route links are managed here.
 * See CUSTOMIZATION.md for practical examples and local font-license requirements.
 */
import textTemplate from '../content/text.en.json' with { type:'json' };
import images from '../content/images.json' with { type:'json' };
import navigationTemplate from '../content/navigation.json' with { type:'json' };
import pages from '../content/pages.json' with { type:'json' };
import artworks from '../content/artworks.json' with { type:'json' };
import media from '../content/media.json' with { type:'json' };
import type { OpenStudioConfiguration, ImageAsset, SiteTheme, PageConfiguration, NavigationLink, MediaAsset, Artwork } from './types.ts';

import client from '../content/client.json' with { type:'json' };
import {createClientContent,getContactAction} from '../utils/client.ts';
const {text,navigation}=createClientContent(textTemplate,navigationTemplate,client);

export const site = {
  openStudio:{featuredIds:['studio-156570','studio-144705','studio-143278'],workIds:['studio-156570','studio-143278','studio-137078','studio-144705','studio-156571','studio-155039'],transitionDuration:200,layout:{headingGapDesktop:48,headingGapMobile:32,proseMaxWidth:'56ch',proseLineHeight:1.65,galleryOffset:64,galleryRowGapDesktop:72,galleryRowGapMobile:52},colors:{canvas:'#faf9f6',ink:'#292526',accent:'#ffe600',border:'#d8d0c4'}} satisfies OpenStudioConfiguration,
  client,
  contact:{action:getContactAction(client.contactEmail)},
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
    frame:{width:1,radius:24,mobileRadius:18,heroShadow:'0 4px 10px -6px rgb(45 35 25 / .10), 0 16px 36px -18px rgb(45 35 25 / .14)'},
    refinement:{proseMaxWidth:'60ch',proseLineHeight:'1.6',headingGapDesktop:'64px',headingGapMobile:'32px',captionGap:'20px',galleryCaptionGap:'16px',galleryMetadataGap:'6px',fieldGap:'8px',fieldGroupGap:'24px'},
    textLinks:{hoverUnderlineThickness:3,underlineThickness:1,underlineDuration:180,arrowDistance:3,arrowDuration:220,pressOpacity:0.82,pressDuration:90,releaseDuration:160},
    pressLinks:{normalThickness:1,hoverThickness:3,duration:160},
    pressMarker:{color:'#fff230',opacity:0.55,thickness:28,overhang:2,edgeCurve:2,duration:900,stagger:1000},
    colors: {
      blush:'#F4E8E2', charcoal:'#292526', ivory:'#FFF8F1', warmStone:'#EEE9E1', stoneBorder:'#D8D0C4', bronze:'#806548',
      aboutFill:'#ffffff', aboutOutline:'#d4a72c', aboutShadow:'0 1px 2px #171717, 0 0 1px #171717', plaque:'#171717', plaqueText:'#ffffff', goldDark:'#8a5a00', goldMid:'#d4a72c', goldLight:'#fff0ad',
      primary:'#ffe600', circle:'#ffe600', secondary:'#545454', background:'#ffffff', surface:'#ffffff',
      text:'#292526', border:'#e6e4df', accentText:'#171717', focus:'#171717',
      subtleBackground:'#FFF8F1', onMedia:'white', shadow:'#000',
      overlay:'rgb(23 23 23 / .45)', modalOverlay:'rgb(0 0 0 / .7)',
    },
    typography: {
      loading:{preload:true as boolean,display:'swap' as 'block'|'swap'|'fallback'|'optional'},
      fonts: {
        // Reuse the loaded sans face throughout the footer.
        footer: {family:'Plus Jakarta Sans',fallback:'system-ui, sans-serif',faces:[]},
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
      sizes: {menuControl:'1rem',labelStroke:'0px',aboutStroke:'0px',plaquePadding:'.18em .38em',footer:'clamp(0.875rem, 2.25vw, 1.125rem)',processLink:'clamp(1.125rem, 1.7vw, 1.5rem)',brand:'clamp(1.7rem, 2.5vw, 2.6rem)',display:'clamp(2.25rem, 5vw + 1rem, 5.5rem)',statement:'clamp(1.75rem, 3.5vw + 0.8rem, 4rem)',h1:'clamp(1.625rem, 2.5vw + 0.8rem, 3rem)',h2:'clamp(1.375rem, 1.8vw + 0.6rem, 2.25rem)',body:'clamp(1.0625rem, 0.25vw + 1rem, 1.125rem)',caption:'clamp(0.8125rem, 0.2vw + 0.75rem, 0.875rem)',nav:'clamp(0.875rem, 0.15vw + 0.8rem, 0.9375rem)',button:'clamp(0.875rem, 0.15vw + 0.8rem, 0.9375rem)',root:'100%'},
      weights:{menuControl:'600',menuControlActive:'700',navigation:'500',button:'600',buttonHover:'700',regular:'400',heading:'400',brand:'400',strong:'700'},
      lineHeights:{footer:'1.25',body:'1.6',heading:'1.15',display:'1.05',brand:'.95'},
      tracking:{heading:'-.025em',editorial:'-.02em'},
    },
    spacing:{'1':'0.5rem','2':'1rem','3':'1.5rem','4':'2.5rem','5':'4rem','6':'6rem'},
    layout:{maxWidth:'90rem',narrowWidth:'56rem',pageGutter:'clamp(20px, 3vw, 48px)'},
    motion:{hero:{panelEnabled:false as boolean,panelDuration:650,stageRatio:'5 / 4',mobileStageRatio:'4 / 5',perspective:615.06958,perspectiveOrigin:'33.745117% 50%',mobilePerspective:1000,mobilePerspectiveOrigin:'85% 50%',offsetY:0.005035,textureStrength:0.07,faceBrightness:1,faceContrast:1,backdropMid:'#bdbdbd',cornerRadius:4,mobileCornerRadius:3,edgeLight:'#ded0b4',edgeDark:'#9e8664',highlight:'rgb(255 255 255 / .38)',contactShadow:'0 5px 7px -2px rgb(0 0 0 / .30)',groundingShadow:'8px 24px 26px -8px rgb(0 0 0 / .22)',flatShadow:'0 3px 8px rgb(0 0 0 / .04)',backdropTop:'#9f9f9f',backdropBottom:'#ececec',panelScale:0.83823364,mobilePanelScale:0.94,tiltY:14.282715,tiltX:0.199829,mobileTiltY:10,mobileTiltX:1,depth:14.346656,mobileDepth:10,slide:7.420532,mobileSlide:4,panelEasing:'cubic-bezier(0.22, 1, 0.36, 1)',enabled:true as boolean,scale:1.025,mobileScale:1.012,duration:1200,mobileDuration:800},quiet:{headingDuration:550,headingTravel:8,mobileTravel:4,mobileImageDuration:700,captionDuration:350,captionDelay:100},enabled:true as boolean,pageTransitions:true as boolean,entryDuration:450,entryStagger:70,maxStagger:210,maxConcurrent:6,dialogOpen:280,dialogClose:160,pageDuration:280,fast:'160ms',standard:'160ms',easing:'cubic-bezier(0.16, 1, 0.3, 1)',
      // Playful interactions: distances in px, tilt in degrees, durations in ms.
      playful:{labelRollEnabled:false as boolean,labelRollDuration:320,enabled:true as boolean,shineEnabled:false as boolean,glowEnabled:false as boolean,brandWobbleEnabled:false as boolean,buttonHoverLift:2,buttonHoverDuration:220,buttonHoverShadow:'0 5px 14px rgb(0 0 0 / .12)',buttonOpacity:1,buttonPressDistance:1,buttonDuration:160,menuJiggleDuration:500,menuJiggleTravel:1.5,menuJiggleTilt:2,drawerBrandGlowDuration:1800,labelGlowDuration:1800,labelGlowLow:3,labelGlowHigh:6,aboutGlowDuration:1800,jellyDuration:600,shineDuration:1000,jellyWide:1.04,jellyNarrow:0.96,socialDrop:{enabled:true as boolean,duration:1100,stagger:120,distance:48,alternateOnLoad:true as boolean},imageRevealDuration:1000,imageNearDistance:100,imageDecodeTimeout:4000,imageHoverDuration:700,imageEasing:'cubic-bezier(0.45, 0, 0.55, 1)',circleDrawDuration:900,hoverDuration:220,cardLift:0,cardTilt:0,cardScale:1.015,pressScale:0.98,arrowTravel:4,revealTravel:8,accentDuration:420}},
  } satisfies SiteTheme,
};
export type SiteConfiguration = typeof site;
export type SiteText = typeof site.text;
export default site;
