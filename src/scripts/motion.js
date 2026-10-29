/** Shared once-only opacity entry; visible defaults protect no-JS and API failure cases. @returns {void} Registers observer/preference listeners and temporary Web Animations. */
export function initMotion() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const settings = getComputedStyle(document.documentElement);
  const duration = parseFloat(settings.getPropertyValue('--motion-entry-duration')) || 1500;
  const step = parseFloat(settings.getPropertyValue('--motion-entry-stagger')) || 11.1111;
  const active = new Set();
  const seen = new WeakSet();
  /** Fade a visible, unfocused entry unit once. @param {Element} element Entry unit. @param {number} delay Milliseconds. @returns {void} Starts temporary opacity animation with no persistent hidden style. */
  function fadeElement(element, delay = 0) {
    if (preference.matches || seen.has(element)) return;
    seen.add(element);
    if (element.contains(document.activeElement)) return;
    const animation = element.animate([{opacity:0},{opacity:1}], {duration,delay,easing:'ease',fill:'none'});
    active.add(animation);
    animation.finished.then(() => active.delete(animation), () => active.delete(animation));
  }
  /** Animate entry units and release observation after entry. @param {IntersectionObserverEntry[]} entries Visibility records. @returns {void} Starts fades and unobserves visible nodes. */
  function handleEntries(entries) {
    let index = 0;
    for (const entry of entries) if (entry.isIntersecting) { fadeElement(entry.target,Math.min(index++ * step,100)); observer.unobserve(entry.target); }
  }
  const observer = new IntersectionObserver(handleEntries,{threshold:0.05});
  /** Release running animation immediately for reduced motion. @returns {void} Cancels active effects, leaving base content visible. */
  function handleMotionPreference() { if (preference.matches) { for (const animation of active) animation.cancel(); active.clear(); } }
  preference.addEventListener('change',handleMotionPreference);
  document.querySelectorAll('.site-header .brand, .desktop-nav > a').forEach((element,index) => fadeElement(element,index * step));
  document.querySelectorAll('main > section > .image-frame, .intro-copy, .collaboration-copy, .home-collage > *, .page-heading, .editorial-block, .editorial-grid > .image-frame, .editorial-image-grid > .image-frame, .gallery-card, .feature-card, .contact-form').forEach(element => observer.observe(element));
}
initMotion();
