import { bypassSendMessage, getRunningRuntime } from "crx-monkey";
import { RycuMessageRequest, RycuMessageResponseValue } from "sw/sw";
import { type RycuSettings } from "src/types/RycuSettings";

export const syncSettings = (settings: RycuSettings) => {
  bypassSendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getShowHandleToName">
  >(
    {
      type: "getShowHandleToName",
      value: null,
    },
    {},
    (isShowHandleToName) => {
      settings.isShowHandleToName = isShowHandleToName;
    },
  );

  bypassSendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getShowNameToHandle">
  >(
    {
      type: "getShowNameToHandle",
      value: null,
    },
    {},
    (isShowNameToHandle) => {
      settings.isShowNameToHandle = isShowNameToHandle;
    },
  );

  bypassSendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getReplaceComments">
  >(
    {
      type: "getReplaceComments",
      value: null,
    },
    {},
    (isReplaceComments) => {
      settings.isReplaceComments = isReplaceComments;
    },
  );

  bypassSendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getReplaceLiveChats">
  >(
    {
      type: "getReplaceLiveChats",
      value: null,
    },
    {},
    (isReplaceLiveChats) => {
      settings.isReplaceLiveChats = isReplaceLiveChats;
    },
  );
};
