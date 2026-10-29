import {createDialogController} from './dialog.js';
let disposeGallery;
/** Bind gallery to the shared cancellable modal controller. @returns {void} Registers abortable controls and renders local data with textContent. */
export function initGallery(){disposeGallery?.();const dialog=document.querySelector('#artwork-dialog');const data=document.querySelector('#artworks-data');if(!(dialog instanceof HTMLDialogElement)||!data)return;const items=JSON.parse(data.textContent);if(!items.length)return;const events=new AbortController();const controller=createDialogController(dialog,{axis:'y',distance:8});let index=0;
  /** Render current item safely. @returns {void} Updates image and text only. */
  function renderArtwork(){const item=items[index];const image=dialog.querySelector('[data-lightbox-image]');image.src=item.image.src;image.alt=item.image.alt;image.width=item.image.width;image.height=item.image.height;dialog.querySelector('#artwork-title').textContent=item.title;dialog.querySelector('[data-lightbox-caption]').textContent=item.caption;}
  /** Open chosen artwork or reverse closure. @param {MouseEvent} event Trigger. @returns {void} Renders and delegates focus/scroll ownership. */
  function openArtwork(event){index=items.findIndex(item=>item.id===event.currentTarget.dataset.artwork);if(index<0)return;renderArtwork();controller.open(event.currentTarget);}
  /** Request close. @returns {void} Retains native modality through closing. */
  function closeArtwork(){controller.close();}
  /** Select previous record with wraparound. @returns {void} Updates dialog content. */
  function previousArtwork(){index=(index-1+items.length)%items.length;renderArtwork();}
  /** Select next record with wraparound. @returns {void} Updates dialog content. */
  function nextArtwork(){index=(index+1)%items.length;renderArtwork();}
  /** Support arrows; native modal contains Tab/Escape. @param {KeyboardEvent} event Input. @returns {void} May change selected item. */
  function handleGalleryKeydown(event){if(event.key==='ArrowLeft'){event.preventDefault();previousArtwork();}if(event.key==='ArrowRight'){event.preventDefault();nextArtwork();}}
  /** Release previous initialization. @returns {void} Aborts handlers and destroys modal controller. */
  function dispose(){events.abort();controller.destroy();}
  document.querySelectorAll('[data-artwork]').forEach(button=>button.addEventListener('click',openArtwork,{signal:events.signal}));dialog.querySelector('[data-lightbox-close]').addEventListener('click',closeArtwork,{signal:events.signal});dialog.querySelector('[data-lightbox-prev]').addEventListener('click',previousArtwork,{signal:events.signal});dialog.querySelector('[data-lightbox-next]').addEventListener('click',nextArtwork,{signal:events.signal});dialog.addEventListener('keydown',handleGalleryKeydown,{signal:events.signal});disposeGallery=dispose;
}
initGallery();
