import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import logo from '../assets/images/wordzuki-logo128.png';

const NavBar = ({ login, signOut }) => (
  <div>
    <nav className="w-100 flex items-center justify-between border-box ph5-ns bg-near-white avenir mid-gray">
      <a href="/" className="link dim dib tracked f5 fw4 flex items-center">
        <img src={logo} alt="wordzuki" className="dib wz-icon mr2 mr3-ns" />
        <span className="dn dib-ns fw5">wordzuki</span></a>
      <div className="tr">
        {!login.isAuth ? (
          <ul className="list">
            <li className="dib"><Link to="/signin" className="link dim f6 dib mr3 mr4-ns">ログイン</Link></li>
            <li className="dib"><Link to="/signup" className="link dim f6 dib mr3 mr4-ns">新規登録</Link></li>
          </ul>) :
        (<ul className="list">
          <li className="dropdown f6">
            {login.user}
            <ul className="dropdown-content tl pa2 list br2">
              <li className="db mt3 pa2 bb b--black-10">
                <Link
                  to="/searchhistory"
                  className="link f7 dim"
                >
                単語リスト
                </Link>
              </li>
              <li className="db mt1 pa2 bb b--black-10">
                <Link
                  to="/kindlevb"
                  className="link f7 dim"
                >
                Kindle単語帳
                </Link>
              </li>
              <li className="db mt1 pa2">
                <a
                  href="/api/auth/sign-out"
                  onClick={() => signOut}
                  className="link f7 dim"
                >ログアウト
                </a>
              </li>
            </ul>
          </li>
        </ul>)}
      </div>
    </nav>
  </div>
);

NavBar.propTypes = {
  login: PropTypes.objectOf(
    PropTypes.any,
  ),
  signOut: PropTypes.func,
};

export default NavBar;
