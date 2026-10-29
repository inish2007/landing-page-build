/** Initialize the single shared drawer. @returns {void} Registers DOM handlers and reveals the enhanced menu control. */
export function initNavigation() {
  const drawer = document.querySelector('#mobile-drawer');
  const opener = document.querySelector('[data-menu-open]');
  if (!(drawer instanceof HTMLDialogElement) || !(opener instanceof HTMLButtonElement)) return;
  const closer = drawer.querySelector('[data-menu-close]');
  const desktop = window.matchMedia('(min-width: 64rem)');
  let previousOverflow = '';
  let returnFocus = null;
  /** Open modal and lock background scrolling. @returns {void} Changes focus, body overflow and expanded state. */
  function openMenu() {
    if (drawer.open) return;
    returnFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    drawer.showModal();
    document.body.style.overflow = 'hidden';
    opener.setAttribute('aria-expanded', 'true');
  }
  /** Close the dialog; the close event restores page state. @returns {void} Closes modal. */
  function closeMenu() { if (drawer.open) drawer.close(); }
  /** Restore scroll and focus after every close path. @returns {void} Updates DOM focus and expanded state. */
  function restoreMenuState() {
    document.body.style.overflow = previousOverflow;
    opener.setAttribute('aria-expanded', 'false');
    if (returnFocus instanceof HTMLElement && returnFocus.getClientRects().length) returnFocus.focus();
    else document.querySelector('.brand')?.focus();
  }
  /** Keep Tab inside drawer, including reverse wrapping. @param {KeyboardEvent} event Keyboard input. @returns {void} May move focus and cancel default Tab behavior. */
  function handleMenuKeydown(event) {
    if (event.key !== 'Tab') return;
    const controls = [...drawer.querySelectorAll('a[href], button:not([disabled])')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  /** Dismiss on native Escape. @param {Event} event Dialog cancel event. @returns {void} Cancels native default and closes consistently. */
  function handleMenuCancel(event) { event.preventDefault(); closeMenu(); }
  /** Dismiss a backdrop click or selected link. @param {MouseEvent} event Click event. @returns {void} May close dialog. */
  function handleDrawerClick(event) {
    if (event.target instanceof Element && event.target.closest('a[href]')) closeMenu();
    if (event.target === drawer) {
      const bounds = drawer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMenu();
    }
  }
  /** Release modal when switching to desktop layout. @returns {void} May close drawer. */
  function handleViewportChange() { if (desktop.matches) closeMenu(); }
  opener.hidden = false;
  opener.addEventListener('click', openMenu);
  closer?.addEventListener('click', closeMenu);
  drawer.addEventListener('close', restoreMenuState);
  drawer.addEventListener('cancel', handleMenuCancel);
  drawer.addEventListener('keydown', handleMenuKeydown);
  drawer.addEventListener('click', handleDrawerClick);
  desktop.addEventListener('change', handleViewportChange);
}
initNavigation();
