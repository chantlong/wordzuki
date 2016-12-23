import { connect } from 'react-redux';
import { chromeSignIn } from '../actions/actions';
import ChromeSignIn from '../components/ChromeSignIn';

const mapStateToProps = ({ login }) => ({ login });
const mapDispatchToProps = dispatch => ({
  chromeSignIn: (info) => {
    dispatch(chromeSignIn(info));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChromeSignIn);
