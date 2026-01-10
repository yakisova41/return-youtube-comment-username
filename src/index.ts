/* eslint-disable no-prototype-builtins */

// yt-action handlers
import { getRunningRuntime } from "crx-monkey";
import { handleYtAppendContinuationItemsAction } from "./handlers/handleYtAppendContinuationItemsAction";
import { handleYtCreateCommentAction } from "./handlers/handleYtCreateCommentAction";
import { handleYtCreateCommentReplyAction } from "./handlers/handleYtCreateCommentReplyAction";
import { handleYtGetMultiPageMenuAction } from "./handlers/handleYtGetMultiPageMenuAction";
import { handleYtHistory } from "./handlers/handleYtHistory";
import { handleYtReloadContinuationItemsCommand } from "./handlers/handleYtReloadContinuationItemsCommand";

import { type RycuSettings, getDefaultSettings } from "./types/RycuSettings";
import { syncSettings } from "./types/SyncSettings";
import { type YtAction } from "./types/YtAction";
import { type YtNavigateFinishEvent } from "./types/YtNavigateFinishEvent";
import { outputDebugInfo } from "./utils/debugLog";

export default function main(): void {
  window.__rycu = {
    settings: getDefaultSettings(),
  };

  if (getRunningRuntime() === "Extension") {
    ((settings) => {
      syncSettings(settings);
      document.addEventListener("yt-action", () => {
        syncSettings(settings);
      });
      document.addEventListener("yt-navigate-finish", () => {
        syncSettings(settings);
      });
    })(window.__rycu.settings);
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
