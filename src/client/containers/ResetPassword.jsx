import { connect } from 'react-redux';
import { failedRequest, checkValidToken, resetPassword } from '../actions/actions';
import ResetPassword from '../components/ResetPassword';

const mapStateToProps = ({ errorHandle, legitToken, fetcher, successHandle }) => {
  const { inRequest } = fetcher;
  return {
    successHandle,
    errorHandle,
    legitToken,
    inRequest,
  };
};
const mapDispatchToProps = dispatch => ({
  errorMsg: err => dispatch(failedRequest(err)),
  checkValidToken: params => dispatch(checkValidToken(params)),
  resetPassword: (info, params) => dispatch(resetPassword(info, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
