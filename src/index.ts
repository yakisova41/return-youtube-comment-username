import { getUserName } from "./getUserName";

export function main() {
  let interval: null | NodeJS.Timer = null;

  pageChangeHandler((newHref) => {
    if (interval !== null) {
      clearInterval(interval);
    }

    const path = new URL(newHref).pathname;

    if (path === "/watch") {
      interval = replaceAllComments();
    }
  });
}

/**
 * hrefの変更を監視
 * @param handler 変更されたときの処理
 */
function pageChangeHandler(handler: (newHref: string) => void) {
  let beforeHref = "";

  const observer = new MutationObserver(() => {
    const href = location.href;
    if (href !== beforeHref) {
      handler(href);
    }
    beforeHref = href;
  });

  observer.observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
  });
}

/**
 * 置き換え　コメントs、新しいコメントを監視
 */
function replaceAllComments() {
  const commentsSelector =
    "#comments > #sections > #contents > ytd-comment-thread-renderer";
  let commentElems = document.querySelectorAll(commentsSelector);

  return setInterval(() => {
    if (commentElems !== null) {
      const elems = document.querySelectorAll(commentsSelector);

      const diff = getDiff(elems, commentElems);

      diff.forEach((newCommentElem) => {
        normalCommentReplace(newCommentElem);

        if (newCommentElem.querySelector("#replies:not([hidden])") !== null) {
          repliesReplace(
            newCommentElem.querySelector(
              "#replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents"
            )
          );
        }
      });

      commentElems = elems;
    } else {
      commentElems = document.querySelectorAll(commentsSelector);
    }
  });
}

/**
 * 普通のコメントの名前を置き換え
 */
function normalCommentReplace(commentElem: Element) {
  const channelLinkElem: HTMLAnchorElement = commentElem.querySelector(
    "#comment > #body > #main > #header > #header-author > h3 > a "
  );

  //ユーザー名の要素は2パターンある
  let nameElem: Element;
  nameElem = commentElem.querySelector(
    "#comment > #body > #main > #header  > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > #name > ytd-channel-name > #container > #text-container > #text "
  );
  if (nameElem === null) {
    nameElem = channelLinkElem.querySelector("span");
  }

  getUserName(channelLinkElem.href).then((name) => {
    nameElem.innerHTML = name;
  });
}

/**
 * リプライたちの置き換え、監視
 */
function repliesReplace(initialRepliesElem: Element) {
  let repliesElem: NodeListOf<Element> = null;

  const ob = new MutationObserver(() => {
    const replies = initialRepliesElem.querySelectorAll("ytd-comment-renderer");

    function replaceAndLastCheck(replies: NodeListOf<Element> | Element[]) {
      replies.forEach((repliyElem: Element) => {
        repliyCommentReplace(repliyElem);
      });

      //リプライ達の一番最後がcommentならobserverは切る
      if (initialRepliesElem.lastChild.nodeName === "YTD-COMMENT-RENDERER") {
        ob.disconnect();
      }
    }

    if (repliesElem !== null) {
      const diff = getDiff(replies, repliesElem);
      replaceAndLastCheck(diff);
    } else {
      replaceAndLastCheck(replies);
    }

    repliesElem = replies;
  });
  ob.observe(initialRepliesElem, {
    childList: true,
  });
}

/**
 * リプライコメントの名前と返信先を置き換え
 */
function repliyCommentReplace(repliyElem: Element) {
  const channelLinkElem: HTMLAnchorElement = repliyElem.querySelector(
    "#body > #main > #header > #header-author > h3 > a "
  );

  //ユーザー名の要素は2パターンある
  let nameElem: Element;
  nameElem = repliyElem.querySelector(
    "#comment > #body > #main > #header  > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > #name > ytd-channel-name > #container > #text-container > #text"
  );
  if (nameElem === null) {
    nameElem = channelLinkElem.querySelector("span");
  }

  getUserName(channelLinkElem.href).then((name) => {
    nameElem.innerHTML = name;
  });

  //formattedなstringの要素の中から返信先(@~~~)のtextを名前に置き換える
  const formattedStringElems: NodeListOf<HTMLAnchorElement> =
    repliyElem.querySelectorAll(
      "#body > #main > #comment-content > #expander > #content > #content-text > a.yt-formatted-string"
    );

  formattedStringElems.forEach((formattedStringElem) => {
    const text = formattedStringElem.innerHTML;
    if (text.match("@.*")) {
      getUserName(formattedStringElem.href).then((name) => {
        formattedStringElem.innerHTML = "@" + name;
      });
    }
  });
}

/**
 * 新たに追加された要素のdiffを取得する
 */
function getDiff(elemsA: NodeListOf<Element>, elemsB: NodeListOf<Element>) {
  //NodeListOf<Element>をElement[]に変換
  function toArray(elems: NodeListOf<Element>) {
    const arr: Element[] = [];
    elems.forEach((e) => {
      arr.push(e);
    });
    return arr;
  }

  return toArray(elemsA).filter((i) => toArray(elemsB).indexOf(i) === -1);
}

main();
