import { connect } from 'react-redux';
import { receiveLogout } from '../actions/actions';
import NavBar from '../components/NavBar';

const mapStateToProps = ({ login }) => ({ login });
const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(receiveLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
