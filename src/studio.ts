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
import { debugLog, outputDebugInfo } from "./utils/debugLog";
import { fetchApiFromHandle } from "./utils/getUserName";
import { formatUserName } from "./utils/formatUserName";

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
      default:
        debugLog(`Unhandled action: ${e.detail.actionName}`);
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

  // Studio comment rewrite
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          if (element.tagName === 'YTCP-COMMENT') {
            void Promise.resolve().then(() => rewriteStudioComment(element as HTMLElement));
          }
          // Also check for nested comments
          const nestedComments = element.getElementsByTagName('ytcp-comment');
          for (let i = 0, n = nestedComments.length; i < n; i++) {
            void Promise.resolve().then(() => rewriteStudioComment(nestedComments[i] as HTMLElement));
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial rewrite for existing comments
  const existingComments = document.getElementsByTagName('ytcp-comment');
  for (let i = 0, n = existingComments.length; i < n; i++) {
    void Promise.resolve().then(() => rewriteStudioComment(existingComments[i] as HTMLElement));
  }
}

const handleRegex = /\/@([^/]+)/;

export function rewriteStudioComment(commentElement: HTMLElement, settings?: RycuSettings): void {
  const nameLink = commentElement.querySelector('a#name, a#badge-name');
  if (!nameLink) return;

  const href = nameLink.getAttribute('href');
  if (!href) return;

  const handleMatch = href.match(handleRegex);
  if (!handleMatch) return;

  const handle = handleMatch[1];
  const authorText = nameLink.querySelector('yt-formatted-string.author-text, yt-formatted-string.ytcp-author-comment-badge');
  if (!authorText) return;

  const currentText = authorText.textContent || '';
  // Check if already contains the handle (e.g., "ChannelName@handle")
  if (!currentText.startsWith('@')) {
    if (currentText.includes('@')) {
      authorText.textContent = currentText.split('@')[0];
    }
    return;
  }

  const effectiveSettings = settings || window.__rycu.settings;

  void fetchApiFromHandle(handle, effectiveSettings.apiKeyForStudio)
    .then((name) => {
      console.log(`Fetched name "${name}" for handle "@${handle}"`);
      if (authorText) {
        authorText.textContent = formatUserName(name, `@${handle}`, effectiveSettings);
      }
    })
    .catch((e) => {
      console.error('Failed to get user name from handle:', e);
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
      };
    };
  }
}