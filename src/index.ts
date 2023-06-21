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
import { type YtHistoryLoad } from "./types/YtHistoryLoad";
import { type YtGetMultiPageMenuAction } from "./types/YtGetMultiPageMenuAction";
import { type YtCreateCommentAction } from "./types/YtCreateCommentAction";

export default function main(): void {
  const handleYtAction = (e: CustomEvent<YtAction<any, any>>): void => {
    const { actionName } = e.detail;

    switch (actionName) {
      case "yt-append-continuation-items-action":
        handleYtAppendContinuationItemsAction(e.detail);
        break;
      case "yt-reload-continuation-items-command":
        handleYtReloadContinuationItemsCommand(e.detail);
        break;
      case "yt-history-load":
        handleYtHistory(e.detail);
        break;
      case "yt-get-multi-page-menu-action":
        handleYtGetMultiPageMenuAction(e.detail);
        break;
      case "yt-create-comment-action":
        handleYtCreateCommentAction(e.detail);
        break;
    }
  };

  document.addEventListener("yt-action", handleYtAction);

  /**
   * page change
   */
  document.addEventListener("yt-navigate-finish", ({ detail }) => {
    document.removeEventListener("yt-action", handleYtAction);
    document.addEventListener("yt-action", handleYtAction);
  });
}

/**
 * yt-append-continuation-items-action
 * コメントの2ページ目(1ページ20個区切りと考えた場合)からの読み込みと、
 * リプライの読み込み時のaction
 */
function handleYtAppendContinuationItemsAction(
  detail: YtAction<any, any>
): void {
  const continuationItems =
    detail.args[0].appendContinuationItemsAction.continuationItems;

  if (isCommentRenderer(continuationItems)) {
    // Reply
    const replyDetail: YtAction<
      YtAppendContinuationItemsActionArg0<"reply">,
      Element
    > = detail;

    setTimeout(() => {
      rewriteReplytNameFromContinuationItems(
        replyDetail.args[0].appendContinuationItemsAction.continuationItems
      );
    }, 1);
  } else {
    // comment
    const commentDetail: YtAction<
      YtAppendContinuationItemsActionArg0<"comment">,
      Element
    > = detail;

    /**
     * レンダリングの完了イベントがわからんので暫定対応で500ms遅延させています
     * コメント描画完了のイベントをご存じの方、至急メールくれや
     */
    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(
        commentDetail.args[0].appendContinuationItemsAction.continuationItems
      );
    }, 100);
  }
}

/**
 * yt-reload-continuation-items-command
 * 最初の20個以内のコメント読み込み時と、新しい順と評価順を切り替えた際のaction
 */
function handleYtReloadContinuationItemsCommand(
  detail: YtAction<any, any>
): void {
  const reloadDetail: YtAction<YtReloadContinuationItemsCommandArg0, Element> =
    detail;

  const { slot } = reloadDetail.args[0].reloadContinuationItemsCommand;

  if (slot === "RELOAD_CONTINUATION_SLOT_BODY") {
    const continuationItems =
      reloadDetail.args[0].reloadContinuationItemsCommand.continuationItems;

    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(continuationItems);
    }, 100);
  }
}

/**
 * ページ移動後に戻ったときはhistoryとかいう名前のキャッシュから最初の20コメントが読み込まれる
 */
function handleYtHistory(detail: YtAction<any, any>): void {
  const historyDetail: YtAction<any, YtHistoryLoad> = detail;

  const continuationItems =
    historyDetail.args[1].historyEntry?.rootData.response.contents
      .twoColumnWatchNextResults?.results?.results?.contents[3]
      ?.itemSectionRenderer?.contents;

  if (continuationItems !== undefined) {
    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(continuationItems);
    }, 100);
  }
}

/**
 * ヘッダーの通知欄にあるコメントを置き換え
 */
function handleYtGetMultiPageMenuAction(detail: YtAction<any, any>): void {
  const getMultiPageMenuDetail: YtAction<YtGetMultiPageMenuAction, any> =
    detail;
  const continuationItems =
    getMultiPageMenuDetail.args[0].getMultiPageMenuAction.menu
      .multiPageMenuRenderer.sections[1].itemSectionRenderer?.contents;

  const highLightedTeaserContents =
    getMultiPageMenuDetail.args[0]?.getMultiPageMenuAction?.menu
      ?.multiPageMenuRenderer.sections[1].itemSectionRenderer?.contents[0]
      ?.commentThreadRenderer.replies?.commentRepliesRenderer?.teaserContents;

  if (continuationItems !== undefined) {
    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(continuationItems);

      if (highLightedTeaserContents !== undefined) {
        const highLightedReplyRenderer =
          highLightedTeaserContents[0]?.commentRenderer;
        let isContainer = highLightedReplyRenderer.authorIsChannelOwner;

        if (highLightedReplyRenderer.authorCommentBadge !== undefined) {
          isContainer = true;
        }

        rewriteHighlightedReply(
          highLightedReplyRenderer.trackingParams,
          isContainer,
          highLightedReplyRenderer.authorEndpoint.browseEndpoint.browseId
        );
      }
    }, 100);
  }
}

/**
 * highLightedReplyの要素を書き換え
 */
function rewriteHighlightedReply(
  trackedParams: string,
  isContainer: boolean,
  userId: string
): void {
  const elem = findElementByTrackingParams(
    trackedParams,
    "ytd-comment-renderer"
  );

  const rewriteHighlightedReplyElem = (elem: Element): void => {
    nameRewriteOfCommentRenderer(elem, isContainer, userId);
  };

  if (elem === null) {
    void reSearchElement(trackedParams, "ytd-comment-renderer").then((elem) => {
      rewriteHighlightedReplyElem(elem);
    });
  } else {
    rewriteHighlightedReplyElem(elem);
  }
}

/**
 * 自分でコメントした時に自分のコメントを書き換え
 */
function handleYtCreateCommentAction(detail: YtAction<any, any>): void {
  const createCommentDetail: YtAction<YtCreateCommentAction, Element> = detail;
  const continuationItems = [
    {
      commentThreadRenderer:
        createCommentDetail.args[0].createCommentAction.contents
          .commentThreadRenderer,
    },
  ];
  setTimeout(() => {
    rewriteCommentNameFromContinuationItems(continuationItems);
  }, 100);
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

      const reWriteReplyCommentRenderer = (
        replyCommentRenderer: Element
      ): void => {
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
      };

      /**
       * 要素が存在しない場合は再検索をします。
       * 絶対に存在するはずなので。
       */
      if (replyCommentRenderer !== null) {
        reWriteReplyCommentRenderer(replyCommentRenderer);
      } else {
        void reSearchElement(
          commentRenderer.trackingParams,
          "ytd-comment-renderer"
        ).then((el) => {
          reWriteReplyCommentRenderer(el);
        });
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
        "#comments > #sections > #contents > ytd-comment-thread-renderer"
      );

      const reWriteCommentElem = (commentElem: Element): void => {
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
      };

      if (commentElem !== null) {
        reWriteCommentElem(commentElem);
      } else {
        void reSearchElement(
          trackingParams,
          "ytd-comment-thread-renderer"
        ).then((commentElem) => {
          reWriteCommentElem(commentElem);
        });
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
  elementSelector: string
): Element | null {
  let returnElement = null;
  const elems = document.querySelectorAll<any>(elementSelector);
  elems.forEach((elem) => {
    if (elem.trackedParams === trackingParams) {
      returnElement = elem;
    }
  });
  return returnElement;
}

/**
 * 再検索
 */
async function reSearchElement(
  trackingParams: string,
  elementType: string
): Promise<Element> {
  return await new Promise((resolve) => {
    let isFinding = true;

    const search = (): void => {
      const el = findElementByTrackingParams(trackingParams, elementType);
      if (el !== null) {
        resolve(el);
        isFinding = false;
      }
      if (isFinding) {
        setTimeout(() => {
          search();
        }, 100);
      }
    };

    search();
  });
}

declare global {
  interface DocumentEventMap {
    "yt-action": CustomEvent<YtAction<any, any>>;
    "yt-navigate-finish": CustomEvent<YtNavigateFinishEvent>;
  }

  interface ElementEventMap {
    "yt-action": CustomEvent<YtAction<any, any>>;
  }
}
