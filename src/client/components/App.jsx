import React from 'react';
// import NavBar from './NavBar.jsx';

const App = ({ children }) => (
  <div>
    <h1>ワードZUKI</h1>
    <p>調べた単語を自動的にリストに保存し復習しやすくするツールです。</p>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
