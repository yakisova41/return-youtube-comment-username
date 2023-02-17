import { EventRoot } from "../lib/eventRoot";
import {
    CommentFetchEvent,
    ReplyFetchEvent,
} from "../listeners/commentFetchListener";
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
        ({ detail: { comments } }: CustomEvent<CommentFetchEvent>) => {
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

            const handleRenderingSucess = () => {
                replaceComments(comments, commentsPage);
                eventRoot.removeEventListener(
                    "commentsRenderingSuccess",
                    handleRenderingSucess
                );
                commentsPage = commentsPage + 1;
            };
            eventRoot.addEventListener(
                "commentsRenderingSuccess",
                handleRenderingSucess
            );
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
