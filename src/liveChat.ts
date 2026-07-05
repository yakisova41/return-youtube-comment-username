import { getRunningRuntime } from "crx-monkey";
import { getUserName } from "./utils/getUserName";
import { formatUserName } from "./utils/formatUserName";
import { syncSettings } from "./types/SyncSettings";
import { RycuSettings, getDefaultSettings } from "./types/RycuSettings";
import { YtAction } from "./types/YtAction";
import { ShadyElement } from "./utils/findElementByTrackingParams";

/**
 * Initialize
 * UserScript mode: parent.window may be cross-origin (e.g. studio.youtube.com embedding
 * www.youtube.com/live_chat), so initialize __rycu locally instead of accessing parent.
 */
if (getRunningRuntime() === "Extension") {
  syncSettings(parent.window.__rycu.settings);
} else {
  window.__rycu = { settings: getDefaultSettings() };
}

const asyncSyncSettings =
  getRunningRuntime() === "Extension"
    ? async (settings: RycuSettings) => {
        Promise.resolve().then(() => syncSettings(settings));
      }
    : async () => {};

const cache: Record<string, string> = {};
const cachebyHandle: Record<string, string> = {};

/**
 * Start
 */
const app = document.querySelector("yt-live-chat-app");
//const ticker = document.querySelector("yt-live-chat-ticker-renderer");

// Observe ticker-items for new yt-live-chat-ticker-paid-message-item-renderer elements
const tickerItems = document.querySelector("#ticker-items");
if (tickerItems !== null) {
  const tickerObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element && node.tagName.toLowerCase() === "yt-live-chat-ticker-paid-message-item-renderer") {
          rewriteTicker(node);
        }
      }
    }
  });
  tickerObserver.observe(tickerItems, { childList: true });
}
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
      case "yt-live-chat-resume-replay":
        setTimeout(() => {
          //rewriteAll();

          showMoreObserver.disconnect();
          const showMore = document.querySelector("#show-more");
          if (showMore !== null) {
            showMoreObserver.observe(showMore, { attributes: true });
          }
        }, 100);
        break;
      case "yt-live-chat-seek-success":
        setTimeout(() => {
          rewriteAllTickers();
        }, 30);

        break;
      case "yt-live-chat-actions":
        // On auto scroll
        if (isAddChatItemAction(e.detail)) {
          chatActions(e.detail);
        }
        break;

      default:
        // console.log(e.detail.actionName, e.detail.args);
        break;
    }
  });
}

// When a ticker item is clicked, rewrite the popup superchat and reply messages
// that appear inside tp-yt-paper-dialog.
document.addEventListener("click", (e) => {
  const ticker = (e.target as Element).closest("yt-live-chat-ticker-paid-message-item-renderer");
  if (ticker !== null) {
    const id = ticker.id;
    setTimeout(() => {
      const dialog = document.querySelector("tp-yt-paper-dialog");
      if (dialog === null) return;

      // Rewrite the superchat header (same id as ticker element)
      const popup = dialog.querySelector<PolymerLivechatElement>(`yt-live-chat-paid-message-renderer[id="${id}"]`);
      if (popup !== null) {
        rewrite(popup);
      }

      // Rewrite reply messages in the engagement panel list
      dialog
        .querySelectorAll<PolymerLivechatElement>("yt-live-chat-text-message-renderer")
        .forEach((el) => rewrite(el));
    }, 300);
  }
});

function chatActions(action: YtAddChatItemAction) {
  const rewiteAllArgs = (addActions: AddChatItemAction[]) => {
    let id: string = "";
    let messageElement: null | PolymerLivechatElement = null;
    let renderer: OneChatItem<keyof YtChatItem>;
    addActions.forEach((addAction) => {
      // for debug, check if addAction has addChatItemAction
      if (typeof addAction.addChatItemAction === "undefined" && typeof addAction.addLiveChatTickerItemAction !== "undefined") {
        renderer = addAction.addLiveChatTickerItemAction.item;
      } else if (typeof addAction.addChatItemAction === "undefined" && typeof addAction.removeBannerForLiveChatCommand !== "undefined") {
        renderer = addAction.removeBannerForLiveChatCommand.item;
      } else if (typeof addAction.addChatItemAction === "undefined") {
        return;
      } else {
        renderer = addAction.addChatItemAction.item;
      }

      if (isTextMessage(renderer)) {
        id = renderer.liveChatTextMessageRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `yt-live-chat-text-message-renderer[id="${id}"]`,
        );
        // If the message is a reply, rewrite the reply button text.
        // messageElement has #before-content-buttons
        if (messageElement && messageElement.querySelector("#before-content-buttons")) {
          // Perform the rewrite logic for the reply button text
          const replyTexts = messageElement.querySelectorAll<PolymerLivechatElement>(
              "yt-button-view-model > .ytSpecButtonViewModelHost > .ytSpecButtonShapeNextHost > .ytSpecButtonShapeNextButtonTextContent",
            );
          rewriteAllReplyTexts(replyTexts);
        }
      } else if (isPaidMessage(renderer)) {
        id = renderer.liveChatPaidMessageRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `yt-live-chat-paid-message-renderer[id="${id}"]`,
        );

        // superchat arrival = ticker is now showing; rewrite all ticker items
        rewriteAllTickers();
      } else if (isMembershipMessage(renderer)) {
        id = renderer.liveChatMembershipItemRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `yt-live-chat-membership-item-renderer[id="${id}"]`,
        );
      } else if (isGiftRedemptionAnnouncement(renderer)) {
        id = renderer.liveChatSponsorshipsGiftRedemptionAnnouncementRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `ytd-sponsorships-live-chat-gift-redemption-announcement-renderer[id="${id}"]`,
        );
      } else if (isGiftPurchaseAnnouncement(renderer)) {
        id = renderer.liveChatSponsorshipsGiftPurchaseAnnouncementRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `ytd-sponsorships-live-chat-gift-purchase-announcement-renderer[id="${id}"]`,
        );
      } else if (isTickerPaidMessage(renderer)) {
        id = renderer.liveChatTickerPaidMessageItemRenderer.id;
        const tickerElem = document.querySelector(
          `yt-live-chat-ticker-paid-message-item-renderer[id="${id}"]`,
        );
        if (tickerElem !== null) {
          rewriteTicker(tickerElem);
        }
        return; // ticker is handled separately
      } else if (isTickerSponsorItemRenderer(renderer)) {
        id = renderer.liveChatTickerSponsorItemRenderer.id;
        const tickerElem = document.querySelector(
          `yt-live-chat-ticker-sponsor-item-renderer[id="${id}"]`,
        );
        if (tickerElem !== null) {
          rewriteTicker(tickerElem, false);
        }
        return; // ticker is handled separately
      } else {
        // console.warn("Unknown chat item type:", renderer);
      }

      if (messageElement !== null) {
        rewrite(messageElement);
      }
    });
  };

  rewiteAllArgs(action.args[0]);
}

function rewriteAll() {
  const renderers = document.querySelectorAll<PolymerLivechatElement>(
    "#items > yt-live-chat-text-message-renderer",
  );

  const paidRenderers = document.querySelectorAll<PolymerLivechatElement>(
    "#items > yt-live-chat-paid-message-renderer",
  );

  const memberRenderers = document.querySelectorAll<PolymerLivechatElement>(
    "#items > yt-live-chat-membership-item-renderer",
  );

  const sponserPurchases = document.querySelectorAll<PolymerLivechatElement>(
    "#items > ytd-sponsorships-live-chat-gift-purchase-announcement-renderer",
  );

  const sponserRedemptions = document.querySelectorAll<PolymerLivechatElement>(
    "#items > ytd-sponsorships-live-chat-gift-redemption-announcement-renderer",
  );
  const pinnedTexts = document.querySelectorAll<PolymerLivechatElement>(
    "#banner-container > #contents > yt-live-chat-text-message-renderer",
  );
  const replyTexts = document.querySelectorAll<PolymerLivechatElement>(
    "#before-content-buttons > yt-button-view-model >.ytSpecButtonViewModelHost > .ytSpecButtonShapeNextHost >.ytSpecButtonShapeNextButtonTextContent",
  );
  [
    ...paidRenderers,
    ...memberRenderers,
    ...renderers,
    ...sponserPurchases,
    ...sponserRedemptions,
    ...pinnedTexts,
  ].forEach((renderer) => {
    rewrite(renderer);
  });
  rewriteAllTickers();
  rewriteAllReplyTexts(replyTexts);
}

function rewriteAllTickers() {
  const tickerRenderers = document.querySelectorAll(
    "#ticker-items > yt-live-chat-ticker-paid-message-item-renderer",
  );
  tickerRenderers.forEach((renderer) => {
    rewriteTicker(renderer);
  });
}

function rewriteAllReplyTexts(replyTexts: | NodeListOf<PolymerLivechatElement> | ArrayLike<PolymerLivechatElement>,) {
  Array.from(replyTexts).forEach((renderer) => {
    if (renderer.textContent !== null && cachebyHandle[renderer.textContent] !== undefined) {
      renderer.textContent = formatUserName(cachebyHandle[renderer.textContent], renderer.textContent, getSettings());
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isAddChatItemAction(obj: any): obj is YtAddChatItemAction {
  if (typeof obj?.args[0] === "object" && typeof obj?.args[0][0]?.addChatItemAction !== "undefined") {
    return true;
  }
  return false;
}

function isTextMessage(
  item: AnyChatItem,
): item is OneChatItem<"liveChatTextMessageRenderer"> {
  return "liveChatTextMessageRenderer" in item;
}
function isMembershipMessage(
  item: AnyChatItem,
): item is OneChatItem<"liveChatMembershipItemRenderer"> {
  return "liveChatMembershipItemRenderer" in item;
}
function isPaidMessage(
  item: AnyChatItem,
): item is OneChatItem<"liveChatPaidMessageRenderer"> {
  return "liveChatPaidMessageRenderer" in item;
}
function isGiftRedemptionAnnouncement(
  item: AnyChatItem,
): item is OneChatItem<"liveChatSponsorshipsGiftRedemptionAnnouncementRenderer"> {
  return "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer" in item;
}
function isGiftPurchaseAnnouncement(
  item: AnyChatItem,
): item is OneChatItem<"liveChatSponsorshipsGiftPurchaseAnnouncementRenderer"> {
  return "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer" in item;
}
function isTickerPaidMessage(
  item: AnyChatItem,
): item is OneChatItem<"liveChatTickerPaidMessageItemRenderer"> {
  return "liveChatTickerPaidMessageItemRenderer" in item;
}
function isTickerSponsorItemRenderer(
  item: AnyChatItem,
): item is OneChatItem<"liveChatTickerSponsorItemRenderer"> {
  return "liveChatTickerSponsorItemRenderer" in item;
}

function getSettings(): RycuSettings {
  return getRunningRuntime() === "Extension"
    ? parent.window.__rycu.settings : window.__rycu.settings;
}

function rewrite(node: PolymerLivechatElement, async: boolean = true) {
  if (async) {
    asyncSyncSettings(getSettings()).then(() => {
      handleRewrite(node);
    });
  } else {
    if (getRunningRuntime() === "Extension") {
      syncSettings(parent.window.__rycu.settings);
    }

    handleRewrite(node);
  }
}

/**
 * Rewrite ticker paid message item name.
 * Based on reference UserScript: data is on elm.data directly (not polymerController.data),
 * selector is just "span", and text is written via firstChild.textContent.
 */
function rewriteTicker(node: Element, replaceTextContent: boolean = true): void {
  const settings = getSettings();
  if (!settings.isReplaceLiveChats) return;

  const data = (
    node as {
      data?: {
        authorExternalChannelId?: string;
        authorUsername?: { simpleText?: string };
      };
    }
  ).data;
  if (!data?.authorExternalChannelId) return;

  const channelId: string = data.authorExternalChannelId;

  const userHandle: string = data.authorUsername?.simpleText ?? node.getAttribute("aria-label")?.split(" ")[0] ?? "";
  const span = node.querySelector("span");
  if (span === null) return;

  const cachedUserName = cache[channelId];
  const pullUserName =
    cachedUserName !== undefined ? Promise.resolve(cachedUserName) : getUserName(channelId);

  pullUserName
    .then((name) => {
      cache[channelId] = name;
      cachebyHandle[userHandle] = name;
      // If is ticker sponsor item, don't replace name because name doesn't exist in text.
      if (replaceTextContent) {
        const newName = formatUserName(name, userHandle, settings);
        span.textContent = newName;
      }
    })
    .catch((e) => {
      console.error("[rycu ticker] getUserName failed:", e);
    });
}

function handleRewrite(node: PolymerLivechatElement) {
  const settings = getSettings();

  if (!settings.isReplaceLiveChats) {
    return;
  }

  const msgData = node.polymerController.data;

  const { authorExternalChannelId, authorName, header } = msgData;

  const nameElem = node.querySelector<ShadyElement<Element>>("#author-name");

  if (nameElem === null) {
    return;
  }

  let userHandle: string;
  if (typeof authorName === "undefined" && typeof header?.liveChatSponsorshipsHeaderRenderer !== "undefined" ) {
    userHandle = header.liveChatSponsorshipsHeaderRenderer.simpleText;
  } else {
    userHandle = authorName.simpleText;
  }

  const cachedUserName = cache[authorExternalChannelId];
  const pullUserName =
    cachedUserName !== undefined
      ? Promise.resolve(cachedUserName)
      : getUserName(authorExternalChannelId);

  pullUserName.then((name) => {
    cache[authorExternalChannelId] = name;
    cachebyHandle[userHandle] = name;
    nameElem.textContent = formatUserName(name, userHandle, settings);
  });
}

type OneChatItem<T extends keyof YtChatItem> = {
  [K in T]: { [P in K]: YtChatItem[P] };
}[T];

type AnyChatItem = OneChatItem<keyof YtChatItem>;

type AddChatItemAction<
  T extends keyof YtChatItem =
    | "liveChatTextMessageRenderer"
    | "liveChatMembershipItemRenderer"
    | "liveChatPaidMessageRenderer"
    | "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer"
    | "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer"
    | "liveChatTickerPaidMessageItemRenderer"
    | "liveChatTickerSponsorItemRenderer",
> = {
  addChatItemAction: {
    clientId: string;
    item: OneChatItem<T>;
  };
  addLiveChatTickerItemAction: {
    clientId: string;
    item: OneChatItem<T>;
  };
  removeBannerForLiveChatCommand: {
    clientId: string;
    item: OneChatItem<T>;
  };
};
type YtAddChatItemAction<
  T extends keyof YtChatItem =
    | "liveChatTextMessageRenderer"
    | "liveChatMembershipItemRenderer"
    | "liveChatPaidMessageRenderer"
    | "liveChatSponsorshipsGiftRedemptionAnnouncementRenderer"
    | "liveChatSponsorshipsGiftPurchaseAnnouncementRenderer"
    | "liveChatTickerPaidMessageItemRenderer"
    | "liveChatTickerSponsorItemRenderer",
> = YtAction<AddChatItemAction<T>[], unknown>;

type YtChatItem = {
  liveChatTextMessageRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatMembershipItemRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatPaidMessageRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatSponsorshipsGiftRedemptionAnnouncementRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatSponsorshipsGiftPurchaseAnnouncementRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatTickerPaidMessageItemRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatTickerSponsorItemRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
};

interface PolymerLivechatElement extends Element {
  polymerController: {
    data: {
      authorExternalChannelId: string;
      authorName: { simpleText: string };
      header: { liveChatSponsorshipsHeaderRenderer: { simpleText: string } };
    };
  };
}
