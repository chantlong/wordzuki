import { connect } from 'react-redux';
import { selectWord } from '../actions/actions';
import SearchHistory from '../components/SearchHistory';

const mapStateToProps = ({ words, word }) => ({ words, word });
const mapDispatchToProps = dispatch => ({
  onSelect: (word) => {
    dispatch(selectWord(word));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
