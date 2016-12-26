import React, { PropTypes } from 'react';

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
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPassword(e) {
    const { errorMsg } = this.props;
    this.setState({ confirmPassword: e.target.value }, () => {
      if (this.state.password !== this.state.confirmPassword) {
        return errorMsg({ message: '両パスワードは一致しておりません。' });
      }
      return errorMsg({});
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
            { errorHandle.message ? <div className="f6 pt2 red underline">{errorHandle.message}</div> : null}
          </div>
          <div className="mt3">
            <button
              className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              type="submit"
            >ログイン</button>
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
