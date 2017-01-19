import React, { PropTypes } from 'react';
import debounce from 'debounce';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.validateEmail = debounce(this.validateEmail, 1000);
    this.validatePassword = debounce(this.validatePassword, 1000);
    this.validateSamePassword = debounce(this.validateSamePassword, 1000);
  }

  setState(args) {
    return new Promise(resolve => super.setState(args, resolve));
  }

  validateEmail() {
    const { errorMsg } = this.props;
    if (!/\S+@\S+\.\S+/.test(this.state.username)) {
      return errorMsg({ message: '不正なメールアドレスです' });
    }
    return errorMsg({});
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

  handleUsername(e) {
    this.setState({ username: e.target.value })
      .then(() => {
        this.validateEmail();
      });
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
    const { signUp } = this.props;
    return signUp(this.state);
  }

  render() {
    const { errorHandle } = this.props;
    return (
      <div className="pa4">
        <form
          className="measure-narrow center ba br2 b--black-50 pa2 pb4 tc ma4 bg-white"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <p className="center f4 fw5 pb3 bb w-75 b--light-silver">アカウントの作成</p>
          <div className="mt3">
            <input
              className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6"
              type="text"
              placeholder="メールアドレス"
              onChange={this.handleUsername}
            />
          </div>
          <div className="mt3">
            <input
              className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6"
              type="password"
              placeholder="パスワードを作成"
              onChange={this.handlePassword}
            />
          </div>
          <div className="mt3">
            <input
              className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6"
              type="password"
              placeholder="パスワードの再入力"
              onChange={this.handleConfirmPassword}
            />
            { errorHandle.message ? <div className="f7 pt3 dark-red">{errorHandle.message}</div> : null}
          </div>
          <div className="mt3">
            <button
              className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              type="submit"
            >アカウントを作成</button>
          </div>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  errorHandle: PropTypes.objectOf(
    PropTypes.any,
  ),
  signUp: PropTypes.func,
  errorMsg: PropTypes.func,
};

export default SignUp;
