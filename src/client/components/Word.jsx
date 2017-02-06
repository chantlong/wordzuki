import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import EditModal from '../containers/EditModal';
import voice from '../assets/images/speaker.png';
import add from '../assets/images/add.png';
import edit from '../assets/images/edit.png';
import trash from '../assets/images/trash-can.png';
import link from '../assets/images/link.png';

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
    addDefinition(word._id, word.ex, def);
    this.closeModal();
  }

  openModal() { this.setState({ open: true }); }

  closeModal() { this.setState({ open: false }); }

  render() {
    const { word, deleteWord, list } = this.props;
    if (!word) {
      return null;
    }
    return (
      <div className="db dib-ns w-100 w-70-m w-50-l border-box mb0-ns mb5">
        <ul className="list ma0 pl2 pl3-ns pr3 pr5-ns pt2 pt4-ns georgia pl0 pl4-ns vh-100-ns flex flex-column">
          <li className="ph3 pv3 f4 f3-ns fw7 mid-gray bb b--black-10 georgia">{word.word}
            <a
              onClick={() => {
                speakIt(word.word);
              }}
              className="mh1 mh2-ns"
            >
              <img src={voice} alt="speak" className="dib w1 h1 v-mid mr2 dim" />
            </a>
          </li>
          { /* EXAMPLE */ }
          <li className="ph3 f6 f5-ns fw5 mid-gray pv3 lh-copy">例：{word.ex}
          </li>
          <div className="bb b--black-10 db tr pb3">
            <a
              onClick={() => {
                speakIt(word.ex);
              }}
            >
              <img src={voice} alt="speak" className="dib w1 h1 v-mid dim mr2" />
            </a>
            { word.source && word.sourceTitle ?
              <div
                className="sourcetip"
              >
                <img src={link} alt="link" className="dib w1 h1 v-mid dim mh1 mh2-ns" />
                <div
                  className="sourcetip-content"
                >
                  <a
                    href={word.source}
                    className="f7 i near-white link dim"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{word.sourceTitle}
                  </a>
                </div>
              </div>
              :
              null
            }
            { word.author ?
              <div
                className="sourcetip"
              >
                <img src={link} alt="link" className="dib w1 h1 v-mid dim mh1 mh2-ns" />
                <div
                  className="sourcetip-content"
                >
                  <p
                    className="f7 i ma0"
                  >{word.author}</p>
                </div>
              </div>
              :
              null
            }
          </div>
          { /* DEFINITION */ }
          <ol className="pv3 flex flex-column overflow-y-scroll">
            {word.def ? word.def
              .map((item, i) => (<li key={i} className="f6 f5-ns fw3 mid-gray pv2">{item}</li>)) :
              (<p className="f6 f5-ns fw3 mid-gray pv2">意味を追加する
                <a
                  onClick={this.openModal}
                  className="mh1 mh2-ns"
                >
                  <img src={add} alt="add definition" className="dib w1 h1 v-mid mr2 dim" />
                </a>
              </p>)}
          </ol>
          { /* DELETE WORD */}
          <div className="db tr mt2 mb4">
            <a
              onClick={() => {
                deleteWord(word._id, list.indexOf(word), list);
              }}
            >
              <img src={trash} alt="trash" className="dib w1 h1 v-mid mr2 dim" />
            </a>
            { /* EDIT WORD */ }
            <a
              onClick={() => {
                this.props.toggleEditModal();
              }}
              className="mh1 mh2-ns"
            >
              <img src={edit} alt="edit" className="dib w1 h1 v-mid dim" />
            </a>
          </div>
          <EditModal />
          <Modal
            className="modal mid-gray georgia w-30-ns center ba br2 b--black-50 pa2 tc ma4 bg-white"
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
        </ul>
      </div>
    );
  }
}

Word.propTypes = {
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  list: PropTypes.arrayOf(
    PropTypes.object,
  ),
  deleteWord: PropTypes.func,
  addDefinition: PropTypes.func,
  toggleEditModal: PropTypes.func,
};

export default Word;
