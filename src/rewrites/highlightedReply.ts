import {
  findElementByTrackingParams,
  reSearchElement,
} from "src/utils/findElementByTrackingParams";
import { reWriteReplyElem } from "./reply";
import { CommentViewModelElement } from "./rewriteOfCommentRenderer/nameRewriteOfCommentViewModel";

/**
 * highLightedReplyの要素を書き換え
 */
export function rewriteHighlightedReply(trackedParams: string): void {
  getReplyElem(trackedParams).then((replyElem) => {
    reWriteReplyElem(replyElem);
  });
}

/**
 * teaser!! リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(
  trackedParams: string,
): Promise<CommentViewModelElement> {
  return await new Promise((resolve) => {
    const selector =
      "ytd-comment-replies-renderer > #teaser-replies > ytd-comment-view-model";

    const commentRenderer =
      findElementByTrackingParams<CommentViewModelElement>(
        trackedParams,
        selector,
      );

    if (commentRenderer !== null) {
      resolve(commentRenderer);
    } else {
      void reSearchElement<CommentViewModelElement>(
        trackedParams,
        selector,
      ).then((commentRenderer) => {
        resolve(commentRenderer);
      });
    }
  });
}
