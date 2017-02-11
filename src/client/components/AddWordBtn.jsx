import React, { PropTypes } from 'react';
import addIcon from '../assets/images/addw.png';

const AddWordBtn = ({ toggleAddWord }) => (
  <div className="dib pl2 pr3">
    <a className="flex items-center dim w1 h1" onClick={() => toggleAddWord()}>
      <img src={addIcon} alt="add word" />
    </a>
  </div>
  );

AddWordBtn.propTypes = {
  toggleAddWord: PropTypes.func,
};

export default AddWordBtn;
