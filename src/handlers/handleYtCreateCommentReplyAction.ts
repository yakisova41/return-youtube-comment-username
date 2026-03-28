import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import { ContinuationItems } from "src/types/AppendContinuationItemsAction";
import { type YtAction } from "src/types/YtAction";
import { type YtCreateCommentReplyAction } from "src/types/YtCreateCommentAction";

/**
 * 自分が返信した時に自分の返信を書き換え
 */
export function handleYtCreateCommentReplyAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: YtAction<any, any>,
): void {
  const createReplyDetail: YtAction<YtCreateCommentReplyAction, Element> =
    detail;

  const continuationItems: ContinuationItems = [
    {
      commentThreadRenderer:
        createReplyDetail.args[0].createCommentReplyAction.contents
          .commentThreadRenderer,
    },
  ];

  setTimeout(() => {
    rewriteCommentNameFromContinuationItems(continuationItems);
  }, 100);
}
