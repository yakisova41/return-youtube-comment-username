export function escapeString(text: string): string {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(`"`, `&quot;`)
    .replaceAll(`'`, `&#39;`);
}

export function decodeString(text: string): string {
  return text
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll(`&quot;`, `"`)
    .replaceAll(`&#39;`, `'`);
}
