/* global document */
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers/reducers';
import App from './components/App';
import SearchHistory from './containers/SearchHistory';
import fetchWords from './actions/actions';
import './assets/styles/main.scss';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)));

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SearchHistory} />
      </Route>
    </Router>
  </Provider>,
document.getElementById('app'));

store.dispatch(fetchWords());
