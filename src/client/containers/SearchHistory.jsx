import { connect } from 'react-redux';
import { selectWord, fetchWords } from '../actions/actions';
import SearchHistory from '../components/SearchHistory';

const mapStateToProps = ({ words, word }) => ({ words, word });
const mapDispatchToProps = dispatch => ({
  onSelect: (word) => {
    dispatch(selectWord(word));
  },
  fetchWords: () => {
    dispatch(fetchWords());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
