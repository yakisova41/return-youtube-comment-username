const packagejson = require("./package.json");
const path = require("path");
const fs = require("fs");

function getIconBase64() {
  const icon = fs.readFileSync(path.join(__dirname, "./assets/icon128.png"));
  const buf = Buffer.from(icon).toString("base64");
  return `data:image/png;base64,${buf}`;
}

module.exports = {
  userScriptHeader: [
    ["@name", "Return YouTube Comment Username"],
    ["@name:ja", "YouTubeコメント欄の名前を元に戻す"],
    ["@name:zh-CN", "恢復 YouTube 评论用户名"],
    ["@name:zh-TW", "恢復 YouTube 評論名稱"],
    [("@version", packagejson.version)],
    ["@author", "yakisova41"],
    ["@license", packagejson.license],
    ["@icon", getIconBase64()],
    ["@namespace", "https://rycu.yakisova.com"],
    [
      "@description",
      'This script replaces the "handle" in the YouTube comments section to user name',
    ],
    [
      "@description:ja",
      "YouTubeのコメント欄の名前をハンドル(@...)から元のユーザー名に書き換えます",
    ],
    ["@description:zh-TW", "此腳本將 YouTube 評論部分中的“handle”替換為用戶名"],
    ["@description:zh-CN", "此脚本将 YouTube 评论部分中的“handle”替换为用户名"],
    ["@match", "https://www.youtube.com/*"],
    ["@grant", "unsafeWindow"],
    ["@run-at", "document-end"],
  ],
  devServer: {
    port: 5173,
    host: "localhost",
    websocket: 5174,
  },
  manifest: {
    name: "__MSG_Name__",
    short_name: "name",
    version: String(packagejson.version),
    manifest_version: 3,
    description: "__MSG_Description__",
    default_locale: "en",
    icons: {
      16: "assets/icon16.png",
      48: "assets/icon48.png",
      128: "assets/icon128.png",
    },
  },
  locales: {
    ja: {
      Name: {
        message: "YouTubeコメント欄の名前を元に戻す",
      },
      Description: {
        message:
          "YouTubeのコメント欄の名前をハンドルからユーザー名に書き換えます。",
      },
    },
    en: {
      Name: {
        message: "Return YouTube Comment Username",
      },
      Description: {
        message:
          'This script replaces the "handle" in the YouTube comments section to user name',
      },
    },
  },
  assetsDir: path.join(__dirname, "assets"),
  noSandbox: true,
};
