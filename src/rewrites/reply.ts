import {
  findElementByTrackingParams,
  reSearchElement,
  reSearchElementAllByCommentId,
  type ShadyElement,
} from "src/utils/findElementByTrackingParams";

import {
  type CommentRenderer,
  type ReplyContinuationItems,
} from "src/types/AppendContinuationItemsAction";
import { mentionRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/mentionRewriteOfCommentRenderer";
import { nameRewriteOfCommentRenderer } from "./rewriteOfCommentRenderer/nameRewriteOfCommentRenderer";
import { debugLog } from "src/utils/debugLog";
import { getUserName } from "src/utils/getUserName";

/**
 * confinuationItems(コメントをレンダリングする際の元データ？)のリストを元に
 * trackingParamsを取得、trackingParamsから要素を取得して、
 * Replyの名前を書き換える。
 */
export function rewriteReplytNameFromContinuationItems(
  continuationItems: ReplyContinuationItems
): void {
  debugLog("Reply Rewrite");

  for (let i = 0; i < continuationItems.length; i++) {
    const { commentRenderer } = continuationItems[i];

    if (commentRenderer !== undefined) {
      void getReplyElem(commentRenderer.trackingParams).then((replyElem) => {
        reWriteReplyElem(replyElem, commentRenderer);
      });
    }
  }
}

/**
 * リプライの要素を書き換え
 */
function reWriteReplyElem(
  replyElem: ShadyElement,
  rendererData: CommentRenderer
): void {
  let isContainer = rendererData.authorIsChannelOwner;
  if (rendererData.authorCommentBadge !== undefined) {
    isContainer = true;
  }

  nameRewriteOfCommentRenderer(
    replyElem,
    isContainer,
    rendererData.authorEndpoint.browseEndpoint.browseId
  );

  mentionRewriteOfCommentRenderer(replyElem);
  replyInputRewrite(replyElem);
}

/**
 * リプライの要素をtrackingParamsから取得
 */
async function getReplyElem(trackedParams: string): Promise<ShadyElement> {
  return await new Promise((resolve) => {
    const selector =
      "#replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer";

    const commentRenderer = findElementByTrackingParams<ShadyElement>(
      trackedParams,
      selector
    );

    if (commentRenderer !== null) {
      resolve(commentRenderer);
    } else {
      void reSearchElement(trackedParams, selector).then((commentRenderer) => {
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
  continuationItems: ReplyContinuationItems
): void {
  debugLog("Teaser Reply Rewrite");

  for (let i = 0; i < continuationItems.length; i++) {
    const { commentRenderer } = continuationItems[i];

    if (commentRenderer !== undefined) {
      void reSearchElementAllByCommentId(
        commentRenderer.commentId,
        "ytd-comment-replies-renderer > #teaser-replies > ytd-comment-renderer"
      ).then((replyElems) => {
        replyElems.forEach((replyElem) => {
          reWriteReplyElem(replyElem, commentRenderer);
        });
      });

      void reSearchElementAllByCommentId(
        commentRenderer.commentId,
        "ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer"
      ).then((replyElems) => {
        replyElems.forEach((replyElem) => {
          reWriteReplyElem(replyElem, commentRenderer);
        });
      });
    }
  }
}

/**
 * 返信に返信する際にinputに追加される返信先リンクのハンドルを名前に書き換え
 */
export function replyInputRewrite(replyElem: ShadyElement): void {
  const replyToReplyBtn = replyElem.querySelector(
    "#reply-button-end > ytd-button-renderer"
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
