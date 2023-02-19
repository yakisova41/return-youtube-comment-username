import { createEventRoot } from "./lib/eventRoot";
import { watch } from "./watch/watch";
import { commentFetchListener } from "./listeners/commentFetchListener";
export function main() {
    const eventRoot = createEventRoot();

    commentFetchListener(eventRoot);

    eventRoot.native.addEventListener(
        "pageChange",
        async (e: CustomEvent<pageChangeEvent>) => {
            const { newHref } = e.detail;

            const pageName = newHref.split("/")[3].split("?")[0];

            if (pageName === "watch") {
                watch(eventRoot);
            }
        }
    );
}

export type pageChangeEvent = {
    newHref: string;
    beforeHref: string;
};

main();
