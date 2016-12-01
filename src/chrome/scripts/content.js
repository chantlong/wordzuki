function speakIt(word) {
  // console.log('what word in SPEAK IT');
  // const checkWord = document.getElementById('wz-popup').children[1].childNodes[0];
  // if (e.target === checkWord) {
  //   const word = document.getElementById('wz-popup').children[1].childNodes[0].className.split(' ')[0];
  chrome.runtime.sendMessage({ message: 'speak_it', word });
  // } else {
  //   console.log('noooo');
  // }
}
function lookup(request) {
  console.log('検索中...');
  if (document.getElementById('wz-popup')) {
    document.getElementById('wz-popup').remove();
  }
  const source = request.url;
  const word = window.getSelection().toString();
  const daSel = window.getSelection().focusNode.data.split('.');
  let ex;
  for (let i = 0; i < daSel.length; i += 1) {
    if (daSel[i].indexOf(word) > -1) {
      ex = daSel[i].concat('.').trim();
    }
  }
  console.log(word);
  console.log(ex);
  const url = 'https://desolate-cove-59104.herokuapp.com/api/search';
  $.post(url, { word }, (data1) => {
    if (!!data1.SUCCESS && data1.SUCCESS.length) {
      const popup = document.createElement('div');
      popup.setAttribute('id', 'wz-popup');
      const wContent = document.createElement('div');
      wContent.setAttribute('class', 'wz-content');
      const defEl = document.createElement('ol');
      for (let i = 0; i < data1.SUCCESS.length; i += 1) {
        var item = document.createElement('li');
        var defItem = document.createTextNode(data1.SUCCESS[i]);
        item.append(defItem);
        defEl.appendChild(item);
      }
      defEl.className= 'wz-def';
      var wordItem = document.createElement('h1');
      wordItem.className = 'wz-term';
      var wordTerm = document.createTextNode(word);

      // var wordPron = document.createElement('a');
      const wordPron = document.createElement('span');
      const img = document.createElement('img');
      img.setAttribute('class', 'wz-pronounce');
      img.setAttribute('src', chrome.extension.getURL('assets/images/speaker.png'));
      // wordPron.appendChild(img);
      wordPron.append(img);
      wordItem.append(wordTerm);
      wordItem.append(wordPron);
      wContent.appendChild(wordItem);
      wContent.appendChild(defEl);
      popup.appendChild(wContent);
      document.body.appendChild(popup);
      console.log('defEl', defEl);
      const def = JSON.stringify(data1.SUCCESS);
      const pronounceListener = document.getElementsByClassName('wz-pronounce')[0];
      console.log('datttt=====', pronounceListener);
      pronounceListener.addEventListener('click', () => { speakIt(word); });
      // $.post('https://desolate-cove-59104.herokuapp.com/api/word',
      //   { word, def, ex, source },
      //   (data2, status2) => { console.log('posted?', data2, status2); });
    } else {
      console.log('No definition');
    }
  });
}

function closePopup(e) {
  const popup = document.getElementById('wz-popup');
  if (!popup) {
    return null;
  }
  console.log('the etarget', e.target);
  if (e.target === popup) {
    return popup.remove();
  }
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'enable') {
      console.log('wordzuki スタート');
      window.addEventListener('dblclick', lookup);
      window.addEventListener('click', closePopup);
    }
    if (request.message === 'disable') {
      console.log('wordzuki 終了');
      window.removeEventListener('dblclick', lookup);
    }
  }
);

