import { connect } from 'react-redux';
import { toggleAddWord } from '../actions/actions';
import AddWordBtn from '../components/AddWordBtn';

// const mapStateToProps = ({ newWord }) => ({ newWord });
const mapDispatchToProps = dispatch => ({
  toggleAddWord: (bool) => {
    dispatch(toggleAddWord(bool));
  },
});

export default connect(null, mapDispatchToProps)(AddWordBtn);
