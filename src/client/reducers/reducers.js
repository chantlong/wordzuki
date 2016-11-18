import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  RETRIEVE_WORDS,
  ERR_FAILED_REQUEST,
} from '../constants/actionTypes';

const words = (state = [], action) => {
  switch (action.type) {
    case RETRIEVE_WORDS:
      return action.payload || state;
    default:
      return state;
  }
};

const errorHandle = (state, action) => {
  switch (action.type) {
    case ERR_FAILED_REQUEST: {
      return action.payload || state;
    }
    default:
      return state || {};
  }
};

const routing = routerReducer;

const reducers = combineReducers({
  words,
  errorHandle,
  routing,
});

export default reducers;
