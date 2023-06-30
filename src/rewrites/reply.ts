import {
  findElementByTrackingParams,
  reSearchElement,
  reSearchElementAllByCommentId,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";

import {
  type CommentRenderer,
  type ReplyContinuationItems,
} from "src/types/AppendContinuationItemsAction";
import { mentionRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/mentionRewriteOfCommentRenderer";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";

/**
 * confinuationItems(コメントをレンダリングする際の元データ？)のリストを元に
 * trackingParamsを取得、trackingParamsから要素を取得して、
 * Replyの名前を書き換える。
 */
export function rewriteReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems
): void {
  continuationItems.forEach((continuationItem) => {
    const { commentRenderer } = continuationItem;

    if (commentRenderer !== undefined) {
      void getReplyElem(commentRenderer.trackingParams).then((replyElem) => {
        reWriteReplyElem(replyElem, commentRenderer);
      });
    }
  });
}

/**
 * リプライの要素を書き換え
 */
function reWriteReplyElem(
  replyElem: ShadyElement,
  rendererData: CommentRenderer
): void {
  let isContainer = rendererData.authorIsChannelOwner;
  if (rendererData.authorCommentBadge !== undefined) {
    isContainer = true;
  }

  nameRewriteOfCommentRenderer(
    replyElem,
    isContainer,
    rendererData.authorEndpoint.browseEndpoint.browseId
  );

  mentionRewriteOfCommentRenderer(replyElem);
}

/**
 * リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(trackedParams: string): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const selector =
      "#replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer";

    const commentRenderer = findElementByTrackingParams<ShadyElement>(
      trackedParams,
      selector
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
  continuationItems: ReplyContinuationItems
): void {
  continuationItems.forEach((continuationItem) => {
    const { commentRenderer } = continuationItem;

    if (commentRenderer !== undefined) {
      void reSearchElementAllByCommentId(
        commentRenderer.commentId,
        "ytd-comment-replies-renderer > #teaser-replies > ytd-comment-renderer"
      ).then((replyElems) => {
        replyElems.forEach((replyElem) => {
          reWriteReplyElem(replyElem, commentRenderer);
        });
      });
      void reSearchElementAllByCommentId(
        commentRenderer.commentId,
        "ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer"
      ).then((replyElems) => {
        replyElems.forEach((replyElem) => {
          reWriteReplyElem(replyElem, commentRenderer);
        });
      });
    }
  });
}
