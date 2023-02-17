function pageChangeListener(eventElement: Element) {
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

export function createEventRoot(): EventRoot {
    const eventElement = document.createElement("div");

    pageChangeListener(eventElement);

    return {
        addEventListener: (
            eName: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ) => {
            eventElement.addEventListener(eName, listener, options);

            const pageChangeListener = () => {
                eventElement.removeEventListener(
                    "pageChange",
                    pageChangeListener
                );
                eventElement.removeEventListener(eName, listener, options);
            };
            eventElement.addEventListener("pageChange", pageChangeListener);
        },

        dispatchEvent: (e: CustomEvent) => {
            eventElement.dispatchEvent(e);
        },

        removeEventListener: (eName, listener, options) => {
            eventElement.removeEventListener(eName, listener, options);
        },

        native: eventElement,
    };
}

export type EventRoot = {
    addEventListener: (
        eName: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ) => void;

    removeEventListener: (
        eName: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ) => void;

    dispatchEvent: (e: CustomEvent) => void;

    native: HTMLDivElement;
};
