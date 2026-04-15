/**
 * YouTube Studio's comment username replacement extension main script.
 */
/* eslint-disable no-prototype-builtins */

import { getRunningRuntime } from "crx-monkey";

import { type RycuSettings, getDefaultSettings } from "./types/RycuSettings";
import { syncSettings } from "./types/SyncSettings";
import { type YtAction } from "./types/YtAction";
import { type YtNavigateFinishEvent } from "./types/YtNavigateFinishEvent";

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
