import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: YtAction<any, any>,
): void {
  // comment
  const commentDetail: YtAction<
    YtAppendContinuationItemsActionArg0<"comment">,
    Element
  > = detail;

  setTimeout(() => {
    rewriteCommentNameFromContinuationItems(
      commentDetail.args[0].appendContinuationItemsAction.continuationItems,
    );
  }, 400);
}
