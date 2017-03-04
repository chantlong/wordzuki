import React, { Component, PropTypes } from 'react';
import debounce from 'debounce';

import logo from '../assets/images/wordzuki-logo128.png';
import Preloader from './Preloader';

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
    this.setState = this.setState.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.validateEmail = debounce(this.validateEmail, 200);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setState(args) {
    return new Promise(resolve => super.setState(args, resolve));
  }

  handleUsername(e) {
    this.setState({ username: e.target.value })
      .then(() => {
        this.validateEmail();
      });
  }

  validateEmail() {
    const { errorMsg } = this.props;
    if (!/\S+@\S+\.\S+/.test(this.state.username)) {
      return errorMsg({ message: '不正なメールアドレスです' });
    }
    return errorMsg({});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { checkForgetEmail } = this.props;
    checkForgetEmail(this.state);
  }
  render() {
    const { errorHandle, successHandle, inRequest } = this.props;
    return (
      <div className="">
        <div className="flex justify-center justify-start-ns">
          <a href="/" className="pa3 no-underline mid-gray dim db tracked f5 fw4 flex items-center justify-center justify-start-ns">
            <img src={logo} alt="wordzuki" className="db wz-icon mr2 mr3-ns" />
            <span className="db fw5">wordzuki</span></a>
        </div>
        <div>
          {!successHandle.message && <form
            className="measure-narrow center br2 bg-near-white pa2 pb4 tc ma4"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <p className="center f4 fw5 pv3 mv3 bb w-75 b--light-silver">パスワード忘れた？</p>
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6 outline-0"
                type="email"
                placeholder="メールアドレス"
                onChange={this.handleUsername}
              />
            </div>
            { !!inRequest && <Preloader /> }
            { errorHandle.message ? <div className="f7 pt3 dark-red">{errorHandle.message}</div> : null}
            <div className="mt3">
              <button
                className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer outline-0"
                type="submit"
              >リマインド</button>
            </div>
          </form>}
          { successHandle.message ? <div className="measure center br2 bg-near-white lh2 ph4 pv3 tc f7 blue">
            {successHandle.message}
          </div>
          : null}
        </div>
      </div>
    );
  }
}

ForgetPassword.propTypes = {
  checkForgetEmail: PropTypes.func,
  errorHandle: PropTypes.objectOf(
    PropTypes.any,
  ),
  successHandle: PropTypes.objectOf(
    PropTypes.any,
  ),
  errorMsg: PropTypes.func,
  inRequest: PropTypes.bool,
};

export default ForgetPassword;
