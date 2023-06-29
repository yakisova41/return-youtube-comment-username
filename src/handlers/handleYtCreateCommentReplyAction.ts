import { rewriteReplytNameFromContinuationItems } from "src/rewrites/reply";
import { type ReplyContinuationItems } from "src/types/AppendContinuationItemsAction";
import { type YtAction } from "src/types/YtAction";
import { type YtCreateCommentReplyAction } from "src/types/YtCreateCommentAction";

/**
 * 自分が返信した時に自分の返信を書き換え
 */
export function handleYtCreateCommentReplyAction(
  detail: YtAction<any, any>
): void {
  const createReplyDetail: YtAction<YtCreateCommentReplyAction, Element> =
    detail;
  const continuationItems: ReplyContinuationItems = [
    {
      commentRenderer:
        createReplyDetail.args[0].createCommentReplyAction.contents
          .commentRenderer,
    },
  ];

  setTimeout(() => {
    rewriteReplytNameFromContinuationItems(continuationItems, true);
  }, 100);
}
