export function escapeString(text: string): string {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(`"`, `&quot;`)
    .replaceAll(`'`, `&apos;`);
}
