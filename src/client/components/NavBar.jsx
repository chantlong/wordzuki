import React from 'react';
import { Link } from 'react-router';
import logo from '../assets/images/wordzuki-logo128.png';

const NavBar = () => (
  <div>
    <nav className="dt w-100 border-box pa3 ph5-ns bg-near-white avenir">
      <a href="/" className="near-black dtc v-mid link dim w-50 dib tracked f5 fw4">
        <img src={logo} alt="wordzuki" className="dib w2 h2 v-mid mr2 mr3-ns" />
        <span className="dn dib-ns fw5">wordzuki</span></a>
      <div className="dtc v-mid w-50 tr">
        <Link to="/signin" className="near-black link dim f6 dib mr3 mr4-ns">ログイン</Link>
        <a href="/signup" className="near-black link dim f6 dib mr3 mr4-ns">登録</a>
        <a href="/api/auth/sign-out" className="near-black link dim f6 dib mr3 mr4-ns">ログアウト</a>
      </div>
    </nav>
  </div>
);

export default NavBar;
