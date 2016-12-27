import { connect } from 'react-redux';
import { deleteWord } from '../actions/actions';
import Word from '../components/Word';

const mapStateToProps = ({ words }) => {
  const { list, isFetching } = words;
  return {
    list,
    isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteWord: (id) => {
    dispatch(deleteWord(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Word);
