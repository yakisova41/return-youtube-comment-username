export function escapeString(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, `&quot;`)
    .replace(/'/g, `&#39;`)
    .replace(/&/g, `&amp;`);
}

export function decodeString(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, `"`)
    .replace(/&#39;/g, `'`)
    .replace(/&amp;/g, `&`);
}
