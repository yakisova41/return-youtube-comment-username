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
  apiKeyForWWW: "AIzaSyDW4lG-lcRRHGqkF2xlWA3cpf9EIJ2y3-c",
  apiKeyForStudio: "AIzaSyAgEf-RS2iFSELvW_X-qGKP2tw0cHZj_M8",
});
