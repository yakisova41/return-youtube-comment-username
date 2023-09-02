import { debugErr } from "src/utils/debugLog";
import { getShadyChildren } from "src/utils/getShadyChildren";
import { escapeString } from "../../utils/escapeString";
import { type ShadyElement } from "../../utils/findElementByTrackingParams";
import { getUserName } from "../../utils/getUserName";

/**
 * commentRenderer要素の名前を書き換えます
 * @param commentRenderer commentRenderer要素
 * @param isNameContainerRender 名前がcontainerに表示されるか(チャンネルオーナー、公式ミュージックチャンネル)など
 * @param userId ユーザーID
 */
export function nameRewriteOfCommentRenderer(
  commentRenderer: ShadyElement,
  isNameContainerRender: boolean,
  userId: string
): void {
  const commentRendererBody: ShadyElement | null = getShadyChildren(
    commentRenderer,
    3,
    "body"
  );

  if (commentRendererBody === null) {
    throw new Error("[rycu] comment renderer body is null");
  }

  let nameElem = commentRendererBody.querySelector<ShadyElement>(
    "#main > #header > #header-author > h3 > a > span"
  );

  /**
   * チャンネル所有者のコメントは別の要素に名前がかかれる
   */
  if (isNameContainerRender) {
    const containerMain = getShadyChildren(commentRendererBody, 1, "main");

    if (containerMain !== null) {
      nameElem = containerMain.querySelector<ShadyElement>(
        "#header > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > a > #channel-name > #container > #text-container > yt-formatted-string"
      );
    }
  }

  /**
   * 名前要素の書き換え
   */
  void getUserName(userId)
    .then((name) => {
      if (nameElem !== null) {
        if (isNameContainerRender) {
          nameElem.__shady_native_innerHTML = escapeString(name);
        } else {
          nameElem.textContent = name;
        }
      } else {
        debugErr("Name element is null");
      }
    })
    .catch((e) => {
      debugErr(e);
    });
}
