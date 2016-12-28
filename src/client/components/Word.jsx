import React, { PropTypes } from 'react';
import voice from '../assets/images/speaker.png';
import trash from '../assets/images/trash-can.png';

const speakIt = (term) => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(term);
  synth.speak(utterThis);
};

const Word = ({ word, deleteWord }) => {
  if (!word) {
    return null;
  }
  return (
    <div className="w-100-m w-70-ns">
      <ul className="list ml2 ml3-ns mr3 mr5-ns mt2 mt4-ns georgia">
        <li className="ph3 pv3 f5 f3-ns fw7 mid-gray bb b--black-10 georgia">{word.word}
          <a
            onClick={() => {
              speakIt(word.word);
            }}
            className="mh1 mh2-ns"
          >
            <img src={voice} alt="speak" className="dib w1 h1 v-mid mr2 mr3-ns dim" />
          </a>
        </li>
        <li className="ph3 f6 f5-ns fw5 mid-gray pv3 bb b--black-10 lh-copy">例：{word.ex}
          <a
            href={word.source}
            className="mh1 mh2-ns i"
            target="_blank"
            rel="noopener noreferrer"
          >~ 原文</a>
        </li>
        <ol className="mv2-ns">
          {JSON.parse(word.def)
            .map((item, i) => (<li key={i} className="f6 f5-ns fw3 mid-gray pv2">{item}</li>))}
        </ol>
        <a
          onClick={() => deleteWord(word._id)}
        >
          <img src={trash} alt="trash" className="dib wz-icon bottom-2 right-2 fixed dim" />
        </a>
      </ul>
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  deleteWord: PropTypes.func,
};

export default Word;
