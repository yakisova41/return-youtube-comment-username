import { debugErr } from "src/utils/debugLog";
import { escapeString } from "src/utils/escapeString";
import { ShadyElement } from "src/utils/findElementByTrackingParams";
import { getUserName } from "src/utils/getUserName";

export function nameRewriteOfCommentViewModel(commentViewModel: ShadyElement) {
  const commentViewModelBody: ShadyElement | null =
    commentViewModel.__shady_native_children.namedItem("body");

  if (commentViewModelBody === null) {
    throw debugErr(new Error("Comment view model body is null."));
  }

  if (!commentViewModelBodyGuard(commentViewModelBody)) {
    throw debugErr(
      new Error("The object format of comment view model is invalid."),
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

  const userHandle =
    commentViewModelBody.__shady.ea.__shady.ea.host.authorNameEndpoint.browseEndpoint.canonicalBaseUrl.substring(
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
              canonicalBaseUrl: string;
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
