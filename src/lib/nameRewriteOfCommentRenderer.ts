import { type ShadyElement } from "./findElementByTrackingParams";
import { getUserName } from "./getUserName";

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
  const commentRendererBody = commentRenderer.__shady_native_children[2];

  let nameElem = commentRendererBody.querySelector<ShadyElement>(
    "#main > #header > #header-author > h3 > a > span"
  );

  /**
   * チャンネル所有者のコメントは別の要素に名前がかかれる
   */
  if (isNameContainerRender) {
    nameElem =
      commentRendererBody.__shady_native_children[1].querySelector<ShadyElement>(
        "#header > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > a > #channel-name > #container > #text-container > yt-formatted-string"
      );
  }

  /**
   * 名前要素の書き換え
   */
  void getUserName(userId).then((name) => {
    if (nameElem !== null) {
      if (isNameContainerRender) {
        nameElem.__shady_native_innerHTML = name;
      } else {
        nameElem.textContent = name;
      }
    }
  });
}
