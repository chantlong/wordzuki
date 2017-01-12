import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import question from '../assets/images/question.png';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example: undefined,
      definition: undefined,
    };
    this.loadWord = this.loadWord.bind(this);
    this.handleExample = this.handleExample.bind(this);
    this.handleDefinition = this.handleDefinition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  loadWord() {
    const { word } = this.props;
    this.setState({
      example: word.ex,
      definition: Array.isArray(word.def) ? word.def.join('||') : '',
    });
  }

  handleDefinition(e) {
    this.setState({ definition: e.target.value });
  }

  handleExample(e) {
    this.setState({ example: e.target.value });
  }

  handleSubmit(e) {
    const { word, addDefinition } = this.props;
    e.preventDefault();
    const ex = this.state.example;
    const def = this.state.definition === '' ? null : this.state.definition.split('||');
    addDefinition(word._id, ex, def);
    this.closeModal();
  }

  closeModal() {
    const { toggleEditModal } = this.props;
    toggleEditModal();
  }

  render() {
    const { editModal, word } = this.props;
    return (
      <div>
        <Modal
          className="modal mid-gray georgia w-80 w-30-ns center ba br2 b--black-50 pa2 tc ma4 bg-white"
          isOpen={editModal}
          onAfterOpen={this.loadWord}
          onRequestClose={this.closeModal}
          contentLabel="edit word"
        >
          <p className="f5 f3-ns fw7 center f4 fw5">{word.word}</p>
          <p className="f5 ma0 pa0">- 例 -</p>
          <textarea
            id="ex"
            className="ma2 ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-moon-gray w6 f6 outline-0"
            type="text"
            rows="3"
            onChange={this.handleExample}
            value={this.state.example}
          />
          <div className="">
            <div className="f5 ma0 mt2 pa0">- 意味 -&nbsp;</div>
            <div
              className="tooltip"
            >
              <img src={question} alt="question" className="dib w1 h1 v-mid dim" />
              <div
                className="tooltip-content"
              >
                <p className="tl f7 ma0 pa2">意味が２つ以上あれば &quot;||&quot; でわけてください。
                例：『異常な』|| 普通でない || 規準をはずれた
                </p>
              </div>
            </div>
          </div>
          <textarea
            id="def"
            className="mv2 ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-moon-gray w6 f6 outline-0"
            type="text"
            rows="5"
            onChange={this.handleDefinition}
            placeholder="yoooozz"
            value={this.state.definition === null ? '' : this.state.definition}
          />

          <div className="db center">
            <button
              className="mv3 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              type="submit"
              onClick={this.handleSubmit}
            >変更
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

EditModal.propTypes = {
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  addDefinition: PropTypes.func,
  toggleEditModal: PropTypes.func,
  editModal: PropTypes.bool,
};

export default EditModal;
