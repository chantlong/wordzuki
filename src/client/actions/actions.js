/* global fetch */
import config from '../config';
import {
  RETRIEVE_WORDS,
  ERR_FAILED_REQUEST,
} from '../constants/actionTypes';

const url = `${config.url}`;
console.log('that url =======', url);
console.log('that process node env >>>>>>>>>', process.env.NODE_ENV);
console.log(process.env.PROTOCOL, process.env.HOST, process.env.PORT);

const failedRequest = error => ({ type: ERR_FAILED_REQUEST, payload: error });

const receiveWords = words => ({ type: RETRIEVE_WORDS, payload: words });

const fetchWords = () => (
  dispatch => (
    fetch(`${url}/api/word`)
      .then(res => res.json())
      .then(words => dispatch(receiveWords(words)))
      .catch(err => dispatch(failedRequest(err)))
  ));

export default fetchWords;
