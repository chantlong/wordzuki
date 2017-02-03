import React from 'react';
// import NavBar from '../containers/NavBar';
import TestMenu from '../containers/TestMenu';

const App = ({ children }) => (
  <div className="avenir">
    <TestMenu />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
