import { connect } from 'react-redux';
import { signIn, failedRequest } from '../actions/actions';
import SignIn from '../components/SignIn';

const mapStateToProps = ({ login, errorHandle }) => ({ login, errorHandle });
const mapDispatchToProps = dispatch => ({
  signIn: (info) => {
    dispatch(signIn(info));
  },
  errorMsg: (err) => {
    dispatch(failedRequest(err));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
