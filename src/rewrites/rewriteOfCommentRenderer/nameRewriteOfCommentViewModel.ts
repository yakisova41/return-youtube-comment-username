import { debugErr } from "src/utils/debugLog";
import { escapeString } from "src/utils/escapeString";
import { ShadyElement } from "src/utils/findElementByTrackingParams";
import { getUserName } from "src/utils/getUserName";

export function nameRewriteOfCommentViewModel(commentViewModel: ShadyElement) {
  const commentViewModelBody: ShadyElement | null =
    commentViewModel.__shady_native_children.namedItem("body");

  if (commentViewModelBody === null) {
    throw new Error("[rycu] comment view model body is null");
  }

  if (!commentViewModelBodyGuard(commentViewModelBody)) {
    throw new Error(
      "[rycu] The object format of comment renderer body is invalid.",
    );
  }

  const isNameContainerRender =
    commentViewModelBody.__shady.ea.__shady.ea.host.authorCommentBadge !== null;

  let nameElem = commentViewModelBody.querySelector<ShadyElement>(
    "#main > #header > #header-author > h3 > a > span",
  );

  const userId =
    commentViewModelBody.__shady.ea.__shady.ea.host.authorNameEndpoint
      .browseEndpoint.browseId;

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

function commentViewModelBodyGuard(
  elem: ShadyElement | CommentViewModelBodyElement,
): elem is CommentViewModelBodyElement {
  return Object.hasOwn(elem, "__shady");
}

type CommentViewModelBodyElement = ShadyCommentViewModelElem<{
  ea: {
    __shady: {
      ea: {
        host: {
          authorChannelName: string;
          authorCommentBadge: null | object;
          authorNameEndpoint: {
            browseEndpoint: {
              browseId: string;
            };
          };
        };
      };
    };
  };
}>;

interface ShadyCommentViewModelElem<T> extends ShadyElement {
  __shady: T;
}
