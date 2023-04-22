import { getUserName } from "./getUserName";

export function main(): void {
  let commentReplaceInterval = 0;

  pageChangeHandler((newHref) => {
    const pageName = new URL(newHref).pathname.split("/")[1];

    if (pageName === "watch" || pageName === "shorts") {
      clearInterval(commentReplaceInterval);
      commentReplaceInterval = runCommentsReplace();
    }
  });
}

function runCommentsReplace(): number {
  return window.setInterval(() => {
    /**
     * 名前の置き換え
     */
    const authorSpan = document.querySelector(
      "#author-text > span:not(.name-replaced)"
    );

    if (authorSpan !== null) {
      authorSpan.classList.add("name-replaced");
      const channelLink = authorSpan.parentElement;
      const href = channelLink?.getAttribute("href");

      if (channelLink !== null && typeof href === "string") {
        void getUserName(href.split("/")[2]).then((name) => {
          authorSpan.innerHTML = name;
        });
      }
    }

    /**
     * 返信先の名前の置き換え
     */
    const mention = document.querySelector(
      "#content-text > a.yt-formatted-string:not(.name-replaced)"
    );

    if (mention !== null) {
      mention.classList.add("name-replaced");

      if (mention.innerHTML.match("@.*") !== null) {
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

      console.log(channelLink);
      const href = channelLink?.getAttribute("href");

      if (channelLink !== null && typeof href === "string") {
        void getUserName(href.split("/")[2]).then((name) => {
          channelNameSpan.innerHTML = name;
        });
      }
    }
  });
}

/**
 * hrefの変更を監視
 * @param handler 変更されたときの処理
 */
function pageChangeHandler(handler: (newHref: string) => void): void {
  let beforeHref = "";

  const body = document.querySelector("body");

  if (body !== null) {
    const observer = new MutationObserver(() => {
      const href = location.href;
      if (href !== beforeHref) {
        handler(href);
      }
      beforeHref = href;
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });
  }
}

main();
