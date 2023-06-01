export async function handleToName(handle: string): Promise<string> {
  const res = await fetch(`https://www.youtube.com/${handle}/about`);
  const text = await res.text();
  const parser = new DOMParser();
  const dom = parser.parseFromString(text, "text/html");

  const ogtitle = dom.querySelector(`meta[property="og:title"]`);
  const name = ogtitle?.getAttribute("content");

  if (typeof name === "string") {
    return name;
  } else {
    return "ERROR";
  }
}
