import { EventRoot } from "../lib/eventRoot";
import { CommentFetchEvent } from "../listeners/commentFetchListener";
import { replaceComments } from "./replaceComments";
import { renderingListener } from "../listeners/commentRenderingListener";
import { replaceReplies } from "./replaceReplies";

export async function watch(eventRoot: EventRoot) {
    const renderListener = await renderingListener(eventRoot);

    eventRoot.addEventListener("pageChange", () => {
        renderListener.disconnect();
    });

    const commentsTargetIdStore = [];
    let commentsPage = 0;

    eventRoot.addEventListener("commentsContinuationReloading", () => {
        commentsPage = 0;
    });

    eventRoot.addEventListener(
        "commentFetch",
        ({ detail: { comments, mode } }: CustomEvent<CommentFetchEvent>) => {
            comments.forEach((comment, index) => {
                if (comment["commentThreadRenderer"]["replies"] !== undefined) {
                    commentsTargetIdStore.push({
                        index,
                        commentsPage,
                        targetId:
                            comment["commentThreadRenderer"]["replies"][
                                "commentRepliesRenderer"
                            ]["targetId"],
                    });
                }
            });

            if (mode === 1) {
                const handleRenderingSucess = () => {
                    replaceComments(comments, commentsPage, eventRoot);
                    commentsPage = commentsPage + 1;
                    eventRoot.native.removeEventListener(
                        "commentsRenderingSuccess",
                        handleRenderingSucess
                    );
                };
                eventRoot.native.addEventListener(
                    "commentsRenderingSuccess",
                    handleRenderingSucess
                );
            } else {
                replaceComments(comments, commentsPage, eventRoot);
                commentsPage = commentsPage + 1;
            }
        }
    );

    eventRoot.addEventListener(
        "repliesFetch",
        ({ detail: { replies, targetId } }: CustomEvent) => {
            commentsTargetIdStore.forEach((targetData, index) => {
                if (targetData.targetId === targetId) {
                    replaceReplies(targetData.commentsPage, targetData.index);
                }
            });
        }
    );
}
