export interface RycuSettings {
  isShowHandleToName: boolean;
  isShowNameToHandle: boolean;
  isReplaceComments: boolean;
  isReplaceLiveChats: boolean;
}

export const getDefaultSettings = (): RycuSettings => ({
  isShowHandleToName: false,
  isShowNameToHandle: false,
  isReplaceComments: true,
  isReplaceLiveChats: true,
});
