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
    config.enable = false;
    chrome.tabs.sendMessage(tab[0].id, { message: 'disable', url: tab[0].url });
  });
}

function updateTab(tab) {
  if (config.enable) {
    enable(tab);
  }
}

function checkAuth(tab) {
  $.get('http://localhost:3000/api/auth/is-authorized', (data) => {
    const user = data.user;
    enable(tab, user);
  }).fail(err => {
    console.log('fail', err);
    chrome.tabs.create({ url: 'http://localhost:3000/chrome-signin' });
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      chrome.tabs.onRemoved.addListener(() => {
        console.log('it was removed');
        console.log('the tab', tab);
        checkAuth(tab);
      });
    });
  });
}

function toggleExt(tab) {
  if (config.enable === false) {
    config.enable = true;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16.png' });
    checkAuth(tab);
  } else {
    config.enable = false;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16-gs.png' });
    disable(tab);
  }
}

chrome.browserAction.onClicked.addListener(toggleExt);
chrome.tabs.onUpdated.addListener(updateTab);

chrome.runtime.onMessage.addListener(
  (request, sender, senderResponse) => {
    if (request.message === 'speak_it') {
      chrome.tts.speak(request.word, { rate: 0.8, lang: 'en-US', gender: 'male' });
    }
    if (request.message === 'get_url') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        console.log('the tab url', tab[0].url);
        senderResponse({ url: tab[0].url });
      });
    }
    return true;
  }
);

