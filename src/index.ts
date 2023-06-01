import { getUserName } from "./getUserName";
import { handleToName } from "./handleToName";

export function main(): void {
  let commentReplaceInterval = 0;
  const pageChangeOb = pageChangeObserver();

  pageChangeOb.addPageChangeListener((newHref) => {
    const pagePathArray = new URL(newHref).pathname.split("/");
    switch (pagePathArray[1]) {
      case "watch":
      case "shorts":
      case "post":
        clearInterval(commentReplaceInterval);
        commentReplaceInterval = runCommentsReplace(pageChangeOb);
        break;

      default:
        if (pagePathArray[2] === "community") {
          clearInterval(commentReplaceInterval);
          commentReplaceInterval = runCommentsReplace(pageChangeOb);
        } else {
          clearInterval(commentReplaceInterval);
        }
    }
  });

  /**
   * 元の名前を見えなくする
   */
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.innerHTML = `#author-text > span:nth-child(1) ,ytd-author-comment-badge-renderer > #name > #channel-name > #container > #text-container > yt-formatted-string{
    display:none;
  }`;
}

function runCommentsReplace(pageChangeOb: pageChangeObserverType): number {
  return window.setInterval(() => {
    /**
     * 名前の置き換え
     */
    const authorSpan = document.querySelector(
      "#author-text > span:nth-child(1):not(.name-replaced)"
    );

    if (authorSpan !== null) {
      authorSpan.classList.add("name-replaced");
      const channelLink = authorSpan.parentElement;
      const href = channelLink?.getAttribute("href");

      if (channelLink !== null && typeof href === "string") {
        if (href.split("/")[1][0] === "@") {
          // href is handle
          void handleToName(href.split("/")[1]).then((name) => {
            replacedElement(authorSpan, name);
          });
        } else {
          // href is channel id
          void getUserName(href.split("/")[2]).then((name) => {
            replacedElement(authorSpan, name);
          });
        }
      }
    }

    /**
     * 返信先の名前の置き換え
     */
    const mention = document.querySelector(
      `#content-text > a.yt-formatted-string[dir="auto"]:not(.name-replaced)`
    );

    if (mention !== null) {
      mention.classList.add("name-replaced");
      if (mention.innerHTML.match("@.*") !== null) {
        mention.removeAttribute("dir");
        const href = mention.getAttribute("href");

        if (href !== null) {
          void getUserName(href.split("/")[2]).then((name) => {
            mention.innerHTML = "@" + name;
          });
        }
      }
    }

    /**
     * 投稿者コメントの名前の置き換え
     */
    const channelNameSpan = document.querySelector(
      "ytd-author-comment-badge-renderer > #name > #channel-name > #container > #text-container > yt-formatted-string:not(.name-replaced)"
    );
    const channelLink =
      channelNameSpan?.parentElement?.parentElement?.parentElement
        ?.parentElement;

    if (channelLink !== null && channelNameSpan !== null) {
      channelNameSpan.classList.add("name-replaced");
      const href = channelLink?.getAttribute("href");

      if (channelLink !== null && typeof href === "string") {
        void getUserName(href.split("/")[2]).then((name) => {
          replacedElement(channelNameSpan, name);
        });
      }
    }
  });
}

/**
 * hrefの変更を監視
 * @param handler 変更されたときの処理
 */
function pageChangeObserver(): pageChangeObserverType {
  let beforeHref = "";
  const body = document.querySelector("body");
  const pageChangeListeners: pageChangeListener[] = [];

  if (body !== null) {
    const observer = new MutationObserver(() => {
      const href = location.href;
      if (href !== beforeHref) {
        pageChangeListeners.forEach((listener) => {
          listener(href);
        });
      }
      beforeHref = href;
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });
  }

  return {
    addPageChangeListener: (listener: pageChangeListener) => {
      pageChangeListeners.push(listener);
      return pageChangeListeners.length - 1;
    },
    removePageChangeListener: (key: number) => {
      pageChangeListeners.splice(key, 1);
    },
  };
}

/**
 * 元の名前要素を非表示にした代わりに、名前置き換え済みの名前要素を追加
 */
function replacedElement(nameElem: Element, name: string): void {
  const className = "shit-youtube-handle-name";
  const parent = nameElem.parentElement;

  if (parent !== null) {
    const replacedNameElem = parent.querySelector(`.${className}`);

    if (replacedNameElem !== null) {
      replacedNameElem.innerHTML = name;
    } else {
      const replacedNameElem = document.createElement("span");
      replacedNameElem.className = nameElem.className;
      replacedNameElem.classList.add(className);
      replacedNameElem.innerHTML = name;
      parent.appendChild(replacedNameElem);
    }
  }
}

type pageChangeListener = (href: string) => void;
interface pageChangeObserverType {
  addPageChangeListener: (callback: pageChangeListener) => number;
  removePageChangeListener: (key: number) => void;
}

main();
