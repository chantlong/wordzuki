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
    this.setState({ confirmPassword: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const { signIn } = this.props;
    // signIn(this.state);
  }

  render() {
    return (
      <div className="pa4">
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
}

SignIn.propTypes = {
  signIn: PropTypes.func,
};

export default SignIn;
