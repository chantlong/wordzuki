import { connect } from 'react-redux';
import { signUp, failedRequest } from '../actions/actions';
import SignUp from '../components/SignUp';

const mapStateToProps = ({ errorHandle }) => ({ errorHandle });
const mapDispatchToProps = dispatch => ({
  signUp: (info) => {
    dispatch(signUp(info));
  },
  errorMsg: (err) => {
    dispatch(failedRequest(err));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
