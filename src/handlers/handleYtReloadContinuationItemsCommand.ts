import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import {
  type YtAction,
  type YtReloadContinuationItemsCommandArg0,
} from "src/types/YtAction";

/**
 * yt-reload-continuation-items-command
 * 最初の20個以内のコメント読み込み時と、新しい順と評価順を切り替えた際のaction
 */
export function handleYtReloadContinuationItemsCommand(
  detail: YtAction<any, any>
): void {
  const reloadDetail: YtAction<YtReloadContinuationItemsCommandArg0, Element> =
    detail;
  const { slot } = reloadDetail.args[0].reloadContinuationItemsCommand;

  if (slot === "RELOAD_CONTINUATION_SLOT_BODY") {
    const continuationItems =
      reloadDetail.args[0].reloadContinuationItemsCommand.continuationItems;

    if (continuationItems !== undefined) {
      setTimeout(() => {
        rewriteCommentNameFromContinuationItems(continuationItems);
      }, 100);
    }
  }
}
