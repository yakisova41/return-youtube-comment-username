import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";
import {
  type ContinuationItems,
  type ConfinuationItem,
  ConfinuationItemV2,
  isConfinuationItemV1,
  isConfinuationItemV2,
} from "src/types/AppendContinuationItemsAction";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";
import { debugErr, debugLog } from "src/utils/debugLog";
import { rewriteTeaserReplytNameFromContinuationItems } from "./reply";
import { nameRewriteOfCommentViewModel } from "./rewriteOfCommentRenderer/nameRewriteOfCommentViewModel";

/**
 * confinuationItemsを元にコメントの名前を書き換える。
 */
export function rewriteCommentNameFromContinuationItems(
  continuationItems: ContinuationItems,
): void {
  debugLog("Rewrite Comment.");

  for (let i = 0; i < continuationItems.length; i++) {
    if (continuationItems[i].commentThreadRenderer !== undefined) {
      void getCommentElem(
        continuationItems[i].commentThreadRenderer.trackingParams,
      ).then((commentElem) => {
        reWriteCommentElem(
          commentElem,
          continuationItems[i].commentThreadRenderer,
        );
      });

      const teaserContents =
        continuationItems[i].commentThreadRenderer.replies
          ?.commentRepliesRenderer.teaserContents;
      if (teaserContents !== undefined) {
        // teaser repliy exist
        rewriteTeaserReplytNameFromContinuationItems(teaserContents);
      }
    }
  }
}

/**
 * コメントの要素を書き換え
 */
function reWriteCommentElem(
  commentElem: ShadyElement,
  commentThreadRenderer: ConfinuationItem | ConfinuationItemV2,
): void {
  const commentRenderer =
    commentElem.__shady_native_children.namedItem("comment");

  if (commentRenderer !== null && commentRenderer !== undefined) {
    if (isConfinuationItemV1(commentThreadRenderer)) {
      debugLog("Rewrite of Comment Renderer.");

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
          .browseEndpoint.browseId,
      );
    }

    if (isConfinuationItemV2(commentThreadRenderer)) {
      debugLog("Rewrite of Comment view model.");

      // let isContainer = commentThreadRenderer.commentViewModel.commentViewModel;
      nameRewriteOfCommentViewModel(commentRenderer);
    }
  }
}

/**
 * コメントの要素をtrackingParamsから取得
 */
async function getCommentElem(trackingParams: string): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const commentElem = findElementByTrackingParams<ShadyElement>(
      trackingParams,
      "#comments > #sections > #contents > ytd-comment-thread-renderer",
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
