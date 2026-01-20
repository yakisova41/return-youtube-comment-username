import { getRunningRuntime } from "crx-monkey";
import { getUserName } from "./utils/getUserName";
import { formatUserName } from "./utils/formatUserName";
import { syncSettings } from "./types/SyncSettings";
import { RycuSettings } from "./types/RycuSettings";
import { YtAction } from "./types/YtAction";
import { ShadyElement } from "./utils/findElementByTrackingParams";

/**
 * Initialize
 */
if (getRunningRuntime() === "Extension") {
  syncSettings(parent.window.__rycu.settings);
}

const asyncSyncSettings =
  getRunningRuntime() === "Extension"
    ? async (settings: RycuSettings) => {
        Promise.resolve().then(() => syncSettings(settings));
      }
    : async () => {};

const cache: Record<string, string> = {};

/**
 * Start
 */
const app = document.querySelector("yt-live-chat-app");

if (app !== null) {
  const showMoreObserver = new MutationObserver((e) => {
    if (e[0].attributeName === "style") {
      rewriteAll();
    }
  });
  const showMore = document.querySelector("#show-more");

  if (showMore !== null) {
    showMoreObserver.observe(showMore, { attributes: true });
  }

  rewriteAll();

  app.addEventListener("yt-action", (e) => {
    switch (e.detail.actionName) {
      case "yt-live-chat-reload-success":
        setTimeout(() => {
          rewriteAll();

          showMoreObserver.disconnect();
          const showMore = document.querySelector("#show-more");
          if (showMore !== null) {
            showMoreObserver.observe(showMore, { attributes: true });
          }
        }, 100);

        break;
      case "yt-live-chat-actions":
        // On auto scroll
        if (isAddChatItemAction(e.detail)) {
          chatActions(e.detail);
        }
        break;
      default:
        break;
    }
  });
}

function chatActions(action: YtAddChatItemAction) {
  const { id } =
    action.args[0][0].addChatItemAction.item.liveChatTextMessageRenderer;

  const messageElement = document.querySelector(
    `yt-live-chat-text-message-renderer[id="${id}"]`,
  );

  if (messageElement !== null) {
    rewrite(messageElement);
  }
}

function rewriteAll() {
  const renderers = document.querySelectorAll(
    "#items > yt-live-chat-text-message-renderer",
  );

  renderers.forEach((renderer) => {
    rewrite(renderer);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isAddChatItemAction(obj: any): obj is YtAddChatItemAction {
  if (
    typeof obj?.args[0] === "object" &&
    typeof obj?.args[0][0]?.addChatItemAction !== "undefined"
  ) {
    return true;
  }
  return false;
}

function rewrite(node: Element, async: boolean = true) {
  if (async) {
    asyncSyncSettings(parent.window.__rycu.settings).then(() => {
      handleRewrite(node);
    });
  } else {
    if (getRunningRuntime() === "Extension") {
      syncSettings(parent.window.__rycu.settings);
    }

    handleRewrite(node);
  }
}

function handleRewrite(node: Element) {
  const settings = parent.window.__rycu.settings;

  if (!settings.isReplaceLiveChats) {
    return;
  }

  const nameElem = node.querySelector<ShadyElement<Element>>("#author-name");

  if (nameElem !== null) {
    const msgData = nameElem.__shady.parentNode.host.__dataHost.__data.data;
    const { authorExternalChannelId, authorName } = msgData;
    const userHandle = authorName.simpleText;
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
}

type YtAddChatItemAction = YtAction<
  [
    {
      addChatItemAction: {
        clientId: string;
        item: {
          liveChatTextMessageRenderer: {
            authorExternalChannelId: string;
            id: string;
          };
        };
      };
    },
  ],
  unknown
>;
