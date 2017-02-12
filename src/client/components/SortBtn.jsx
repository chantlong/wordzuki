import React, { PropTypes } from 'react';
import sortIcon from '../assets/images/sort.png';

const SortBtn = ({ showFilterList, currentTag }) => (
  <div className="ph2 pv2 w-100 bb b--black-10 flex items-center">
    <a
      className="flex items-center dim pointer w-100"
      onClick={() => showFilterList()}
    >
      <p className="pl1 dib pa0 ma0 f7 truncate w-100 tc">{currentTag}</p>
      <img className="dib w1 h1 ph2" src={sortIcon} alt="sort word by category" />
    </a>
  </div>
  );

SortBtn.propTypes = {
  showFilterList: PropTypes.func,
  currentTag: PropTypes.string,
};

export default SortBtn;
