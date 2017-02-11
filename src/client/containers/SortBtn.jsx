import { connect } from 'react-redux';
import { showFilterList } from '../actions/actions';
import SortBtn from '../components/SortBtn';

const mapStateToProps = ({ currentTag }) => ({ currentTag });

const mapDispatchToProps = dispatch => ({
  showFilterList: () => dispatch(showFilterList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortBtn);
