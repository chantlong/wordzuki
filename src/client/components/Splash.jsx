import React from 'react';
import bgWall from '../assets/images/home.jpg';

const bgimage = { backgroundImage: `url('${bgWall}')` };
const bgtrans = { backgroundColor: 'rgba(255,255,255,0.7)' };
const Splash = () => (
  <div className="flex ph3 ph5-ns tc wall-bg cover bg-center items-center" style={bgimage}>
    <h1 className="f3 lh-copy fw4 center pa3 shadow-1" style={bgtrans}>調べた単語を自動でリストに保存し、復習しやすくするツールです。</h1>
  </div>
);

export default Splash;
