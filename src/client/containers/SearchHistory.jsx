import { connect } from 'react-redux';
import { selectWord, deleteWord, fetchWords } from '../actions/actions';
import SearchHistory from '../components/SearchHistory';

// const mapStateToProps = ({ words, word }) => ({ words, word });
const mapStateToProps = ({ words, word, newWord }) => {
  const { list, isFetching, results } = words;
  return {
    word,
    list,
    isFetching,
    results,
    newWord,
  };
};
const mapDispatchToProps = dispatch => ({
  onSelect: (word) => {
    dispatch(selectWord(word));
  },
  fetchWords: () => {
    dispatch(fetchWords());
  },
  deleteWord: (id) => {
    dispatch(deleteWord(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
