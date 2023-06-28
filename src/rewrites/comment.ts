import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/lib/findElementByTrackingParams";
import {
  type ContinuationItems,
  type ConfinuationItem,
} from "src/types/AppendContinuationItemsAction";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";

/**
 * confinuationItemsを元にコメントの名前を書き換える。
 */
export function rewriteCommentNameFromContinuationItems(
  continuationItems: ContinuationItems
): void {
  console.log(continuationItems);
  continuationItems.forEach((continuationItem) => {
    const { commentThreadRenderer } = continuationItem;

    if (commentThreadRenderer !== undefined) {
      const { trackingParams } = commentThreadRenderer;

      void getCommentElem(trackingParams).then((commentElem) => {
        reWriteCommentElem(commentElem, commentThreadRenderer);
      });
    }
  });
}

/**
 * コメントの要素を書き換え
 */
function reWriteCommentElem(
  commentElem: ShadyElement,
  commentThreadRenderer: ConfinuationItem
): void {
  const commentRenderer = commentElem.__shady_native_children[0];

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

/**
 * コメントの要素をtrackingParamsから取得
 */
async function getCommentElem(trackingParams: string): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const selector =
      "ytd-comments > #sections > #contents > ytd-comment-thread-renderer";

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
