import { debugErr } from "./debugLog";
import { decodeString } from "./escapeString";
import { RycuSettings } from "../types/RycuSettings";

export async function getUserName(id: string, settings: RycuSettings = window.__rycu.settings): Promise<string> {
  /**
   * APIキーが設定されている場合､ APIからの取得を試みる､それ以外の場合､
   * RSSフィードが障害時に、フロントエンドのAPIに切り替え
   */
  if (settings.apiKeyForWWW && window.location.hostname === 'www.youtube.com') {
    try {
      const apiKey = settings.apiKeyForWWW;
      return await fetchApiFromChannelId(id, apiKey);
    } catch (e) {
      debugErr("API fetch failed, falling back to RSS/Browse\n" + e);
    }
  }
  else if (settings.apiKeyForStudio && window.location.hostname === 'studio.youtube.com') {
    try {
      const apiKey = settings.apiKeyForStudio;
      return await fetchApiFromChannelId(id, apiKey);
    } catch (e) {
      debugErr("API fetch failed, falling back to RSS/Browse\n" + e);
    }
  }


  try {
    return await fetchFeed(id);
  } catch (e) {
    debugErr("RSS fetch failed, falling back to Browse\n" + e);
  }

  return await fetchBrowse(id);
}

export async function getUserNameFromHandle(handle: string): Promise<string> {
  return await fetch(`https://www.youtube.com/@${handle}`, {
    method: "GET",
    cache: "default",
    keepalive: true,
  })
    .then(async (res) => {
      if (res.status !== 200)
        throw debugErr(new Error(`Handle fetch Error\nstatus: ${res.status}`));
      return await res.text();
    })
    .then((text) => {
      const match = text.match(/<meta property="og:title" content="([^"]+)"/);
      if (match) {
        return decodeString(match[1]);
      } else {
        throw debugErr(new Error("og:title not found"));
      }
    });
}

export async function fetchApiFromHandle(handle: string, apiKey: string): Promise<string> {
  const cacheName:string = 'youtube data api cache';
  const cache: Cache = await caches.open(cacheName);
  // YouTube Data API v3 endpoint for fetching channel details by handle
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${handle}&key=${apiKey}&fields=items(snippet(title))`;

  // Search in cache first
  const cachedResponse = await cache.match(url);
  if (cachedResponse) {
    const data = await cachedResponse.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.title;
    }
  }


  const res = await fetch(url);
  if (!res.ok) {
    throw debugErr(new Error(`API Error: ${res.status}`));
  }
  // Cache the successful response for future use
  await cache.put(url, res.clone());
  const data = await res.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.title;
  } else {
    throw debugErr(new Error("Channel not found"));
  }
}

export async function fetchApiFromChannelId(channelId: string, apiKey: string): Promise<string> {
  const cacheName:string = 'youtube data api cache';
  const cache: Cache = await caches.open(cacheName);
  // YouTube Data API v3 endpoint for fetching channel details by ID
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}&fields=items(snippet(title))`;

  // Search in cache first
  const cachedResponse = await cache.match(url);
  if (cachedResponse) {
    const data = await cachedResponse.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.title;
    }
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw debugErr(new Error(`API Error: ${res.status}`));
  }
  // Cache the successful response for future use
  await cache.put(url, res.clone());
  const data = await res.json();
  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.title;
  } else {
    throw debugErr(new Error("Channel not found"));
  }
}

/**
 * RSSフィードから名前を取得
 * 20ミリ秒程度で高速
 */
async function fetchFeed(id: string): Promise<string> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`,
  );
  if (res.status !== 200) {
    throw debugErr(new Error(`Feed fetch Error\nstatus: ${res.status}`));
  }
  const text = await res.text();
  const match = text.match(/<name>([^<]+)<\/name>/);
  if (match) {
    return decodeString(match[1]);
  } else {
    throw debugErr(new Error("Feed name not found"));
  }
}

/**
 * YouTubeのフロントエンドで使用されているAPIから名前を取得
 * 100ミリ秒程度と低速
 */
async function fetchBrowse(id: string): Promise<string> {
  const res = await fetch("https://www.youtube.com/youtubei/v1/browse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20210721.00.00",
        },
      },
      browseId: id,
    }),
  });
  if (res.status !== 200) {
    throw debugErr(new Error(`Browse fetch Error\nstatus: ${res.status}`));
  }
  const text = await res.json();
  const name =
    text?.header?.pageHeaderRenderer?.pageTitle ||
    text?.metadata?.channelMetadataRenderer?.title;
  if (name) {
    return decodeString(name);
  } else {
    throw debugErr(new Error("Browse name not found"));
  }
}
