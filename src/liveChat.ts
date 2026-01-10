import { getRunningRuntime } from "crx-monkey";
import { getUserName } from "./utils/getUserName";
import { formatUserName } from "./utils/formatUserName";
import { syncSettings } from "./types/SyncSettings";
import { RycuSettings } from "./types/RycuSettings";

if (getRunningRuntime() === "Extension") {
  syncSettings(parent.window.__rycu.settings);
}

const asyncSyncSettings =
  getRunningRuntime() === "Extension"
    ? async (settings: RycuSettings) => {
        Promise.resolve().then(() => syncSettings(settings));
      }
    : async (settings: RycuSettings) => {};

const chat = document.querySelector("#chat");
const cache: Record<string, string> = {};

if (chat !== null) {
  const itemList = chat.querySelector("#item-list");

  if (itemList !== null) {
    startRewriting();

    const itemListOb = new MutationObserver(() => {
      // Change top chat or all chat.
      startRewriting();
    });

    itemListOb.observe(itemList, {
      childList: true,
      attributes: true,
    });
  }
}

function startRewriting() {
  const scroller = document.querySelector("#item-scroller");

  if (scroller !== null) {
    const items = scroller.querySelector("#items");
    if (items !== null) {
      const messageRenderers = document.querySelectorAll(
        "yt-live-chat-text-message-renderer",
      );
      rewrite(messageRenderers);

      const observer = new MutationObserver((record) => {
        const nodes = record[0].addedNodes as NodeListOf<Element>;

        rewrite(nodes);
      });

      observer.observe(items, {
        characterData: true,
        childList: true,
      });
    }
  }
}

function rewrite(nodes: NodeListOf<Element>, async: boolean = true) {
  if (async) {
    asyncSyncSettings(parent.window.__rycu.settings).then(() => {
      handleRewrite(nodes);
    });
  } else {
    if (getRunningRuntime() === "Extension") {
      syncSettings(parent.window.__rycu.settings);
    }

    handleRewrite(nodes);
  }
}

function handleRewrite(nodes: NodeListOf<Element>) {
  const settings = parent.window.__rycu.settings;

  if (!settings.isReplaceLiveChats) {
    return;
  }

  nodes.forEach((node) => {
    const nameElem = node.querySelector("#author-name");
    if (nameElem !== null) {
      const msgData = nameElem.__shady.parentNode.host.__dataHost.__data.data;
      const { authorExternalChannelId } = msgData;
      const userHandle = msgData.authorName.simpleText;
      const cachedUserName = cache[authorExternalChannelId];
      const pullUserName =
        cachedUserName !== undefined
          ? Promise.resolve(cachedUserName)
          : getUserName(authorExternalChannelId);

      pullUserName.then((name) => {
        cache[authorExternalChannelId] = name;
        nameElem.textContent = formatUserName(name, userHandle, settings);
      });
    }
  });
}
