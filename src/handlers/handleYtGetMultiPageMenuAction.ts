import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import { rewriteHighlightedReply } from "src/rewrites/highlightedReply";
import { type YtAction } from "src/types/YtAction";
import { type YtGetMultiPageMenuAction } from "src/types/YtGetMultiPageMenuAction";

/**
 * ヘッダーの通知欄にあるコメントを置き換え
 */
export function handleYtGetMultiPageMenuAction(
  detail: YtAction<any, any>
): void {
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
        const highLightedReplyRenderer =
          highLightedTeaserContents[0]?.commentRenderer;
        let isContainer = highLightedReplyRenderer.authorIsChannelOwner;

        if (highLightedReplyRenderer.authorCommentBadge !== undefined) {
          isContainer = true;
        }

        rewriteHighlightedReply(
          highLightedReplyRenderer.trackingParams,
          isContainer,
          highLightedReplyRenderer.authorEndpoint.browseEndpoint.browseId
        );
      }
    }, 100);
  }
}
