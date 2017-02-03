import { connect } from 'react-redux';
import { receiveLogout } from '../actions/actions';
import TestMenu from '../components/TestMenu';

const mapStateToProps = ({ login }) => ({ login });
const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(receiveLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestMenu);
