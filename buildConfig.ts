import packagejson from "./package.json";

export const userScriptHeader = {
  "@name": "Return YouTube Comment Username",
  "@name:ja": "YouTubeコメント欄の名前を元に戻す",
  "@version": packagejson.version,
  "@author": "yakisova41",
  "@license": packagejson.license,
  "@namespace": "https://yt-returnname-api.pages.dev/extension/",
  "@description":
    "This is to change the handle in the YouTube comments section to a username.",
  "@description:ja":
    "YouTubeのコメント欄の名前がハンドル(@...)表記になってしまった場合に、元のユーザーネームに上書きします。",
  "@match": "https://www.youtube.com/*",
  "@grant": "none",
};

export const devServer = {
  port: 5173,
  host: "localhost",
  websocket: 5174,
  hot: true,
};

/**
 * Chrome extension support
 * manifest v3
 */
export const manifest = {
  name: "__MSG_Name__",
  short_name: "name",
  version: packagejson.version,
  manifest_version: 3,
  description: "__MSG_Description__",
  content_scripts: [
    {
      matches: ["https://www.youtube.com/*"],
      js: ["contentScript.js"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["embed.js"],
      matches: ["https://www.youtube.com/*"],
    },
  ],
  default_locale: "en",
  icons: {
    "16": "assets/icon16.png",
    "48": "assets/icon48.png",
    "128": "assets/icon128.png",
  },
};
