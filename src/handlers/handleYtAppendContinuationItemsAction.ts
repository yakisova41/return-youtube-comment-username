import { isCommentRenderer } from "src/utils/isCommentRenderer";
import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import { rewriteReplytNameFromContinuationItems } from "src/rewrites/reply";
import {
  type YtAction,
  type YtAppendContinuationItemsActionArg0,
} from "src/types/YtAction";

/**
 * yt-append-continuation-items-action
 * コメントの2ページ目(1ページ20個区切りと考えた場合)からの読み込みと、
 * リプライの読み込み時のaction
 */
export function handleYtAppendContinuationItemsAction(
  detail: YtAction<any, any>
): void {
  const continuationItems =
    detail.args[0].appendContinuationItemsAction.continuationItems;
  if (isCommentRenderer(continuationItems)) {
    // Reply
    const replyDetail: YtAction<
      YtAppendContinuationItemsActionArg0<"reply">,
      Element
    > = detail;

    setTimeout(() => {
      rewriteReplytNameFromContinuationItems(
        replyDetail.args[0].appendContinuationItemsAction.continuationItems
      );
    }, 100);
  } else {
    // comment
    const commentDetail: YtAction<
      YtAppendContinuationItemsActionArg0<"comment">,
      Element
    > = detail;

    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(
        commentDetail.args[0].appendContinuationItemsAction.continuationItems
      );
    }, 400);
  }
}
