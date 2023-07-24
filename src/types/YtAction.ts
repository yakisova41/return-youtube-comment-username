import {
  type ContinuationItems,
  type ReplyContinuationItems,
} from "./AppendContinuationItemsAction";

export interface YtAction<T, U> {
  actionName: string;
  args: { 0: T; 1: U; 2: any };
  optionalAction: boolean;
  returnValue: any;
}

export interface YtAppendContinuationItemsActionArg0<
  T extends keyof ContinuationItemsList
> {
  appendContinuationItemsAction: {
    continuationItems?: ContinuationItemsList[T];
    targetId: string;
    clickTrackingParams: string;
  };
  clickTrackingParams: string;
}

export interface YtReloadContinuationItemsCommandArg0 {
  clickTrackingParams: string;
  reloadContinuationItemsCommand: {
    continuationItems: ContinuationItems;
    slot: "RELOAD_CONTINUATION_SLOT_BODY" | "RELOAD_CONTINUATION_SLOT_HEADER";
    targetId: string;
  };
}

export interface ContinuationItemsList {
  reply: ReplyContinuationItems;
  comment: ContinuationItems;
}
