import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import burger from '../assets/images/burger.png';
import closeIcon from '../assets/images/close.png';

class SideMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      slide: 'side-menu-shift w-100 w-auto-ns',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const { login, signOut } = this.props;
    return (
      <div className="fw5">
        { !this.state.show ? <a
          className="near-white link dim"
          onClick={this.toggleMenu}
        ><img src={burger} alt="burger" className="absolute right-0 top-0-ns bottom-0 bottom-auto-ns mr3-ns mt3-ns mb3 mr3 br2 fixed wz-icon" />
        </a> : null}
        <nav className={`z-1 absolute right-0 bg-near-white fr br1 br--left vh-100 flex flex-column side-menu ${this.state.show ? this.state.slide : ''}`}>
          <a
            className="link dim flex justify-center flex-none-ns justify-end-ns db pa2"
            onClick={this.toggleMenu}
          >
            <img src={closeIcon} alt="close" className="w1 h1 ph4 pt4 pb0" />
          </a>
          {!login.isAuth ? (
            <ul className="list ma0 ml2-ns pl0 pa4">
              <li className="db pa2 ml4-ns"><Link onClick={this.toggleMenu} to="/signin" className="link f6 dim underline-hover">ログイン</Link></li>
              <li className="db pa2 ml4-ns">
                <Link
                  to="/signup"
                  onClick={this.toggleMenu}
                  className="link f6 dim underline-hover"
                >新規登録
              </Link>
              </li>
            </ul>) :
          (<ul className="list ma0 mb3 ml2-ns pa4 flex flex-auto flex-column tr-ns tc">
            <li className="db pa2">
              <Link
                to="/searchhistory"
                onClick={this.toggleMenu}
                className="link f6 dim underline-hover"
              >
              単語リスト
              </Link>
            </li>
            <li className="db pa2">
              <Link
                to="/profile"
                onClick={this.toggleMenu}
                className="link f6 dim underline-hover"
              >
              プロファイル
              </Link>
            </li>
            <li className="db pa2">
              <Link
                to="/kindlevb"
                onClick={this.toggleMenu}
                className="link f6 dim underline-hover"
              >
              Kindle単語帳
              </Link>
            </li>
            <li className="flex-auto" />
            <li className="db pa2 f6 mid-gray" >{login.user}</li>
            <li className="db pa2">
              <a
                href="/api/auth/sign-out"
                onClick={() => signOut}
                className="link f6 dim underline-hover"
              >ログアウト
              </a>
            </li>
          </ul>)}
        </nav>
      </div>
    );
  }
}

SideMenu.propTypes = {
  login: PropTypes.objectOf(
    PropTypes.any,
  ),
  signOut: PropTypes.func,
};

export default SideMenu;
