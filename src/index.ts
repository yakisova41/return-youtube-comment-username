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
import { debugLog } from "./utils/debugLog";

import pkg from "package.json";

function debugInfo() {
  const logs = [`Return Youtube comment Username v${pkg.version}`, ""]

  const ytConf = window.yt.config_;

  if(ytConf !== undefined) {
    logs.push( "PAGE_BUILD_LABEL: " + ytConf.PAGE_BUILD_LABEL !== undefined  ? ytConf.PAGE_BUILD_LABEL : " undefined")
    logs.push( "INNERTUBE_CLIENT_VERSION: " + ytConf.INNERTUBE_CLIENT_VERSION!== undefined  ?ytConf.INNERTUBE_CLIENT_VERSION : " undefined")
    logs.push( "INNERTUBE_CONTEXT_CLIENT_VERSION: " + ytConf.INNERTUBE_CONTEXT_CLIENT_VERSION  !== undefined  ? ytConf.INNERTUBE_CONTEXT_CLIENT_VERSION: " undefined")
    logs.push( "INNERTUBE_CONTEXT_GL: " + ytConf.INNERTUBE_CONTEXT_GL  !== undefined  ? ytConf.INNERTUBE_CONTEXT_GL: " undefined")
    logs.push( "Browser: " + ytConf.INNERTUBE_CONTEXT.client.browserName  !== undefined  ? ytConf.INNERTUBE_CONTEXT.client.browserName : " undefined")
    logs.push( "INNERTUBE_CLIENT_VERSION: " + ytConf.LOGGED_IN !== undefined  ? `${ytConf.LOGGED_IN}` : " undefined")
  }

  logs.push(`Href: ${location.href}`)

  debugLog(logs.join("\n"))
}

export default function main(): void {
  debugInfo();


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
