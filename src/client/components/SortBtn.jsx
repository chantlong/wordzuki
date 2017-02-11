import React, { PropTypes } from 'react';
import sortIcon from '../assets/images/sort.png';

const SortBtn = ({ showFilterList, currentTag }) => (
  <div className="pa2 pl3 w-100 bb b--black-10">
    <a
      className="dib flex items-center dim w0 h0 mh2"
      onClick={() => showFilterList()}
    >
      <img src={sortIcon} alt="sort word by category" />
    </a>
    <p className="pa0 ma0 f6">{currentTag}</p>
  </div>
  );

SortBtn.propTypes = {
  showFilterList: PropTypes.func,
  currentTag: PropTypes.string,
};

export default SortBtn;
