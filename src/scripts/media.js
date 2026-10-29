/** Initialize local GIF controls with static defaults. @returns {void} Registers preference/button handlers and may start GIF unless reduced motion. */
export function initAnimatedMedia() {
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  for(const container of document.querySelectorAll('[data-animated-media]')){
    const image=container.querySelector('img');const button=container.querySelector('button');let playing=false;
    /** Set playback by switching between original GIF and poster. @param {boolean} value Playing state. @returns {void} Updates source, control label and aria state. */
    function setPlayback(value){playing=value;image.src=value?container.dataset.animationSrc:container.dataset.posterSrc;button.textContent=value?button.dataset.pauseLabel:button.dataset.playLabel;button.setAttribute('aria-pressed',String(value));}
    /** Toggle animation explicitly. @returns {void} Changes local image source only. */
    function togglePlayback(){setPlayback(!playing);}
    /** Stop animation when reduced motion is requested. @returns {void} Restores static poster. */
    function handleMediaPreference(){if(preference.matches)setPlayback(false);}
    button.hidden=false;button.addEventListener('click',togglePlayback);preference.addEventListener('change',handleMediaPreference);setPlayback(!preference.matches);
  }
}
initAnimatedMedia();
