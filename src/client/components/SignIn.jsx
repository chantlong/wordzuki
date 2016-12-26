import React, { PropTypes } from 'react';

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
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
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
  signIn: PropTypes.func,
};

export default SignIn;
