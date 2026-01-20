import { debugErr } from "./debugLog";

/**
 * trackingParams(コンポーネント固有のID?)から要素を検索
 */
export function findElementByTrackingParams<T = Element>(
  trackingParams: string,
  elementSelector: string,
): T | null {
  let returnElement = null;
  let errorAlerted = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elems = document.querySelectorAll<any>(elementSelector);

  for (let i = 0; i < elems.length; i++) {
    if (
      elems[i]?.trackedParams === undefined &&
      elems[i]?.polymerController?.trackedParams === undefined
    ) {
      debugErr(new Error("TrackedParams not found in element property."));
    }

    if (elems[i].trackedParams === trackingParams) {
      returnElement = elems[i];
      break;
    } else if (elems[i]?.polymerController?.trackedParams === trackingParams) {
      returnElement = elems[i];
      break;
    } else {
      if (!errorAlerted) {
        void searchTrackedParamsByObject(trackingParams, elems[i]);
        errorAlerted = true;
      }
    }
  }

  return returnElement;
}

/**
 * 再検索
 */
export async function reSearchElement<T = ShadyElement>(
  trackingParams: string,
  selector: string,
): Promise<T> {
  return await new Promise((resolve) => {
    let isFinding = true;

    const search = (): void => {
      const el = findElementByTrackingParams<T>(trackingParams, selector);
      if (el !== null) {
        resolve(el);
        isFinding = false;
      }
      if (isFinding) {
        setTimeout(() => {
          search();
        }, 100);
      }
    };

    search();
  });
}

/**
 * コメントIDが同じReply要素をすべて取得
 */
export function findElementAllByCommentId<T = Element>(
  commnetId: string,
  elementSelector: string,
): T[] {
  const returnElements: T[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elems = document.querySelectorAll<any>(elementSelector);
  for (let i = 0; i < elems.length; i++) {
    if (elems[i] !== undefined) {
      if (
        elems[i]?.__data?.data?.commentId === undefined &&
        elems[i]?.polymerController?.__data?.data?.commentId === undefined
      ) {
        debugErr(new Error("Reply CommentId not found."));
      } else if (
        elems[i]?.__data?.data?.commentId !== undefined &&
        elems[i].__data.data.commentId === commnetId
      ) {
        returnElements.push(elems[i]);
      } else if (
        elems[i]?.polymerController?.__data?.data?.commentId !== undefined &&
        elems[i].polymerController.__data.data.commentId === commnetId
      ) {
        returnElements.push(elems[i]);
      }
    }
  }
  return returnElements;
}

/**
 * ById再検索
 */
export async function reSearchElementAllByCommentId<T = ShadyElement>(
  commnetId: string,
  selector: string,
): Promise<T[]> {
  return await new Promise((resolve) => {
    let isFinding = true;

    const search = (): void => {
      const el = findElementAllByCommentId<T>(commnetId, selector);
      if (el !== null) {
        resolve(el);
        isFinding = false;
      }
      if (isFinding) {
        setTimeout(() => {
          search();
        }, 100);
      }
    };

    search();
  });
}

/**
 * エラーが出た時にtrackedparamsまでのpathをユーザーに通知
 */
export async function searchTrackedParamsByObject(
  param: string,
  elem: Element,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const elemObj = Object(elem);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = (obj: Record<string, any>, history: string[]): void => {
    Object.keys(obj).forEach((k) => {
      if (typeof obj[k] === "object") {
        search(obj[k], [...history, k]);
      } else if (obj[k] === param) {
        history.push(k);
        throw debugErr(
          new Error(`Unknown Object format!\n"${history.join(" > ")}"`),
        );
      }
    });
  };

  search(elemObj, []);
}

/**
 * polymerの要素？知らんけど
 */
export type ShadyElement<T = HTMLElement> = ShadyElementPrototype & T;
interface ShadyElementPrototype extends HTMLElement {
  __shady_native_children: HTMLCollectionOf<ShadyElementPrototype>;
  __shady_native_innerHTML: string;
  __data: {
    data: {
      commentId: string;
    };
  };
  __dataHost: {
    __data: {
      data: {
        authorExternalChannelId: string;
        authorName: { simpleText: string };
      };
    };
  };
  polymerController: {
    __data: {
      data: {
        trackingParams: string;
        commentId: string;
      };
    };
  };
  __shady: {
    parentNode: { host: ShadyElement };
  };
}
