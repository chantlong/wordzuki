import React, { PropTypes } from 'react';
import WordItem from './WordItem';

const SearchHistory = ({ words }) => (
  <div>
    <h2>New Section</h2>
    {words.map((word, i) => <WordItem key={i} word={word} />)}
  </div>
);

SearchHistory.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default SearchHistory;
