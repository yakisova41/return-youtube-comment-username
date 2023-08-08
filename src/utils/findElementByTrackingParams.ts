import { debugErr } from "./debugLog";

/**
 * trackingParams(コンポーネント固有のID?)から要素を検索
 */
export function findElementByTrackingParams<T = Element>(
  trackingParams: string,
  elementSelector: string
): T | null {
  let returnElement = null;
  let errorAlerted = false;
  const elems = document.querySelectorAll<any>(elementSelector);

  for (let i = 0; i < elems.length; i++) {
    if (
      elems[i]?.trackedParams === undefined &&
      elems[i]?.controllerProxy?.trackedParams === undefined
    ) {
      debugErr("TrackdParams property is not found");
    }

    if (elems[i].trackedParams === trackingParams) {
      returnElement = elems[i];
      break;
    } else if (elems[i]?.controllerProxy?.trackedParams === trackingParams) {
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
  selector: string
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
  elementSelector: string
): T[] {
  const returnElements: T[] = [];
  const elems = document.querySelectorAll<any>(elementSelector);
  elems.forEach((elem) => {
    if (elem !== undefined) {
      if (
        elem?.__data?.data?.commentId !== undefined &&
        elem.__data.data.commentId === commnetId
      ) {
        returnElements.push(elem);
      } else if (
        elem?.controllerProxy?.__data?.data?.commentId !== undefined &&
        elem.controllerProxy.__data.data.commentId === commnetId
      ) {
        returnElements.push(elem);
      } else {
        debugErr("Reply CommentId is not found");
      }
    }
  });
  return returnElements;
}

/**
 * ById再検索
 */
export async function reSearchElementAllByCommentId<T = ShadyElement>(
  commnetId: string,
  selector: string
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

export async function searchTrackedParamsByObject(
  param: string,
  elem: Element
): Promise<any> {
  const elemObj = Object(elem);

  const search = (obj: Record<string, any>, history: string[]): void => {
    Object.keys(obj).forEach((k) => {
      if (typeof obj[k] === "object") {
        search(obj[k], [...history, k]);
      } else if (obj[k] === param) {
        history.push(k);
        alert(
          `[Return YouTube Comment Username] Unknown Object format!\n"${history.join(
            ">"
          )}"`
        );
      }
    });
  };

  search(elemObj, []);
}

/**
 * polymerの要素？知らんけど
 */
export interface ShadyElement extends HTMLElement {
  __shady_native_children: ShadyElement[];
  __shady_native_innerHTML: string;
  __data: {
    data: {
      commentId: string;
    };
  };
}
