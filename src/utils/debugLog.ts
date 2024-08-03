import pkg from "package.json";
import { bypassSendMessage } from "crx-monkey";
import { RycuMessageRequest } from "sw/sw";

export function debugLog(message: string | Error, value: string = ""): void {
  bypassSendMessage<RycuMessageRequest>({
    type: "log",
    value: [`[rycu] ${message} %c${value}`, "color:cyan;"],
  });
}

export function debugErr(message: string | Error): void {
  console.error(`[rycu] ${message}`);
  bypassSendMessage<RycuMessageRequest>({
    type: "err",
    value: [`[rycu] ${message}`],
  });
}

export function outputDebugInfo() {
  const logs = [""];

  const ytConf = window.yt.config_;

  if (ytConf !== undefined) {
    logs.push(
      "PAGE_BUILD_LABEL: " +
        (ytConf.PAGE_BUILD_LABEL !== undefined
          ? ytConf.PAGE_BUILD_LABEL
          : " undefined"),
    );
    logs.push(
      "INNERTUBE_CLIENT_VERSION: " +
        (ytConf.INNERTUBE_CLIENT_VERSION !== undefined
          ? ytConf.INNERTUBE_CLIENT_VERSION
          : " undefined"),
    );
    logs.push(
      "INNERTUBE_CONTEXT_CLIENT_VERSION: " +
        (ytConf.INNERTUBE_CONTEXT_CLIENT_VERSION !== undefined
          ? ytConf.INNERTUBE_CONTEXT_CLIENT_VERSION
          : " undefined"),
    );
    logs.push(
      "INNERTUBE_CONTEXT_GL: " +
        (ytConf.INNERTUBE_CONTEXT_GL !== undefined
          ? ytConf.INNERTUBE_CONTEXT_GL
          : " undefined"),
    );
    logs.push(
      "Browser: " +
        (ytConf.INNERTUBE_CONTEXT.client.browserName !== undefined
          ? ytConf.INNERTUBE_CONTEXT.client.browserName
          : " undefined"),
    );
    logs.push(
      "Is login: " +
        (ytConf.LOGGED_IN !== undefined ? `${ytConf.LOGGED_IN}` : " undefined"),
    );
  }

  logs.push(`Href: ${location.href}`);

  debugLog(`Return Youtube comment Username v${pkg.version}`, logs.join("\n"));
}

declare global {
  interface Window {
    __rycu: {
      enableDebugLog: () => void;
    };
  }
}
