/** Bind local-only form validation. @returns {void} Reveals submit control, prevents network submission and reports local status. */
export function initContactForm(){const form=document.querySelector('[data-contact-form]');if(!(form instanceof HTMLFormElement))return;
  /** Validate and report preview status without network/storage. @param {SubmitEvent} event Submit attempt. @returns {void} Prevents default and updates status. */
  function handleInquirySubmit(event){event.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-contact-status]');status.textContent=status.dataset.validMessage;}
  /** Clear stale preview status after editing. @returns {void} Updates local status text. */
  function clearInquiryStatus(){form.querySelector('[data-contact-status]').textContent='';}
  form.addEventListener('submit',handleInquirySubmit);form.addEventListener('input',clearInquiryStatus);form.querySelector('[data-contact-submit]').hidden=false;
}
initContactForm();
