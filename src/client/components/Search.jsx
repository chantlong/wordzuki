import React, { PropTypes } from 'react';
import debounce from 'debounce';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = debounce(this.handleSearch, 300);
  }

  handleSearch(search) {
    const { searchWord, list } = this.props;
    searchWord(search, list);
  }

  handleInput(e) {
    this.setState({ searchInput: e.target.value }, () => {
      this.handleSearch(this.state.searchInput);
    });
  }

  render() {
    return (
      <div className="dib pa2 flex flex-auto">
        <input
          id="s-icon"
          className="search-icon-input tr collapse pt2 pr3 pb1 ba br4 b--black-10 f6 w-100 outline-0 bg-transparent grow hover-bg-dark-gray hover-white"
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
};

export default SearchBar;
