// background.js
const config = {
  enable: false
};

function enable(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    console.log('update tabs', tab);
    chrome.tabs.sendMessage(tab[0].id, { message: 'enable', url: tab[0].url });
  });
}

function disable(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.tabs.sendMessage(tab[0].id, { message: 'disable', url: tab[0].url });
  });
}

function updateTab(tab) {
  if (config.enable) {
    enable(tab);
  }
}

function toggleExt(tab) {
  if (config.enable === false) {
    config.enable = true;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16.png' });
    // chrome.browserAction.setBadgeText({ text: 'on' });
    enable(tab);
  } else {
    config.enable = false;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16-gs.png' });
    disable(tab);
  }
}

chrome.browserAction.onClicked.addListener(toggleExt);

chrome.tabs.onActivated.addListener(updateTab);
chrome.tabs.onUpdated.addListener(updateTab);

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.message === 'speak_it') {
      chrome.tts.speak(request.word, { rate: 0.8, lang: 'en-US', gender: 'male' });
    }
  }
);

