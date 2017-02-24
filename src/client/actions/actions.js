/* global fetch */
import fetch from 'isomorphic-fetch';
import Fuse from 'fuse.js';
import { browserHistory } from 'react-router';
import Auth from '../services/Auth';

// import config from '../config';
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
  REFRESH_TO_DEFAULT,
  FAIL_IMPORT_WORDS,
  UPDATE_WORD,
  UPDATE_WORD_LIST,
  TOGGLE_EDIT_MODAL,
  SEARCH_WORD,
  TOGGLE_COMPONENT,
  HIDE_FILTER_LIST,
  TOGGLE_FILTER_LIST,
  LOAD_FILTERED_LIST,
  RECEIVE_FILTERED_WORDS,
  SELECTED_TAGNAME,
} from '../constants/actionTypes';

export const failedRequest = error => ({ type: ERR_FAILED_REQUEST, payload: error });

const requestWords = () => ({ type: REQUEST_WORDS });

const receiveFilteredWords = words => ({ type: RECEIVE_FILTERED_WORDS, payload: words });

export const receiveWords = words => ({ type: RETRIEVE_WORDS, payload: words });

const loadFilteredList = arr => ({ type: LOAD_FILTERED_LIST, payload: arr });

/* eslint-disable no-param-reassign */
export const filterWordsByTag = () =>
  // const words = list;
  ((dispatch, getState) => {
    const { words: { list } } = getState();
    const tagsList = {};
    list.reduce((accum, word) => {
      if (word.author) {
        const tag = word.author;
        if (!accum[tag]) {
          accum[tag] = 1;
        } else {
          accum[tag] += 1;
        }
      }
      if (word.tags && word.tags.length > 0) {
        word.tags.forEach((tag) => {
          if (!accum[tag]) {
            accum[tag] = 1;
          } else {
            accum[tag] += 1;
          }
        });
      }
      return accum;
    }, tagsList);
    const tagsArr = [['すべて', list.length]].concat(Object.entries(tagsList));
    dispatch(loadFilteredList(tagsArr));
  });

export const selectWord = word => ({ type: SELECT_WORD, payload: word });
export const fetchWords = () =>
    ((dispatch) => {
      dispatch(requestWords());
      fetch('/api/word', {
        credentials: 'same-origin',
      })
        .then(res => res.json())
        .then((words) => {
          dispatch(receiveWords(words));
          dispatch(receiveFilteredWords(words));
          if (words.length > 0) {
            dispatch(selectWord(words[0]));
            dispatch(filterWordsByTag());
          }
        })
        .catch(err => dispatch(failedRequest(err)));
    });

const receiveLogin = user => ({
  type: USER_LOGIN,
  user,
});

export const signIn = (info) => {
  const userInfo = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: `username=${info.username}&password=${info.password}`,
  };
  return (dispatch) => {
    fetch('/api/auth/sign-in', userInfo)
    .then(res => res.json())
    .then((user) => {
      if (user && !!user.message) {
        if (user.message === 'Missing credentials') {
          dispatch(failedRequest({ message: 'メアドあるいはパスワードが入力してない' }));
        } else {
          dispatch(failedRequest(user));
        }
      } else {
        dispatch(receiveLogin(user));
        browserHistory.push('/searchhistory');
      }
    });
  };
};

export const signUp = (info) => {
  const userInfo = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: `username=${info.username}&password=${info.password}`,
  };
  return (dispatch) => {
    fetch('/api/auth/sign-up', userInfo)
    .then(res => res.json())
    .then((user) => {
      if (user && !!user.message) {
        dispatch(failedRequest(user));
      } else {
        dispatch(receiveLogin(user));
        const mailInfo = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          credentials: 'include',
          body: `user=${user}`,
        };
        fetch('/api/mail/sign-up', mailInfo);
        browserHistory.push('/searchhistory');
      }
    });
  };
};

export const chromeSignIn = (info) => {
  const userInfo = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: `username=${info.username}&password=${info.password}`,
  };
  return (dispatch) => {
    fetch('/api/auth/sign-in', userInfo)
    .then(res => res.json())
    .then((user) => {
      if (user && !!user.message) {
        dispatch(failedRequest(user));
      } else {
        dispatch(receiveLogin(user));
      }
    })
    .catch(err => dispatch(failedRequest(err)));
  };
};

export const receiveLogout = () => ({ type: USER_LOGOUT });

export const verify = () =>
  (dispatch) => {
    Auth.isAuth()
      .then((res) => {
        if (!res.isLoggedIn) {
          return null;
        }
        return dispatch(receiveLogin(res.user));
      });
  };

const receiveDeleteWords = id => ({ type: DELETE_WORD_FROM_WORDS, id });
const receiveDeleteWord = () => ({ type: DELETE_WORD });

export const deleteWord = (id, index, list) => (
  (dispatch) => {
    fetch(`/api/word/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Request-Method': 'DELETE',
      },
      credentials: 'include',
    })
    .then(res => res.json())
    .then((res) => {
      if (res.message) {
        dispatch(receiveDeleteWords(id));
        dispatch(receiveDeleteWord());
        if (list.length > 1) {
          dispatch(selectWord(list[index + 1]));
        }
      }
    })
    .catch((err) => {
      dispatch(failedRequest(err));
    });
  }
);

const importLoading = () => ({ type: REQUEST_IMPORT_WORDS });
const importSuccess = success => ({ type: SUCCESS_IMPORT_WORDS, message: success });
const importRefreshDefault = () => ({ type: REFRESH_TO_DEFAULT });
const importFail = err => ({ type: FAIL_IMPORT_WORDS, message: err });

export const KVBImporter = info =>
  ((dispatch) => {
    dispatch(importLoading());
    fetch('/api/kvb/', {
      method: 'POST',
      body: info,
      credentials: 'include',
    })
    .then(res => (res.json()))
    .then((res) => {
      if (res.ERROR) {
        dispatch(importFail(res));
      } else {
        dispatch(importSuccess(res));
      }
    });
  });

export const KVBDone = () =>
  ((dispatch) => {
    setTimeout(() => {
      dispatch(importRefreshDefault());
      browserHistory.push('/searchhistory');
    }, 2500);
  });

const updateWord = word => ({ type: UPDATE_WORD, payload: word });
const updateList = word => ({ type: UPDATE_WORD_LIST, payload: word });

export const addDefinition = (id, ex = null, def, tags) =>
  ((dispatch) => {
    fetch(`/api/word/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ex, def, tags }),
    })
    .then(res => res.json())
    .then((word) => {
      dispatch(updateWord(word));
      dispatch(updateList(word));
      dispatch(filterWordsByTag());
    })
    .catch((err) => {
      dispatch(failedRequest(err));
    });
  });

export const toggleEditModal = () => ({ type: TOGGLE_EDIT_MODAL });

const searchExecute = search => ({ type: SEARCH_WORD, payload: search });

export const searchWord = (search, list) =>

  ((dispatch) => {
    console.log('that search', search);
    if (!search.length) {
      dispatch(receiveWords(list));
      return dispatch(searchExecute(null));
    }
    dispatch(requestWords());
    const options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        'word',
        'stem',
        'ex',
      ],
    };
    const fuse = new Fuse(list, options); // "list" is the item array
    const result = fuse.search(search);
    if (result.length > 0) {
      dispatch(selectWord(result[0]));
    }
    return dispatch(searchExecute(result));
  });

export const toggleAddWord = () => ({ type: TOGGLE_COMPONENT });

export const saveNewWord = info =>
  ((dispatch) => {
    fetch('/api/word/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(info),
    })
    .then(res => res.json())
    .then((data) => {
      const word = data.SUCCESS;
      dispatch(toggleAddWord(false));
      dispatch(updateList(word));
      dispatch(filterWordsByTag());
      dispatch(selectWord(word));
    })
    .catch((err) => {
      dispatch(failedRequest(err));
    });
  });

export const showFilterList = () => ({ type: TOGGLE_FILTER_LIST });

export const hideFilterList = () => ({ type: HIDE_FILTER_LIST });

export const selectedTagName = tagname => ({ type: SELECTED_TAGNAME, payload: tagname });

export const selectTag = (tagName, list) => {
  let filteredWords = [];
  if (tagName === 'すべて') {
    filteredWords = filteredWords.concat(list);
    return (dispatch) => {
      dispatch(selectedTagName(tagName));
      dispatch(hideFilterList);
      dispatch(receiveFilteredWords(filteredWords));
      if (filteredWords.length > 0) {
        dispatch(selectWord(filteredWords[0]));
      }
    };
  }
  list.forEach((word) => {
    if (word.author) {
      if (word.author === tagName) {
        filteredWords.push(word);
      }
    }
    if (word.tags && word.tags.length > 0) {
      if (word.tags.indexOf(tagName) > -1) {
        filteredWords.push(word);
      }
    }
  });
  return (dispatch) => {
    dispatch(selectedTagName(tagName));
    dispatch(hideFilterList);
    dispatch(receiveFilteredWords(filteredWords));
    if (filteredWords.length > 0) {
      dispatch(selectWord(filteredWords[0]));
    }
  };
};

