/** Wire gallery modal without network requests. @returns {void} Registers click/keyboard/dialog handlers. */
export function initGallery() {
  const dialog = document.querySelector('#artwork-dialog');
  const data = document.querySelector('#artworks-data');
  if (!(dialog instanceof HTMLDialogElement) || !data) return;
  const items = JSON.parse(data.textContent);
  let index = 0; let opener = null; let previousOverflow = '';
  /** Render the selected artwork safely with textContent. @returns {void} Updates dialog image and labels. */
  function renderArtwork() { const item=items[index]; const image=dialog.querySelector('[data-lightbox-image]'); image.src=item.image.src;image.alt=item.image.alt;image.width=item.image.width;image.height=item.image.height;dialog.querySelector('#artwork-title').textContent=item.title;dialog.querySelector('[data-lightbox-caption]').textContent=item.caption; }
  /** Open the chosen item. @param {MouseEvent} event Trigger click. @returns {void} Opens modal, stores focus/overflow. */
  function openArtwork(event) { opener=event.currentTarget;index=items.findIndex(item=>item.id===opener.dataset.artwork);renderArtwork();previousOverflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden'; }
  /** Dismiss modal. @returns {void} Native close event restores page. */
  function closeArtwork() { dialog.close(); }
  /** Restore original scrolling/focus. @returns {void} Updates body overflow and DOM focus. */
  function restoreGallery() {document.body.style.overflow=previousOverflow;opener?.focus();}
  /** Select previous item with wraparound. @returns {void} Updates dialog content. */
  function previousArtwork(){index=(index-1+items.length)%items.length;renderArtwork();}
  /** Select next item with wraparound. @returns {void} Updates dialog content. */
  function nextArtwork(){index=(index+1)%items.length;renderArtwork();}
  /** Support arrow navigation. @param {KeyboardEvent} event Dialog input. @returns {void} May prevent default and select item. Native dialog contains Tab/Escape. */
  function handleGalleryKeydown(event){if(event.key==='ArrowLeft'){event.preventDefault();previousArtwork();}if(event.key==='ArrowRight'){event.preventDefault();nextArtwork();}}
  document.querySelectorAll('[data-artwork]').forEach(button=>button.addEventListener('click',openArtwork));
  dialog.querySelector('[data-lightbox-close]').addEventListener('click',closeArtwork);
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click',previousArtwork);
  dialog.querySelector('[data-lightbox-next]').addEventListener('click',nextArtwork);
  dialog.addEventListener('close',restoreGallery);dialog.addEventListener('keydown',handleGalleryKeydown);
}
initGallery();
