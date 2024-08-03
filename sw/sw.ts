import { setupInstallPage } from "./setupInstallPage";

setupInstallPage();

chrome.runtime.onMessage.addListener(
  (req: RycuMessageRequest, sender, send) => {
    if (req.type === "log") {
      console.log(...req.value);
    }

    if (req.type === "err") {
      console.error(...req.value);
    }
  },
);

export interface RycuMessageRequest {
  type: keyof RycuMessageRequestValues;
  value: RycuMessageRequestValues[keyof RycuMessageRequestValues];
}

export interface RycuMessageRequestValues {
  log: string[];
  err: string[];
}
