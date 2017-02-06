import { connect } from 'react-redux';
import { saveNewWord, toggleAddWord, failedRequest } from '../actions/actions';
import CreateWord from '../components/CreateWord';

const mapStateToProps = ({ errorHandle }) => ({ errorHandle });

const mapDispatchToProps = dispatch => ({
  saveNewWord: (info) => {
    dispatch(saveNewWord(info));
  },
  errorMsg: (err) => {
    dispatch(failedRequest(err));
  },
  toggleAddWord: (bool) => {
    dispatch(toggleAddWord(bool));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWord);
