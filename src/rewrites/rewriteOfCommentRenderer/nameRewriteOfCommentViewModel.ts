import { debugErr } from "src/utils/debugLog";
import { escapeString } from "src/utils/escapeString";
import { ShadyElement } from "src/utils/findElementByTrackingParams";
import { getShadyChildren } from "src/utils/getShadyChildren";
import { getUserName } from "src/utils/getUserName";

export function nameRewriteOfCommentViewModel(commentRenderer: ShadyElement) {
  const commentRendererBody: ShadyElement | null = getShadyChildren(
    commentRenderer,
    2,
    "body",
  );

  if (commentRendererBody === null) {
    throw new Error("[rycu] comment renderer body is null");
  }

  if (!commentRendererBodyGuard(commentRendererBody)) {
    throw new Error(
      "[rycu] The object format of comment renderer body is invalid.",
    );
  }

  const isNameContainerRender =
    commentRendererBody.__dataHost.$["author-text"].__dataHost.__data
      .authorCommentBadge !== null;

  let nameElem = commentRendererBody.querySelector<ShadyElement>(
    "#main > #header > #header-author > h3 > a > span",
  );

  const userId =
    commentRendererBody.__dataHost.$["author-text"].__dataHost.__data
      .authorNameEndpoint.browseEndpoint.browseId;

  /**
   * チャンネル所有者のコメントは別の要素に名前がかかれる
   */
  if (isNameContainerRender) {
    const containerMain = getShadyChildren(commentRendererBody, 1, "main");

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

function commentRendererBodyGuard(
  elem: ShadyElement | CommentRendererBodyElement,
): elem is CommentRendererBodyElement {
  return Object.hasOwn(elem, "__dataHost");
}

type CommentRendererBodyElement = ShadyDataHostElem<{
  $: {
    "author-text": ShadyDataHostElem<{
      __data: {
        authorCommentBadge: null | { iconTooltip: string };
        authorNameEndpoint: {
          browseEndpoint: {
            browseId: string;
          };
        };
      };
    }>;
  };
}>;

interface ShadyDataHostElem<T> extends ShadyElement {
  __dataHost: T;
}
