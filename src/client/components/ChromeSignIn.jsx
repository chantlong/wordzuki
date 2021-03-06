import React, { PropTypes } from 'react';
import logo from '../assets/images/wordzuki-logo128.png';

class ChromeSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { chromeSignIn } = this.props;
    chromeSignIn(this.state);
  }

  render() {
    const { login } = this.props;
    if (login.isAuth) {
      setTimeout(() => { window.close(); }, 1500);
    }
    if (!login.isAuth) {
      return (
        <div className="avenir pa3 tc vh-100">
          <a href="/" className="near-black v-mid link dim tracked f5 fw4">
            <img src={logo} alt="wordzuki" className="w2 h2 v-mid mr1 mr2-ns" />
            <span className="dn dib-ns fw5">wordzuki</span>
          </a>
          <form
            className="measure-narrow center ba br2 b--black-50 bg-near-white pa2 pb4 tc ma4"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <p className="center f4 fw5 pa3 ma3 bb w-75 b--light-silver">ログイン</p>
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6 outline-0"
                type="email"
                placeholder="メールアドレス"
                onChange={this.handleUsername}
              />
            </div>
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6 outline-0"
                type="password"
                placeholder="パスワード"
                onChange={this.handlePassword}
              />
            </div>
            <div className="mt3">
              <button
                className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer outline-0"
                type="submit"
              >ログイン</button>
              <div className="w-75 db center mv3 flex justify-between">
                <span className="w-100 bb b--light-silver mb2" />
                <span className="f6 dib mt1 ph2 w-50">または</span>
                <span className="w-100 bb b--light-silver mb2" />
              </div>
              <a
                className="fw-4 f6 db link dim black-60 underline"
                href="/signup"
              >
                新規登録
              </a>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="avenir pa3 bg-near-white tc vh-100">
        <a href="/" className="near-black v-mid link dim tracked f5 fw4">
          <img src={logo} alt="wordzuki" className="w2 h2 v-mid mr1 mr2-ns" />
          <span className="dn dib-ns fw5">wordzuki</span>
        </a>
        <div className="measure-narrow center ba br2 b--black-50 pa2 pa2 tc ma4 bg-white">
          <p className="tc">ログインできました</p>
        </div>
      </div>
    );
  }
}

ChromeSignIn.propTypes = {
  login: PropTypes.objectOf(
    PropTypes.any,
  ),
  chromeSignIn: PropTypes.func,
};

export default ChromeSignIn;
