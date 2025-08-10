// @ts-check

/** @type {import('crx-monkey').CrxMonkeyManifest} */
export default {
  name: "__MSG_Name__",
  short_name: "name",
  version: "0.6.2",
  manifest_version: 3,
  description: "__MSG_Description__",
  default_locale: "en",
  icons: {
    16: "assets/icon16.png",
    48: "assets/icon48.png",
    128: "assets/icon128.png",
  },
  permissions: ["storage"],
  content_scripts: [
    {
      matches: ["https://www.youtube.com/*"],
      js: ["src/index.ts"],
      world: "MAIN",
      run_at: "document_end",
      connection_isolated: true,
      userscript_direct_inject: true,
      trusted_inject: true,
    },
  ],

  action: {
    default_popup: "popup/index.html",
  },
  background: {
    service_worker: "sw/sw.ts",
  },
};
