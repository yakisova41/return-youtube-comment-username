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

function chatActions(action: YtAddChatItemAction) {
  const rewiteAllArgs = (addActions: AddChatItemAction[]) => {
    let id: string = "";
    let messageElement: null | PolymerLivechatElement = null;

    addActions.forEach((addAction) => {
      const renderer = addAction.addChatItemAction.item;

      if (isTextMessage(renderer)) {
        id = renderer.liveChatTextMessageRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `yt-live-chat-text-message-renderer[id="${id}"]`,
        );
      } else if (isPaidMessage(renderer)) {
        id = renderer.liveChatPaidMessageRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `yt-live-chat-paid-message-renderer[id="${id}"]`,
        );
      } else if (isMembershipMessage(renderer)) {
        id = renderer.liveChatMembershipItemRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `yt-live-chat-membership-item-renderer[id="${id}"]`,
        );
      } else if (isGiftRedemptionAnnouncement(renderer)) {
        id =
          renderer
            .liveChatSponsorshipsLiveChatGiftRedemptionAnnouncementRenderer.id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `ytd-sponsorships-live-chat-gift-redemption-announcement-renderer[id="${id}"]`,
        );
      } else if (isGiftPurchaseAnnouncement(renderer)) {
        id =
          renderer.liveChatSponsorshipsLiveChatGiftPurchaseAnnouncementRenderer
            .id;

        messageElement = document.querySelector<PolymerLivechatElement>(
          `ytd-sponsorships-live-chat-gift-purchase-announcement-renderer",[id="${id}"]`,
        );
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

  [
    ...paidRenderers,
    ...memberRenderers,
    ...renderers,
    ...sponserPurchases,
    ...sponserRedemptions,
  ].forEach((renderer) => {
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
): item is OneChatItem<"liveChatSponsorshipsLiveChatGiftRedemptionAnnouncementRenderer"> {
  return (
    "liveChatSponsorshipsLiveChatGiftRedemptionAnnouncementRenderer" in item
  );
}
function isGiftPurchaseAnnouncement(
  item: AnyChatItem,
): item is OneChatItem<"liveChatSponsorshipsLiveChatGiftPurchaseAnnouncementRenderer"> {
  return "liveChatSponsorshipsLiveChatGiftPurchaseAnnouncementRenderer" in item;
}

function rewrite(node: PolymerLivechatElement, async: boolean = true) {
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

function handleRewrite(node: PolymerLivechatElement) {
  const settings = parent.window.__rycu.settings;

  if (!settings.isReplaceLiveChats) {
    return;
  }

  const nameElem = node.querySelector<ShadyElement<Element>>("#author-name");
  if (nameElem !== null) {
    const msgData = node.polymerController.data;

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

type OneChatItem<T extends keyof YtChatItem> = {
  [K in T]: { [P in K]: YtChatItem[P] };
}[T];

type AnyChatItem = OneChatItem<keyof YtChatItem>;

type AddChatItemAction<
  T extends keyof YtChatItem =
    | "liveChatTextMessageRenderer"
    | "liveChatMembershipItemRenderer"
    | "liveChatPaidMessageRenderer"
    | "liveChatSponsorshipsLiveChatGiftRedemptionAnnouncementRenderer"
    | "liveChatSponsorshipsLiveChatGiftPurchaseAnnouncementRenderer",
> = {
  addChatItemAction: {
    clientId: string;
    item: OneChatItem<T>;
  };
};
type YtAddChatItemAction<
  T extends keyof YtChatItem =
    | "liveChatTextMessageRenderer"
    | "liveChatMembershipItemRenderer"
    | "liveChatPaidMessageRenderer"
    | "liveChatSponsorshipsLiveChatGiftRedemptionAnnouncementRenderer"
    | "liveChatSponsorshipsLiveChatGiftPurchaseAnnouncementRenderer",
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
  liveChatSponsorshipsLiveChatGiftRedemptionAnnouncementRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
  liveChatSponsorshipsLiveChatGiftPurchaseAnnouncementRenderer: {
    authorExternalChannelId: string;
    id: string;
  };
};

interface PolymerLivechatElement extends Element {
  polymerController: {
    data: {
      authorExternalChannelId: string;
      authorName: { simpleText: string };
    };
  };
}
