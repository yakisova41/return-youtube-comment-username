import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";
import { reWriteReplyElemV2 } from "./reply";

/**
 * highLightedReplyの要素を書き換え
 */
export function rewriteHighlightedReply(trackedParams: string): void {
  getReplyElem(trackedParams, "V1").then((replyElem) => {
    reWriteReplyElemV2(replyElem);
  });
}

/**
 * highLightedReplyの要素を書き換え
 */
export function rewriteHighlightedReplyV2(trackedParams: string): void {
  getReplyElem(trackedParams, "V2").then((replyElem) => {
    reWriteReplyElemV2(replyElem);
  });
}

/**
 * teaser!! リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(
  trackedParams: string,
  version: "V1" | "V2",
): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const selector =
      "ytd-comment-replies-renderer > #teaser-replies > " +
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
