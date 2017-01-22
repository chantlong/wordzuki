import { connect } from 'react-redux';
import { filterByDate } from '../actions/actions';
import Visualizer from '../components/Visualizer';

// const mapStateToProps = ({ words, word }) => ({ words, word });
const mapStateToProps = ({ words }) => {
  const { list } = words;
  return {
    list,
  };
};

const mapDispatchToProps = dispatch => ({
  filterByDate: () => {
    dispatch(filterByDate());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
