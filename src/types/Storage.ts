export interface RycuStorage {
  showHandleToName: boolean;
  showNameToHandle: boolean;
  replaceComments: boolean;
  replaceLiveChats: boolean;
  apiKeyForWWW: string;
  apiKeyForStudio: string;
}

export const getDefaultStorageCache = (): RycuStorage => ({
  showHandleToName: false,
  showNameToHandle: false,
  replaceComments: true,
  replaceLiveChats: true,
  apiKeyForWWW: "YOUR_API_KEY_WWW",
  apiKeyForStudio: "YOUR_API_KEY_STUDIO",
});
