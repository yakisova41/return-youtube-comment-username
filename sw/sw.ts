import { setupInstallPage } from "./setupInstallPage";

setupInstallPage();

const storageCache = { showHandleToName: false, showNameToHandle: false };
const initStorageCache = chrome.storage.local.get().then((items) => {
  Object.assign(storageCache, items);
});

chrome.runtime.onMessage.addListener(async () => {
  await initStorageCache;
});

chrome.runtime.onMessage.addListener(
  (req: RycuMessageRequest, sender, send) => {
    if (req.type === "log") {
      console.log(...req.value);
    }

    if (req.type === "err") {
      console.error(...req.value);
    }

    if (req.type === "getShowHandleToName") {
      send(storageCache.showHandleToName);
    }

    if (req.type === "getShowNameToHandle") {
      send(storageCache.showNameToHandle);
    }

    if (req.type === "setShowHandleToName") {
      chrome.storage.local
        .set({ showHandleToName: req.value })
        .then(async () => {
          await initStorageCache;
          Object.assign(storageCache, { showHandleToName: req.value });
        });
    }

    if (req.type === "setShowNameToHandle") {
      chrome.storage.local
        .set({ showNameToHandle: req.value })
        .then(async () => {
          await initStorageCache;
          Object.assign(storageCache, { showNameToHandle: req.value });
        });
    }
  },
);

export type RycuMessageRequest = {
  [K in keyof RycuMessageRequestValues]: {
    type: K;
    value: RycuMessageRequestValues[K];
  };
}[keyof RycuMessageRequestValues];

interface RycuMessageRequestValues {
  log: string[];
  err: string[];
  setShowHandleToName: boolean;
  setShowNameToHandle: boolean;
  getShowHandleToName: null;
  getShowNameToHandle: null;
}

interface RycuMessageResponseValues {
  setShowHandleToName: boolean;
  setShowNameToHandle: boolean;
  getShowHandleToName: boolean;
  getShowNameToHandle: boolean;
}

export type RycuMessageResponseValue<
  K extends keyof RycuMessageResponseValues,
> = RycuMessageResponseValues[K];
