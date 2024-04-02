// @ts-check

/** @type {import('crx-monkey').NonLoadedCrxMonkeyConfig} */
const config = {
  importIconToUsercript: true,
  esBuildOptions: {
    // ESbuild options
    bundle: true,
    minify: false,
  },
  devServer: {
    port: 3000,
    host: "localhost",
    websocket: 3001,
  },
  publicDir: "./assets",
  userscriptInjectPage: ["src/index.ts"],
  userScriptHeader: [
    ["@name:zh-CN", "恢復 YouTube 评论用户名"],
    ["@name:zh-TW", "恢復 YouTube 評論名稱"],
    ["@description:zh-TW", "此腳本將 YouTube 評論部分中的“handle”替換為用戶名"],
    ["@description:zh-CN", "此脚本将 YouTube 评论部分中的“handle”替换为用户名"],
    ["@author", "yakisova41"],
    ["@namespace", "https://yt-returnname-api.pages.dev/extension/"],
    ["@grant", "unsafeWindow"],
    ["@license", "MIT"],
  ],
};

export default config;
