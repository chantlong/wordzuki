import React from 'react';
import bgWall1 from '../assets/images/home1.jpg';
import bgWall2 from '../assets/images/home2.jpg';
import bgWall3 from '../assets/images/home3.jpg';
import logo from '../assets/images/wordzuki-logo128.png';

const bgWallSelection = [bgWall1, bgWall2, bgWall3];
const bgimage = { backgroundImage: `url('${bgWallSelection[Math.floor((Math.random() * 3))]}')` };
const bgtrans = { backgroundColor: 'rgba(255,255,255,0.8)' };

const Splash = () => (
  <div className="vh-100 cover bg-center" style={bgimage}>
    <div className="flex justify-center justify-start-ns">
      <a href="/" className="pa3 no-underline near-white dim db tracked f5 fw4 flex items-center justify-center justify-start-ns">
        <img src={logo} alt="wordzuki" className="db wz-icon mr2 mr3-ns" />
        <span className="db fw4">wordzuki</span></a>
    </div>
    <div className="pa4 flex items-center wall-bg">
      <h1 className="f4 lh-copy-ns fw4 center br3 pa3 shadow-1" style={bgtrans}>調べた単語を自動でリストに保存し、復習しやすくするツールです。</h1>
    </div>
  </div>
);

export default Splash;
