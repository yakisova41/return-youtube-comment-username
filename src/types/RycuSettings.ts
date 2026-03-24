export interface RycuSettings {
  isShowHandleToName: boolean;
  isShowNameToHandle: boolean;
  isReplaceComments: boolean;
  isReplaceLiveChats: boolean;
  apiKeyForWWW: string;
  apiKeyForStudio: string;
}

export const getDefaultSettings = (): RycuSettings => ({
  isShowHandleToName: false,
  isShowNameToHandle: false,
  isReplaceComments: true,
  isReplaceLiveChats: true,
  apiKeyForWWW: "YOUR_API_KEY_WWW",
  apiKeyForStudio: "YOUR_API_KEY_STUDIO",

});
