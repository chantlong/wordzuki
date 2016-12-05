import React from 'react';
import logo from '../assets/images/wordzuki-logo128.png';

const NavBar = () => (
  <div>
    <nav className="dt w-100 border-box pa3 ph5-ns bg-near-white avenir">
      <a href="/" className="near-black dtc v-mid link dim w-50 dib tracked-mega f5 fw4">
        <img src={logo} alt="wordzuki" className="dib w2 h2 v-mid mr2 mr3-ns" />
        <span className="dn dib-ns">wordzuki</span></a>
      <div className="dtc v-mid w-50 tr">
        <a href="/signin" className="near-black link dim f6 dib mr3 mr4-ns">ログイン</a>
        <a href="/signup" className="near-black link dim f6 dib mr3 mr4-ns">登録</a>
      </div>
    </nav>
  </div>
);

export default NavBar;
