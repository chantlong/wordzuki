window.wordzuki = {
  config: {
    enable: 0,
  }
};

function speakIt(word) {
  chrome.runtime.sendMessage({ message: 'speak_it', word });
}

function createPopup(word, definition, example) {
  const popup = document.createElement('div');
  popup.setAttribute('id', 'wz-popup');
  const wContent = document.createElement('div');
  wContent.setAttribute('class', 'wz-content');

  const defEl = document.createElement('ol');
  for (let i = 0; i < definition.length; i += 1) {
    const item = document.createElement('li');
    const defItem = document.createTextNode(definition[i]);
    item.append(defItem);
    defEl.appendChild(item);
  }
  defEl.className = 'wz-def';
  const wordItem = document.createElement('h1');
  wordItem.className = 'wz-term';
  const wordTerm = document.createTextNode(word);
  const wordContainer = document.createElement('div');
  wordContainer.setAttribute('class', 'wz-word-container');
  const wordPronounce = document.createElement('img');
  wordPronounce.setAttribute('class', 'wz-pronounce');
  wordPronounce.setAttribute('src', chrome.extension.getURL('assets/images/speaker.png'));
  wordItem.appendChild(wordTerm);
  wordContainer.appendChild(wordItem);
  wordContainer.appendChild(wordPronounce);
  wContent.appendChild(wordContainer);
  wContent.appendChild(defEl);
  popup.appendChild(wContent);
  document.body.appendChild(popup);
  $('#wz-popup').fadeIn('fast');
  const def = JSON.stringify(definition);
  const pronounceListener = document.getElementsByClassName('wz-pronounce')[0];
  pronounceListener.addEventListener('click', () => {
    speakIt(word);
  });
}

function noDefPopup() {
  const popup = document.createElement('div');
  popup.setAttribute('id', 'wz-popup');
  const wContent = document.createElement('div');
  wContent.setAttribute('class', 'wz-content');
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
  }, 3000);
}

function closePopup(e) {
  const popup = document.getElementById('wz-popup');
  if (!popup) {
    return null;
  }
  if (e.target === popup) {
    $('#wz-popup').fadeOut('fast', () => $('#wz-popup').remove());
  }
  return null;
}

function getBaseWord(term) {
  return new Promise((resolve, reject) => {
    const word = term.toLowerCase();
    chrome.runtime.sendMessage({ message: 'get_base_word', word }, (base) => {
      if (!base) {
        return reject(base);
      }
      return resolve(base);
    });
  });
}

function getSentence(selection, word) {
  // console.log('the selection', selection);
  // includes words that are hyperlinks in the sentence
  // matches for '.' '!' '?'
  const sentences = selection.anchorNode.parentNode.innerText.match(/[^.!?]+[.!?]+/g);
  let example = '';
  if (sentences) {
    for (let i = 0; i < sentences.length; i += 1) {
      if (sentences[i].indexOf(word) > -1) {
        example = sentences[i].trim();
        break;
      }
    }
    return example;
  }
  // if no puncation matched return node directly
  example = selection.anchorNode.data;
  return example;
}

function getSource() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ message: 'get_url' }, (info) => {
      resolve(info);
    });
  });
}

function getDefinition(term) {
  return new Promise((resolve, reject) => {
    const word = term.toLowerCase();
    chrome.runtime.sendMessage({ message: 'search_word', word }, (definition) => {
      if (definition === null) {
        return reject('No definition found');
      }
      return resolve(definition.split(' / '));
    });
  });
}

function getWordInfo() {
  console.log('検索中...');
  const word = window.getSelection().toString().trim();
  if (!word) {
    return null;
  }
  const selectedArea = window.getSelection();
  Promise.all([
    getBaseWord(word),
    getDefinition(word),
    getSentence(selectedArea, word),
    getSource()
  ])
    .then((values) => {
      const [word, definition, example, info] = values;
      const { source, sourceTitle } = info;
      // console.log('values', values);
      const data = {
        word,
        definition: JSON.stringify(definition),
        example,
        source,
        sourceTitle,
      };
      createPopup(word, definition, example);
      chrome.runtime.sendMessage({ message: 'save_word', data });
      // saveWord({ word, definition: JSON.stringify(definition), example, source, sourceTitle });
    })
    .catch((reason) => {
      noDefPopup();
    });
  return null;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'enable') {
      if (!window.wordzuki.enable) {
        window.wordzuki.enable = 1;
        console.log('wordzuki スタート');
        document.addEventListener('dblclick', getWordInfo);
        window.addEventListener('click', closePopup);
      }
    }
    if (request.message === 'disable') {
      if (window.wordzuki.enable) {
        console.log('wordzuki 終了');
        window.wordzuki.enable = 0;
        document.removeEventListener('dblclick', getWordInfo);
        window.removeEventListener('click', closePopup);
      }
    }
  }
);

// function saveWord({ word, definition, example, source, sourceTitle }) {
//   $.post('https://desolate-cove-59104.herokuapp.com/api/word',
//         { word, definition, example, source, sourceTitle },
//         (data2, status2) => { console.log('posted?', data2, status2); }, 'json')
//   .fail(err => console.log('save error', err));
// }
