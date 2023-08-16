import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";
import { replyInputRewrite } from "./reply";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";

/**
 * highLightedReplyの要素を書き換え
 */
export function rewriteHighlightedReply(
  trackedParams: string,
  isContainer: boolean,
  userId: string
): void {
  const elem = findElementByTrackingParams<ShadyElement>(
    trackedParams,
    "ytd-comment-renderer"
  );

  const rewriteHighlightedReplyElem = (elem: ShadyElement): void => {
    nameRewriteOfCommentRenderer(elem, isContainer, userId);
    replyInputRewrite(elem);
  };

  if (elem === null) {
    void reSearchElement(trackedParams, "ytd-comment-renderer").then((elem) => {
      rewriteHighlightedReplyElem(elem);
    });
  } else {
    rewriteHighlightedReplyElem(elem);
  }
}
