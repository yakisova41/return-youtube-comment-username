import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";
import {
  type ContinuationItems,
  type ContinuationItem,
  isContinuationItem,
} from "src/types/AppendContinuationItemsAction";
import { debugErr, debugLog } from "src/utils/debugLog";
import {
  isCommentViewModelElement,
  mentionRewriteOfCommentRenderer,
  nameRewriteOfCommentViewModel,
} from "./rewriteOfCommentRenderer/nameRewriteOfCommentViewModel";
import { type RycuSettings } from "src/types/RycuSettings";
import { rewriteTeaserReplytNameFromContinuationItems } from "./reply";

/**
 * Rewrite comments by using continuation Items
 * @param continuationItems
 * @param settings
 * @returns
 */
export function rewriteCommentNameFromContinuationItems(
  continuationItems: ContinuationItems,
  settings: RycuSettings = window.__rycu.settings,
) {
  if (!settings.isReplaceComments) {
    return;
  }

  debugLog("rewriteCommentNameFromContinuationItems");

  const rewrite = async (continuationItems: ContinuationItems) => {
    for (let i = 0; i < continuationItems.length; i++) {
      const continuationItem = continuationItems[i];
      const { commentThreadRenderer } = continuationItem;
      const key =
        continuationItem.commentThreadRenderer.commentViewModel.commentViewModel
          .commentKey;

      const commentElem = await getCommentElem(
        commentThreadRenderer.trackingParams,
      );

      if (key.endsWith("AQ%3D%3D")) {
        // reply
        mentionRewriteOfCommentRenderer(commentElem);
      } else {
        // comment
      }

      reWriteCommentElem(commentElem, commentThreadRenderer);

      // replies
      const replies = commentThreadRenderer.replies;

      if (replies !== undefined) {
        // Have replies?
        if (replies.commentRepliesRenderer.hideReplies === undefined) {
          // Not hidden, so rewrite reply
          rewrite(replies?.commentRepliesRenderer.subThreads);
          //mentionRewriteOfCommentRenderer(commentElem);
        }

        // Teaser reply
        if (replies.commentRepliesRenderer?.teaserContents !== undefined) {
          // teaser repliy exist
          rewriteTeaserReplytNameFromContinuationItems(
            replies.commentRepliesRenderer.teaserContents,
          );
        }
      }
    }
  };
  rewrite(continuationItems);
}

/**
 * コメントの要素を書き換え
 */
function reWriteCommentElem(
  commentElem: ShadyElement,
  commentThreadRenderer: ContinuationItem,
): void {
  const commentContainer =
    commentElem.__shady_native_children.namedItem("comment-container");

  if (commentContainer === null) {
    throw debugErr(
      new Error("Failed to found a named item 'comment-container'"),
    );
  }

  const commentRenderer =
    commentContainer.__shady_native_children.namedItem("comment");

  if (commentRenderer === null || commentRenderer === undefined) {
    throw debugErr("Failed to found a named item 'comment'.");
  }

  if (isContinuationItem(commentThreadRenderer)) {
    debugLog("Rewriteing a comment by using comment view model.");

    const commentViewModel = commentRenderer;

    if (isCommentViewModelElement(commentViewModel)) {
      nameRewriteOfCommentViewModel(commentViewModel);
    } else {
      debugErr("It type is not comment view model.");
    }
  } else {
    debugErr("Unknown comment model type.");
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
