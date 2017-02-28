import { connect } from 'react-redux';
import { failedRequest, checkValidToken } from '../actions/actions';
import ResetPassword from '../components/ResetPassword';

const mapStateToProps = ({ errorHandle, legitToken, fetcher }) => { 
  const { inRequest } = fetcher;
  return {
    errorHandle,
    legitToken,
    inRequest,
  };
};
const mapDispatchToProps = dispatch => ({
  errorMsg: (err) => {
    dispatch(failedRequest(err));
  },
  checkValidToken: (params) => {
    dispatch(checkValidToken(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
