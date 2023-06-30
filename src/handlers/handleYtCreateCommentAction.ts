import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import { type YtAction } from "src/types/YtAction";
import { type YtCreateCommentAction } from "src/types/YtCreateCommentAction";

/**
 * 自分でコメントした時に自分のコメントを書き換え
 */
export function handleYtCreateCommentAction(detail: YtAction<any, any>): void {
  const createCommentDetail: YtAction<YtCreateCommentAction, Element> = detail;
  const continuationItems = [
    {
      commentThreadRenderer:
        createCommentDetail.args[0].createCommentAction.contents
          .commentThreadRenderer,
    },
  ];
  setTimeout(() => {
    rewriteCommentNameFromContinuationItems(continuationItems);
  }, 100);
}
