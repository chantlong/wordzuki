import { connect } from 'react-redux';
import { checkForgetEmail, failedRequest, successRequest } from '../actions/actions';
import ForgetPassword from '../components/ForgetPassword';

const mapStateToProps = ({ errorHandle, successHandle, fetcher }) => {
  const { inRequest } = fetcher;
  return { errorHandle, successHandle, inRequest };
};
const mapDispatchToProps = dispatch => ({
  checkForgetEmail: (err) => {
    dispatch(checkForgetEmail(err));
  },
  errorMsg: (err) => {
    dispatch(failedRequest(err));
  },
  successMsg: (success) => {
    dispatch(successRequest(success));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
