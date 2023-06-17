/* eslint-disable no-prototype-builtins */
import { type YtNavigateFinishEvent } from "./types/YtNavigateFinishEvent";
import { getUserName } from "./getUserName";
import {
  type YtAction,
  type YtAppendContinuationItemsActionArg0,
  type YtReloadContinuationItemsCommandArg0,
} from "./types/YtAction";
import {
  type ReplyContinuationItems,
  type ContinuationItems,
} from "./types/AppendContinuationItemsAction";

export default function main(): void {
  const handleYtAction = (e: CustomEvent<YtAction<any>>): void => {
    const { actionName } = e.detail;

    /**
     * yt-append-continuation-items-action
     * コメントの2ページ目(1ページ20個区切りと考えた場合)からの読み込みと、
     * リプライの読み込み時のaction
     */
    if (actionName === "yt-append-continuation-items-action") {
      const continuationItems =
        e.detail.args[0].appendContinuationItemsAction.continuationItems;

      if (isCommentRenderer(continuationItems)) {
        // Reply
        const replyDetail: YtAction<
          YtAppendContinuationItemsActionArg0<"reply">
        > = e.detail;

        setTimeout(() => {
          rewriteReplytNameFromContinuationItems(
            replyDetail.args[0].appendContinuationItemsAction.continuationItems
          );
        }, 1);
      } else {
        // comment
        const commentDetail: YtAction<
          YtAppendContinuationItemsActionArg0<"comment">
        > = e.detail;

        setTimeout(() => {
          rewriteCommentNameFromContinuationItems(
            commentDetail.args[0].appendContinuationItemsAction
              .continuationItems
          );
        }, 500);
      }
    }

    /**
     * yt-reload-continuation-items-command
     * 最初の20個以内のコメント読み込み時と、新しい順と評価順を切り替えた際のaction
     */
    if (actionName === "yt-reload-continuation-items-command") {
      const reloadDetail: YtAction<YtReloadContinuationItemsCommandArg0> =
        e.detail;

      const { slot } = reloadDetail.args[0].reloadContinuationItemsCommand;

      if (slot === "RELOAD_CONTINUATION_SLOT_BODY") {
        const continuationItems =
          reloadDetail.args[0].reloadContinuationItemsCommand.continuationItems;

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
function rewriteReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems
): void {
  continuationItems.forEach((continuationItem) => {
    const { commentRenderer } = continuationItem;

    if (commentRenderer !== undefined) {
      const replyCommentRenderer = findElementByTrackingParams(
        commentRenderer.trackingParams,
        "ytd-comment-renderer"
      );

      if (replyCommentRenderer !== null) {
        let isContainer = commentRenderer.authorIsChannelOwner;
        if (commentRenderer.authorCommentBadge !== undefined) {
          isContainer = true;
        }

        nameRewriteOfCommentRenderer(
          replyCommentRenderer,
          isContainer,
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
function rewriteCommentNameFromContinuationItems(
  continuationItems: ContinuationItems
): void {
  continuationItems.forEach((continuationItem) => {
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
        let isContainer =
          commentThreadRenderer.comment.commentRenderer.authorIsChannelOwner;
        if (
          commentThreadRenderer.comment.commentRenderer.authorCommentBadge !==
          undefined
        ) {
          isContainer = true;
        }

        nameRewriteOfCommentRenderer(
          commentRenderer,
          isContainer,
          commentThreadRenderer.comment.commentRenderer.authorEndpoint
            .browseEndpoint.browseId
        );
      }
    }
  });
}

/**
 * commentRenderer要素の名前を書き換えます
 * @param commentRenderer commentRenderer要素
 * @param isNameContainerRender 名前がcontainerに表示されるか(チャンネルオーナー、公式ミュージックチャンネル)など
 * @param userId ユーザーID
 */
function nameRewriteOfCommentRenderer(
  commentRenderer: Element,
  isNameContainerRender: boolean,
  userId: string
): void {
  let nameElem = commentRenderer.querySelector(
    "#body > #main > #header > #header-author > h3 > a > span"
  );

  /**
   * チャンネル所有者のコメントは別の要素に名前がかかれる
   */
  if (isNameContainerRender) {
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
function isCommentRenderer(
  continuationItems: ContinuationItems | ReplyContinuationItems
): boolean {
  if (continuationItems.length > 0) {
    if (continuationItems[0].hasOwnProperty("commentThreadRenderer")) {
      return false;
    }

    if (continuationItems[0].hasOwnProperty("commentRenderer")) {
      return true;
    }
  }

  return false;
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
    "yt-action": CustomEvent<YtAction<any>>;
    "yt-navigate-finish": CustomEvent<YtNavigateFinishEvent>;
  }

  interface ElementEventMap {
    "yt-action": CustomEvent<YtAction<any>>;
  }
}
