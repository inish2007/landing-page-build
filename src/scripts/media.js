import {readMotionSettings} from './motion-settings.js';
let disposeMedia;
/** Play local GIF only on screen/in an active tab, with persistent manual intent. @returns {void} Owns observers and abortable preference/playback handlers. */
export function initAnimatedMedia(){disposeMedia?.();const events=new AbortController();const preference=matchMedia('(prefers-reduced-motion: reduce)');const settings=readMotionSettings();const cleanups=[];
  for(const container of document.querySelectorAll('[data-animated-media]')){const image=container.querySelector('img');const button=container.querySelector('button');let intent='auto';let visible=!('IntersectionObserver' in window);let failed=false;let observer;
    /** Apply effective playback without restarting an unchanged source. @returns {void} Updates local image/label/pressed state only. */
    function updatePlayback(){const requested=intent==='play'||(intent==='auto'&&settings.enabled&&!preference.matches);const playing=requested&&visible&&!document.hidden&&!failed;const src=playing?container.dataset.animationSrc:container.dataset.posterSrc;if(image.getAttribute('src')!==src)image.src=src;(button.querySelector('[data-button-label]')||button).textContent=playing?button.dataset.pauseLabel:button.dataset.playLabel;button.setAttribute('aria-pressed',String(playing));}
    /** Record explicit play/pause independently of temporary suspension. @returns {void} May clear failed-load state for one user retry. */
    function togglePlayback(){const rect=container.getBoundingClientRect();visible=rect.bottom>0&&rect.top<innerHeight&&rect.right>0&&rect.left<innerWidth;intent=button.getAttribute('aria-pressed')==='true'?'pause':'play';failed=false;updatePlayback();}
    /** Stop when preference changes to reduced motion. @returns {void} Sticky pause until explicit play. */
    function handleMediaPreference(){if(preference.matches)intent='pause';updatePlayback();}
    /** Suspend outside the viewport. @param {IntersectionObserverEntry[]} entries Visibility records. @returns {void} Updates effective source. */
    function handleMediaEntries(entries){visible=entries.at(-1)?.isIntersecting||false;updatePlayback();}
    /** Fail to static poster without automatic retry loops. @returns {void} Preserves functional explicit retry. */
    function handleMediaError(){if(image.getAttribute('src')===container.dataset.animationSrc){failed=true;updatePlayback();}}
    /** Suspend before history/navigation freeze. @returns {void} Restores static poster. */
    function suspendMedia(){visible=false;updatePlayback();}
    /** Recheck viewport after history restoration. @returns {void} Restarts observation, preserving manual intent. */
    function resumeMedia(){if(observer){observer.unobserve(container);observer.observe(container);}else{visible=true;updatePlayback();}}
    if('IntersectionObserver' in window){observer=new IntersectionObserver(handleMediaEntries,{threshold:0.01});observer.observe(container);}button.hidden=false;button.addEventListener('click',togglePlayback,{signal:events.signal});image.addEventListener('error',handleMediaError,{signal:events.signal});preference.addEventListener('change',handleMediaPreference,{signal:events.signal});document.addEventListener('visibilitychange',updatePlayback,{signal:events.signal});window.addEventListener('pagehide',suspendMedia,{signal:events.signal});window.addEventListener('pageshow',resumeMedia,{signal:events.signal});cleanups.push(()=>{observer?.disconnect();intent='pause';updatePlayback();});updatePlayback();
  }
  disposeMedia=()=>{events.abort();for(const cleanup of cleanups)cleanup();};
}
initAnimatedMedia();
