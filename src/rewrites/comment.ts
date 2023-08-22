import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";
import {
  type ContinuationItems,
  type ConfinuationItem,
} from "src/types/AppendContinuationItemsAction";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";
import { debugErr, debugLog } from "src/utils/debugLog";
import { rewriteTeaserReplytNameFromContinuationItems } from "./reply";

/**
 * confinuationItemsを元にコメントの名前を書き換える。
 */
export function rewriteCommentNameFromContinuationItems(
  continuationItems: ContinuationItems
): void {
  debugLog("Comment Rewrite");

  continuationItems.forEach((continuationItem) => {
    const { commentThreadRenderer } = continuationItem;

    if (commentThreadRenderer !== undefined) {
      const { trackingParams } = commentThreadRenderer;
      void getCommentElem(trackingParams).then((commentElem) => {
        reWriteCommentElem(commentElem, commentThreadRenderer);
      });

      if (
        commentThreadRenderer.replies?.commentRepliesRenderer.teaserContents !==
        undefined
      ) {
        // teaser repliy exist
        rewriteTeaserReplytNameFromContinuationItems(
          commentThreadRenderer.replies?.commentRepliesRenderer.teaserContents
        );
      }
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
  const commentRenderer = Array.from(
    commentElem.__shady_native_children
  ).filter((elem) => {
    return elem.id === "comment";
  })[0];

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
    const commentElem = findElementByTrackingParams<ShadyElement>(
      trackingParams,
      "#comments > #sections > #contents > ytd-comment-thread-renderer"
    );

    if (commentElem !== null) {
      resolve(commentElem);
    } else {
      void reSearchElement(trackingParams, "ytd-comment-thread-renderer")
        .then((commentElem) => {
          resolve(commentElem);
        })
        .catch((e) => {
          debugErr(e);
        });
    }
  });
}
