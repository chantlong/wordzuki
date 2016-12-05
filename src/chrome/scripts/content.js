function speakIt(word) {
  chrome.runtime.sendMessage({ message: 'speak_it', word });
}

function lookUp() {
  console.log('検索中...');
  if (document.getElementById('wz-popup')) {
    document.getElementById('wz-popup').remove();
  }
  const word = window.getSelection().toString().toLowerCase();
  if (!word) {
    return null;
  }
  let source;
  chrome.runtime.sendMessage({ message: 'get_url' }, (response) => {
    source = response.url;
  });
  const url = 'https://desolate-cove-59104.herokuapp.com/api/search';
  const popup = document.createElement('div');
  popup.setAttribute('id', 'wz-popup');
  const wContent = document.createElement('div');
  wContent.setAttribute('class', 'wz-content');

  return $.post(url, { word }, (data1) => {
    if (!!data1.SUCCESS && data1.SUCCESS.length) {
      const defEl = document.createElement('ol');
      for (let i = 0; i < data1.SUCCESS.length; i += 1) {
        const item = document.createElement('li');
        const defItem = document.createTextNode(data1.SUCCESS[i]);
        item.append(defItem);
        defEl.appendChild(item);
      }
      const daSel = window.getSelection().focusNode.data.split('.');
      let ex;
      for (let i = 0; i < daSel.length; i += 1) {
        if (daSel[i].indexOf(word) > -1) {
          ex = daSel[i].concat('.').trim();
        }
      }
      defEl.className = 'wz-def';
      const wordItem = document.createElement('h1');
      wordItem.className = 'wz-term';
      const wordTerm = document.createTextNode(word);
      const wordContainer = document.createElement('div');
      wordContainer.setAttribute('class', 'wz-word-container');
      const wordPron = document.createElement('img');
      wordPron.setAttribute('class', 'wz-pronounce');
      wordPron.setAttribute('src', chrome.extension.getURL('assets/images/speaker.png'));
      wordItem.appendChild(wordTerm);
      wordContainer.appendChild(wordItem);
      wordContainer.appendChild(wordPron);
      wContent.appendChild(wordContainer);
      wContent.appendChild(defEl);
      popup.appendChild(wContent);
      document.body.appendChild(popup);
      $('#wz-popup').fadeIn('fast');
      const def = JSON.stringify(data1.SUCCESS);
      const pronounceListener = document.getElementsByClassName('wz-pronounce')[0];
      pronounceListener.addEventListener('click', () => {
        speakIt(word);
      });
      console.log('hey=====');
      $.post('https://desolate-cove-59104.herokuapp.com/api/word',
        { word, def, ex, source },
        (data2, status2) => { console.log('posted?', data2, status2); });
    } else {
      console.log('No definition');
      const noDef = document.createElement('p');
      noDef.setAttribute('class', 'wz-error');
      const errMessage = document.createTextNode('cannot be found');
      noDef.appendChild(errMessage);
      wContent.appendChild(noDef);
      popup.appendChild(wContent);
      document.body.appendChild(popup);
      $('#wz-popup').fadeIn('fast');
      setTimeout(() => {
        $('#wz-popup').fadeOut('fast', () => popup.remove());
      }, 2000);
    }
  });
}

function closePopup(e) {
  const popup = document.getElementById('wz-popup');
  if (!popup) {
    return null;
  }
  if (e.target === popup) {
    $('#wz-popup').fadeOut('fast', () => $('wz-popup').remove());
  }
  return null;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'enable') {
      console.log('wordzuki スタート');
      document.addEventListener('dblclick', lookUp);
      window.addEventListener('click', closePopup);
    }
    if (request.message === 'disable') {
      console.log('wordzuki 終了');
      document.removeEventListener('dblclick', lookUp);
      window.removeEventListener('click', closePopup);
    }
  }
);

