/** Native POST preserves captcha and no-JavaScript support; never claims local validation is delivery. */
export function initContactForm(){
 const form=document.querySelector('[data-contact-form]');if(!(form instanceof HTMLFormElement))return;
 const button=form.querySelector('[data-contact-submit]'),status=form.querySelector('[data-contact-status]');let pending=false;
 function restore(){pending=false;button.disabled=form.dataset.contactReady!=='true';form.removeAttribute('aria-busy');status.textContent='';}
 function handleInquirySubmit(event){if(form.dataset.contactReady!=='true'||pending){event.preventDefault();return;}if(!form.reportValidity()){event.preventDefault();return;}pending=true;button.disabled=true;form.setAttribute('aria-busy','true');status.textContent=status.dataset.sendingMessage;}
 form.addEventListener('submit',handleInquirySubmit);window.addEventListener('pageshow',restore);restore();
}
initContactForm();
