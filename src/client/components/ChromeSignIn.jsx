import React, { PropTypes } from 'react';

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
    this.closeTab = this.closeTab.bind(this);
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

  closeTab() {
    setTimeout(() => { window.close(); }, 2000)
  }

  render() {
    const { login } = this.props;
    if (!login.isAuth) {
      return (
        <div className="avenir pa4">
          <form
            className="measure-narrow center tc"
            onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba hover-bg-dark-gray hover-white w-75 f6"
                type="text"
                placeholder="メールアドレス"
                onChange={this.handleUsername}
              />
            </div>
            <div className="mt3">
              <input
                className="ph2 pt2 pb1 input-reset ba hover-bg-dark-gray hover-white w-75 f6"
                type="password"
                placeholder="パスワード"
                onChange={this.handlePassword}
              />
            </div>
            <div className="mt3">
              <button
                className="ph2 pt2 pb1 fw6 ba b--black bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
                type="submit"
              >ログイン</button>
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="avenir">
        <p className="tc">Login successfull</p>
        {this.closeTab()}
      </div>);
  }
}

ChromeSignIn.propTypes = {
  login: PropTypes.objectOf(
    PropTypes.any,
  ),
  chromeSignIn: PropTypes.func,
};

export default ChromeSignIn;
