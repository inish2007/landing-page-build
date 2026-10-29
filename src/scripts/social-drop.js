/** Browser-local preference key; no account, cookie or network synchronization. */
export const SOCIAL_DROP_STORAGE_KEY='site:home:social-drop-direction';
/** Choose/store the next ordered-drop direction once per eligible document load (caller owns caching/gates). @param {Pick<Storage,'getItem'|'setItem'>} storage Browser localStorage or isolated test storage. @param {boolean} alternateOnLoad Whether to alternate. @returns {'forward'|'reverse'} Forward on missing/invalid/unavailable storage; disabled alternation does not write. */
export function chooseSocialDropDirection(storage,alternateOnLoad=true){
  if(!alternateOnLoad)return 'forward';
  try{const previous=storage.getItem(SOCIAL_DROP_STORAGE_KEY);const direction=previous==='forward'?'reverse':'forward';storage.setItem(SOCIAL_DROP_STORAGE_KEY,direction);return direction;}catch{return 'forward';}
}
