import type { RycuSettings } from "src/index";

export function formatUserName(
  userName: string,
  userHandle: string,
  settings: RycuSettings,
): string {
  if (settings.isShowNameToHandle) {
    return decodeURI(userHandle) + `  ( ${userName} )`;
  }

  if (settings.isShowHandleToName) {
    return userName + `  ( ${decodeURI(userHandle)} )`;
  }

  return userName;
}
