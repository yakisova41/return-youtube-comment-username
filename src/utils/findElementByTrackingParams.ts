/**
 * trackingParams(コンポーネント固有のID?)から要素を検索
 */
export function findElementByTrackingParams<T = Element>(
  trackingParams: string,
  elementSelector: string
): T | null {
  let returnElement = null;
  const elems = document.querySelectorAll<any>(elementSelector);

  for (let i = 0; i < elems.length; i++) {
    if (elems[i].trackedParams === trackingParams) {
      returnElement = elems[i];
      break;
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
  const timeOut = 10000;

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

    setTimeout(() => {
      if (isFinding) {
        isFinding = false;
        throw new Error(`Research Timeout trackingParams: ${trackingParams}`);
      }
    }, timeOut);
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
    if (elem.__data.data.commentId === commnetId) {
      returnElements.push(elem);
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
