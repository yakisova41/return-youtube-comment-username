import { type ShadyElement } from "../../utils/findElementByTrackingParams";
import { getUserName } from "../../utils/getUserName";
import { debugErr } from "src/utils/debugLog";
import { getShadyChildren } from "src/utils/getShadyChildren";

/**
 * comment内のaタクを全取得して
 * 返信先リンクのもののみ書き換え
 */
export function mentionRewriteOfCommentRenderer(
  commentRenderer: ShadyElement,
): void {
  const commentRendererBody = getShadyChildren(commentRenderer, 2, "body");

  const main = commentRendererBody?.querySelector<ShadyElement>("#main");

  if (main !== undefined && main !== null) {
    const aTags = main.querySelectorAll(
      "#comment-content > ytd-expander > #content > #content-text > a",
    );

    for (let i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent?.match("@.*") !== null) {
        const href = aTags[i].getAttribute("href");

        if (href !== null) {
          void getUserName(href.split("/")[2])
            .then((name) => {
              aTags[i].textContent = `@${name} `;
            })
            .catch((e) => {
              debugErr(e);
            });
        } else {
          debugErr("Mention Atag is have not Href attr");
        }
      }
    }
  }
}
