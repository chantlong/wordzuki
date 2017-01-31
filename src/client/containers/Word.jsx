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
  deleteWord: (id) => {
    dispatch(deleteWord(id));
  },
  addDefinition: (id, ex, def) => {
    dispatch(addDefinition(id, ex, def));
  },
  toggleEditModal: () => {
    dispatch(toggleEditModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Word);
