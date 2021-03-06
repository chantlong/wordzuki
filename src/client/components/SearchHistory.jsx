import React, { PropTypes } from 'react';
import Word from '../containers/Word';
import Search from '../containers/Search';
import AddWordBtn from '../containers/AddWordBtn';
import SortBtn from '../containers/SortBtn';
import tagIcon from '../assets/images/tag.png';
import CreateWord from '../containers/CreateWord';
import Preloader from './Preloader';

const browser = require('detect-browser');
// import debounce from 'debounce';

class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: undefined,
      remainHeight: undefined,
      map: [],
    };
    this.selectHeight = this.selectHeight.bind(this);
    this.keyboardShortcuts = this.keyboardShortcuts.bind(this);
    this.keyboardReset = this.keyboardReset.bind(this);
  }

  componentWillMount() {
    const { fetchWords } = this.props;
    fetchWords();
    this.selectHeight();
  }

  componentDidMount() {
    // on mobile safari, reshift the page to top after input login
    window.addEventListener('resize', this.selectHeight);
    window.addEventListener('keyup', this.keyboardReset);
    window.addEventListener('keydown', this.keyboardShortcuts);
    document.body.scrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.selectHeight);
    window.removeEventListener('keyup', this.keyboardReset);
    window.removeEventListener('keydown', this.keyboardShortcuts);
  }

  keyboardReset() { this.setState({ map: [] }); }

  keyboardShortcuts(e) {
    const { toggleAddWord, newWord } = this.props;
    const theKey = e.keyCode;
    this.setState({ map: this.state.map.concat(theKey) }, () => {
      // OPTION + 1 --> NEW WORD
      if (this.state.map.toString() === [18, 49].toString()) {
        toggleAddWord();
      }
      // OPTION + ` --> SEARCH
      if (this.state.map.toString() === [18, 192].toString()) {
        setTimeout(() => { document.getElementById('s-icon').focus(); }, 100);
      }
    });
    // ESC --> ESCAPE NEW WORD
    if (e.keyCode === 27 && newWord === true) {
      toggleAddWord();
    }
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
    const { list, results, isFetching, onSelect, deleteWord, newWord, filterList, filterCompleteList, selectTag, fList } = this.props;
    const wordSelectable = (term, i) => {
      const theTerm = term;
      theTerm.index = i;
      return (
        <li
          key={i}
          onClick={() => { onSelect(theTerm); }}
          className="pr3 pv2 f6 f6-ns fw4 link bb b--black-10 tr hover-bg-dark-gray hover-white"
          value={JSON.stringify(theTerm)}
        >{theTerm.word}
        </li>);
    };
    const chromeWordSelectable = (term, i) => {
      const theTerm = term;
      theTerm.index = i;
      return (
        <option
          key={i}
          onClick={() => { onSelect(theTerm); }}
          className="pr3 pv2 f6 f6-ns fw4 link bb b--black-10 tr hover-bg-dark-gray hover-white"
          value={JSON.stringify(theTerm)}
        >{theTerm.word}
        </option>);
    };
    const listSelectable = (item, i) => {
      const tagName = item[0];
      return (
        <li
          key={i}
          onClick={() => { selectTag(tagName, list); }}
          className="ph3 pv2 f6 f6-ns fw4 link bb b--black-10 tl hover-bg-dark-gray hover-white w-100 ws-normal flex items-center"
        ><img className="dib w1 h1 pr2" src={tagIcon} alt="tag" />
          <p className="ma0 pa0 truncate" title={tagName}>{tagName}</p>
        </li>
      );
    };
    return (
      <div className="h-100">
        <div className="w-100 center h-100 border-box">
          <div
            className="db dib-ns w-100 w-30-m w-20-l br b--black-10 v-top border-box collapse"
          >
            {
              !isFetching &&
              <div>
                <div className="bb b--black-10 collapse flex items-center">
                  <Search />
                  <AddWordBtn />
                </div>
                <SortBtn />
              </div>
            }
            {isFetching && <Preloader />}
            {
              !isFetching && !results && list.length === 0 &&
              <div className="word-list word-list-ns pt4 f6 f6-ns fw4 tc">単語は保存していません。</div>
            }
            { /* SHOW FILTERED / NONFILTERED LIST OF WORDS*/ }
            {
              !isFetching && list.length > 0 && !filterList && (browser.name !== 'chrome' ?
                <ul
                  className="word-list word-list-ns pre list pl0 ma0 justify-right w-100 bb b--black-10"
                  onChange={(e) => {
                    if (e.target.value === null) {
                      return null;
                    }
                    const term = JSON.parse(e.target.value);
                    return onSelect(term);
                  }}
                >
                  {
                  results && results.length > 0 ?
                  results.map(wordSelectable) :
                  fList.map(wordSelectable)
                }
                </ul> :
                <select
                  className="word-list word-list-ns pre list pl0 ma0 justify-right w-100 bb b--black-10"
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
                  size={this.state.height}
                >
                  {
                  results && results.length > 0 ?
                  results.map(chromeWordSelectable) :
                  fList.map(chromeWordSelectable)
                }
                </select>)
            }
            { /* SHOW FILTER TAG LIST */ }
            {
              !isFetching && list.length > 0 && filterList && filterCompleteList.length > 0 &&
                <ul
                  className="word-list word-list-ns pre list pl0 ma0 justify-right w-100 bb b--black-10 overflow-y-auto"
                  onChange={(e) => {
                    if (e.target.value === null) {
                      return null;
                    }
                    const term = JSON.parse(e.target.value);
                    return onSelect(term);
                  }}
                >
                  {filterCompleteList.map(listSelectable)}
                </ul>
          }
            { /* SHOW EMPTY LIST */ }
            {
              !isFetching && results && results.length < 1 && list.length > 0 &&
              <div className="mt4 f6 f6-ns fw4 tc">該当する単語は見つかりませんでした。</div>
            }
          </div>
          { !newWord ? <Word /> : <CreateWord /> }
        </div>
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
  newWord: PropTypes.bool,
  isFetching: PropTypes.bool,
  onSelect: PropTypes.func,
  deleteWord: PropTypes.func,
  fetchWords: PropTypes.func,
  toggleAddWord: PropTypes.func,
  filterList: PropTypes.bool,
  filterCompleteList: PropTypes.arrayOf(
    PropTypes.array,
  ),
  selectTag: PropTypes.func,
  fList: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default SearchHistory;
