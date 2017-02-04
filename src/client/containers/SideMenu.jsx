import { connect } from 'react-redux';
import { receiveLogout } from '../actions/actions';
import SideMenu from '../components/SideMenu';

const mapStateToProps = ({ login }) => ({ login });
const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(receiveLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
