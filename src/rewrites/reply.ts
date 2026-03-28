import {
  findElementByTrackingParams,
  reSearchElement,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";

import {
  isReplyContinuationItems,
  type ReplyContinuationItems,
} from "src/types/AppendContinuationItemsAction";
import { debugErr, debugLog } from "src/utils/debugLog";
import { getUserName } from "src/utils/getUserName";
import {
  CommentViewModelElement,
  nameRewriteOfCommentViewModel,
} from "./rewriteOfCommentRenderer/nameRewriteOfCommentViewModel";
import { mentionRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/mentionRewriteOfCommentRenderer";

/**
 * confinuationItems(コメントをレンダリングする際の元データ？)のリストを元に
 * trackingParamsを取得、trackingParamsから要素を取得して、
 * Replyの名前を書き換える。
 */
export function rewriteReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems,
): void {
  debugLog("Rewrite Reply.");

  if (isReplyContinuationItems(continuationItems)) {
    debugLog("Rewrite reply of comment view model.");

    for (let i = 0; i < continuationItems.length; i++) {
      for (let i = 0; i < continuationItems.length; i++) {
        const { commentViewModel } = continuationItems[i];

        if (commentViewModel !== undefined) {
          void getReplyElem(
            commentViewModel.rendererContext.loggingContext.loggingDirectives
              .trackingParams,
          ).then((replyElem) => {
            reWriteReplyElem(replyElem);
          });
        }

        console.log(continuationItems[i]);
      }
    }
  }
}

export function reWriteReplyElem(replyElem: CommentViewModelElement) {
  nameRewriteOfCommentViewModel(replyElem);
  mentionRewriteOfCommentRenderer(replyElem);
  replyInputRewrite(replyElem);
}

/**
 * リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(
  trackedParams: string,
): Promise<CommentViewModelElement> {
  return await new Promise((resolve) => {
    const selector =
      "#replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-view-model";

    const commentRenderer =
      findElementByTrackingParams<CommentViewModelElement>(
        trackedParams,
        selector,
      );

    if (commentRenderer !== null) {
      resolve(commentRenderer);
    } else {
      void reSearchElement<CommentViewModelElement>(
        trackedParams,
        selector,
      ).then((commentRenderer) => {
        resolve(commentRenderer);
      });
    }
  });
}

/**
 * リプライ追加時に追加される要素の場所が操作によって異なるので
 * どっちも書き換えとく
 */
export function rewriteTeaserReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems,
): void {
  debugLog("Rewrite teaser Reply.");

  for (let i = 0; i < continuationItems.length; i++) {
    if (isReplyContinuationItems(continuationItems)) {
      debugLog("Teaser reply of comment view model.");

      const { commentViewModel } = continuationItems[i];

      if (commentViewModel !== undefined) {
        const elem = findElementByTrackingParams<CommentViewModelElement>(
          commentViewModel.rendererContext.loggingContext.loggingDirectives
            .trackingParams,
          "#teaser-replies > ytd-comment-view-model",
        );

        if (elem === null) {
          throw debugErr(new Error("Can not found Teaser Reply in V2 Elem."));
        }

        reWriteReplyElem(elem);
      }
    }
  }
}

/**
 * 返信に返信する際にinputに追加される返信先リンクのハンドルを名前に書き換え
 */
export function replyInputRewrite(replyElem: ShadyElement): void {
  const replyToReplyBtn = replyElem.querySelector(
    "#reply-button-end > ytd-button-renderer",
  );
  const replyToReplyHander = (): void => {
    const replyLink = replyElem.querySelector("#contenteditable-root > a");
    const href = replyLink?.getAttribute("href");
    const channelId = href?.split("/")[2];

    if (channelId !== undefined && replyLink !== null) {
      void getUserName(channelId).then((name) => {
        replyLink.textContent = ` @${name}`;
      });
    }
    replyToReplyBtn?.removeEventListener("click", replyToReplyHander);
  };
  replyToReplyBtn?.addEventListener("click", replyToReplyHander);
  document.addEventListener("rycu-pagechange", () => {
    replyToReplyBtn?.removeEventListener("click", replyToReplyHander);
  });
}
