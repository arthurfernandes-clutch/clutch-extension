chrome.contextMenus.create({
  id: "merchant",
  title: "Go to Merchant: %s",
  type: "normal",
  contexts: ["selection"],
}, () => chrome.runtime.lastError);

chrome.contextMenus.onClicked.addListener((item, tab) => {
  let validatedUrl =
        /^\d+$/.test(item.selectionText.trim()) &&
        parseInt(item.selectionText.trim()) > 95
          ? `https://account.shareasale.com/admin/adminDetailsMerchant.cfm?merchantId=${item.selectionText.trim()}&searchby=${item.selectionText.trim()}`
          : `https://account.shareasale.com/admin/index.cfm?searchby=${item.selectionText.trim()}&blnUserSearch=1&searchFor=merchants`;
  let url = new URL(validatedUrl);
        
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });
});
