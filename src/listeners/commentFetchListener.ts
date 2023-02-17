import { EventRoot } from "../lib/eventRoot";
import { FetchIntercepter } from "../lib/FetchIntercepter";

export function commentFetchListener(eventRoot: EventRoot) {
    const intercepter = FetchIntercepter(window.fetch);
    intercepter.start();

    intercepter.addAction(async (data) => {
        if (
            typeof data.request["url"] === "string" &&
            data.request["url"].match(
                "https://www.youtube.com/youtubei/v1/next.*"
            )
        ) {
            const responseClone = data.response.clone();

            const text = await responseClone.text();
            const body = JSON.parse(text);

            const commentFetchMode = is_comments(body);

            if (commentFetchMode === 1) {
                const comments =
                    body["onResponseReceivedEndpoints"][1][
                        "reloadContinuationItemsCommand"
                    ]["continuationItems"];

                const data = removeContinuationItem(comments);

                eventRoot.dispatchEvent(
                    new CustomEvent<CommentFetchEvent>("commentFetch", {
                        detail: {
                            comments: data,
                            mode: commentFetchMode,
                        },
                    })
                );
            }

            if (commentFetchMode === 2) {
                const comments =
                    body["onResponseReceivedEndpoints"][0][
                        "appendContinuationItemsAction"
                    ]["continuationItems"];

                const data = removeContinuationItem(comments);

                eventRoot.dispatchEvent(
                    new CustomEvent<CommentFetchEvent>("commentFetch", {
                        detail: {
                            comments: data,
                            mode: commentFetchMode,
                        },
                    })
                );
            }

            if (commentFetchMode === 0) {
                if (
                    body["onResponseReceivedEndpoints"][0][
                        "appendContinuationItemsAction"
                    ]["targetId"].match("comment-replies.*")
                ) {
                    //reply

                    const replies =
                        body["onResponseReceivedEndpoints"][0][
                            "appendContinuationItemsAction"
                        ]["continuationItems"];

                    const targetId =
                        body["onResponseReceivedEndpoints"][0][
                            "appendContinuationItemsAction"
                        ]["targetId"];

                    eventRoot.dispatchEvent(
                        new CustomEvent<ReplyFetchEvent>("repliesFetch", {
                            detail: {
                                replies,
                                targetId,
                            },
                        })
                    );
                }
            }
        }
    });

    return {
        stop: intercepter.stop,
    };
}

function is_comments(body: any) {
    const onResponseReceivedEndpoints = body["onResponseReceivedEndpoints"];

    if (
        onResponseReceivedEndpoints.length > 1 &&
        "reloadContinuationItemsCommand" in onResponseReceivedEndpoints[1] &&
        onResponseReceivedEndpoints[1]["reloadContinuationItemsCommand"][
            "targetId"
        ] === "comments-section"
    ) {
        return 1;
    }

    if (
        "appendContinuationItemsAction" in onResponseReceivedEndpoints[0] &&
        onResponseReceivedEndpoints[0]["appendContinuationItemsAction"][
            "targetId"
        ] === "comments-section"
    ) {
        return 2;
    }

    return 0;
}

function removeContinuationItem(comments) {
    comments.forEach((comment, index) => {
        if ("continuationItemRenderer" in comment) {
            comments.splice(index, 1);
        }
    });

    return comments;
}

export type CommentFetchEvent = {
    comments: any[];
    mode: 1 | 2;
};

export type ReplyFetchEvent = {
    replies: any[];
    targetId: string;
};
