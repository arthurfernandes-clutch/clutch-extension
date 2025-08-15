/*
chrome.contextMenus.create({
  id: "freshdesk",
  title: "Freshdesk",
  type: "normal",
  contexts: ["all"],
}, () => chrome.runtime.lastError);

chrome.contextMenus.onClicked.addListener((item, tab) => {
  let url = new URL("https://withclutch.freshdesk.com/a/dashboard/default");
        
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });
});
*/