import { debugErr } from "src/utils/debugLog";
import { escapeString } from "src/utils/escapeString";
import { ShadyElement } from "src/utils/findElementByTrackingParams";
import { getUserName } from "src/utils/getUserName";

export type CommentViewModelElement = ShadyElement<{
  authorChannelName: string;
  authorCommentBadge: null | object;
  authorNameEndpoint: {
    browseEndpoint: {
      browseId: string;
      canonicalBaseUrl: string;
    };
  };
}>;

export function isCommentViewModelElement(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is CommentViewModelElement {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  return (
    typeof obj.authorChannelName === "string" &&
    (obj.authorCommentBadge === null ||
      typeof obj.authorCommentBadge === "object") &&
    typeof obj.authorNameEndpoint === "object" &&
    obj.authorNameEndpoint !== null &&
    typeof obj.authorNameEndpoint.browseEndpoint === "object" &&
    obj.authorNameEndpoint.browseEndpoint !== null &&
    typeof obj.authorNameEndpoint.browseEndpoint.browseId === "string" &&
    typeof obj.authorNameEndpoint.browseEndpoint.canonicalBaseUrl === "string"
  );
}

export function nameRewriteOfCommentViewModel(
  commentViewModel: CommentViewModelElement,
) {
  const commentViewModelBody: ShadyElement | null =
    commentViewModel.__shady_native_children.namedItem("body");

  if (commentViewModelBody === null) {
    throw debugErr(new Error("Comment view model body is null."));
  }

  const isNameContainerRender = commentViewModel.authorCommentBadge !== null;

  let nameElem = commentViewModel.querySelector<ShadyElement>(
    "#body > #main > #header > #header-author > h3 > a > span",
  );

  const userId = commentViewModel.authorNameEndpoint.browseEndpoint.browseId;

  const userHandle =
    commentViewModel.authorNameEndpoint.browseEndpoint.canonicalBaseUrl.substring(
      1,
    );

  /**
   * チャンネル所有者のコメントは別の要素に名前がかかれる
   */
  if (isNameContainerRender) {
    const containerMain =
      commentViewModelBody.__shady_native_children.namedItem("main");

    if (containerMain !== null) {
      nameElem = containerMain.querySelector<ShadyElement>(
        "#header > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > a > #channel-name > #container > #text-container > yt-formatted-string",
      );
    }
  }

  /**
   * 名前要素の書き換え
   */
  void getUserName(userId)
    .then((name) => {
      if (nameElem !== null) {
        if (nameElem.getAttribute("is-empty") !== null) {
          nameElem.removeAttribute("is-empty");
          //console.log("false");
        }

        let innerText = name;
        if (window.__rycu.settings.isShowNameToHandle) {
          innerText = decodeURI(userHandle) + `  ( ${name} )`;
        }
        if (window.__rycu.settings.isShowHandleToName) {
          innerText = name + `  ( ${decodeURI(userHandle)} )`;
        }

        if (isNameContainerRender) {
          nameElem.textContent = escapeString(innerText);
        } else {
          nameElem.textContent = innerText;
        }
      } else {
        debugErr(new Error("Name element is null"));
      }
    })
    .catch((e) => {
      debugErr(e);
    });
}
