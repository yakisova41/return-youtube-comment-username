import { RycuMessageRequest, RycuMessageResponseValue } from "sw/sw";

document.querySelector(".github-btn")!.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://github.com/yakisova41/return-youtube-comment-username",
  });
});

const donateBtn = document.querySelector(".donate-btn")!;
donateBtn.innerHTML = chrome.i18n.getMessage("Support");
donateBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://www.patreon.com/yakisova41",
  });
});

const bugReportBtn = document.querySelector(".bugreport-btn")!;
bugReportBtn.innerHTML = chrome.i18n.getMessage("BugReport");
bugReportBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://github.com/yakisova41/return-youtube-comment-username/issues/new?assignees=&labels=bug&projects=&template=bug_report.yaml&title=%5BBug%5D%3A+",
  });
});

const ofSiteBtn = document.querySelector(".ofsite-btn")!;
ofSiteBtn.innerHTML = chrome.i18n.getMessage("OfficialSite");
ofSiteBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://rycu.yakisova.com/",
  });
});

const nameDisplayFormatText = document.querySelector(
  ".name-display-format-text",
)!;
nameDisplayFormatText.innerHTML = chrome.i18n.getMessage(
  "NameDisplayFormatText",
);

const replaceCommentsText = document.querySelector(".comments-toggle-text")!;
replaceCommentsText.innerHTML = chrome.i18n.getMessage("ReplaceComments");

const replaceLiveChatsText = document.querySelector(".live-chats-toggle-text")!;
replaceLiveChatsText.innerHTML = chrome.i18n.getMessage("ReplaceLiveChats");

(async () => {
  // @handle (Name)
  const isShowNameToHandle = await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getShowNameToHandle">
  >({
    type: "getShowNameToHandle",
    value: null,
  });

  // Name (@handle)
  const isShowHandleToName = await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getShowHandleToName">
  >({
    type: "getShowHandleToName",
    value: null,
  });

  const isReplaceComments = await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getReplaceComments">
  >({
    type: "getReplaceComments",
    value: null,
  });

  const isReplaceLiveChats = await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"getReplaceLiveChats">
  >({
    type: "getReplaceLiveChats",
    value: null,
  });

  const nameDisplayFormatSelect = document.querySelector<HTMLSelectElement>(
    "#name-display-format-select",
  )!;

  if (isShowHandleToName) {
    nameDisplayFormatSelect.value = "3";
  }

  if (isShowNameToHandle) {
    nameDisplayFormatSelect.value = "2";
  }

  if (!isShowNameToHandle && !isShowHandleToName) {
    nameDisplayFormatSelect.value = "1";
  }

  nameDisplayFormatSelect.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLSelectElement)) {
      return;
    }

    switch (e.target.value) {
      case "1":
        console.log("OK");
        setShowNameToHandle(false);
        setShowHandleToName(false);
        break;
      case "2":
        console.log("OK");
        setShowNameToHandle(true);
        setShowHandleToName(false);
        break;
      case "3":
        console.log("OK");
        setShowNameToHandle(false);
        setShowHandleToName(true);
        break;
    }
  });

  const commentsReplacementToggle = document.querySelector<HTMLInputElement>(
    "#toggle-comments-replacement",
  )!;
  commentsReplacementToggle.checked = isReplaceComments;
  commentsReplacementToggle.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setReplaceComments(e.target.checked);
  });

  const liveChatReplacementToggle = document.querySelector<HTMLInputElement>(
    "#toggle-live-chats-replacement",
  )!;
  liveChatReplacementToggle.checked = isReplaceLiveChats;
  liveChatReplacementToggle.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    setReplaceLiveChats(e.target.checked);
  });
})();

// @handle (Name)
async function setShowNameToHandle(is: boolean) {
  await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"setShowNameToHandle">
  >({
    type: "setShowNameToHandle",
    value: is,
  });
}

// Name (@handle)
async function setShowHandleToName(is: boolean) {
  await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"setShowHandleToName">
  >({
    type: "setShowHandleToName",
    value: is,
  });
}

async function setReplaceComments(is: boolean) {
  await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"setReplaceComments">
  >({
    type: "setReplaceComments",
    value: is,
  });
}

async function setReplaceLiveChats(is: boolean) {
  await chrome.runtime.sendMessage<
    RycuMessageRequest,
    RycuMessageResponseValue<"setReplaceLiveChats">
  >({
    type: "setReplaceLiveChats",
    value: is,
  });
}
