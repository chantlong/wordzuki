// background.js
const wz = {
  enable: false
};

function toggleExt(tabs) {
  if (wz.enable === false) {
    wz.enable = true;
    chrome.browserAction.setBadgeText({ text: 'on' });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'enable', url: tabs[0].url });
    });
  } else {
    wz.enable = false;
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'disable', url: tabs[0].url });
    });
  }
}

chrome.browserAction.onClicked.addListener(toggleExt);

// This block is new!
chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.message === 'speak_it') {
      chrome.tts.speak(request.word);
    }
  }
);

