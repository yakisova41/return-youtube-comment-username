import { getUserName } from "./getUserName";

export function replaceReplies(page: number, targetIndex: number) {
    let nthChild: number;
    if (page === 0) {
        nthChild = 1 + targetIndex;
    } else {
        nthChild = page * 20 + 1 + targetIndex;
    }

    const repliesElem = document.querySelectorAll(
        `#comments > #sections > #contents > ytd-comment-thread-renderer:nth-child(${nthChild}) > #replies > ytd-comment-replies-renderer > #expander > #expander-contents > #contents > ytd-comment-renderer`
    );

    repliesElem.forEach((elem) => {
        const channelHrefElem: HTMLAnchorElement = elem.querySelector(
            "#body > #main > #header > #header-author > h3 > a "
        );

        let nameElem;
        nameElem = elem.querySelector(
            "#body > #main > #header > #header-author >  #author-comment-badge > ytd-author-comment-badge-renderer > #name > ytd-channel-name > #container > #text-container > #text "
        );
        if (nameElem === null) {
            nameElem = channelHrefElem.querySelector("span");
        }

        getUserName(channelHrefElem.href).then((name) => {
            nameElem.innerHTML = name;
        });
    });
}
