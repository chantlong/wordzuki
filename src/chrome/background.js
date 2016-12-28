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
  $.get('https://desolate-cove-59104.herokuapp.com/api/auth/is-authorized', (data) => {
    const user = data.user;
    console.log('we got data', data);
    enable(tab);
  }).fail(err => {
    console.log('fail', err);
    chrome.tabs.create({ url: 'https://desolate-cove-59104.herokuapp.com/chrome-signin' });
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
    chrome.tabs.onUpdated.addListener(updateTab);
    checkAuth(tab);
  } else {
    config.enable = false;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16-gs.png' });
    chrome.tabs.onUpdated.removeListener(updateTab);
    disable(tab);
  }
}

chrome.browserAction.onClicked.addListener(toggleExt);

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

