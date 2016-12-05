import React from 'react';
import NavBar from './NavBar';

const App = ({ children }) => (
  <div className="avenir">
    <NavBar />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
