import { type YtNavigateFinishEvent } from "./types/YtNavigateFinishEvent";
import { type YtServiceRequestCompletedEvent } from "./types/YtServiceRequestCompletedEvent";
import { getUserName } from "./getUserName";

export default function main(): void {
  const handleYtAction = ({ detail }: CustomEvent<any>): void => {
    const { actionName } = detail;

    /**
     * yt-append-continuation-items-action
     * コメントの2ページ目(1ページ20個区切りと考えた場合)からの読み込みと、
     * リプライの読み込み時のaction
     */
    if (actionName === "yt-append-continuation-items-action") {
      const continuationItems =
        detail.args[0].appendContinuationItemsAction.continuationItems;

      if (isCommentRenderer(continuationItems)) {
        // Reply
        setTimeout(() => {
          rewriteReplytNameFromContinuationItems(continuationItems);
        }, 1);
      } else {
        // comment
        setTimeout(() => {
          rewriteCommentNameFromContinuationItems(continuationItems);
        }, 500);
      }
    }

    /**
     * yt-reload-continuation-items-command
     * 最初の20個以内のコメント読み込み時と、新しい順と評価順を切り替えた際のaction
     */
    if (actionName === "yt-reload-continuation-items-command") {
      const { slot } = detail.args[0].reloadContinuationItemsCommand;

      if (slot === "RELOAD_CONTINUATION_SLOT_BODY") {
        const continuationItems =
          detail.args[0].reloadContinuationItemsCommand.continuationItems;

        setTimeout(() => {
          rewriteCommentNameFromContinuationItems(continuationItems);
        }, 500);
      }
    }
  };

  /**
   * page change
   */
  document.addEventListener("yt-navigate-finish", ({ detail }) => {
    document.removeEventListener("yt-action", handleYtAction);
    document.addEventListener("yt-action", handleYtAction);
  });
}

/**
 * confinuationItems(コメントをレンダリングする際の元データ？)のリストを元に
 * trackingParamsを取得、trackingParamsから要素を取得して、
 * Replyの名前を書き換える。
 */
function rewriteReplytNameFromContinuationItems(continuationItems: any): void {
  continuationItems.forEach((continuationItem) => {
    const { commentRenderer } = continuationItem;

    if (commentRenderer !== undefined) {
      const replyCommentRenderer = findElementByTrackingParams(
        commentRenderer.trackingParams,
        "ytd-comment-renderer"
      );

      if (replyCommentRenderer !== null) {
        nameRewriteOfCommentRenderer(
          replyCommentRenderer,
          commentRenderer.authorIsChannelOwner,
          commentRenderer.authorEndpoint.browseEndpoint.browseId
        );

        mentionRewriteOfCommentRenderer(replyCommentRenderer);
      }
    }
  });
}

/**
 * confinuationItemsを元に
 * trackingParamsを取得、trackingParamsから要素を取得して、
 * コメントの名前を書き換える。
 */
function rewriteCommentNameFromContinuationItems(continuationItems: any): void {
  continuationItems.forEach((continuationItem: any) => {
    const { commentThreadRenderer } = continuationItem;

    if (commentThreadRenderer !== undefined) {
      const { trackingParams } = commentThreadRenderer;
      const commentElem = findElementByTrackingParams(
        trackingParams,
        "ytd-comment-thread-renderer"
      );

      const commentRenderer = commentElem?.querySelector(
        "ytd-comment-renderer"
      );

      if (commentRenderer !== null && commentRenderer !== undefined) {
        nameRewriteOfCommentRenderer(
          commentRenderer,
          commentThreadRenderer.comment.commentRenderer.authorIsChannelOwner,
          commentThreadRenderer.comment.commentRenderer.authorEndpoint
            .browseEndpoint.browseId
        );
      }
    }
  });
}

/**
 * commentRenderer要素の名前を書き換えます
 */
function nameRewriteOfCommentRenderer(
  commentRenderer: Element,
  isChnnelOwner: boolean,
  userId: string
): void {
  let nameElem = commentRenderer.querySelector(
    "#body > #main > #header > #header-author > h3 > a > span"
  );

  /**
   * チャンネル所有者のコメントは別の要素に名前がかかれる
   */
  if (isChnnelOwner) {
    nameElem = commentRenderer.querySelector(
      "#body > #main > #header > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > a > #channel-name > #container > #text-container > yt-formatted-string"
    );
  }

  /**
   * 名前要素の書き換え
   */

  void getUserName(userId).then((name) => {
    if (nameElem !== null) {
      nameElem.textContent = name;
    }
  });
}

/**
 * comment内のaタクを全取得して
 * 返信先リンクのもののみ書き換え
 */
function mentionRewriteOfCommentRenderer(commentRenderer: Element): void {
  const aTags = commentRenderer.querySelectorAll(
    "#body > #main > #comment-content > ytd-expander > #content > #content-text > a"
  );

  aTags.forEach((aTag) => {
    if (aTag.textContent?.match("@.*") !== null) {
      const href = aTag.getAttribute("href");
      if (href !== null) {
        void getUserName(href.split("/")[2]).then((name) => {
          aTag.textContent = `@${name} `;
        });
      }
    }
  });
}

/**
 * continuationItemsに含まれるデータの種類を判別
 * @returns trueの場合、リプライ/falseの場合、普通のコメント
 */
function isCommentRenderer(continuationItems: any): boolean {
  if (continuationItems.length > 0) {
    if (continuationItems[0].hasOwnProperty("commentThreadRenderer")) {
      return false;
    }

    if (continuationItems[0].hasOwnProperty("commentRenderer")) {
      return true;
    }
  } else {
    return false;
  }
}

/**
 * trackingParams(コンポーネント固有のID?)から要素を検索
 */
function findElementByTrackingParams(
  trackingParams: string,
  elementName: string
): Element | null {
  let returnElement = null;
  const elems = document.querySelectorAll<any>(elementName);
  elems.forEach((elem) => {
    if (elem.trackedParams === trackingParams) {
      returnElement = elem;
    }
  });
  return returnElement;
}

declare global {
  interface DocumentEventMap {
    "yt-service-request-completed": CustomEvent<YtServiceRequestCompletedEvent>;
    "yt-action": CustomEvent<any>;
    "yt-navigate-finish": CustomEvent<YtNavigateFinishEvent>;
  }

  interface ElementEventMap {
    "yt-service-request-completed": CustomEvent<YtServiceRequestCompletedEvent>;
    "yt-action": CustomEvent<any>;
  }
}
