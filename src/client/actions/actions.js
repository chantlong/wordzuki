/* global fetch */
import fetch from 'isomorphic-fetch';
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
} from '../constants/actionTypes';

export const failedRequest = error => ({ type: ERR_FAILED_REQUEST, payload: error });

const requestWords = () => ({ type: REQUEST_WORDS });

const receiveWords = words => ({ type: RETRIEVE_WORDS, payload: words });

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
          if (words.length > 0) {
            dispatch(selectWord(words[0]));
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
      console.log('what user now', user);
      if (user && !!user.message) {
        dispatch(failedRequest(user));
      } else {
        dispatch(receiveLogin(user));
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
    .catch(err => console.log('errrrr', err));
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

export const deleteWord = id => (
  (dispatch) => {
    fetch('/api/word', {
      method: 'DELETE',
      headers: {
        'Access-Control-Request-Method': 'DELETE',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: `id=${id}`,
    })
    .then(res => console.log('what we got', res))
    .then(() => dispatch(receiveDeleteWords(id)))
    .then(() => dispatch(receiveDeleteWord()));
  }
);
