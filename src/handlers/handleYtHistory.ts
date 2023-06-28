import { rewriteCommentNameFromContinuationItems } from "src/rewrites/comment";
import { type YtAction } from "src/types/YtAction";
import { type YtHistoryLoad } from "src/types/YtHistoryLoad";

/**
 * ページ移動後に戻ったときはhistoryとかいう名前のキャッシュから最初の20コメントが読み込まれる
 */
export function handleYtHistory(detail: YtAction<any, any>): void {
  const historyDetail: YtAction<any, YtHistoryLoad> = detail;

  const continuationItems =
    historyDetail.args[1].historyEntry?.rootData.response.contents
      .twoColumnWatchNextResults?.results?.results?.contents[3]
      ?.itemSectionRenderer?.contents;

  if (continuationItems !== undefined) {
    setTimeout(() => {
      rewriteCommentNameFromContinuationItems(continuationItems);
    }, 100);
  }
}
