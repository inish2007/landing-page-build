import type { SiteConfiguration } from './site.ts';
/** Serialize configured tokens and local font faces without changing component CSS. @param config Central site configuration. @returns CSS for the document head; pure, no browser or filesystem access. */
export function createThemeCss(config:SiteConfiguration):string {
  const {colors,typography,spacing,layout,motion}=config.theme;
  const fonts=typography.fonts;
  const variables:Record<string,string|number>={
    '--color-canvas':colors.background,'--color-surface':colors.surface,'--color-text':colors.text,'--color-muted':colors.secondary,'--color-border':colors.border,'--color-accent':colors.primary,'--color-accent-text':colors.accentText,'--color-focus':colors.focus,
    '--color-subtle':colors.subtleBackground,'--color-on-media':colors.onMedia,'--color-shadow':colors.shadow,'--color-overlay':colors.overlay,'--color-modal-overlay':colors.modalOverlay,
    '--font-serif':JSON.stringify(fonts.primary.family)+', '+fonts.primary.fallback,'--font-sans':JSON.stringify(fonts.secondary.family)+', '+fonts.secondary.fallback,'--font-brand':JSON.stringify(fonts.brand.family)+', '+fonts.brand.fallback,
    '--font-weight-regular':typography.weights.regular,'--font-weight-heading':typography.weights.heading,'--font-weight-brand':typography.weights.brand,'--font-weight-strong':typography.weights.strong,
    '--line-body':typography.lineHeights.body,'--line-heading':typography.lineHeights.heading,'--line-display':typography.lineHeights.display,'--line-brand':typography.lineHeights.brand,
    '--tracking-heading':typography.tracking.heading,'--tracking-editorial':typography.tracking.editorial,
    '--content-max':layout.maxWidth,'--content-narrow':layout.narrowWidth,'--page-gutter':layout.pageGutter,
    '--playful-enabled':motion.playful.enabled?1:0,'--playful-hover-duration':motion.playful.hoverDuration+'ms','--playful-card-lift':motion.playful.cardLift+'px','--playful-card-tilt':motion.playful.cardTilt+'deg','--playful-card-scale':motion.playful.cardScale,'--playful-press-scale':motion.playful.pressScale,'--playful-arrow-travel':motion.playful.arrowTravel+'px','--playful-reveal-travel':motion.playful.revealTravel,'--playful-accent-duration':motion.playful.accentDuration,
    '--motion-enabled':motion.enabled?1:0,'--motion-max-stagger':motion.maxStagger,'--motion-max-concurrent':motion.maxConcurrent,'--motion-dialog-open':motion.dialogOpen,'--motion-dialog-close':motion.dialogClose,'--motion-page-duration':motion.pageDuration+'ms','--motion-entry-duration':motion.entryDuration,'--motion-entry-stagger':motion.entryStagger,'--motion-fast':motion.fast,'--motion-standard':motion.standard,'--motion-ease':motion.easing,
  };
  for(const [name,value]of Object.entries(typography.sizes))variables['--text-'+name]=value;
  for(const [name,value]of Object.entries(spacing))variables['--space-'+name]=value;
  for(const value of Object.values(variables))if(/[{};<>]/.test(String(value)))throw new Error('Invalid CSS token in site.ts');
  const root=':root{'+Object.entries(variables).map(([key,value])=>key+':'+value).join(';')+'}';
  const faces=Object.values(fonts).flatMap(font=>font.faces.map(face=>'@font-face{font-family:'+JSON.stringify(font.family)+';src:url('+JSON.stringify(face.src)+') format('+JSON.stringify(face.format)+');font-weight:'+face.weight+';font-style:'+face.style+';font-display:swap}')).join('');
  const navigation = motion.enabled && motion.pageTransitions ? '@media (prefers-reduced-motion: no-preference){@view-transition{navigation:auto}}' : '';
  return (root+faces+navigation).replace(/</g,'\\3c ');
}
