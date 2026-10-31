/** Reserve room for the header/copy and 3D projection; resize the image, never the text. */
export function initHeroViewportFit(){
 const hero=document.querySelector('.home-hero'),stage=hero?.querySelector('.hero-artwork'),copy=hero?.querySelector('.hero-copy');if(!stage||!copy)return;
 function fit(){const css=getComputedStyle(hero);const stacked=css.gridTemplateColumns.split(' ').filter(Boolean).length===1;const top=hero.getBoundingClientRect().top+scrollY;const padding=parseFloat(css.paddingTop)+parseFloat(css.paddingBottom);const copySpace=stacked?copy.getBoundingClientRect().height+(parseFloat(css.rowGap)||0):0;const ratio=getComputedStyle(stage).aspectRatio.split('/').map(Number);const aspect=ratio.length===2?ratio[0]/ratio[1]:ratio[0];const available=Math.max(64,innerHeight-top-padding-copySpace-48);if(Number.isFinite(aspect))stage.style.setProperty('--hero-fit-width',Math.floor(available*aspect)+'px');}
 fit();window.addEventListener('resize',fit,{passive:true});window.addEventListener('pageshow',fit);document.fonts?.ready.then(fit);
 if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(fit);const header=document.querySelector('.site-header');if(header)observer.observe(header);observer.observe(copy);}
}
initHeroViewportFit();
