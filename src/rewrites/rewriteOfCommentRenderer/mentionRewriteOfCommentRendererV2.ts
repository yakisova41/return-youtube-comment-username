import { type ShadyElement } from "../../utils/findElementByTrackingParams";
import { getUserName } from "../../utils/getUserName";
import { debugErr } from "src/utils/debugLog";

/**
 * comment内のaタクを全取得して
 * 返信先リンクのもののみ書き換え
 */
export function mentionRewriteOfCommentRendererV2(
  commentRenderer: ShadyElement,
): void {
  const commentRendererBody =
    commentRenderer.__shady_native_children.namedItem("body");
  const main = commentRendererBody?.querySelector<ShadyElement>("#main");
  if (main !== undefined && main !== null) {
    const aTags = main.querySelectorAll(
      "#expander > #content > #content-text > span > span > a",
    );

    for (let i = 0; i < aTags.length; i++) {
      if (aTags[i].getAttribute("href")?.match("/channel/.*") !== null) {
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
