import { connect } from 'react-redux';
import { selectWord, deleteWord, fetchWords, selectTag } from '../actions/actions';
import SearchHistory from '../components/SearchHistory';

// const mapStateToProps = ({ words, word }) => ({ words, word });
const mapStateToProps = ({ words, word, newWord, filterList, filterCompleteList }) => {
  const { list, isFetching, results, fList } = words;
  return {
    word,
    list,
    fList,
    isFetching,
    results,
    newWord,
    filterList,
    filterCompleteList,
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
  selectTag: (tagName, list) => {
    dispatch(selectTag(tagName, list));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistory);
