import React, { PropTypes } from 'react';

class CreateWord extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      ex: '',
      def: '',
      tag: '',
    };
    this.handleWord = this.handleWord.bind(this);
    this.handleEx = this.handleEx.bind(this);
    this.handleDef = this.handleDef.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.checkWordExist = this.checkWordExist.bind(this);
  }

  handleWord(e) { this.setState({ word: e.target.value }); }

  handleEx(e) { this.setState({ ex: e.target.value }); }

  handleDef(e) { this.setState({ def: e.target.value }); }

  handleTag(e) { this.setState({ tag: e.target.value }); }

  checkWordExist() {
    const { errorMsg } = this.props;
    if (this.state.word === '') {
      return errorMsg({ message: '言葉のない言葉は保存できません。' });
    }
    return errorMsg({});
  }

  closeWindow(e) {
    const { toggleAddWord } = this.props;
    e.preventDefault();
    toggleAddWord(false);
  }

  handleSubmit(e) {
    const { saveNewWord } = this.props;
    e.preventDefault();
    const word = this.state.word === '' ? null : this.state.word;
    const example = this.state.ex === '' ? null : this.state.ex;
    const definition = this.state.def === '' ? null : this.state.def.split('||');
    const tags = this.state.tag === '' ? null :
    this.state.tag.split(',');
    Promise.all([
      this.checkWordExist(),
    ]).then(() => {
      const { errorHandle } = this.props;
      if (!errorHandle.message) {
        saveNewWord({ word, definition, example, tags });
      }
    });
  }

  render() {
    const { errorHandle } = this.props;
    return (
      <div className="dib-ns w-100 w-70-m w-70-l mb0-ns mb5 vh-100-ns inline-flex items-center justify-center border-box">
        <form
          className="ma0 pa3 georgia f6 dt"
          onSubmit={this.handleSubmit}
        >
          <input
            placeholder="「単語」例：abnormal"
            className="pa2 mv2 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white f6 dtr w-100 border-box"
            onChange={this.handleWord}
          />
          <textarea
            placeholder="「例」例：The antonym of normal is abnormal."
            className="pa2 mv2 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-100 border-box f6 dtr"
            type="text"
            rows="5"
            onChange={this.handleEx}
          />
          <div className="dtr">
            <textarea
              placeholder="「意味」意味が２つ以上あれば意味ごとに２つの半角のパイプライン（縦線） &quot;||&quot; でわけてください。
              例：『異常な』|| 普通でない || 規準をはずれた"
              className="pa2 mv2 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-100 f6 dtr v-mid"
              type="text"
              rows="8"
              onChange={this.handleDef}
            />
          </div>
          <div className="dtr">
            <input
              placeholder="「タグ」例：哲学,英語"
              className="pa2 mv2 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white f6 dtr w-100 border-box"
              onChange={this.handleTag}
            />
          </div>
          { errorHandle.message ? <div className="f7 pt3 dark-red dtr tc avenir">{errorHandle.message}<span className="f5">&#x1f914;</span></div> : null}
          <div className="center dtr tc avenir">
            <button
              className="mv3 mh2 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              type="submit"
            >保存
            </button>
            <button
              className="mv3 mh2 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              onClick={this.closeWindow}
            >キャンセル
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CreateWord.propTypes = {
  errorHandle: PropTypes.objectOf(
    PropTypes.any,
  ),
  saveNewWord: PropTypes.func,
  toggleAddWord: PropTypes.func,
  errorMsg: PropTypes.func,
};

export default CreateWord;
