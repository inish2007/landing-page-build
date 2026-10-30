/** Track touch/pen press state without capturing input, preventing defaults or delaying links. */
let disposePress;
/** Initialize idempotent delegated press feedback; CSS owns all animation. @returns {void} */
export function initTextLinkPress(){
  disposePress?.();
  const events=new AbortController();let target;let pointer;
  /** Clear transient state on release, scroll gesture, cancellation or page lifecycle exit. */
  function clear(){target?.removeAttribute('data-link-pressed');target=undefined;pointer=undefined;}
  /** Use only primary direct input; mouse and keyboard retain native :active behavior. */
  function start(event){
    clear();if(!event.isPrimary||event.button!==0||!['touch','pen'].includes(event.pointerType)||!(event.target instanceof Element))return;
    const owner=event.target.closest('a[data-link-feedback],[data-link-feedback="caption"]');
    if(!owner||owner.closest('[aria-disabled="true"]'))return;
    target=owner;pointer=event.pointerId;target.setAttribute('data-link-pressed','');
  }
  /** A moving finger may be scrolling: stop feedback immediately without intercepting it. */
  function end(event){if(event.pointerId===pointer)clear();}
  document.addEventListener('pointerdown',start,{passive:true,signal:events.signal});
  for(const type of ['pointerup','pointercancel','pointermove'])document.addEventListener(type,end,{passive:true,signal:events.signal});
  for(const type of ['contextmenu','visibilitychange'])document.addEventListener(type,clear,{signal:events.signal});
  for(const type of ['blur','pagehide','pageshow'])window.addEventListener(type,clear,{signal:events.signal});
  disposePress=()=>{clear();events.abort();};
}
initTextLinkPress();
