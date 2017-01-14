import { connect } from 'react-redux';
import { receiveWords, selectWord, searchWord } from '../actions/actions';
import Search from '../components/Search';

const mapStateToProps = ({ words }) => {
  const { list } = words;
  return { list };
};
const mapDispatchToProps = dispatch => ({
  receiveWords: (words) => {
    dispatch(receiveWords(words));
  },
  searchWord: (search, words, original) => {
    dispatch(searchWord(search, words, original));
  },
  onSelect: (word) => {
    dispatch(selectWord(word));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
