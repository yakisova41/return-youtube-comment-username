import { debugLog, debugErr } from "./debugLog";
import { decodeString } from "./escapeString";

export async function getUserName(id: string): Promise<string> {
  debugLog("Get name");

  const data = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
    {
      method: "GET",
      cache: "default",
      keepalive: true,
    }
  )
    .then(async (res) => {
      if (res.status !== 200) throw new Error(`API Status is ${res.status}`);
      return await res.text();
    })
    .then((text) => {
      const match = text.match("<title>([^<].*)</title>");
      if (match !== null) {
        return decodeString(match[1]);
      } else {
        debugErr("XML title not found");
        return "";
      }
    });
  return data;
}
