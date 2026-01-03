import { getUserName } from "./utils/getUserName";

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

function rewrite(nodes: NodeListOf<Element>) {
  nodes.forEach((node) => {
    const nameElem = node.querySelector("#author-name");
    if (nameElem !== null) {
      const authorExternalChannelId =
        nameElem.__shady.parentNode.host.__dataHost.__data.data
          .authorExternalChannelId;

      if (cache[authorExternalChannelId] !== undefined) {
        nameElem.textContent = cache[authorExternalChannelId];
      } else {
        getUserName(authorExternalChannelId).then((name) => {
          cache[authorExternalChannelId] = name;
          nameElem.textContent = name;
        });
      }
    }
  });
}
