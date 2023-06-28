/* eslint-disable no-prototype-builtins */

// yt-action handlers
import { handleYtAppendContinuationItemsAction } from "./handlers/handleYtAppendContinuationItemsAction";
import { handleYtCreateCommentAction } from "./handlers/handleYtCreateCommentAction";
import { handleYtCreateCommentReplyAction } from "./handlers/handleYtCreateCommentReplyAction";
import { handleYtGetMultiPageMenuAction } from "./handlers/handleYtGetMultiPageMenuAction";
import { handleYtHistory } from "./handlers/handleYtHistory";
import { handleYtReloadContinuationItemsCommand } from "./handlers/handleYtReloadContinuationItemsCommand";

import { type YtAction } from "./types/YtAction";
import { type YtNavigateFinishEvent } from "./types/YtNavigateFinishEvent";

export default function main(): void {
  const handleYtAction = (e: CustomEvent<YtAction<any, any>>): void => {
    const { actionName } = e.detail;

    switch (actionName) {
      case "yt-append-continuation-items-action":
        handleYtAppendContinuationItemsAction(e.detail);
        console.log(actionName);
        break;
      case "yt-reload-continuation-items-command":
        handleYtReloadContinuationItemsCommand(e.detail);
        console.log(actionName);
        break;
      case "yt-history-load":
        handleYtHistory(e.detail);
        console.log(actionName);
        break;
      case "yt-get-multi-page-menu-action":
        handleYtGetMultiPageMenuAction(e.detail);
        console.log(actionName);
        break;
      case "yt-create-comment-action":
        handleYtCreateCommentAction(e.detail);
        console.log(actionName);
        break;
      case "yt-create-comment-reply-action":
        handleYtCreateCommentReplyAction(e.detail);
        console.log(actionName);
        break;
    }
  };

  document.addEventListener("yt-action", handleYtAction);

  /**
   * page change
   */
  document.addEventListener("yt-navigate-finish", ({ detail }) => {
    document.removeEventListener("yt-action", handleYtAction);
    document.addEventListener("yt-action", handleYtAction);
  });
}

declare global {
  interface DocumentEventMap {
    "yt-action": CustomEvent<YtAction<any, any>>;
    "yt-navigate-finish": CustomEvent<YtNavigateFinishEvent>;
  }

  interface ElementEventMap {
    "yt-action": CustomEvent<YtAction<any, any>>;
  }
}
