import React, { PropTypes } from 'react';
import sortIcon from '../assets/images/sort.png';

const SortBtn = ({ showFilterList }) => (
  <div className="dib pa2 pl3 w-100 bb b--black-10">
    <a
      className="flex items-center dim w0 h0"
      onClick={() => showFilterList()}
    >
      <img src={sortIcon} alt="sort word by category" />
    </a>
  </div>
  );

SortBtn.propTypes = {
  showFilterList: PropTypes.func,
};

export default SortBtn;
