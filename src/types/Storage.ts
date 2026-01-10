export interface RycuStorage {
  showHandleToName: boolean;
  showNameToHandle: boolean;
  replaceComments: boolean;
  replaceLiveChats: boolean;
}

export const getDefaultStorageCache = (): RycuStorage => ({
  showHandleToName: false,
  showNameToHandle: false,
  replaceComments: true,
  replaceLiveChats: true,
});
