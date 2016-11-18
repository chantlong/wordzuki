import React, { PropTypes } from 'react';
import WordItem from './WordItem';

const SearchHistory = ({ words }) => (
  <div>
    {words.length < 1 ? <p>単語は保存していません。<br />You have not saved any words.</p> :
      words.map((word, i) => <WordItem key={i} word={word} />)
    }
  </div>
);

SearchHistory.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default SearchHistory;
