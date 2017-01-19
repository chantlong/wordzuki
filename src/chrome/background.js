// background.js
window.wordzuki = {
  enable: false,
  dictLoad: false,
  EJdict: undefined,
  loginAttempt: 0,
};

function saveWord({ word, definition, example, source, sourceTitle }) {
  // 'https://desolate-cove-59104.herokuapp.com/api/word'
  $.post('http://www.wordzuki.xyz/api/word',
        { word, definition, example, source, sourceTitle },
        (data2, status2) => { console.log('posted!'); }, 'json')
  .fail(err => console.log('save error', err));
}

function enable(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.tabs.sendMessage(tab[0].id, { message: 'enable', url: tab[0].url });
  });
}

function disable(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16-gs.png' });
    chrome.tabs.sendMessage(tab[0].id, { message: 'disable', url: tab[0].url });
    window.wordzuki.enable = false;
    window.wordzuki.dictLoad = false;
    window.wordzuki.EJdict = undefined;
    window.wordzuki.loginAttempt = 0;
  });
}

function updateTab(tab) {
  // console.log('the window.wordzuki enable?', window.wordzuki.enable);
  if (window.wordzuki.enable) {
    enable(tab);
  }
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
          if (entry[0].indexOf(',') > -1) {
            const similarEntries = entry[0].split(',');
            for (let j = 0; j < similarEntries.length; j += 1) {
              dict[similarEntries[j].toLowerCase().trim()] = entry[1];
            }
          } else {
            dict[entry[0].toLowerCase().trim()] = entry[1];
          }
        }
        console.log('loaded');
        window.wordzuki.enable = true;
        window.wordzuki.EJdict = dict;
        window.wordzuki.dictLoad = true;
        chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16.png' });
        chrome.tabs.onUpdated.addListener(updateTab);
        resolve();
      });
  });
}

function checkAuth(tab) {
  return new Promise((resolve, reject) => {
    const url = 'http://www.wordzuki.xyz/api/auth/is-authorized';
    const testUrl = 'http://localhost:3000/api/auth/is-authorized';
    $.get('http://www.wordzuki.xyz/api/auth/is-authorized')
    .then((data) => {
      const user = data.user;
      if (!window.wordzuki.dictLoad) {
        loadDictAsync()
          .then(() => enable(tab));
      }
      resolve(user);
    })
    .fail((err) => {
      console.log('fail', err);
      if (window.wordzuki.loginAttempt < 1) {
        window.wordzuki.loginAttempt += 1;
        chrome.tabs.create({ url: 'http://www.wordzuki.xyz/chrome-signin' });
        chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
          chrome.tabs.onRemoved.addListener(checkAuth);
        });
      } else {
        window.wordzuki.loginAttempt -= 1;
        chrome.tabs.onRemoved.removeListener(checkAuth);
      }
    });
  });
}

function toggleExt(tab) {
  checkAuth()
    .then((user) => {
      if (user) {
        if (window.wordzuki.enable) {
          chrome.tabs.onUpdated.removeListener(updateTab);
          disable(tab);
        }
      }
    });
}

chrome.browserAction.onClicked.addListener(toggleExt);

chrome.runtime.onMessage.addListener(
  (request, sender, senderResponse) => {
    switch (request.message) {
      case 'get_url': {
        chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
          const source = tab[0].url;
          const sourceTitle = tab[0].title;
          senderResponse({ source, sourceTitle });
        });

        break;
      }
      case 'search_word': {
        const result = search(lemmatizer(request.word));
        senderResponse(result);
        break;
      }
      case 'get_base_word': {
        const result = lemmatizer(request.word);
        senderResponse(result);
        break;
      }
      case 'speak_it': {
        chrome.tts.speak(request.word, { rate: 0.8, lang: 'en-US', gender: 'male' });
        break;
      }
      case 'save_word': {
        saveWord(request.data);
        break;
      }
      default:
        // chill
    }
    // return true will keep the message channel open to the other end until sendResponse is called.
    return true;
  }
);

// function contextSearch(e) {
//   console.log('the e', e);
//   const word = e.selectionText;
//   if (!window.wordzuki.dictLoad) {
//     loadDictAsync()
//       .then(() => {
//         // refer to search.js
//         // search(lemmatizer(word));
//         chrome.runtime.sendMessage({ message: 'search_word', word });
//       });
//   } else {
//     console.log('BBB town');
//     chrome.runtime.sendMessage({ message: 'search_word', word });
//     // refer to search.js
//     // search(lemmatizer(word));
//   }
// }

// chrome.contextMenus.create({
//   title: 'Look Up',
//   contexts: ['page', 'selection', 'editable', 'link'],
//   onclick: contextSearch
// });
