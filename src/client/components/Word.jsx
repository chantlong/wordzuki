import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import voice from '../assets/images/speaker.png';
import add from '../assets/images/add.png';
import trash from '../assets/images/trash-can.png';

const speakIt = (term) => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(term);
  synth.speak(utterThis);
};

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      definition: undefined,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDefinition = this.handleDefinition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDefinition(e) {
    this.setState({ definition: e.target.value });
  }

  handleSubmit(e) {
    const { word, addDefinition } = this.props;
    const def = [].concat(this.state.definition);
    e.preventDefault();
    addDefinition(word._id, def);
    this.closeModal();
  }

  openModal() { this.setState({ open: true }); }

  closeModal() { this.setState({ open: false }); }

  render() {
    const { word, deleteWord } = this.props;
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
          <li className="ph3 f6 f5-ns fw5 mid-gray pv3 bb b--black-10 lh-copy">例：{word.ex}<a
            onClick={() => {
              speakIt(word.ex);
            }}
            className="mh1 mh2-ns"
          >
            <img src={voice} alt="speak" className="dib w1 h1 v-mid mr2 mr3-ns dim" />
          </a>
            { word.source ?
              <a
                href={word.source}
                className="mh1 mh2-ns i link dim"
                target="_blank"
                rel="noopener noreferrer"
              >~ 原文</a> :
              null
            }
          </li>
          <ol className="mv2-ns">
            {word.def ? word.def
              .map((item, i) => (<li key={i} className="f6 f5-ns fw3 mid-gray pv2">{item}</li>)) :
              (<p className="f6 f5-ns fw3 mid-gray pv2">意味を追加する
                <a
                  onClick={this.openModal}
                  className="mh1 mh2-ns"
                >
                  <img src={add} alt="add definition" className="dib w1 h1 v-mid mr2 mr3-ns dim" />
                </a>
              </p>)}
          </ol>
          <div>
            <Modal
              className="modal w-30-ns center ba br2 b--black-50 pa2 tc ma4 bg-white"
              isOpen={this.state.open}
              onRequestClose={this.closeModal}
              contentLabel="definition adding"
            >
              <textarea
                className="w-90 mt3 input-reset h3 ba br2 b--light-silver hover-bg-moon-gray f6 outline-0"
                placeholder="意味"
                onChange={this.handleDefinition}
              />
              <button
                className="ma2 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
                type="submit"
                onClick={this.handleSubmit}
              >追加
              </button>
            </Modal>
          </div>
          <a
            onClick={() => deleteWord(word._id)}
          >
            <img src={trash} alt="trash" className="dib wz-icon bottom-2 right-2 fixed dim" />
          </a>
        </ul>
      </div>
    );
  }
}

Word.propTypes = {
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  deleteWord: PropTypes.func,
  addDefinition: PropTypes.func,
};

export default Word;
