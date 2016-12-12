import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import logo from '../assets/images/wordzuki-logo128.png';

const NavBar = ({ login, signOut }) => (
  <div>
    <nav className="dt w-100 border-box pa3 ph5-ns bg-near-white avenir">
      <a href="/" className="near-black dtc v-mid link dim w-50 dib tracked f5 fw4">
        <img src={logo} alt="wordzuki" className="dib w2 h2 v-mid mr2 mr3-ns" />
        <span className="dn dib-ns fw5">wordzuki</span></a>
      <div className="dtc v-mid w-50 tr">
        {!login.isAuth ? (
          <span>
            <Link to="/signin" className="near-black link dim f6 dib mr3 mr4-ns">ログイン</Link>
            <Link to="/signup" className="near-black link dim f6 dib mr3 mr4-ns">新規登録</Link>
          </span>) :
        (<a
          href="/api/auth/sign-out"
          onClick={() => signOut}
          className="near-black link dim f6 dib mr3 mr4-ns"
        >ログアウト</a>)}
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
