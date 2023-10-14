import { debugErr, debugLog } from "./debugLog";
import { decodeString } from "./escapeString";

let isUseFeed = true;

export async function getUserName(id: string): Promise<string> {
  /**
   * RSSフィードが障害時に、フロントエンドのAPIに切り替え
   */
  return new Promise((resolve) => {
    if (isUseFeed) {
      debugLog("Get name by Feed");

      fetchFeed(id)
        .then((name) => {
          resolve(name);
        })
        .catch(() => {
          isUseFeed = false;

          debugErr("Catch Feed API Error");

          fetchBrowse(id).then((name) => {
            resolve(name);
          });
        });
    } else {
      debugLog("Get name by Browse");

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
  return await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
    {
      method: "GET",
      cache: "default",
      keepalive: true,
    },
  )
    .then(async (res) => {
      if (res.status !== 200)
        throw new Error(`Feed API Error\nstatus: ${res.status}`);
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
        cache: "default",
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en",
        "content-type": "application/json",
        dnt: "1",
        referer: `https://www.youtube.com/channel/${id}`,
      },
      body: JSON.stringify({
        context: {
          client: {
            hl: window.yt.config_.HL,
            gl: window.yt.config_.GL,
            clientName: "WEB",
            clientVersion: "2.20230628.01.00",
            platform: "DESKTOP",
            acceptHeader:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          },
          user: { lockedSafetyMode: false },
          request: {
            useSsl: true,
          },
        },
        browseId: id,
        params: "EgVhYm91dPIGBAoCEgA%3D",
      }),
    },
  )
    .then(async (res) => {
      if (res.status !== 200)
        throw new Error(`Browse API Error\nstatus: ${res.status}`);
      return await res.json();
    })
    .then((text) => {
      const name: string = text.header.c4TabbedHeaderRenderer.title;

      return decodeString(name);
    });
}
