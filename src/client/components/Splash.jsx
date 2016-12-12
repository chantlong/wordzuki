import React from 'react';
import bgWall from '../assets/images/home.jpg';

const bgimage = { backgroundImage: `url('${bgWall}')` };
const bgtrans = { background: 'rgba(255,255,255,0.7)' };
const Splash = () => (
  <div className="flex ph3 ph5-ns tc wall-bg cover bg-center bg-center-l items-center-ns" style={bgimage}>
    <h1 className="f3 lh-copy fw4 center pa3 shadow-1" style={bgtrans}>調べた単語を自動的にリストに保存し復習しやすいツールです。</h1>
  </div>
);

export default Splash;
