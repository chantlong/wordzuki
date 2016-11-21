// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tabs) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'clicked_browser_action' });
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'search_word') {
      // chrome.tabs.create({ url: request.url });
    }
  }
);
