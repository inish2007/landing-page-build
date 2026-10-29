import {readMotionSettings} from './motion-settings.js';
let disposeCurrent;
/** Initialize explicit once-only below-fold reveals. @returns {void} Owns one observer, temporary animations and abortable lifecycle handlers; default DOM remains visible. */
export function initMotion(){
  disposeCurrent?.();const settings=readMotionSettings();
  if(!settings.enabled)return;const canReveal=('IntersectionObserver' in window)&&Boolean(Element.prototype.animate);
  const preference=matchMedia('(prefers-reduced-motion: reduce)');const events=new AbortController();const seen=new WeakSet();const active=new Map();
  const targets=canReveal?[...document.querySelectorAll('[data-motion="reveal"], .highlight-circle')].filter(el=>el.matches('.highlight-circle')?settings.playful:!el.parentElement?.closest('[data-motion="reveal"]')):[];
  /** Resolve current anchor without letting malformed hashes break rendering. @returns {Element|null} No writes. */
  function anchorTarget(){try{return document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{return null;}}
  /** Check focus/anchor exclusions. @param {Element} element Reveal unit. @returns {boolean} Reads current DOM only. */
  function protectedTarget(element){const anchor=anchorTarget();return element.contains(document.activeElement)||Boolean(anchor&&(anchor.contains(element)||element.contains(anchor)));}
  /** Cancel temporary effects, restoring base visible content. @returns {void} Cancels only owned animations. */
  function cancelReveals(){for(const animation of active.values())animation.cancel();active.clear();}
  /** Start bounded entry effects and release entered nodes. @param {IntersectionObserverEntry[]} entries Visible candidates. @returns {void} Starts temporary opacity/transform or pseudo-element accent effects; never queues overflow. */
  function handleEntries(entries){const groups=new Map();for(const entry of entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)){const element=entry.target;observer?.unobserve(element);if(seen.has(element))continue;seen.add(element);if(preference.matches||document.hidden||protectedTarget(element)||active.size>=settings.maxConcurrent)continue;const group=element.closest('[data-motion-group]')||element.parentElement;const index=groups.get(group)||0;groups.set(group,index+1);try{const accent=element.matches('.highlight-circle');const image=settings.playful&&element.matches('.image-frame');const frames=accent?[{transform:'rotate(-8deg) scale(0.96)'},{transform:'rotate(-7deg) scale(1.025)',offset:0.65},{transform:'rotate(-8deg) scale(1)'}]:image?[{opacity:0,transform:`translateY(${settings.revealTravel}px)`},{opacity:1,transform:'translateY(0px)'}]:[{opacity:0},{opacity:1}];const animation=element.animate(frames,{duration:accent?settings.accentDuration:settings.entryDuration,delay:Math.min(index*settings.entryStagger,settings.maxStagger),easing:settings.easing,fill:'backwards',...(accent?{pseudoElement:'::after'}:{})});active.set(element,animation);const finish=()=>{if(active.get(element)===animation)active.delete(element);};animation.finished.then(finish,finish);}catch{/* Unsupported effects leave base styles visible. */}}}
  const observer=canReveal?new IntersectionObserver(handleEntries,{threshold:0.01}):null;
  /** Observe unseen units after excluding initial viewport/past content. @returns {void} Reads layout in one startup pass and registers observation. */
  function observeTargets(){for(const element of targets){if(seen.has(element))continue;if(element.getBoundingClientRect().top<innerHeight||protectedTarget(element)){seen.add(element);continue;}observer?.observe(element);}}
  /** Release effects immediately on reduced motion or backgrounding. @returns {void} May cancel active effects. */
  function handleMotionState(){document.documentElement.dataset.motionInactive=String(document.hidden);if(preference.matches||document.hidden)cancelReveals();}
  /** Ensure keyboard/anchor destinations never remain faded. @returns {void} Cancels excluded nodes only. */
  function handleFocusOrHash(){for(const[element,animation]of active)if(protectedTarget(element)){animation.cancel();active.delete(element);}}
  /** Prepare smooth entry/return only for interacted artwork, avoiding transition setup across a large untouched gallery. @param {Event} event Delegated pointerover/focusin event. @returns {void} Adds a utility to the relevant image; no layers, observers or timers. */
  function handleArtworkInteraction(event){if(!settings.playful||preference.matches||document.hidden)return;const card=event.target instanceof Element?event.target.closest('.playful-card'):null;card?.querySelector('img')?.classList.add('playful-image-transition');}
  /** Suspend owned work for navigation/BFCache. @returns {void} Cancels effects and disconnects observer. */
  function handlePageHide(){document.documentElement.dataset.motionInactive="true";cancelReveals();observer?.disconnect();}
  /** Restore observation after browser history restoration. @returns {void} Re-observes unseen below-fold units without replaying seen units. */
  function handlePageShow(){handleMotionState();observeTargets();}
  /** Release all controller resources before reinitializing. @returns {void} Aborts handlers and cancels/disconnects owned work. */
  function disposeMotion(){events.abort();observer?.disconnect();cancelReveals();}
  document.addEventListener('pointerover',handleArtworkInteraction,{signal:events.signal});document.addEventListener('focusin',handleArtworkInteraction,{signal:events.signal});preference.addEventListener('change',handleMotionState,{signal:events.signal});document.addEventListener('visibilitychange',handleMotionState,{signal:events.signal});document.addEventListener('focusin',handleFocusOrHash,{signal:events.signal});window.addEventListener('hashchange',handleFocusOrHash,{signal:events.signal});window.addEventListener('pagehide',handlePageHide,{signal:events.signal});window.addEventListener('pageshow',handlePageShow,{signal:events.signal});disposeCurrent=disposeMotion;handleMotionState();observeTargets();
}
initMotion();
