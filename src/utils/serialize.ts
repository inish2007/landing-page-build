/** Serialize data for a non-executable HTML script element. @param value JSON-compatible data. @returns Escaped JSON; throws for unsupported input, no side effects. */
export function serializeJsonForHtml(value:unknown):string {
  const json=JSON.stringify(value);
  if(json===undefined)throw new TypeError('Expected JSON-compatible data');
  return json.replace(/[<>&\u2028\u2029]/g,character=>String.fromCharCode(92)+'u'+character.charCodeAt(0).toString(16).padStart(4,'0'));
}
