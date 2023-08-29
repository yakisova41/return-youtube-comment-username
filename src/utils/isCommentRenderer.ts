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
    if ("commentThreadRenderer" in continuationItems[0]) {
      return false;
    }

    if ("commentRenderer" in continuationItems[0]) {
      return true;
    }
  }

  return false;
}
