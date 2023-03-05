import { EventRoot } from "../lib/eventRoot";
import { findElement } from "../lib/findElement";
import { getUserName } from "../lib/getUserName";

export function replaceComments(
    comments: any[],
    page: number,
    eventRoot: EventRoot
) {
    const nameStore = [];

    comments.forEach(async (c, index) => {
        const nthChild = page * 20 + (index + 1);

        const commentElem = await findElement(
            `#comments > #sections > #contents > ytd-comment-thread-renderer:nth-child(${nthChild})`
        );

        eventRoot.addEventListener("pageChange", () => {
            commentElem.remove();
        });

        const channelHrefElem: HTMLAnchorElement = commentElem.querySelector(
            "#comment > #body > #main > #header > #header-author > h3 > a "
        );

        let nameElem: Element;
        nameElem = commentElem.querySelector(
            "#comment > #body > #main > #header  > #header-author > #author-comment-badge > ytd-author-comment-badge-renderer > #name > ytd-channel-name > #container > #text-container > #text "
        );
        if (nameElem === null) {
            nameElem = channelHrefElem.querySelector("span");
        }

        if (channelHrefElem.href in nameStore) {
            nameElem.innerHTML = nameStore[channelHrefElem.href];
        } else {
            getUserName(channelHrefElem.href).then((name) => {
                nameElem.innerHTML = name;
                nameStore[channelHrefElem.href] = name;
            });
        }
    });
}
