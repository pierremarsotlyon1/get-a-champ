/**
 * Created by pierremarsot on 21/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_LANGUE_SUCCESS = 'SEARCH_LANGUE_SUCCESS';
export const SEARCH_LANGUE_ERROR = 'SEARCH_LANGUE_ERROR';

function search_langue_success(payload) {
  return {
    type: SEARCH_LANGUE_SUCCESS,
    langues: payload.langues,
  };
}

function search_langue_error(payload) {
  return {
    type: SEARCH_LANGUE_ERROR,
    error: payload.error,
  };
}

export function search_langue(langue) {
  return dispatch => {
    getApi('/langue/search/' + langue)
      .then((response) => {
        return dispatch(search_langue_success(response));
      })
      .catch((response) => {
        dispatch(search_langue_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}