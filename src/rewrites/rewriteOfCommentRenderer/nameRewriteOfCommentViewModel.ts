import { debugErr } from "src/utils/debugLog";
import { escapeString } from "src/utils/escapeString";
import { ShadyElement } from "src/utils/findElementByTrackingParams";
import { getUserName } from "src/utils/getUserName";
import { formatUserName } from "src/utils/formatUserName";
import { type RycuSettings } from "src/types/RycuSettings";

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
  settings: RycuSettings = window.__rycu.settings,
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

  mentionRewriteOfCommentRenderer(commentViewModel);

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

        const innerText = formatUserName(name, userHandle, settings);

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

/**
 * comment内のaタクを全取得して
 * 返信先リンクのもののみ書き換え
 */
export function mentionRewriteOfCommentRenderer(
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
          debugErr(new Error("Mention Atag has not Href attr."));
        }
      }
    }
  }
}
