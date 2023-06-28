/**
 * trackingParams(コンポーネント固有のID?)から要素を検索
 */
export function findElementByTrackingParams<T = Element>(
  trackingParams: string,
  elementSelector: string
): T | null {
  let returnElement = null;
  const elems = document.querySelectorAll<any>(elementSelector);
  elems.forEach((elem) => {
    if (elem.trackedParams === trackingParams) {
      returnElement = elem;
    }
  });
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
 * polymerの要素？知らんけど
 */
export interface ShadyElement extends HTMLElement {
  __shady_native_children: ShadyElement[];
  __shady_native_innerHTML: string;
}
