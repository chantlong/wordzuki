import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import logo from '../assets/images/wordzuki-logo128.png';

const NavBar = ({ login, signOut }) => (
  <div>
    <nav className=" w-100 flex items-center justify-between border-box pa3 ph5-ns bg-near-white avenir">
      <a href="/" className="near-black link dim dib tracked f5 fw4 flex items-center">
        <img src={logo} alt="wordzuki" className="dib w2 h2 mr2 mr3-ns" />
        <span className="dn dib-ns fw5">wordzuki</span></a>
      <div className="tr">
        {!login.isAuth ? (
          <span>
            <Link to="/signin" className="near-black link dim f6 dib mr3 mr4-ns">ログイン</Link>
            <Link to="/signup" className="near-black link dim f6 dib mr3 mr4-ns">新規登録</Link>
          </span>) :
        (<span>
          <Link to="/searchhistory" className="near-black link dim f6 dib mr3 mr4-ns">単語リスト</Link>
          <a
            href="/api/auth/sign-out"
            onClick={() => signOut}
            className="near-black link dim f6 dib mr3 mr4-ns"
          >ログアウト</a>
        </span>)}
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
