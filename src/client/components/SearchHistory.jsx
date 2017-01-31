import React, { PropTypes } from 'react';
import Word from '../containers/Word';
import Search from '../containers/Search';
// import debounce from 'debounce';

class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: undefined,
      remainHeight: undefined,
    };
    this.selectHeight = this.selectHeight.bind(this);
  }

  componentWillMount() {
    const { fetchWords } = this.props;
    fetchWords();
    this.selectHeight();
  }

  componentDidMount() {
    window.addEventListener('resize', this.selectHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.selectHeight);
  }

  selectHeight() {
    const width = window.innerWidth;
    if (width <= 480) {
      this.setState({ height: 4, remainHeight: 0 });
    } else {
      // 64 is height of nav bar
      // padding of options will affect the 35
      const height = Math.floor((window.innerHeight - 64) / 35).toString();
      const remainHeight = ((window.innerHeight - 64) % 35) -
      Math.floor((window.innerHeight - 64) / 35);
      this.setState({ height, remainHeight });
    }
  }

  render() {
    const { list, results, isFetching, word, onSelect, deleteWord } = this.props;
    return (
      <div>
        <div className="w-100 center">
          <div
            className="db dib-ns w-100 w-30-m w-20-l br b--black-10 v-top"
          >
            <Search />
            {isFetching && <div className="flex justify-center items-center w-100 h-100">
              <div className="loader">
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
              </div>
            </div>}
            {
              !isFetching && !results && list.length === 0 &&
              <div className="mt4 f6 f6-ns fw4 tc">単語は保存していません。</div>
            }
            {
              !isFetching && !results && list.length > 0 &&
              <ul
                className="word-list word-list-ns pre list pl0 ml0 mt0 justify-right w-100 bb b--black-10 bn-ns"
                size={this.state.height}
                onChange={(e) => {
                  if (e.target.value === null) {
                    return null;
                  }
                  const term = JSON.parse(e.target.value);
                  return onSelect(term);
                }}
                onKeyDown={(e) => {
                  if (e.target.value === '') {
                    return null;
                  }
                  if (e.keyCode === 8) {
                    const term = JSON.parse(e.target.value);
                    deleteWord(term._id);
                  }
                  return null;
                }}
              >
                {
                list.map((term, i) => {
                  const theTerm = term;
                  theTerm.index = i;
                  return (
                    <li
                      key={i}
                      onClick={() => { onSelect(theTerm); }}
                      className="pr3 pv2 f6 f6-ns fw4 link
                      bb b--black-10 tr hover-bg-dark-gray hover-white"
                      value={JSON.stringify(theTerm)}
                    >{theTerm.word}
                    </li>);
                })
              }
              </ul>
          }
            {
            !isFetching && results && results.length > 0 && list.length > 0 &&
            <select
              className="word-list pre list pl0 ml0 mt0 justify-right w-100"
              size={this.state.height}
              onChange={(e) => {
                if (e.target.value === null) {
                  return null;
                }
                const term = JSON.parse(e.target.value);
                return onSelect(term);
              }}
              onKeyDown={(e) => {
                if (e.target.value === '') {
                  return null;
                }
                if (e.keyCode === 8) {
                  const term = JSON.parse(e.target.value);
                  deleteWord(term._id);
                }
                return null;
              }}
            >
              {
              results.map((term, i) => {
                const theTerm = term;
                theTerm.index = i;
                return (
                  <option
                    key={i}
                    onClick={() => { onSelect(theTerm); }}
                    className="pr3 pv2 f6 f6-ns fw4 link
                    bb b--black-10 tr hover-bg-dark-gray hover-white"
                    value={JSON.stringify(theTerm)}
                  >{theTerm.word}
                  </option>);
              })
            }
            </select>
          }
            {
              !isFetching && results && results.length < 1 && list.length > 0 &&
              <div className="mt4 f6 f6-ns fw4 tc">該当する単語は見つかりませんでした。</div>
            }
          </div>
          <div className="db dib-ns w-100 w-70-m w-80-l border-box">
            <Word word={word} />
          </div>
        </div>
        <div
          className="w-100 fixed bg-near-white bottom-0"
          style={{ height: `${this.state.remainHeight}px` }}
        />
      </div>

    );
  }
}

SearchHistory.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object,
  ),
  results: PropTypes.arrayOf(
    PropTypes.object,
  ),
  isFetching: PropTypes.bool,
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  onSelect: PropTypes.func,
  deleteWord: PropTypes.func,
  fetchWords: PropTypes.func,
};

export default SearchHistory;
