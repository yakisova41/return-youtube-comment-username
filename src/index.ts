/* eslint-disable no-prototype-builtins */

// yt-action handlers
import { bypassSendMessage, getRunningRuntime } from "crx-monkey";
import { handleYtAppendContinuationItemsAction } from "./handlers/handleYtAppendContinuationItemsAction";
import { handleYtCreateCommentAction } from "./handlers/handleYtCreateCommentAction";
import { handleYtCreateCommentReplyAction } from "./handlers/handleYtCreateCommentReplyAction";
import { handleYtGetMultiPageMenuAction } from "./handlers/handleYtGetMultiPageMenuAction";
import { handleYtHistory } from "./handlers/handleYtHistory";
import { handleYtReloadContinuationItemsCommand } from "./handlers/handleYtReloadContinuationItemsCommand";

import { type YtAction } from "./types/YtAction";
import { type YtNavigateFinishEvent } from "./types/YtNavigateFinishEvent";
import { outputDebugInfo } from "./utils/debugLog";
import { RycuMessageRequest, RycuMessageResponseValue } from "sw/sw";

export default function main(): void {
  const settings: RycuSettings = {
    isShowHandleToName: false,
    isShowNameToHandle: false,
  };

  window.__rycu = {
    settings,
  };

  if (getRunningRuntime() === "Extension") {
    bypassSendMessage<
      RycuMessageRequest,
      RycuMessageResponseValue<"getShowHandleToName">
    >(
      {
        type: "getShowHandleToName",
        value: null,
      },
      {},
      (isShowHandleToName) => {
        window.__rycu.settings.isShowHandleToName = isShowHandleToName;
      },
    );

    bypassSendMessage<
      RycuMessageRequest,
      RycuMessageResponseValue<"getShowNameToHandle">
    >(
      {
        type: "getShowNameToHandle",
        value: null,
      },
      {},
      (isShowNameToHandle) => {
        window.__rycu.settings.isShowNameToHandle = isShowNameToHandle;
      },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleYtAction = (e: CustomEvent<YtAction<any, any>>): void => {
    switch (e.detail.actionName) {
      case "yt-append-continuation-items-action":
        handleYtAppendContinuationItemsAction(e.detail);
        break;
      case "yt-reload-continuation-items-command":
        handleYtReloadContinuationItemsCommand(e.detail);
        break;
      case "yt-history-load":
        handleYtHistory(e.detail);
        break;
      case "yt-get-multi-page-menu-action":
        handleYtGetMultiPageMenuAction(e.detail);
        break;
      case "yt-create-comment-action":
        handleYtCreateCommentAction(e.detail);
        break;
      case "yt-create-comment-reply-action":
        handleYtCreateCommentReplyAction(e.detail);
        break;
    }
  };

  document.addEventListener("yt-action", handleYtAction);

  /**
   * page change
   */
  document.addEventListener("yt-navigate-finish", () => {
    document.dispatchEvent(new Event("rycu-pagechange"));
    outputDebugInfo();
  });
}

main();

declare global {
  interface DocumentEventMap {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "yt-action": CustomEvent<YtAction<any, any>>;
    "yt-navigate-finish": CustomEvent<YtNavigateFinishEvent>;
  }

  interface ElementEventMap {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "yt-action": CustomEvent<YtAction<any, any>>;
  }

  interface Window {
    __rycu: {
      settings: RycuSettings;
    };
    yt: {
      config_?: {
        HL: string;
        GL: string;
        PAGE_BUILD_LABEL: string;
        INNERTUBE_CONTEXT_CLIENT_VERSION: string;
        INNERTUBE_CLIENT_VERSION: string;
        INNERTUBE_CONTEXT_GL: string;
        INNERTUBE_CONTEXT: {
          client: {
            browserName: string;
            browserVersion: string;
          };
        };
        LOGGED_IN: boolean;
      };
    };
  }
}

export interface RycuSettings {
  isShowHandleToName: boolean;
  isShowNameToHandle: boolean;
}
