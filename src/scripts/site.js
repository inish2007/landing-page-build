import {createDialogController} from './dialog.js';
let disposeNavigation;
/** Initialize accessible responsive navigation. @returns {void} Owns abortable input handlers and shared cancellable dialog transitions. */
export function initNavigation(){disposeNavigation?.();const drawer=document.querySelector('#mobile-drawer');const opener=document.querySelector('[data-menu-open]');if(!(drawer instanceof HTMLDialogElement)||!(opener instanceof HTMLButtonElement))return;const events=new AbortController();const desktop=matchMedia('(min-width: 64rem)');const controller=createDialogController(drawer,{axis:'x',distance:16,onOpen:()=>{opener.setAttribute('aria-expanded','true');if(typeof Element.prototype.animate==='function'&&typeof IntersectionObserver==='function')drawer.setAttribute('data-drawer-glow','');},onClosed:()=>{opener.setAttribute('aria-expanded','false');drawer.removeAttribute('data-drawer-glow');}});
  /** Open/reopen drawer. @returns {void} Delegates lifecycle and preserves trigger focus. */
  function openMenu(){controller.open(opener);}
  /** Request cancellable close. @returns {void} Delegates native-modal cleanup. */
  function closeMenu(){controller.close();}
  /** Keep Tab inside controls throughout opening/closing. @param {KeyboardEvent} event Input. @returns {void} May move focus. */
  function handleMenuKeydown(event){if(event.key!=='Tab')return;const controls=[...drawer.querySelectorAll('a[href],button:not([disabled])')];if(event.shiftKey&&document.activeElement===controls[0]){event.preventDefault();controls.at(-1)?.focus();}else if(!event.shiftKey&&document.activeElement===controls.at(-1)){event.preventDefault();controls[0]?.focus();}}
  /** Dismiss selected links/backdrop without intercepting navigation. @param {MouseEvent} event Input. @returns {void} May request close. */
  function handleDrawerClick(event){if(event.target instanceof Element&&event.target.closest('a[href]'))closeMenu();if(event.target===drawer){const r=drawer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeMenu();}}
  /** Release drawer immediately at desktop breakpoint. @returns {void} Preserves focus/scroll cleanup. */
  function handleViewportChange(){if(desktop.matches)controller.finishClose();}
  /** Release previous initialization. @returns {void} Closes controller and aborts listeners. */
  function dispose(){events.abort();controller.destroy();}
  opener.hidden=false;opener.addEventListener('click',openMenu,{signal:events.signal});drawer.querySelector('[data-menu-close]')?.addEventListener('click',closeMenu,{signal:events.signal});drawer.addEventListener('keydown',handleMenuKeydown,{signal:events.signal});drawer.addEventListener('click',handleDrawerClick,{signal:events.signal});desktop.addEventListener('change',handleViewportChange,{signal:events.signal});disposeNavigation=dispose;
}
initNavigation();
