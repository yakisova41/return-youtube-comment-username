import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import { rewriteHighlightedReply } from "src/rewrites/highlightedReply";
import { isReplyContinuationItems } from "src/types/AppendContinuationItemsAction";
import { type YtAction } from "src/types/YtAction";
import { type YtGetMultiPageMenuAction } from "src/types/YtGetMultiPageMenuAction";
import { debugLog } from "src/utils/debugLog";

/**
 * ヘッダーの通知欄にあるコメントを置き換え
 */
export function handleYtGetMultiPageMenuAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: YtAction<any, any>,
): void {
  debugLog("handleYtGetMultiPageMenuAction");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMultiPageMenuDetail: YtAction<YtGetMultiPageMenuAction, any> =
    detail;
  const continuationItems =
    getMultiPageMenuDetail.args[0].getMultiPageMenuAction.menu
      .multiPageMenuRenderer.sections[1].itemSectionRenderer?.contents;

  const highLightedTeaserContents =
    getMultiPageMenuDetail.args[0]?.getMultiPageMenuAction?.menu
      ?.multiPageMenuRenderer.sections[1].itemSectionRenderer?.contents[0]
      ?.commentThreadRenderer.replies?.commentRepliesRenderer?.teaserContents;

  if (continuationItems !== undefined) {
    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(continuationItems);

      if (highLightedTeaserContents !== undefined) {
        debugLog("HighLighted Teaser Reply found.");

        if (isReplyContinuationItems(highLightedTeaserContents)) {
          debugLog("highLighted Teaser Reply V2");
          const commentViewModel =
            highLightedTeaserContents[0]?.commentViewModel;
          const trackingParams =
            commentViewModel.rendererContext.loggingContext.loggingDirectives
              .trackingParams;

          rewriteHighlightedReply(trackingParams);
        }
      }
    }, 100);
  }
}
