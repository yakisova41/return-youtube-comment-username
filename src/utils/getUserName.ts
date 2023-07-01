import { XMLParser } from "fast-xml-parser";

export async function getUserName(id: string): Promise<string> {
  const data = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
    {
      method: "GET",
      cache: "default",
      keepalive: false,
    }
  )
    .then(async (res) => await res.text())
    .then((text) => {
      const parser = new XMLParser();
      const data = parser.parse(text);
      return data.feed.title;
    });
  return data;
}
