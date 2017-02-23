import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import question from '../assets/images/question.png';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      example: '',
      definition: '',
    };
    this.loadWord = this.loadWord.bind(this);
    this.handleExample = this.handleExample.bind(this);
    this.handleDefinition = this.handleDefinition.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keypress', this.toggleModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.toggleModal);
  }

  toggleModal(e) {
    const { toggleEditModal } = this.props;
    // 2 --> EDIT MODAL
    if (e.keyCode === 50) {
      toggleEditModal();
    }
  }

  loadWord() {
    const { word } = this.props;
    this.setState({
      example: word.ex,
      definition: Array.isArray(word.def) ? word.def.join('||') : '',
      tags: Array.isArray(word.tags) ? word.tags.join(',') : '',
    });
  }

  handleDefinition(e) {
    this.setState({ definition: e.target.value });
  }

  handleTags(e) {
    this.setState({ tags: e.target.value });
  }

  handleExample(e) {
    this.setState({ example: e.target.value });
  }

  handleSubmit(e) {
    const { word, addDefinition } = this.props;
    e.preventDefault();
    const ex = this.state.example;
    const def = this.state.definition === '' ? null : this.state.definition.split('||');
    const tags = this.state.tags === '' ? null : this.state.tags.split(',').map(item => item.trim());
    addDefinition(word._id, ex, def, tags);
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
          className="modal modal-ns mid-gray georgia w-90 w-40-m w-30-l center ba br2 b--black-50 pa2 tc ma4 bg-white"
          isOpen={editModal}
          onAfterOpen={this.loadWord}
          onRequestClose={this.closeModal}
          contentLabel="edit word"
        >
          <p className="f5 f3-ns fw7 center f4 fw5 pa3">{word.word}</p>
          <p className="f5 ma0 pa0">- 例 -</p>
          <textarea
            id="ex"
            className="ma2 ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-moon-gray w6 f6 outline-0 w-90 center"
            type="text"
            rows="7"
            onChange={this.handleExample}
            value={this.state.example}
          />
          <div className="">
            <div className="f5 ma0 mt2 pa1">- 意味 -&nbsp;</div>
            <div
              className="tooltip"
            >
              <img src={question} alt="question" className="dib w1 h1 v-mid dim" />
              <div
                className="tooltip-content"
              >
                <p className="tl f7 ma0 pa2">意味が２つ以上あれば意味ごとに２つの半角のパイプライン（縦線） &quot;||&quot; でわけてください。
                例：『異常な』|| 普通でない || 規準をはずれた
                </p>
              </div>
            </div>
          </div>
          <textarea
            id="def"
            className="mv2 ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-moon-gray w6 f6 outline-0 w-90 center"
            type="text"
            rows="8"
            onChange={this.handleDefinition}
            value={this.state.definition === '' ? '' : this.state.definition}
          />
          <div className="f5 ma0 mt2 pa0">- タグ -</div>
          <input
            className="mv2 ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-moon-gray w6 f6 outline-0 w-90 center"
            type="text"
            autoCorrect="off"
            autoCapitalize="none"
            onChange={this.handleTags}
            placeholder="「タグ」例：哲学,英語"
            value={this.state.tags === '' ? '' : this.state.tags}
          />
          <div className="center dtr tc avenir">
            <button
              className="mv3 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              type="submit"
              onClick={this.handleSubmit}
            >変更
            </button>
            <button
              className="mv3 mh2 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              onClick={this.closeModal}
            >キャンセル
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
