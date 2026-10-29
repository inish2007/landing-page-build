/** Refresh only marked footer year spans from the visitor's local date. @returns {void} Idempotent DOM text updates; no timers, requests or event registration. */
export function updateCopyrightYear(){
  const year=String(new Date().getFullYear());
  for(const element of document.querySelectorAll('span[data-copyright-year]')){
    if(element.textContent!==year)element.textContent=year;
  }
}
