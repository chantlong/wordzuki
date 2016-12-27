import React, { PropTypes } from 'react';
import debounce from 'debounce';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.validateEmail = debounce(this.validateEmail, 1000);
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

  handleUsername(e) {
    this.setState({ username: e.target.value })
      .then(() => {
        this.validateEmail();
      });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signIn } = this.props;
    signIn(this.state);
  }

  render() {
    console.log('this', this);
    const { errorHandle } = this.props;
    return (
      <div className="pa4">
        <form
          className="measure-narrow center ba br2 b--black-50 pa2 pb4 tc ma4 bg-white"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <p className="center f4 fw5 pb3 bb w-75 b--light-silver">ログイン</p>
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
              placeholder="パスワード"
              onChange={this.handlePassword}
            />
          { errorHandle.message ? <div className="f7 pt3 dark-red">{errorHandle.message}</div> : null}
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

SignIn.propTypes = {
  errorHandle: PropTypes.objectOf(
    PropTypes.any,
  ),
  signIn: PropTypes.func,
  errorMsg: PropTypes.func,
};

export default SignIn;
