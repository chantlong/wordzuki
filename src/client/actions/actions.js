/* global fetch */
import { browserHistory } from 'react-router';
import Auth from '../services/Auth';
import config from '../config';
import {
  RETRIEVE_WORDS,
  SELECT_WORD,
  ERR_FAILED_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants/actionTypes';

const url = `${config.url}`;

const failedRequest = error => ({ type: ERR_FAILED_REQUEST, payload: error });

const receiveWords = words => ({ type: RETRIEVE_WORDS, payload: words });

export const selectWord = word => ({ type: SELECT_WORD, payload: word });
export const fetchWords = () => (
  dispatch => (
    fetch(`${url}/api/word`)
      .then(res => res.json())
      .then(words => dispatch(receiveWords(words)))
      .catch(err => dispatch(failedRequest(err)))
  ));

const receiveLogin = user => ({
  type: USER_LOGIN,
  isAuth: true,
  user,
});

export const signIn = (info) => {
  const userInfo = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: `username=${info.username}&password=${info.password}`,
  };
  console.log('the info', info);
  return (dispatch) => {
    fetch('/api/auth/sign-in', userInfo)
    .then(res => res.json())
    .then(res => console.log(res))
    .then(user => dispatch(receiveLogin(user)))
    .then(() => browserHistory.push('/searchhistory'))
    .catch(err => dispatch(failedRequest(err)));
  };
};

export const signOut = () => ({ type: USER_LOGOUT });

export const verify = () =>
  (dispatch) => {
    Auth.isAuth()
      .then(({ user }) => dispatch(receiveLogin(user)))
      .catch(err => dispatch(failedRequest(err)));
  };
