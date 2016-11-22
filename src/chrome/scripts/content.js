chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'clicked_browser_action') {
      // const firstHref = $("a[href^='http']").eq(0).attr('href');

      // console.log('yooo', firstHref);
      const sel = window.getSelection().toString();
      console.log('SELC====', sel);
      const url = 'https://desolate-cove-59104.herokuapp.com/api/search';
      console.log('eyy');
      $.post(url, { word: sel }, (data, status) => {
        console.log('first data', data.SUCCESS);
        const definition = data.SUCCESS;
        if (definition.length > 0) {
          $.post('https://desolate-cove-59104.herokuapp.com/api/word', { word: sel, def: definition }, (data, status) => {
            console.log('posted?', data, status);
          })
        }
      });
      // fetch(url,
      //   {
      //     method: 'post',
      //     mode: 'cors',
      //     body: {
      //       word: sel
      //     }
      //   })
      // .then((res) => {
      //   console.log('the response we got back', res);
      // })
      // .catch((err) => { console.log('what err', err); });
      chrome.runtime.sendMessage({ message: 'search_word', word: sel });
    }
  }
);
