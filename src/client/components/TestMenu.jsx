import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import burger from '../assets/images/burger.png';
import closeIcon from '../assets/images/close.png';

class TestMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      slide: 'testslideshift w-100 w4-5-ns',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const { login, signOut } = this.props;
    return (
      <div className="">
        { !this.state.show ? <a
          className="near-white link dim"
          onClick={this.toggleMenu}
        ><img src={burger} alt="burger" className="absolute right-0 top-0-ns bottom-0 bottom-auto-ns mr3-ns mt3-ns mb3 mr3 br2 fixed wz-icon" />
        </a> : null}
        <div className={`z-1 absolute right-0 bg-near-white fr vh-100 testslide ${this.state.show ? this.state.slide : ''}`}>
          <nav className="pa4 tr-ns tc">
            <a
              className="link dim flex justify-center flex-none-ns justify-end-ns pr2 pb4"
              onClick={this.toggleMenu}
            >
              <img src={closeIcon} alt="close" className="db w1 h1" />
            </a>
            <div>
              {!login.isAuth ? (
                <ul className="list">
                  <li className="db mt1 pa2"><Link onClick={this.toggleMenu} to="/signin" className="link f6-ns f5 dim">ログイン</Link></li>
                  <li className="db mt1 pa2"><Link to="/signup" className="link f6-ns f5 dim">新規登録</Link></li>
                </ul>) :
              (<ul className="list ml0 pl0">
                <div className="">
                  <li className="db mt3 pa2">
                    <Link
                      to="/searchhistory"
                      className="link f6-ns f5 dim"
                    >
                    単語リスト
                    </Link>
                  </li>
                  <li className="db mt1 pa2">
                    <Link
                      to="/profile"
                      className="link f6-ns f5 dim"
                    >
                    プロファイル
                    </Link>
                  </li>
                  <li className="db mt1 pa2">
                    <Link
                      to="/kindlevb"
                      className="link f6-ns f5 dim"
                    >
                    Kindle単語帳
                    </Link>
                  </li>
                </div>
                <div className="">
                  <li className="db mt1 pa2 f6-ns f5" >{login.user}</li>
                  <li className="db mt1 pa2">
                    <a
                      href="/api/auth/sign-out"
                      onClick={() => signOut}
                      className="link f6-ns f5 dim"
                    >ログアウト
                    </a>
                  </li>
                </div>
              </ul>)}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

TestMenu.propTypes = {
  login: PropTypes.objectOf(
    PropTypes.any,
  ),
  signOut: PropTypes.func,
};

export default TestMenu;
