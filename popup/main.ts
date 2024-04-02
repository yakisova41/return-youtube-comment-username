document.querySelector(".github-btn")!.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://github.com/yakisova41/return-youtube-comment-username",
  });
});

document.querySelector(".donate-btn")!.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://github.com/yakisova41/return-youtube-comment-username",
  });
});

document.querySelector(".bugreport-btn")!.addEventListener("click", () => {
  chrome.tabs.create({
    url: "https://github.com/yakisova41/return-youtube-comment-username/issues/new?assignees=&labels=bug&projects=&template=bug_report.yaml&title=%5BBug%5D%3A+",
  });
});
/*
(async () => {
  const isEnableRewriteToggle = document.querySelector<HTMLInputElement>(
    "#toggle-enable-rewrite",
  )!;

  const { isRewriteEnable } = await chrome.storage.local.get([
    "isRewriteEnable",
  ]);

  isEnableRewriteToggle.checked = isRewriteEnable;

  isEnableRewriteToggle.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target !== null) {
      chrome.storage.local.set({
        isRewriteEnable: target.checked,
      });
    }
  });
})();
*/
