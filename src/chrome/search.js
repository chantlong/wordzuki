
const lemmatizer = (word) => {
  const lemmatize = new Lemmatizer();
  console.log('lem', lemmatize.lemmas(word));
  const baseRetrieverWord = lemmatize.lemmas(word)[0][0];
  const singularizedWord = pluralize.singular(word);
  let result = '';
  if (baseRetrieverWord.length <= singularizedWord.length) {
    result = baseRetrieverWord;
  } else {
    result = singularizedWord;
  }
  console.log('the lemma, result', result);
  return result;
};


const search = (word) => {
  console.log(window.wordzuki);
  if (window.wordzuki.EJdict[word]) {
    const result = window.wordzuki.EJdict[word].trim();
    if (result[0] === '=') {
      const referredWord = result.slice(1);
      search(referredWord);
    }
    console.log('the result', result);
    return result;
  }
  return null;
};