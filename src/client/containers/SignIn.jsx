import { connect } from 'react-redux';
import { signIn } from '../actions/actions';
import SignIn from '../components/SignIn';

const mapDispatchToProps = dispatch => ({
  signIn: (info) => {
    dispatch(signIn(info));
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
