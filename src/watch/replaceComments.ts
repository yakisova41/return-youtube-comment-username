import { findElement } from "../lib/findElement";
import { getUserName } from "./getUserName";

export function replaceComments(comments: any[], page: number) {
    comments.forEach(async (comment, index) => {
        let nthChild: number;
        if (page === 0) {
            nthChild = 1 + index;
        } else {
            nthChild = page * 20 + 1 + index;
        }

        findElement(
            `#comments > #sections > #contents > ytd-comment-thread-renderer:nth-child(${nthChild})`
        ).then((commentElem) => {
            const channelHrefElem: HTMLAnchorElement =
                commentElem.querySelector(
                    "#comment > #body > #main > #header > #header-author > h3 > a "
                );

            let nameElem;
            nameElem = commentElem.querySelector(
                "#comment > #body > #main > #header  > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > #name > ytd-channel-name > #container > #text-container > #text "
            );
            if (nameElem === null) {
                nameElem = channelHrefElem.querySelector("span");
            }

            getUserName(channelHrefElem.href).then((name) => {
                nameElem.innerHTML = name;
            });
        });
    });
}
