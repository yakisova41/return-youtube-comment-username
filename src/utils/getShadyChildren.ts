import { type ShadyElement } from "./findElementByTrackingParams";

/**
 * 基本的には子要素をindexで取得して負荷を軽減します。
 * 子要素のidが事前に指定されたidと一致しない場合(仕様変更などで要素の順番が変わった時)に
 * queryselectorで要素を取得してユーザーにエラーメッセージを出し、issueを促します。
 */

let isAleated = false;

export function getShadyChildren(
  parentElement: ShadyElement,
  index: number,
  id: string,
): ShadyElement | null {
  let returnElem: ShadyElement | null;

  const child = parentElement.__shady_native_children[index];
  if (child === null || child.id !== id) {
    returnElem = parentElement.querySelector<ShadyElement>(`#${id}`);

    if (!isAleated) {
      console.log(
        `%cReturn YouTube Comment Username Warning%c %cChildren Cannot Get by Index!%c\n%cid of element attempting to retrieve: #${id}\nIf you find this debug log, please report it to the github issue%c`,
        "background:#f0e68c; color:#000;font-size:20px;",
        "",
        "color:#00c72e;font-size:16px;",
        "",
        "color: #13ebdc;",
        "",
        "\nhttps://github.com/yakisova41/return-youtube-comment-username/issues/new?assignees=&labels=bug&projects=&template=bug_report.yaml&title=%5BBug%5D%3A+Children%20Cannot%20Get%20by%20Index",
      );
      isAleated = true;
    }
  } else {
    returnElem = child;
  }

  return returnElem;
}
