/* global document */
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers/reducers';
import App from './components/App';
import SearchHistory from './containers/SearchHistory';
import SignIn from './containers/SignIn';
import ChromeSignIn from './containers/ChromeSignIn';
import Splash from './components/Splash';
import { verify } from './actions/actions';
import Auth from './services/Auth';
import './assets/styles/index.css';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)));

const history = syncHistoryWithStore(browserHistory, store);

const requireAuth = (nextState, replace, next) => {
  Auth.isAuth()
    .then((auth) => {
        console.log('that AUTH on load', auth);
      if (auth.isLoggedIn) {
        next();
      } else {
        replace('/signin');
        next();
      }
    });
};

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="/signin" component={SignIn} />

        <Route path="/searchhistory" component={SearchHistory} onEnter={requireAuth} />
      </Route>
      <Route path="/chrome-signin" component={ChromeSignIn} />
    </Router>
  </Provider>,
document.getElementById('app'));

store.dispatch(verify());
