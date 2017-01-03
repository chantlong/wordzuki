
const lemmatizer = (word) => {
  const lemmatize = new Lemmatizer();
  console.log('lem', lemmatize.lemmas(word));
  const stem = lemmatize.lemmas(word)[0][0];
  console.log('the lemma, result', stem);
  return stem;
};


const search = (word) => {
  console.log(window.wordzuki);
  if (window.wordzuki.EJdict[word]) {
    const result = window.wordzuki.EJdict[word].trim();
    if (result[0] === '=') {
      const referredWord = result.slice(1);
      search(referredWord);
    }
    return result;
  }
  return null;
};
