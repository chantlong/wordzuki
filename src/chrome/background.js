// background.js
window.wordzuki = {
  enable: false,
  dictLoad: false,
  EJdict: undefined,
};

function loadDict() {
  const dictUrl = chrome.extension.getURL('dict/ejdic-hand-utf8.txt');
  $.get(dictUrl)
    .then((data) => {
      const dict = {};
      const entries = data.split('\n');
      for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i].split('\t ');
        dict[entry[0].trim()] = entry[1];
      }
      console.log('loaded');
      window.wordzuki.EJdict = dict;
      window.wordzuki.dictLoad = true;
    });
}

function loadDictAsync() {
  return new Promise((resolve, reject) => {
    const dictUrl = chrome.extension.getURL('dict/ejdic-hand-utf8.txt');
    $.get(dictUrl)
      .then((data) => {
        const dict = {};
        const entries = data.split('\n');
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i].split('\t ');
          dict[entry[0].trim()] = entry[1];
        }
        console.log('loaded');
        window.wordzuki.EJdict = dict;
        window.wordzuki.dictLoad = true;
        resolve();
      });
  });
}

// function search(word) {
//   if (window.wordzuki.EJdict[word]) {
//     const result = window.wordzuki.EJdict[word].trim();
//     if (result[0] === '=') {
//       const referredWord = result.slice(1);
//       search(referredWord);
//     }
//     return result;
//   }
//   return null;
// }

function enable(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    console.log('update tabs', tab);
    chrome.tabs.sendMessage(tab[0].id, { message: 'enable', url: tab[0].url });
  });
}

function disable(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    window.wordzuki.enable = false;
    chrome.tabs.sendMessage(tab[0].id, { message: 'disable', url: tab[0].url });
  });
}

function updateTab(tab) {
  console.log('the window.wordzuki enable?', window.wordzuki.enable);
  if (window.wordzuki.enable) {
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
  if (window.wordzuki.enable === false) {
    window.wordzuki.enable = true;
    window.wordzuki.dictLoad = true;
    window.wordzuki.EJdict = loadDict();
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16.png' });
    enable(tab);
    chrome.tabs.onUpdated.addListener(updateTab);
    // checkAuth(tab);
  } else {
    window.wordzuki.enable = false;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16-gs.png' });
    chrome.tabs.onUpdated.removeListener(updateTab);
    disable(tab);
  }
}


chrome.browserAction.onClicked.addListener(toggleExt);

chrome.runtime.onMessage.addListener(
  (request, sender, senderResponse) => {
    switch (request.message) {
      case 'get_url': {
        chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
          const currentTab = tab[0].url;
          console.log('currentTab', currentTab);
          senderResponse(currentTab);
        });

        break;
      }
      case 'search_word': {
        const result = search(request.word);
        senderResponse(result);
        break;
      }
      case 'speak_it': {
        chrome.tts.speak(request.word, { rate: 0.8, lang: 'en-US', gender: 'male' });
        break;
      }
      default:
        // chill
    }
    // return true will keep the message channel open to the other end until sendResponse is called.
    return true;
  }
);

function contextSearch(e) {
  const word = e.selectionText;
  if (!window.wordzuki.dictLoad) {
    loadDictAsync()
      .then(() => {
        search(lemmatizer(word));
      });
  } else {
    console.log('BBB town');
    search(lemmatizer(word));
  }
}

chrome.contextMenus.create({
  title: 'Look Up',
  contexts: ['page', 'selection', 'editable', 'link'],
  onclick: contextSearch
});
