import React, { PropTypes } from 'react';

const WordItem = ({ word }) => (
  <div className="word-container">
    <ul>
      <li>
        <h3>{word.word}</h3>
      </li>
      <ul>
        {JSON.parse(word.def).map((def, i) => <li key={i}>{i + 1}. {def}</li>)}
      </ul>
    </ul>
  </div>
);

WordItem.propTypes = {
  word: PropTypes.shape({
    word: React.PropTypes.string.isRequired,
  }),
};

export default WordItem;
