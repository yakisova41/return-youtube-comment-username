import { type RycuSettings } from "src/types/RycuSettings";
import { type RycuStorage, getDefaultStorageCache } from "src/types/Storage";

export function getSettings(): Promise<RycuSettings> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defaultStorageCache: RycuStorage = getDefaultStorageCache();
  const defaultSettings: RycuSettings = getDefaultSettings();

  return chrome.storage.local
    .get({
      showHandleToName: defaultSettings.isShowHandleToName,
      showNameToHandle: defaultSettings.isShowNameToHandle,
      replaceComments: defaultSettings.isReplaceComments,
      replaceLiveChats: defaultSettings.isReplaceLiveChats,
      apiKeyForWWW: defaultSettings.apiKeyForWWW,
      apiKeyForStudio: defaultSettings.apiKeyForStudio,
    })
    .then((items) => {
      return {
        isShowHandleToName: items.showHandleToName,
        isShowNameToHandle: items.showNameToHandle,
        isReplaceComments: items.replaceComments,
        isReplaceLiveChats: items.replaceLiveChats,
        apiKeyForWWW: items.apiKeyForWWW,
        apiKeyForStudio: items.apiKeyForStudio,
      };
    });
}
