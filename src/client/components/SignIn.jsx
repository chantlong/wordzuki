import React, { PropTypes } from 'react';
import debounce from 'debounce';

import bgWall1 from '../assets/images/home1.jpg';
import bgWall2 from '../assets/images/home2.jpg';
import bgWall3 from '../assets/images/home3.jpg';
import logo from '../assets/images/wordzuki-logo128.png';

const bgWallSelection = [bgWall1, bgWall2, bgWall3];
const bgimage = { backgroundImage: `url('${bgWallSelection[Math.floor((Math.random() * 3))]}')` };

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
    const { errorHandle } = this.props;
    return (
      <div className="vh-100 cover bg-center" style={bgimage}>
        <div className="flex justify-center justify-start-ns">
          <a href="/" className="pa3 no-underline near-white dim db tracked f5 fw4 flex items-center justify-center justify-start-ns">
            <img src={logo} alt="wordzuki" className="db wz-icon mr2 mr3-ns" />
            <span className="db fw5">wordzuki</span></a>
        </div>
        <div>
          <form
            className="measure-narrow center br2 pa2 pb4 tc ma4 bg-near-white"
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
              { errorHandle.message ? <div className="f7 pt3 dark-red">{errorHandle.message}</div> : null }
            </div>
            <div className="mt3">
              <button
                className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer outline-0"
                type="submit"
              >ログイン</button>
            </div>
          </form>
        </div>
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
