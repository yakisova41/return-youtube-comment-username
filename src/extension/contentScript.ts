const head = document.head;
const script = document.createElement("script");
script.src = chrome.runtime.getURL("embed.js");
head.appendChild(script);
