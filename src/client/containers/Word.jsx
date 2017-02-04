import { connect } from 'react-redux';
import { deleteWord, addDefinition, toggleEditModal } from '../actions/actions';
import Word from '../components/Word';

const mapStateToProps = ({ words, word }) => {
  const { list, isFetching } = words;
  return {
    word,
    list,
    isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteWord: (id, index, list) => {
    dispatch(deleteWord(id, index, list));
  },
  addDefinition: (id, ex, def) => {
    dispatch(addDefinition(id, ex, def));
  },
  toggleEditModal: () => {
    dispatch(toggleEditModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Word);
