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
  REQUEST_IMPORT_WORDS,
  SUCCESS_IMPORT_WORDS,
  FAIL_IMPORT_WORDS,
  UPDATE_WORD,
  UPDATE_WORD_LIST,
  TOGGLE_EDIT_MODAL,
  SEARCH_WORD,
  REFRESH_TO_DEFAULT,
  TOGGLE_COMPONENT,
  HIDE_FILTER_LIST,
  TOGGLE_FILTER_LIST,
  LOAD_FILTERED_LIST,
  RECEIVE_FILTERED_WORDS,
  SELECTED_TAGNAME,
} from '../constants/actionTypes';

const words = (state = {
  isFetching: false,
  list: [],
  fList: [],
  results: null,
}, action) => {
  switch (action.type) {
    case REQUEST_WORDS:
      return Object.assign({}, state, {
        list: state.list,
        isFetching: true,
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
        fList: state.fList.filter(word => (word._id !== action.id)),
        results: !state.results ? null : state.results.filter(word => (word._id !== action.id)),
      });
    case UPDATE_WORD_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        list: [action.payload, ...state.list.filter(word => (word._id !== action.payload._id))],
        fList: [action.payload, ...state.fList.filter(word => (word._id !== action.payload._id))],
        results: !state.results ? null : [action.payload, ...state.results.filter(word => (word._id !== action.payload._id))],
      });
    case SEARCH_WORD:
      return Object.assign({}, state, {
        isFetching: false,
        list: state.list,
        results: action.payload,
      });
    case RECEIVE_FILTERED_WORDS:
      return Object.assign({}, state, {
        fList: action.payload,
      });
    default:
      return state;
  }
};

const fetcher = (state = {
  inRequest: undefined,
  message: undefined,
}, action) => {
  switch (action.type) {
    case REQUEST_IMPORT_WORDS:
      return Object.assign({}, state, {
        inRequest: true,
        message: undefined,
      });
    case SUCCESS_IMPORT_WORDS:
      return Object.assign({}, state, {
        inRequest: false,
        message: action.message,
      });
    case REFRESH_TO_DEFAULT:
      return Object.assign({}, state, {
        inRequest: undefined,
        message: undefined,
      });
    case FAIL_IMPORT_WORDS:
      return Object.assign({}, state, {
        inRequest: undefined,
        message: action.message,
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
    case UPDATE_WORD:
      return action.payload || state;
    default:
      return state;
  }
};

const currentTag = (state = 'すべて', action) => {
  switch (action.type) {
    case SELECTED_TAGNAME:
      return action.payload;
    default:
      return state;
  }
};

const newWord = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_COMPONENT:
      return !state;
    default:
      return state;
  }
};

const filterList = (state = false, action) => {
  switch (action.type) {
    case HIDE_FILTER_LIST:
      return false;
    case TOGGLE_FILTER_LIST:
      return !state;
    default:
      return false;
  }
};

const filterCompleteList = (state = [], action) => {
  switch (action.type) {
    case LOAD_FILTERED_LIST:
      return action.payload;
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

const editModal = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_MODAL: {
      return !state;
    }
    default:
      return state;
  }
};

const routing = routerReducer;

const reducers = combineReducers({
  words,
  word,
  fetcher,
  errorHandle,
  newWord,
  filterList,
  currentTag,
  filterCompleteList,
  login,
  editModal,
  routing,
});

export default reducers;
