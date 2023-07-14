let extensionEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "ON" });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getExtensionStatus") {
    sendResponse({ enabled: extensionEnabled });
  } else if (request.action === "toggleExtension") {
    if (extensionEnabled) {
      // Perform any necessary cleanup or disable functionality here
      // For example, you can remove event listeners or disable content script injection
      // You can also update any other variables or states related to the extension functionality
      console.log("Extension disabled");
      chrome.action.setBadgeText({ text: "OFF" });
    } else {
      chrome.action.setBadgeText({ text: "ON" });
    }
    extensionEnabled = request.enabled;
    sendResponse({ enabled: extensionEnabled });
  }
});
