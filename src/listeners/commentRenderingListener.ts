import { EventRoot } from "../lib/eventRoot";
import { findElement } from "../lib/findElement";

export async function renderingListener(eventRoot: EventRoot) {
    let renderingTrigger = false;
    const contents = await findElement("#comments > #sections");
    const observer = new MutationObserver(() => {
        if ("can-show-more" in contents.attributes) {
            renderingTrigger = true;
        } else if ("continuation-is-reloading" in contents.attributes) {
            renderingTrigger = true;
            eventRoot.dispatchEvent(
                new CustomEvent("commentsContinuationReloading")
            );
        } else {
            if (renderingTrigger) {
                renderingTrigger = false;
                eventRoot.dispatchEvent(
                    new CustomEvent("commentsRenderingSuccess")
                );
            }
        }
    });
    observer.observe(contents, {
        attributes: true,
    });

    return observer;
}
