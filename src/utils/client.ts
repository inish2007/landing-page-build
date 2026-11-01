export interface ClientSettings {brandName:string;brandMark:string;contactEmail:string;instagramUrl:string;facebookUrl:string;copyright:string;designCredit:string}
/** Validate public client settings; no secrets, network calls or mutation. */
export function validateClientSettings(client:ClientSettings):void {
 for(const key of ['brandName','brandMark','contactEmail','instagramUrl','facebookUrl','copyright','designCredit'] as const)if(typeof client[key]!=='string')throw new Error('client.json: '+key+' must be text');
 if(!client.brandName.trim()||/[{}\r\n]/.test(client.brandName))throw new Error('client.json: enter a brandName without template braces or line breaks');
 if(!['','™','®'].includes(client.brandMark))throw new Error('client.json: brandMark must be empty, ™ or ®');
 if(client.contactEmail&&!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(client.contactEmail))throw new Error('client.json: contactEmail must be empty or a valid email address');
 for(const key of ['instagramUrl','facebookUrl'] as const){if(!client[key])continue;let url:URL;try{url=new URL(client[key]);}catch{throw new Error('client.json: '+key+' must be a full https URL or empty');}if(url.protocol!=='https:'||url.username||url.password||/[\s\\]/.test(client[key]))throw new Error('client.json: '+key+' must be a full https URL without credentials');}
 if((client.copyright.match(/\{year\}/g)||[]).length!==1)throw new Error('client.json: copyright must include exactly one {year}');
}
/** A blank inbox has no submission endpoint. Email-only setup uses FormSubmit native POST. */
export function getContactAction(email:string):string|undefined {return email?'https://formsubmit.co/'+encodeURIComponent(email):undefined;}
/** Resolve public copy/social templates once, including components that read site.text directly. */
export function createClientContent<T,N extends {social:{id:string;url?:string}[]}>(text:T,navigation:N,client:ClientSettings):{text:T;navigation:N}{
 validateClientSettings(client);
 const tokens:Record<string,string>={brandName:client.brandName,brandUpperName:client.brandName.toUpperCase(),brandDisplayName:client.brandName+client.brandMark,contactEmail:client.contactEmail,instagramUrl:client.instagramUrl,facebookUrl:client.facebookUrl,designCredit:client.designCredit,contactPrivacy:client.contactEmail?'Enquiries are sent to the studio through FormSubmit, which processes your name, email address and message. This website includes no analytics or tracking scripts.':'Enquiries are not enabled yet. This website includes no analytics or tracking scripts and does not send or store form entries.'};
 tokens.copyright=client.copyright.replace(/\{brandName\}/g,()=>client.brandName).replace(/\{brandMark\}/g,()=>client.brandMark);
 function resolve(value:unknown):unknown{if(typeof value==='string')return value.replace(/\{([A-Za-z]+)\}/g,(match,key)=>tokens[key]??match);if(Array.isArray(value))return value.map(resolve);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,child])=>[key,resolve(child)]));return value;}
 const resolved=resolve(navigation) as N;resolved.social=resolved.social.filter(link=>Boolean(link.url));return{text:resolve(text) as T,navigation:resolved};
}
