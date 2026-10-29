import {readMotionSettings} from './motion-settings.js';
const controllers=new WeakMap();const locks=new Set();let savedScroll;
/** Acquire a shared scroll lock with scrollbar compensation. @param {HTMLDialogElement} dialog Owner. @returns {void} Saves original inline values/priorities and scroll coordinates once. */
function lockScroll(dialog){if(locks.has(dialog))return;if(!locks.size){const style=document.body.style;const gap=Math.max(0,innerWidth-document.documentElement.clientWidth);const padding=gap?(parseFloat(getComputedStyle(document.body).paddingRight)||0):0;savedScroll={x:scrollX,y:scrollY,overflow:style.getPropertyValue('overflow'),overflowPriority:style.getPropertyPriority('overflow'),padding:style.getPropertyValue('padding-right'),paddingPriority:style.getPropertyPriority('padding-right')};style.setProperty('overflow','hidden');if(gap)style.setProperty('padding-right',(padding+gap)+'px');}locks.add(dialog);}
/** Release scroll lock without disturbing another modal. @param {HTMLDialogElement} dialog Owner. @returns {void} Restores original styles and coordinates after the last owner closes. */
function unlockScroll(dialog){if(!locks.delete(dialog)||locks.size||!savedScroll)return;const style=document.body.style;for(const[property,value,priority]of[['overflow',savedScroll.overflow,savedScroll.overflowPriority],['padding-right',savedScroll.padding,savedScroll.paddingPriority]]){if(value)style.setProperty(property,value,priority);else style.removeProperty(property);}scrollTo({left:savedScroll.x,top:savedScroll.y,behavior:'instant'});savedScroll=null;}
/** Create cancellable native-dialog transitions. @param {HTMLDialogElement} dialog Modal. @param {{axis?:string,distance?:number,onOpen?:Function,onClosed?:Function}} options Direction/hooks. @returns {object} open, close, finishClose, destroy and read-only state. Owns focus, animation, scroll and abortable handlers. */
export function createDialogController(dialog,options={}){
  controllers.get(dialog)?.destroy();const settings=readMotionSettings();const preference=matchMedia('(prefers-reduced-motion: reduce)');const events=new AbortController();let state='closed';let animation=null;let generation=0;let returnFocus=null;
  const offset=options.axis==='x'?'translate3d('+(options.distance??16)+'px,0,0)':'translate3d(0,'+(options.distance??8)+'px,0)';
  /** Cancel owned panel/backdrop effects. @returns {void} Restores base panel styles. */
  function cancelEffect(){animation?.cancel();animation=null;}
  /** Complete native closure exactly once. @returns {void} Releases modality, scroll, focus and callbacks. */
  function finishClose(){if(state==='closed')return;generation++;cancelEffect();state='closed';delete dialog.dataset.motionState;if(dialog.open)dialog.close();unlockScroll(dialog);options.onClosed?.();const target=returnFocus instanceof HTMLElement&&returnFocus.isConnected&&returnFocus.getClientRects().length?returnFocus:document.querySelector('.brand');target?.focus({preventScroll:true});}
  /** Animate toward latest intent with stale-completion protection. @param {boolean} opening Target intent. @returns {void} Uses opacity/transform only; unsupported/reduced effects finish immediately. */
  function transition(opening){const token=++generation;const wasAnimating=Boolean(animation);const computed=wasAnimating?getComputedStyle(dialog):null;const from={opacity:wasAnimating?computed.opacity:(opening?0:1),transform:wasAnimating?computed.transform:(opening?offset:'translate3d(0,0,0)')};cancelEffect();state=opening?'opening':'closing';dialog.dataset.motionState=state;
    /** Commit only the current animation intent. @returns {void} Settles dialog and releases temporary effects. */
    function complete(){if(token!==generation)return;if(!opening){finishClose();return;}cancelEffect();state='open';dialog.dataset.motionState='open';}
    if(!settings.enabled||preference.matches||!dialog.animate||document.hidden){complete();return;}
    try{animation=dialog.animate([from,{opacity:opening?1:0,transform:opening?'translate3d(0,0,0)':offset}],{duration:opening?settings.dialogOpen:settings.dialogClose,easing:settings.easing,fill:'both'});animation.finished.then(complete,()=>{});}catch{complete();}
  }
  /** Open or reverse an in-progress close. @param {HTMLElement} [trigger] Return-focus target. @returns {void} Maintains native modal isolation. */
  function open(trigger){if(state==='open'||state==='opening')return;if(!dialog.open){returnFocus=trigger||document.activeElement;lockScroll(dialog);try{dialog.showModal();}catch(error){unlockScroll(dialog);throw error;}options.onOpen?.();}transition(true);}
  /** Close or reverse an in-progress opening. @returns {void} Retains modality until effect completes. */
  function close(){if(state==='closed'||state==='closing')return;transition(false);}
  /** Route native Escape through cancellable close. @param {Event} event Cancel input. @returns {void} Prevents immediate native dismissal. */
  function handleCancel(event){event.preventDefault();close();}
  /** Handle external/native closure without reacting to stale close events after reopen. @returns {void} May finish restoration. */
  function handleNativeClose(){if(!dialog.open)finishClose();}
  /** Settle promptly when motion is no longer appropriate. @returns {void} Cancels opening or completes closing. */
  function handleStateChange(){if(!preference.matches&&!document.hidden)return;if(state==='closing')finishClose();else if(state==='opening'){generation++;cancelEffect();state='open';dialog.dataset.motionState='open';}}
  /** Dispose owned resources before reinitialization. @returns {void} Closes and aborts listeners. */
  function destroy(){finishClose();events.abort();controllers.delete(dialog);}
  dialog.addEventListener('cancel',handleCancel,{signal:events.signal});dialog.addEventListener('close',handleNativeClose,{signal:events.signal});preference.addEventListener('change',handleStateChange,{signal:events.signal});document.addEventListener('visibilitychange',handleStateChange,{signal:events.signal});window.addEventListener('pagehide',finishClose,{signal:events.signal});const controller={open,close,finishClose,destroy,get state(){return state;}};controllers.set(dialog,controller);return controller;
}
