import React from 'react';
// import NavBar from '../containers/NavBar';
import SideMenu from '../containers/SideMenu';

const App = ({ children }) => (
  <div className="avenir">
    <SideMenu />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
