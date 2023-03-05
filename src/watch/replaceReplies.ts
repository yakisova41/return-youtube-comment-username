import { getUserName } from "./getUserName";
import { findElementAll } from "../lib/findElement";
export async function replaceReplies(page: number, targetIndex: number) {
    const nthChild = page * 20 + (targetIndex + 1);

    const repliesElem = await findElementAll(
        `#comments > #sections > #contents > ytd-comment-thread-renderer:nth-child(${nthChild}) > #replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer`
    );

    repliesElem.forEach((elem) => {
        /**
         * 名前の置き換え
         */
        const channelHrefElem: HTMLAnchorElement = elem.querySelector(
            "#body > #main > #header > #header-author > h3 > a "
        );

        let nameElem: HTMLElement;
        nameElem = elem.querySelector(
            "#body > #main > #header > #header-author >  #author-comment-badge > ytd-author-comment-badge-renderer > #name > ytd-channel-name > #container > #text-container > #text "
        );
        if (nameElem === null) {
            nameElem = channelHrefElem.querySelector("span");
        }
        getUserName(channelHrefElem.href).then((name) => {
            nameElem.innerHTML = name;
        });

        /**
         * リプライの送信先を置き換え
         */
        const textElems: NodeListOf<HTMLAnchorElement> = elem.querySelectorAll(
            "#body > #main > #comment-content > #expander > #content > #content-text > a.yt-formatted-string"
        );
        textElems.forEach((textElem) => {
            const text = textElem.innerHTML;
            if (text.match("@.*")) {
                getUserName(textElem.href).then((name) => {
                    textElem.innerHTML = "@" + name;
                });
            }
        });
    });
}
