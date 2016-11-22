chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'clicked_browser_action') {
      const source = request.url;
      const word = window.getSelection().toString();
      const daSel = window.getSelection().focusNode.data.split('.');
      let ex;
      for (let i = 0; i < daSel.length; i += 1) {
        if (daSel[i].indexOf(word) > -1) {
          ex = daSel[i].concat('.');
        }
      }
      const url = 'https://desolate-cove-59104.herokuapp.com/api/search';
      $.post(url, { word }, (data1) => {
        const def = JSON.stringify(data1.SUCCESS);
        if (def.length > 0) {
          $.post('https://desolate-cove-59104.herokuapp.com/api/word',
            { word, def, ex, source },
            (data2, status2) => { console.log('posted?', data2, status2); });
        }
      });
      chrome.runtime.sendMessage({ message: 'speak_it', word });
    }
  }
);
