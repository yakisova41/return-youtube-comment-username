import { type RycuSettings, getDefaultSettings } from "src/types/RycuSettings";
import { type RycuStorage, getDefaultStorageCache } from "src/types/Storage";

export function getSettings(): Promise<RycuSettings> {
  const defaultStorageCache: RycuStorage = getDefaultStorageCache();
  const defaultSettings: RycuSettings = getDefaultSettings();

  return chrome.storage.local
    .get({
      showHandleToName: defaultSettings.isShowHandleToName,
      showNameToHandle: defaultSettings.isShowNameToHandle,
      replaceComments: defaultSettings.isReplaceComments,
      replaceLiveChats: defaultSettings.isReplaceLiveChats,
    })
    .then((items) => {
      return {
        isShowHandleToName: items.showHandleToName,
        isShowNameToHandle: items.showNameToHandle,
        isReplaceComments: items.replaceComments,
        isReplaceLiveChats: items.replaceLiveChats,
      };
    });
}
