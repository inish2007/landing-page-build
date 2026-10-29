import {createPhotoReveals} from './photo-reveals.js';
import {readMotionSettings} from './motion-settings.js';
import {chooseSocialDropDirection} from './social-drop.js';
let disposeCurrent;
let socialDirection;
/** Own one reveal observer, replayable SVG strokes and abortable lifecycle handlers. Base DOM is complete and visible. @returns {void} */
export function initMotion(){
  disposeCurrent?.();const settings=readMotionSettings();if(!settings.enabled)return;
  const canReveal=('IntersectionObserver' in window)&&Boolean(Element.prototype.animate);
  const preference=matchMedia('(prefers-reduced-motion: reduce)'),finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  if(canReveal&&settings.playful)document.querySelector('.collage-about h2')?.setAttribute('data-about-glow','');
  const events=new AbortController(),seen=new WeakSet(),accentSeen=new WeakSet(),active=new Map();
  const photos=createPhotoReveals(settings,preference,events.signal,protectedTarget);
  const strip=document.querySelector('[data-motion="social-drop"]');
  const socialEnabled=Boolean(strip&&canReveal&&settings.playful&&settings.socialDrop.enabled&&!preference.matches);
  if(socialEnabled&&socialDirection===undefined){try{socialDirection=settings.socialDrop.alternateOnLoad?chooseSocialDropDirection(window.localStorage,true,window.performance?.getEntriesByType?.('navigation')?.[0]?.type!=='back_forward'):'forward';}catch{socialDirection='forward';}}
  const targets=canReveal?[...document.querySelectorAll('[data-motion="reveal"], [data-motion="press-marker"], .highlight-circle, [data-motion="social-drop"], [data-accent="shine"], [data-accent="outline"]')].filter(el=>!el.matches('.image-frame')&&!(el.matches('.gallery-card,.playful-card')&&el.querySelector('.image-frame')&&!el.hasAttribute('data-accent'))).filter(el=>el.matches('[data-motion="press-marker"]')||!el.closest('[data-motion="press-marker"]')).filter(el=>el.matches('[data-motion="press-marker"]')||el.matches('[data-accent="shine"],[data-accent="outline"]')||el.matches('[data-motion="social-drop"]')||(!el.closest('[data-motion="social-drop"]')&&(el.matches('.highlight-circle')?settings.playful:!el.parentElement?.closest('[data-motion="reveal"]')))):[];
  /** Resolve current anchor safely. @returns {Element|null} Reads DOM only. */
  function anchorTarget(){try{return document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{return null;}}
  /** Protect focused/anchor content from entry fades. @param {Element} element Reveal unit. @returns {boolean} */
  function protectedTarget(element){const anchor=anchorTarget();return element.contains(document.activeElement)||Boolean(anchor&&(anchor.contains(element)||element.contains(anchor)));}
  /** Release an owned effect on finish/cancel without retaining stale animations. @param {Element} element Unit. @param {Animation} animation Effect. @returns {void} */
  function trackEffect(element,animation){active.set(element,animation);const release=()=>{if(active.get(element)===animation)active.delete(element);};animation.finished.then(release,release);}
  /** Cancel all effects; underlying visible content and complete strokes are restored. @returns {void} */
  function cancelReveals(){for(const animation of active.values())animation.cancel();active.clear();}
  /** Start one fresh, bounded SVG draw; prior effect is cancelled before checking capacity. @param {Element} circle Word wrapper. @param {number} delay Group delay in ms. @returns {void} Paint is limited to two small SVG paths. */
  function drawCircle(circle,delay=0){active.get(circle)?.cancel();active.delete(circle);if(!canReveal||!settings.playful||preference.matches||document.hidden||active.size>=settings.maxConcurrent)return;const path=circle.querySelector('[data-circle-stroke]');if(!path)return;try{trackEffect(circle,path.animate([{strokeDashoffset:'1'},{strokeDashoffset:'0'}],{duration:settings.circleDrawDuration,delay,easing:'linear',fill:'backwards'}));}catch{/* Unsupported effects keep the complete base stroke. */}}
  /** Drop six outer cards in the stored order while retaining independent inner-image hover. @param {Element} group Social strip. @returns {void} Settles other owned reveals before reserving six slots; all failure paths leave base cards visible. */
  function playSocialDrop(group){
    const items=[...group.querySelectorAll(':scope > [data-social-drop-item]')];
    if(!socialEnabled||preference.matches||document.hidden||protectedTarget(group)||group.getBoundingClientRect().height>innerHeight||items.length!==6||settings.maxConcurrent<items.length)return;
    cancelReveals();const ordered=socialDirection==='reverse'?[...items].reverse():items;
    try{for(const [index,item]of ordered.entries())trackEffect(item,item.animate([{opacity:0,transform:`translateY(${-settings.socialDrop.distance}px)`},{opacity:1,transform:'translateY(0px)'}],{duration:settings.socialDrop.duration,delay:index*settings.socialDrop.stagger,easing:settings.imageEasing,fill:'backwards'}));}catch{for(const item of items){active.get(item)?.cancel();active.delete(item);}}
  }
  /** Draw horizontal marker bands per paragraph; cancellation restores full inline-fragment highlights. @param {Element} group Marked prose wrapper. @returns {void} */
  function playPressMarker(group){
    if(!canReveal||!settings.playful||preference.matches||document.hidden||protectedTarget(group)||window.performance?.getEntriesByType?.('navigation')?.[0]?.type==='back_forward')return;
    const paths=[...group.querySelectorAll('.press-marker-ink')];if(!paths.length)return;
    for(const[element,effect]of active)if(element.contains(group)||group.contains(element)){effect.cancel();active.delete(element);seen.add(element);}
    const css=getComputedStyle(document.documentElement),duration=Number(css.getPropertyValue('--press-marker-duration'))||900,stagger=Number(css.getPropertyValue('--press-marker-stagger'))||1000;
    try{for(const[index,path]of paths.entries())trackEffect(path,path.animate([{backgroundSize:'0% '+css.getPropertyValue('--press-marker-thickness').trim()},{backgroundSize:'100% '+css.getPropertyValue('--press-marker-thickness').trim()}],{duration,delay:index*stagger,easing:'ease-in-out',fill:'backwards'}));}
    catch{for(const path of paths){active.get(path)?.cancel();active.delete(path);}}
  }
  /** Observe entered units once, sharing the same budget/delay cap with stroke draws. @param {IntersectionObserverEntry[]} entries Visible candidates. @returns {void} */
  function handleEntries(entries){for(const entry of entries){if(entry.target.dataset.accent==='outline'){entry.target.dataset.glowVisible=String(entry.isIntersecting);if(!entry.isIntersecting){const target=entry.target.querySelector('.outline-sweep');active.get(target)?.cancel();active.delete(target);target?.removeAttribute('data-shining');}}}const groups=new Map();for(const entry of entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)){const element=entry.target;if(element.matches('[data-motion="press-marker"]')){observer?.unobserve(element);if(!seen.has(element)){seen.add(element);playPressMarker(element);}continue;}if(element.matches('[data-accent="shine"],[data-accent="outline"]')){if(element.dataset.accent!=='outline')observer?.unobserve(element);if(!accentSeen.has(element)){accentSeen.add(element);seen.add(element);if(window.performance?.getEntriesByType?.('navigation')?.[0]?.type!=='back_forward')playAccent(element);}continue;}if(element.matches('[data-motion="social-drop"]')){if(seen.has(element))continue;if(entry.intersectionRatio<0.75)continue;seen.add(element);observer?.unobserve(element);playSocialDrop(element);continue;}observer?.unobserve(element);if(seen.has(element))continue;seen.add(element);if(preference.matches||document.hidden||protectedTarget(element)||active.size>=settings.maxConcurrent)continue;const group=element.closest('[data-motion-group]')||element.parentElement,index=groups.get(group)||0;groups.set(group,index+1);const delay=Math.min(index*settings.entryStagger,settings.maxStagger);if(element.matches('.highlight-circle')){drawCircle(element,delay);continue;}const image=settings.playful&&element.matches('.image-frame');const imageUnit=settings.playful&&element.matches('.image-frame,.gallery-card,.playful-card');try{trackEffect(element,element.animate(image?[{opacity:0,transform:`translateY(${settings.revealTravel}px)`},{opacity:1,transform:'translateY(0px)'}]:[{opacity:0},{opacity:1}],{duration:imageUnit?settings.imageRevealDuration:settings.entryDuration,delay,easing:imageUnit?settings.imageEasing:settings.easing,fill:'backwards'}));}catch{/* Base content stays visible. */}}}
  const observer=canReveal?new IntersectionObserver(handleEntries,{threshold:[0.01,0.75]}):null;
  /** Exclude initial visible prose/images; circles may draw on their first viewport entry. @returns {void} */
  function observeTargets(){for(const element of targets){if(element.matches('[data-motion="press-marker"]')){if(!seen.has(element))observer?.observe(element);continue;}if(element.matches('[data-accent="shine"],[data-accent="outline"]')){if(element.dataset.accent==='outline'||!accentSeen.has(element))observer?.observe(element);continue;}if(seen.has(element))continue;if(element.matches('[data-motion="social-drop"]')){if(!socialEnabled||protectedTarget(element)||element.getBoundingClientRect().height>innerHeight){seen.add(element);continue;}observer?.observe(element);continue;}if(protectedTarget(element)||(!element.matches('.highlight-circle')&&element.getBoundingClientRect().top<innerHeight)){seen.add(element);continue;}observer?.observe(element);}}
  /** Settle SVG/WAAPI/CSS effects on reduced motion or backgrounding. @returns {void} */
  function handleMotionState(){document.documentElement.dataset.motionInactive=String(document.hidden);if(preference.matches||document.hidden){cancelReveals();photos.settleAll();}}
  /** Prevent focused/anchor content from staying faded. @returns {void} */
  function handleFocusOrHash(){for(const[element,animation]of active)if(protectedTarget(element)&&!element.matches('.gold-shine,.jelly-surface,.outline-sweep')){animation.cancel();active.delete(element);}}
  /** Prepare only interacted artwork for smooth transform return. @param {Event} event Delegated hover/focus. @returns {void} No layers, observer or timers. */
  function handleArtworkInteraction(event){
    if(!settings.playful||preference.matches||document.hidden)return;
    const card=event.target instanceof Element?event.target.closest('.playful-card'):null;
    const image=card?.querySelector('img');if(!image||card.dataset.imageReady==='true'||card.querySelector('[data-photo-state]'))return;
    image.classList.add('playful-image-transition');
    // Commit neutral image styles before enabling the hovered/focused target, once per image.
    void getComputedStyle(image).transform;
    card.dataset.imageReady='true';
  }
  /** Run one owned, cancellable decorative accent; text and hit boxes never move. @param {Event} event Pointer/focus entry. @returns {void} */
  function handleAccent(event){
    const owner=event.target instanceof Element?event.target.closest('[data-accent]'):null;
    if(!owner||!settings.playful||preference.matches||document.hidden||!canReveal||document.documentElement.dataset.motionEnabled==='false'||document.documentElement.dataset.playfulEnabled==='false')return;
    if(event.type==='pointerover'&&(!finePointer.matches||event.pointerType==='touch'))return;
    if(event.relatedTarget instanceof Node&&owner.contains(event.relatedTarget))return;
    accentSeen.add(owner);if(owner.dataset.accent!=='outline')observer?.unobserve(owner);playAccent(owner);
  }
  /** Play one accent from observer or user input, sharing ownership and settling enclosing entry fades. @param {Element} owner Accent wrapper. @returns {void} */
  function playAccent(owner){
    if(!settings.playful||preference.matches||document.hidden||!canReveal||document.documentElement.dataset.motionEnabled==='false'||document.documentElement.dataset.playfulEnabled==='false')return;
    const target=owner.dataset.accent==='outline'?owner.querySelector('.outline-sweep'):owner.dataset.accent==='jelly'?owner.querySelector('.jelly-surface'):(owner.matches('.gold-shine')?owner:owner.querySelector('.gold-shine'));
    if(!target)return;
    const container=owner.closest('.home-collaborations')||owner;for(const[element,effect]of active){if(element!==target&&element.matches('[data-motion="reveal"]')&&(element.contains(owner)||container.contains(element))){effect.cancel();active.delete(element);seen.add(element);}}active.get(target)?.cancel();active.delete(target);if(owner.dataset.accent==='jelly'&&active.size>=settings.maxConcurrent)return;
    const css=getComputedStyle(document.documentElement),number=(key,fallback)=>Number(css.getPropertyValue(key).trim())||fallback;let animation;
    try{if(owner.dataset.accent==='jelly'){const wide=number('--jelly-wide',1.04),narrow=number('--jelly-narrow',.96);animation=target.animate([{transform:'scale(1)'},{transform:'scale('+wide+','+narrow+')',offset:.25},{transform:'scale(.98,1.02)',offset:.5},{transform:'scale(1.01,.99)',offset:.75},{transform:'scale(1)'}],{duration:number('--jelly-duration',600),easing:'ease-in-out'});}
    else{const outline=owner.dataset.accent==='outline';if(outline&&!CSS.supports('mask-image','linear-gradient(black,transparent)'))return;if(!outline&&!CSS.supports('background-clip','text')&&!CSS.supports('-webkit-background-clip','text'))return;target.setAttribute('data-shining','');animation=target.animate(outline?[{maskPosition:'100% 0%'},{maskPosition:'0% 0%'}]:[{backgroundPosition:'100% 0%'},{backgroundPosition:'0% 0%'}],{duration:number('--shine-duration',1000),easing:'linear'});const release=()=>{if(active.get(target)===animation||!active.has(target))target.removeAttribute('data-shining');};animation.finished.then(release,release);}
    trackEffect(target,animation);
    }catch{target.removeAttribute('data-shining');}
  }
  /** Finish an accent on exit; base letters and button surface remain visible. @param {Event} event Pointer/focus exit. @returns {void} */
  function finishAccent(event){const owner=event.target instanceof Element?event.target.closest('[data-accent]'):null;if(!owner||(event.relatedTarget instanceof Node&&owner.contains(event.relatedTarget)))return;for(const target of [owner,...owner.querySelectorAll('.gold-shine,.jelly-surface,.outline-sweep')]){active.get(target)?.cancel();active.delete(target);target.removeAttribute('data-shining');}}
  /** Replay only on external precise-pointer entry or actual word focus; avoid child-to-parent restarts. @param {Event} event Pointerover/focusin. @returns {void} */
  function handleCircleInteraction(event){const circle=event.target instanceof Element?event.target.closest('.highlight-circle'):null;if(!circle)return;if(event.type==='pointerover'&&(!finePointer.matches||event.pointerType==='touch'))return;if(event.relatedTarget instanceof Node&&circle.contains(event.relatedTarget))return;seen.add(circle);observer?.unobserve(circle);drawCircle(circle);}
  /** Settle immediately when hover/focus leaves the word. @param {Event} event Pointerout/focusout. @returns {void} */
  function finishCircleInteraction(event){const circle=event.target instanceof Element?event.target.closest('.highlight-circle'):null;if(!circle||(event.relatedTarget instanceof Node&&circle.contains(event.relatedTarget)))return;active.get(circle)?.cancel();active.delete(circle);}
  /** Cancel/disconnect for navigation/BFCache. @returns {void} */
  function handlePageHide(){photos.settleAll();document.documentElement.dataset.motionInactive='true';cancelReveals();observer?.disconnect();}
  /** Restore unseen observation without replaying entered units. @returns {void} */
  function handlePageShow(){handleMotionState();observeTargets();}
  /** Release all owned handlers/observer/effects before reinitialization. @returns {void} */
  function disposeMotion(){photos.dispose();events.abort();observer?.disconnect();cancelReveals();}
  for(const type of ['pointerover','focusin'])document.addEventListener(type,handleAccent,{signal:events.signal});
  for(const type of ['pointerout','focusout'])document.addEventListener(type,finishAccent,{signal:events.signal});
  document.addEventListener('pointerover',handleArtworkInteraction,{signal:events.signal});document.addEventListener('focusin',handleArtworkInteraction,{signal:events.signal});
  document.addEventListener('focusin',handleFocusOrHash,{signal:events.signal});
  for(const type of ['pointerover','focusin'])document.addEventListener(type,handleCircleInteraction,{signal:events.signal});
  for(const type of ['pointerout','focusout'])document.addEventListener(type,finishCircleInteraction,{signal:events.signal});
  preference.addEventListener('change',handleMotionState,{signal:events.signal});document.addEventListener('visibilitychange',handleMotionState,{signal:events.signal});window.addEventListener('hashchange',handleFocusOrHash,{signal:events.signal});window.addEventListener('pagehide',handlePageHide,{signal:events.signal});window.addEventListener('pageshow',handlePageShow,{signal:events.signal});
  disposeCurrent=disposeMotion;handleMotionState();observeTargets();
}
initMotion();
