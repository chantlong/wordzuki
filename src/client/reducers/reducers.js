import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {
  REQUEST_WORDS,
  RETRIEVE_WORDS,
  SELECT_WORD,
  DELETE_WORD_FROM_WORDS,
  DELETE_WORD,
  ERR_FAILED_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants/actionTypes';

const words = (state = {
  isFetching: false,
  list: [],
}, action) => {
  switch (action.type) {
    case REQUEST_WORDS:
      return Object.assign({}, state, {
        isFetching: true,
        list: [],
      });
    case RETRIEVE_WORDS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload,
      });
    case DELETE_WORD_FROM_WORDS:
      return Object.assign({}, state, {
        isFetching: false,
        list: state.list.filter(word => (word._id !== action.id)),
      });
    default:
      return state;
  }
};

const word = (state = null, action) => {
  switch (action.type) {
    case SELECT_WORD:
      return action.payload || state;
    case DELETE_WORD:
      return null;
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

const login = (state = { isAuth: false, user: null }, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return Object.assign({}, state, {
        isAuth: true,
        user: action.user,
      });
    }
    case USER_LOGOUT: {
      return Object.assign({}, state, {
        isAuth: false,
        user: null,
      });
    }
    default:
      return state;
  }
};

const routing = routerReducer;

const reducers = combineReducers({
  words,
  word,
  errorHandle,
  login,
  routing,
});

export default reducers;
