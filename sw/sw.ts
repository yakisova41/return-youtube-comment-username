import { setupInstallPage } from "./setupInstallPage";
import { type RycuStorage, getDefaultStorageCache } from "src/types/Storage";

setupInstallPage();

const storageCache: RycuStorage = getDefaultStorageCache();
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

    if (req.type === "getReplaceComments") {
      send(storageCache.replaceComments);
    }

    if (req.type === "getReplaceLiveChats") {
      send(storageCache.replaceLiveChats);
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

    if (req.type === "setReplaceComments") {
      chrome.storage.local
        .set({ replaceComments: req.value })
        .then(async () => {
          await initStorageCache;
          Object.assign(storageCache, { replaceComments: req.value });
        });
    }

    if (req.type === "setReplaceLiveChats") {
      chrome.storage.local
        .set({ replaceLiveChats: req.value })
        .then(async () => {
          await initStorageCache;
          Object.assign(storageCache, { replaceLiveChats: req.value });
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
  setReplaceComments: boolean;
  setReplaceLiveChats: boolean;
  getShowHandleToName: null;
  getShowNameToHandle: null;
  getReplaceComments: null;
  getReplaceLiveChats: null;
}

interface RycuMessageResponseValues {
  setShowHandleToName: boolean;
  setShowNameToHandle: boolean;
  setReplaceComments: boolean;
  setReplaceLiveChats: boolean;
  getShowHandleToName: boolean;
  getShowNameToHandle: boolean;
  getReplaceComments: boolean;
  getReplaceLiveChats: boolean;
}

export type RycuMessageResponseValue<
  K extends keyof RycuMessageResponseValues,
> = RycuMessageResponseValues[K];
