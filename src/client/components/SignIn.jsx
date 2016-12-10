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
    const { login } = this.props;
    login(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input type="text" placeholder="email" onChange={this.handleUsername} />
          <input type="password" placeholder="password" onChange={this.handlePassword} />
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func,
};

export default SignIn;
