import React, { PropTypes } from 'react';
import debounce from 'debounce';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      original: undefined,
      loaded: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = debounce(this.handleSearch, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.loaded) {
      this.setState({ original: nextProps.list, loaded: true });
    }
  }

  handleSearch(search) {
    const { searchWord, list } = this.props;
    const original = this.state.original;
    searchWord(search, list, original);
  }

  handleInput(e) {
    this.setState({ searchInput: e.target.value }, () => {
      this.handleSearch(this.state.searchInput);
    });
  }

  render() {
    return (
      <div className="pa2 bb b--black-10">
        <input
          id="s-icon"
          className="search-icon-input tr collapse pt2 pr3 pb1 ba br4 b--black-10 f6 w-100 outline-0"
          type="text"
          placeholder="検索"
          onKeyUp={this.handleInput}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object,
  ),
  searchWord: PropTypes.func,
  receiveWords: PropTypes.func,
};

export default SearchBar;
