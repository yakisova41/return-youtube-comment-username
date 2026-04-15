import { debugErr } from "./debugLog";
import { decodeString } from "./escapeString";

let isUseFeed = true;
const isStudio:boolean = window.location.hostname === "studio.youtube.com";

export async function getUserName(id: string): Promise<string> {
  /**
   * RSSフィードが障害時に、フロントエンドのAPIに切り替え
   */
  return new Promise((resolve) => {
    if (isUseFeed && !isStudio) {
      fetchFeed(id)
        .then((name) => {
          resolve(name);
        })
        .catch(() => {
          isUseFeed = false;

          debugErr(
            new Error("Catch Feed API Error, so change to Browse mode."),
          );

          fetchBrowse(id).then((name) => {
            resolve(name);
          });
        });
    } else {
      fetchBrowse(id).then((name) => {
        resolve(name);
      });
    }
  });
}

/**
 * RSSフィードから名前を取得
 * 20ミリ秒程度で高速
 */
async function fetchFeed(id: string) {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
    {
      method: "GET",
      cache: "default",
      keepalive: true,
    },
  );

  if (res.status !== 200) {
    throw new Error(`[rycu] Feed API Error\nstatus: ${res.status}`);
  }

  const text = await res.text();

  const match = text.match("<title>([^<].*)</title>");
  if (match !== null) {
    return decodeString(match[1]);
  } else {
    debugErr("XML title not found");
    return "";
  }
}

/**
 * YouTubeのフロントエンドで使用されているAPIから名前を取得
 * 100ミリ秒程度と低速
 */
async function fetchBrowse(id: string) {
  return await fetch(
    `https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "en",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20240411.01.00",
          },
          user: { lockedSafetyMode: false },
          request: {
            useSsl: true,
          },
        },
        browseId: id,
      }),
    },
  )
    .then(async (res) => {
      if (res.status !== 200)
        throw debugErr(new Error(`Browse API Error\nstatus: ${res.status}`));
      return await res.json();
    })
    .then((text) => {
      const name: string = text.header.pageHeaderRenderer.pageTitle;

      return decodeString(name);
    });
}
