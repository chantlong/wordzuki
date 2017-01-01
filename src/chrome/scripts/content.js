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

function saveWord({ word, definition, example, source }) {
  $.post('https://desolate-cove-59104.herokuapp.com/api/word',
        { word, definition, example, source },
        (data2, status2) => { console.log('posted?', data2, status2); })
  .fail(err => console.log('save error', err));
}

function getSentence(selection, word) {
  console.log('the selection', selection);
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
    chrome.runtime.sendMessage({ message: 'get_url' }, (source) => {
      resolve(source);
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

function getWord() {
  console.log('検索中...');
  const word = window.getSelection().toString().trim();
  if (!word) {
    return null;
  }
  const selectedArea = window.getSelection();
  Promise.all([
    getDefinition(word),
    getSentence(selectedArea, word),
    getSource()
  ])
    .then((values) => {
      let definition = values[0];
      const example = values[1];
      const source = values[2];
      console.log('values', values);
      createPopup(word, definition, example);
      definition = JSON.stringify(definition);
      saveWord({ word, definition, example, source });
    })
    .catch((reason) => {
      console.log('the reason', reason);
      if (reason === 'No definition found') {
        noDefPopup();
      }
    });
  return null;
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'enable') {
      if (!window.wordzuki.enable) {
        window.wordzuki.enable = 1;
        console.log('wordzuki スタート');
        document.addEventListener('dblclick', getWord);
        window.addEventListener('click', closePopup);
      }
    }
    if (request.message === 'disable') {
      if (window.wordzuki.enable) {
        console.log('wordzuki 終了');
        window.wordzuki.enable = 0;
        document.removeEventListener('dblclick', getWord);
        window.removeEventListener('click', closePopup);
      }
    }
  }
);

