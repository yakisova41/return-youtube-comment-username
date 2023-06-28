import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/lib/findElementByTrackingParams";
import { mentionRewriteOfCommentRenderer } from "src/lib/mentionRewriteOfCommentRenderer";
import { nameRewriteOfCommentRenderer } from "src/lib/nameRewriteOfCommentRenderer";
import {
  type CommentRenderer,
  type ReplyContinuationItems,
} from "src/types/AppendContinuationItemsAction";

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
  commentRenderer: CommentRenderer
): void {
  let isContainer = commentRenderer.authorIsChannelOwner;
  if (commentRenderer.authorCommentBadge !== undefined) {
    isContainer = true;
  }

  nameRewriteOfCommentRenderer(
    replyElem,
    isContainer,
    commentRenderer.authorEndpoint.browseEndpoint.browseId
  );

  mentionRewriteOfCommentRenderer(replyElem);
}

/**
 * リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(trackingParams: string): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const selector =
      "#replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer";

    const commentElem = findElementByTrackingParams<ShadyElement>(
      trackingParams,
      selector
    );

    if (commentElem !== null) {
      resolve(commentElem);
    } else {
      void reSearchElement(trackingParams, selector).then((commentElem) => {
        resolve(commentElem);
      });
    }
  });
}
