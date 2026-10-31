/** Hero-only perspective toggle. CSS owns reversible interpolation; document history owns the selected mode. */
export function initHeroPanel(){
 const stage=document.querySelector('[data-hero-panel-enabled="true"]');if(!stage)return;
 const button=stage.querySelector('button'),image=stage.querySelector('img'),label=stage.querySelector('.hero-artwork-action');
 const events=new AbortController(),reduced=matchMedia('(prefers-reduced-motion:reduce)');let selected='3d',ready=false;
 const back=performance.getEntriesByType('navigation')[0]?.type==='back_forward';if(back&&['2d','3d'].includes(history.state?.heroPanelView))selected=history.state.heroPanelView;
 const enabled=()=>!reduced.matches&&document.documentElement.dataset.motionEnabled!=='false'&&document.documentElement.dataset.playfulEnabled!=='false'&&parseFloat(getComputedStyle(stage).getPropertyValue('--hero-enabled'))===1;
 function render(settle=false){const active=ready&&enabled();stage.toggleAttribute('data-panel-settle',settle||document.hidden||!active);stage.toggleAttribute('data-panel-ready',active);stage.dataset.panelView=active?selected:'2d';button.disabled=!active;button.setAttribute('aria-pressed',String(active&&selected==='2d'));const action=selected==='3d'?button.dataset.flatLabel:button.dataset.depthLabel;button.setAttribute('aria-label',action);label.textContent=action;label.hidden=!active;}
 function remember(){if(history.state===null||typeof history.state==='object')try{history.replaceState({...history.state,heroPanelView:selected},'');}catch{}}
 function toggle(){if(button.disabled)return;stage.removeAttribute('data-panel-settle');selected=selected==='3d'?'2d':'3d';remember();render();}
 const supported=typeof CSS!=='undefined'&&CSS.supports('perspective','1200px')&&CSS.supports('transform','rotateY(7deg)');if(!supported)return;
 button.addEventListener('click',toggle,{signal:events.signal});
 reduced.addEventListener('change',()=>render(true),{signal:events.signal});document.addEventListener('visibilitychange',()=>render(true),{signal:events.signal});
 window.addEventListener('pagehide',()=>{remember();render(true);},{signal:events.signal});window.addEventListener('pageshow',()=>render(true),{signal:events.signal});
 image.addEventListener('error',()=>{ready=false;render(true);},{signal:events.signal});
 const switches=new MutationObserver(()=>render(true));switches.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion-enabled','data-playful-enabled']});
 async function prepare(){try{await image.decode();ready=image.naturalWidth>0;render(true);}catch{ready=false;render(true);}}
 void prepare();
}
initHeroPanel();
