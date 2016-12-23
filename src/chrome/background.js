// background.js
const config = {
  enable: false
};

function enable(tab, id) {
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

// function checkAuth(tab) {
//   $.get('http://localhost:3000/api/auth/is-authorized', (data) => {
//     console.log('we received user', data);
//     enable(tab);
//   }).fail(err => {
//     console.log('fail', err);
//     chrome.tabs.create({ url: 'http://localhost:3000/chrome-signin' });
//     chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
//       chrome.tabs.onRemoved.addListener(() => {
//         console.log('it was removed');
//         console.log('the tab', tab);
//         checkAuth(tab);
//       });
//     });
//   });
// }

function toggleExt(tab) {
  if (config.enable === false) {
    config.enable = true;
    chrome.browserAction.setIcon({ path: 'assets/images/wordzuki-logo16.png' });
    enable(tab);
    // checkAuth(tab);
    
    // $.post('http://localhost:3000/api/auth/sign-in',
    //   { username, password },
    //   (data2, status2) => { console.log('posted?', data2, status2); });
    // var x = new XMLHttpRequest();
    // x.open('GET', 'http://localhost:3000/api/auth/is-authorized');
    // x.onload = () => {
    //   console.log('the x', x)
    // }
    // x.send();
    // chrome.identity.getAuthToken({
    //     interactive: true
    // }, function(token) {
    //   console.log('the token', token)
    //     if (chrome.runtime.lastError) {
    //         alert(chrome.runtime.lastError.message);
    //         return;
    //     }
    //     var x = new XMLHttpRequest();
    //     x.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token);
    //     x.onload = function() {
    //         console.log('the x', x.response);
    //     };
    //     x.send();
    // });
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

