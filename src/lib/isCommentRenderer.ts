/* eslint-disable no-prototype-builtins */
import {
  type ContinuationItems,
  type ReplyContinuationItems,
} from "src/types/AppendContinuationItemsAction";

/**
 * continuationItemsに含まれるデータの種類を判別
 * @returns trueの場合、リプライ/falseの場合、普通のコメント
 */
export function isCommentRenderer(
  continuationItems: ContinuationItems | ReplyContinuationItems
): boolean {
  if (continuationItems.length > 0) {
    if (continuationItems[0].hasOwnProperty("commentThreadRenderer")) {
      return false;
    }

    if (continuationItems[0].hasOwnProperty("commentRenderer")) {
      return true;
    }
  }

  return false;
}
