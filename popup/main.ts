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
