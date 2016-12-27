import React, { PropTypes } from 'react';
import Word from '../containers/Word';
import debounce from 'debounce';

class SearchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: undefined,
      remainHeight: undefined,
    };
    this.selectHeight = debounce(this.selectHeight.bind(this), 100);
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
    // 64 is height of nav bar
    // padding of options will affect the 35
    const height = Math.floor((window.innerHeight - 64) / 35).toString();
    const remainHeight = ((window.innerHeight - 64) % 35) -
    Math.floor((window.innerHeight - 64) / 35);
    this.setState({ height, remainHeight });
  }

  render() {
    const { list, isFetching, word, onSelect, deleteWord } = this.props;
    // if (list.length === 0) {
    //   return (
    //     <div className="dt w-100 border-box center">
    //       <div className="dtc w-20 fixed wall-bg br b--black-10">
    //         <select
    //           className="list pl0 ml0 mt0 justify-right w-100"
    //           size={this.state.height}
    //         >
    //           <option
    //             className="pr3 pv2 f6 f6-ns fw4 link
    //             bb b--black-10 tc"
    //           >単語は保存していません。
    //           </option>
    //         </select>
    //       </div>
    //       <div className="dtc w-80 border-box" />
    //     </div>
    //   );
    // }
    return (
      <div>
        <div className="dt w-100 border-box center">
          <div
            className="dtc w-30 w-20-ns fixed wall-bg br b--black-10"
          >
            {isFetching && <div className="flex justify-center items-center w-100">
              <div className="loader">
                <div className="line" />
                <div className="line" />
                <div className="line" />
                <div className="line" />
              </div>
            </div>}
            {!isFetching && list.length === 0 && <div>単語は保存していません。</div>}
            {!isFetching && list.length > 0 && <select
              className="list pl0 ml0 mt0 justify-right w-100"
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
              {list.map((term, i) => {
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
              })}
            </select>
          }
          </div>
          <div className="dtc w-80 border-box">
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
  isFetching: PropTypes.bool,
  word: PropTypes.objectOf(
    PropTypes.any,
  ),
  onSelect: PropTypes.func,
  deleteWord: PropTypes.func,
  fetchWords: PropTypes.func,
};

export default SearchHistory;

