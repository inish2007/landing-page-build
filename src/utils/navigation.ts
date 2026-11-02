/** Current page and parent section markers, including the existing Work aliases. */
export function navigationCurrent(current:string,path?:string):'page'|'location'|undefined {
 if(!path)return;
 const normalize=(value:string)=>'/'+value.split('/').filter(Boolean).join('/')+'/';
 const here=normalize(current),target=normalize(path);
 if(here===target)return 'page';
 if(target==='/available-art/'&&['/work/','/archived/'].includes(here))return 'location';
 if(target==='/collaborations/'&&['/pagerie-lana-gomez-luxury-bags/','/shay-lanagomez-luxury-jewelry-collection/'].includes(here))return 'location';
 return;
}
