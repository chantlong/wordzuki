import React, { PropTypes } from 'react';

const WordItem = ({ word }) => (
  <div>
    <ul>
      <li><h5>{word.word}</h5></li>
      <li>意味: {JSON.parse(word.def).map((def, i) => <li key={i}>{def}</li>)}</li>
    </ul>
  </div>
);

WordItem.propTypes = {
  word: PropTypes.shape({
    word: React.PropTypes.string.isRequired,
  }),
};

export default WordItem;
