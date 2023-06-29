import { type ShadyElement } from "../../utils/findElementByTrackingParams";
import { getUserName } from "../../utils/getUserName";
import { escapeString } from "../../utils/escapeString";

/**
 * comment内のaタクを全取得して
 * 返信先リンクのもののみ書き換え
 */
export function mentionRewriteOfCommentRenderer(
  commentRenderer: ShadyElement
): void {
  const commentRendererBody = commentRenderer.__shady_native_children[2];
  const main = commentRendererBody.__shady_native_children[1];
  const aTags = main.querySelectorAll(
    "#comment-content > ytd-expander > #content > #content-text > a"
  );

  aTags.forEach((aTag) => {
    if (aTag.textContent?.match("@.*") !== null) {
      const href = aTag.getAttribute("href");
      if (href !== null) {
        void getUserName(href.split("/")[2]).then((name) => {
          aTag.textContent = `@${escapeString(name)} `;
        });
      }
    }
  });
}
