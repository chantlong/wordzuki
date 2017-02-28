import React, { Component, PropTypes } from 'react';
import debounce from 'debounce';

import logo from '../assets/images/wordzuki-logo128.png';
import Preloader from './Preloader';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirmPassword: '',
    };
    this.setState = this.setState.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatePassword = debounce(this.validatePassword, 1000);
    this.validateSamePassword = debounce(this.validateSamePassword, 1000);
  }

  componentWillMount() {
    const { checkValidToken } = this.props;
    const params = window.location.pathname.split('/')[2];
    checkValidToken(params);
  }

  setState(args) {
    return new Promise(resolve => super.setState(args, resolve));
  }

  validatePassword() {
    const { errorMsg } = this.props;
    if (this.state.password.length < 6) {
      return errorMsg({ message: '6文字以上のパスワードを設定してください' });
    }
    return errorMsg({});
  }

  validateSamePassword() {
    const { errorMsg } = this.props;
    if (this.state.password !== this.state.confirmPassword) {
      return errorMsg({ message: 'パスワードが一致しません' });
    }
    return errorMsg({});
  }

  handlePassword(e) {
    this.setState({ password: e.target.value })
      .then(() => {
        this.validatePassword();
      });
  }

  handleConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value })
      .then(() => {
        this.validateSamePassword();
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resetPassword, legitToken } = this.props;
    const userInfo = {
      username: legitToken.username,
      password: this.state.confirmPassword,
    };
    const params = window.location.pathname.split('/')[2];
    resetPassword(userInfo, params);
  }

  render() {
    const { errorHandle, legitToken, inRequest, successHandle } = this.props;
    return (
      <div>
        <div className="flex justify-center justify-start-ns">
          <a href="/" className="pa3 no-underline near-white dim db tracked f5 fw4 flex items-center justify-center justify-start-ns">
            <img src={logo} alt="wordzuki" className="db wz-icon mr2 mr3-ns" />
            <span className="db fw5">wordzuki</span></a>
        </div>
        <div>
          { inRequest && <Preloader /> }
          {!legitToken.status && <div>{errorHandle.message ? errorHandle.message : null}</div>}
          {legitToken.status && <form
            className="measure-narrow center br2 pa2 pb4 tc ma4 bg-near-white"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <p className="center pa3 ma3 f4 fw5 bb w-75 b--light-silver">新規パスワードを入力</p>
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6 outline-0"
                type="password"
                placeholder="パスワードを作成"
                onChange={this.handlePassword}
              />
            </div>
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6 outline-0"
                type="password"
                placeholder="パスワードの再入力"
                onChange={this.handleConfirmPassword}
              />
              { errorHandle.message ? <div className="f7 pt3 dark-red">{ errorHandle.message }</div> : null}
            </div>
            <div className="mt3">
              <button
                className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer outline-0"
                type="submit"
              >確認</button>
            </div>
            { successHandle.message ? <div className="f7 pt3 green">{successHandle.message}</div> : null}
          </form>}
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  checkValidToken: PropTypes.func,
  resetPassword: PropTypes.func,
  errorHandle: PropTypes.objectOf(
    PropTypes.any,
  ),
  // successHandle: PropTypes.objectOf(
  //   PropTypes.any,
  // ),
  errorMsg: PropTypes.func,
  legitToken: PropTypes.objectOf(
    PropTypes.any,
  ),
  inRequest: PropTypes.bool,
};

export default ResetPassword;
