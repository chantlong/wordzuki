import React, { PropTypes } from 'react';
import Word from '../containers/Word';

class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: undefined,
    };
    this.selectHeight = this.selectHeight.bind(this);
  }

  componentWillMount() {
    const { fetchWords } = this.props;
    fetchWords();
    this.selectHeight();
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.selectHeight();
    });
  }

  selectHeight() {
    const height = Math.floor((window.innerHeight - 64) / 54).toString();
    this.setState({ height });
  }

  render() {
    const { words, word, onSelect } = this.props;
    if (words.length === 0) {
      return (
        <div className="dt w-100 border-box center">
          <div className="dtc w-20 fixed wall-bg br b--black-10">
            <select
              className="list pl0 ml0 mt0 justify-right w-100"
              size={this.state.height}
            >
              <option
                className="pr3 pv3 f6 f5-ns fw4 link
                bb b--black-10 tc"
              >単語は保存していません。
              </option>
            </select>
          </div>
          <div className="dtc w-80 border-box" />
        </div>
      );
    }
    return (
      <div className="dt w-100 border-box center">
        <div className="dtc w-20 fixed wall-bg br b--black-10">
          <select
            className="list pl0 ml0 mt0 justify-right w-100"
            size={this.state.height}
            onChange={(e) => {
              const term = JSON.parse(e.target.value);
              console.log('that term', term);
              onSelect(term);
            }}
          >
            {words.map((term, i) =>
              <option
                key={i}
                onClick={() => { onSelect(term); }}
                className="pr3 pv3 f6 f5-ns fw4 link
                bb b--black-10 tr hover-bg-dark-gray hover-white"
                value={JSON.stringify(term)}
              >{term.word}
              </option>)}
          </select>
        </div>
        <div className="dtc w-80 border-box">
          <Word word={word} />
        </div>
      </div>
    );
  }
}

SearchHistory.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.object,
  ),
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  onSelect: PropTypes.func,
  fetchWords: PropTypes.func,
};

export default SearchHistory;
