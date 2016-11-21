chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'clicked_browser_action') {
      // const firstHref = $("a[href^='http']").eq(0).attr('href');

      // console.log('yooo', firstHref);
      const sel = window.getSelection().toString();
      console.log('SELC====', sel);
      const url = 'http://localhost:3000/api/search';
      console.log('eyy');
      $.post(url, { word: sel }, function(data, status){
        console.log(status);
        console.log(data);
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
