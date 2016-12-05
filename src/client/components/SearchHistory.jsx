import React, { PropTypes } from 'react';
import Word from './Word';

const SearchHistory = ({ words, word, onSelect }) => (
  <div className="dt w-100 border-box pa3-ns ph5-ns">
    <div className="dtc w-30">
      <ul className="list ph3-ns ph5-ns pv4">
        {words.map((term, i) =>
          <li
            key={i}
            onClick={() => { onSelect(term); }}
            className="f6 f5-ns fw5 pa2 link dim mid-gray bb b--black-10 tr"
          >{term.word}
          </li>)}
      </ul>
    </div>
    <div className="dtc w-70 border-box">
      <Word word={word} />
    </div>
  </div>
);

SearchHistory.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.object,
  ),
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  onSelect: PropTypes.func,
};

export default SearchHistory;

// {words.length < 1 ? <p>単語は保存していません。<br />You have not saved any words.</p> :
//   words.map((word, i) => <WordItem key={i} word={word} />)
// }
