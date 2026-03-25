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
  let timeout: number;

window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    // Delay the processing to avoid excessive handling during fast scrolling
    timeout = setTimeout(() => {
      document.querySelectorAll('ytcp-comment').forEach(el => {
        if (!processedComments.has(el)) {
          processedComments.add(el);
          rewriteStudioComment(el as HTMLElement);
        }
    }, 200);
})}, { passive: true });
const processedComments = new WeakSet<Element>();

function rewriteIfNeeded(el: Element): void {
  const commentEl = el.tagName === 'YTCP-COMMENT'
    ? el as HTMLElement
    : el.querySelector('ytcp-comment') as HTMLElement | null;
  if (!commentEl) return;

  // If there is no overlay, processing is required.
  const hasOverlay = !!commentEl.querySelector('.rycu-display-name');
  if (!hasOverlay) {
    void Promise.resolve().then(() => rewriteStudioComment(commentEl));
  }
}

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // New node added (initial load, page transition)
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          const el = node as Element;
          rewriteIfNeeded(el);
          el.querySelectorAll('ytcp-comment').forEach(c => rewriteIfNeeded(c));
        }
      }

      // style attribute change (detecting iron-list DOM reuse)
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const target = mutation.target as Element;
        // Change in transform: translate3d = iron-list has reassigned the slot to another comment
        if (target.classList.contains('ytcp-comment-thread')) {
          // Since it is reused, exclude it from the WeakSet (let it be reprocessed)
          const inner = target.querySelector('ytcp-comment') as HTMLElement | null;
          if (inner) {
            processedComments.delete(inner);
            // Wait for rendering to complete before processing
            requestAnimationFrame(() => rewriteIfNeeded(inner));
          }
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style'],
  });

  // Initial processing of existing comments
  document.querySelectorAll('ytcp-comment').forEach(el => {
    void Promise.resolve().then(() => rewriteStudioComment(el as HTMLElement));
  });
}

const handleRegex = /\/@([^/]+)/;

export function rewriteStudioComment(commentElement: HTMLElement, settings?: RycuSettings): void {
  const nameLink = commentElement.querySelector('a#name:not([hidden]), a#badge-name');
  if (!nameLink) return;

  const href = nameLink.getAttribute('href');
  if (!href) return;

  const handleMatch = href.match(handleRegex);
  if (!handleMatch) return;

  const handle = handleMatch[1];

  const authorText = nameLink.querySelector(
    'yt-formatted-string.author-text, yt-formatted-string'
  ) as HTMLElement | null;
  if (!authorText) return;

  const currentText = authorText.textContent?.trim() ?? '';
  if (!currentText.startsWith('@')) return;

  // If the overlay element already exists, skip
  if (nameLink.querySelector('.rycu-display-name')) return;

  const effectiveSettings = settings || window.__rycu.settings;

  void fetchApiFromHandle(handle, effectiveSettings.apiKeyForStudio)
    .then((name) => {
      // Reconfirmation (it may have been processed elsewhere during asynchronous processing)
      if (nameLink.querySelector('.rycu-display-name')) return;

      const displayName = formatUserName(name, `@${handle}`, effectiveSettings);

      // Hide the original yt-formatted-string
      authorText.style.display = 'none';

      // Add a span element next to it
      const overlay = document.createElement('span');
      overlay.className = 'rycu-display-name';
      overlay.textContent = displayName;
      // Inherit the original style
      overlay.style.cssText = window.getComputedStyle(authorText).cssText;
      nameLink.appendChild(overlay);
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
    ytstudio: {
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
