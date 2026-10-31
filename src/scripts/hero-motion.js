/** One decoded hero settle per fresh document; base image and text are always visible. */
export function initHeroMotion(){
 if(document.querySelector('[data-hero-panel-enabled="true"]'))return;
 const image=document.querySelector('.home-hero .image-frame img');if(!(image instanceof HTMLImageElement))return;
 const css=getComputedStyle(document.documentElement),value=(key)=>parseFloat(css.getPropertyValue(key));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const events=new AbortController();let effect,observer,done=false,cancelled=false;
 const allowed=()=>document.documentElement.dataset.motionEnabled!=='false'&&document.documentElement.dataset.playfulEnabled!=='false'&&!document.hidden&&!reduced.matches&&value('--motion-enabled')===1&&value('--playful-enabled')===1&&value('--hero-enabled')===1;
 let switches;const settle=()=>{switches?.disconnect();cancelled=true;done=true;observer?.disconnect();effect?.cancel();effect=undefined;events.abort();};
 if(!allowed()||typeof image.animate!=='function'||typeof IntersectionObserver!=='function'||performance.getEntriesByType('navigation')[0]?.type==='back_forward')return;
 switches=new MutationObserver(()=>{if(!allowed())settle();});switches.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion-enabled','data-playful-enabled']});
 window.addEventListener('pagereveal',event=>{if(event.viewTransition)settle();},{signal:events.signal});
 for(const type of ['pagehide','pageshow'])window.addEventListener(type,e=>{if(type==='pagehide'||e.persisted)settle();},{signal:events.signal});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)settle();},{signal:events.signal});reduced.addEventListener('change',()=>{if(reduced.matches)settle();},{signal:events.signal});
 async function start(){if(done)return;done=true;observer.disconnect();try{await image.decode();if(cancelled||!allowed())return;const transition=document.activeViewTransition;if(transition){settle();return;}const r=image.getBoundingClientRect();if(r.bottom<=0||r.top>=innerHeight)return;const mobile=matchMedia('(max-width:47.999rem)').matches;effect=image.animate([{transform:`scale(${value(mobile?'--hero-mobileScale':'--hero-scale')})`},{transform:'scale(1)'}],{duration:value(mobile?'--hero-mobileDuration':'--hero-duration'),easing:css.getPropertyValue('--playful-image-easing').trim(),fill:'none'});await effect.finished;}catch{}finally{settle();}}
 observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))void start();});observer.observe(image);
}
initHeroMotion();
