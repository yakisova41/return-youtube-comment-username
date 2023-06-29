import {
  findElementAllByCommentId,
  reSearchElementAllByCommentId,
  type ShadyElement,
} from "src/lib/findElementByTrackingParams";

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
  continuationItems: ReplyContinuationItems,
  isTeaser: boolean = false
): void {
  continuationItems.forEach((continuationItem) => {
    const { commentRenderer } = continuationItem;

    if (commentRenderer !== undefined) {
      void getReplyElem(commentRenderer.commentId, isTeaser).then(
        (replyElems) => {
          replyElems.forEach((replyElem) => {
            reWriteReplyElem(replyElem, commentRenderer);
          });
        }
      );
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
async function getReplyElem(
  commentId: string,
  isTeaser: boolean
): Promise<ShadyElement[]> {
  return await new Promise((resolve) => {
    let selector =
      "ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer";

    if (isTeaser) {
      selector =
        "ytd-comment-replies-renderer >#teaser-replies > ytd-comment-renderer";
    }

    const commentRenderer = findElementAllByCommentId<ShadyElement>(
      commentId,
      selector
    );

    if (commentRenderer !== null) {
      resolve(commentRenderer);
    } else {
      void reSearchElementAllByCommentId(commentId, selector).then(
        (commentRenderer) => {
          resolve(commentRenderer);
        }
      );
    }
  });
}
