import { connect } from 'react-redux';
import Visualizer from '../components/Visualizer';

// const mapStateToProps = ({ words, word }) => ({ words, word });
const mapStateToProps = ({ words }) => {
  const { list } = words;
  return {
    list,
  };
};

export default connect(mapStateToProps, null)(Visualizer);
