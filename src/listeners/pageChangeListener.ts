export function pageChangeListener(eventElement: Element) {
    let beforeHref = "";

    const observer = new MutationObserver(() => {
        const href = location.href;
        if (href !== beforeHref) {
            eventElement.dispatchEvent(
                new CustomEvent("pageChange", {
                    detail: {
                        beforeHref: beforeHref,
                        newHref: href,
                    },
                })
            );
        }
        beforeHref = href;
    });

    observer.observe(document.querySelector("body"), {
        childList: true,
        subtree: true,
    });
}
