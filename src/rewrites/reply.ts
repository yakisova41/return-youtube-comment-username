import {
  findElementByTrackingParams,
  reSearchElement,
  reSearchElementAllByCommentId,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";

import {
  type CommentRenderer,
  type ReplyContinuationItems,
  ReplyContinuationItemsV2,
  isReplyContinuationItemsV1,
  isReplyContinuationItemsV2,
} from "src/types/AppendContinuationItemsAction";
import { mentionRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/mentionRewriteOfCommentRenderer";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";
import { debugErr, debugLog } from "src/utils/debugLog";
import { getUserName } from "src/utils/getUserName";
import { nameRewriteOfCommentViewModel } from "./rewriteOfCommentRenderer/nameRewriteOfCommentViewModel";
import { mentionRewriteOfCommentRendererV2 } from "./rewriteOfCommentRenderer/mentionRewriteOfCommentRendererV2";

/**
 * confinuationItems(コメントをレンダリングする際の元データ？)のリストを元に
 * trackingParamsを取得、trackingParamsから要素を取得して、
 * Replyの名前を書き換える。
 */
export function rewriteReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems | ReplyContinuationItemsV2,
): void {
  debugLog("Rewrite Reply.");

  if (isReplyContinuationItemsV1(continuationItems)) {
    debugLog("Rewrite reply of continuationItems.");

    for (let i = 0; i < continuationItems.length; i++) {
      const { commentRenderer } = continuationItems[i];

      if (commentRenderer !== undefined) {
        void getReplyElem(commentRenderer.trackingParams, "V1").then(
          (replyElem) => {
            reWriteReplyElem(replyElem, commentRenderer);
          },
        );
      }
    }
  }

  if (isReplyContinuationItemsV2(continuationItems)) {
    debugLog("Rewrite reply of comment view model.");

    for (let i = 0; i < continuationItems.length; i++) {
      const { commentViewModel } = continuationItems[i];

      if (commentViewModel !== undefined) {
        void getReplyElem(
          commentViewModel.rendererContext.loggingContext.loggingDirectives
            .trackingParams,
          "V2",
        ).then((replyElem) => {
          reWriteReplyElemV2(replyElem);
        });
      }
    }
  }
}

/**
 * リプライの要素を書き換え
 */
function reWriteReplyElem(
  replyElem: ShadyElement,
  rendererData: CommentRenderer,
): void {
  let isContainer = rendererData.authorIsChannelOwner;
  if (rendererData.authorCommentBadge !== undefined) {
    isContainer = true;
  }

  nameRewriteOfCommentRenderer(
    replyElem,
    isContainer,
    rendererData.authorEndpoint.browseEndpoint.browseId,
  );

  mentionRewriteOfCommentRenderer(replyElem);
  replyInputRewrite(replyElem);
}

export function reWriteReplyElemV2(replyElem: ShadyElement) {
  nameRewriteOfCommentViewModel(replyElem);
  mentionRewriteOfCommentRendererV2(replyElem);
  replyInputRewrite(replyElem);
}

/**
 * リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(
  trackedParams: string,
  version: "V1" | "V2",
): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const selector =
      "#replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > " +
      (version === "V1" ? "ytd-comment-renderer" : "ytd-comment-view-model");

    const commentRenderer = findElementByTrackingParams<ShadyElement>(
      trackedParams,
      selector,
    );

    if (commentRenderer !== null) {
      resolve(commentRenderer);
    } else {
      void reSearchElement(trackedParams, selector).then((commentRenderer) => {
        resolve(commentRenderer);
      });
    }
  });
}

/**
 * リプライ追加時に追加される要素の場所が操作によって異なるので
 * どっちも書き換えとく
 */
export function rewriteTeaserReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems | ReplyContinuationItemsV2,
): void {
  debugLog("Rewrite teaser Reply.");

  for (let i = 0; i < continuationItems.length; i++) {
    if (isReplyContinuationItemsV1(continuationItems)) {
      debugLog("Teaser reply of continuationItems.");

      const { commentRenderer } = continuationItems[i];

      if (commentRenderer !== undefined) {
        void reSearchElementAllByCommentId(
          commentRenderer.commentId,
          "ytd-comment-replies-renderer > #teaser-replies > ytd-comment-renderer",
        ).then((replyElems) => {
          replyElems.forEach((replyElem) => {
            reWriteReplyElem(replyElem, commentRenderer);
          });
        });

        void reSearchElementAllByCommentId(
          commentRenderer.commentId,
          "ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer",
        ).then((replyElems) => {
          replyElems.forEach((replyElem) => {
            reWriteReplyElem(replyElem, commentRenderer);
          });
        });
      }
    }

    if (isReplyContinuationItemsV2(continuationItems)) {
      debugLog("Teaser reply of comment view model.");

      const { commentViewModel } = continuationItems[i];

      if (commentViewModel !== undefined) {
        const elem = findElementByTrackingParams<ShadyElement>(
          commentViewModel.rendererContext.loggingContext.loggingDirectives
            .trackingParams,
          "#teaser-replies > ytd-comment-view-model",
        );

        if (elem === null) {
          throw debugErr(new Error("Can not found Teaser Reply in V2 Elem."));
        }

        reWriteReplyElemV2(elem);
      }
    }
  }
}

/**
 * 返信に返信する際にinputに追加される返信先リンクのハンドルを名前に書き換え
 */
export function replyInputRewrite(replyElem: ShadyElement): void {
  const replyToReplyBtn = replyElem.querySelector(
    "#reply-button-end > ytd-button-renderer",
  );
  const replyToReplyHander = (): void => {
    const replyLink = replyElem.querySelector("#contenteditable-root > a");
    const href = replyLink?.getAttribute("href");
    const channelId = href?.split("/")[2];

    if (channelId !== undefined && replyLink !== null) {
      void getUserName(channelId).then((name) => {
        replyLink.textContent = ` @${name}`;
      });
    }
    replyToReplyBtn?.removeEventListener("click", replyToReplyHander);
  };
  replyToReplyBtn?.addEventListener("click", replyToReplyHander);
  document.addEventListener("rycu-pagechange", () => {
    replyToReplyBtn?.removeEventListener("click", replyToReplyHander);
  });
}
