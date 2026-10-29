/** Prepare six reserved cards before observation; the shared motion observer triggers play(). */
export function createSocialDropMotion(group,settings,preference,signal,protectedTarget,direction,trackEffect,completeOtherReveals){
  const items=group?[...group.querySelectorAll(':scope > [data-social-drop-item]')]:[];
  let done=false,playing=false,timer;const animations=[];
  /** Restore complete cards and invalidate every outstanding decode/start callback. */
  function settle(){done=true;clearTimeout(timer);for(const effect of animations)effect.cancel();animations.length=0;group?.removeAttribute('data-social-drop-state');if(group)group.dataset.socialDropComplete='true';}
  const valid=Boolean(group&&!group.hasAttribute('data-social-drop-complete')&&settings.enabled&&settings.playful&&settings.socialDrop.enabled&&!preference.matches&&!document.hidden&&typeof IntersectionObserver==='function'&&typeof Element.prototype.animate==='function'&&items.length===6&&settings.maxConcurrent>=6&&group.getBoundingClientRect().height<=innerHeight&&!protectedTarget(group)&&performance.getEntriesByType('navigation')[0]?.type!=='back_forward');
  if(valid)group.dataset.socialDropState='pending';else done=true;
  /** Decode all six with a bounded failure path, then reserve the shared six-effect budget. */
  async function play(){
    if(done||playing)return;playing=true;
    try{
      const decoded=items.map(async item=>{const image=item.querySelector('img');if(!image)throw Error('Missing strip image');image.loading='eager';if(typeof image.decode==='function')await image.decode();else if(!image.complete)await new Promise((resolve,reject)=>{image.addEventListener('load',resolve,{once:true,signal});image.addEventListener('error',reject,{once:true,signal});});if(!image.naturalWidth)throw Error('Strip image failed');});
      await Promise.race([Promise.all(decoded),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Strip decode timeout')),settings.imageDecodeTimeout);})]);clearTimeout(timer);
      if(done)return;
      if(preference.matches||document.hidden||protectedTarget(group)||group.getBoundingClientRect().height>innerHeight){settle();return;}
      completeOtherReveals();
      const ordered=direction==='reverse'?[...items].reverse():items;
      for(const [index,item]of ordered.entries()){
        const animation=item.animate([{opacity:0,transform:'translateY('+(-settings.socialDrop.distance)+'px)'},{opacity:1,transform:'translateY(0px)'}],{duration:settings.socialDrop.duration,delay:index*settings.socialDrop.stagger,easing:settings.imageEasing,fill:'both'});
        animations.push(animation);trackEffect(item,animation);
      }
      group.dataset.socialDropState='revealing';
      await Promise.all(animations.map(animation=>animation.finished));
      settle();
    }catch{settle();}
  }
  signal.addEventListener('abort',settle,{once:true});
  return{play,settle,get done(){return done;}};
}
