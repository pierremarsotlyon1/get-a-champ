/**
 * Created by pierremarsot on 31/01/2017.
 */

import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_DOMAINE_CONNAISSANCE_SUCCESS = 'LOAD_DOMAINE_CONNAISSANCE_SUCCESS';
export const LOAD_DOMAINE_CONNAISSANCE_ERROR = 'LOAD_DOMAINE_CONNAISSANCE_ERROR';

export const SEARCH_DOMAINES_CONNAISSANCE_SUCCESS = 'SEARCH_DOMAINES_CONNAISSANCE_SUCCESS';
export const SEARCH_DOMAINES_CONNAISSANCE_ERROR = 'SEARCH_DOMAINES_CONNAISSANCE_ERROR';

function load_domaine_connaissance_success(payload) {
  return {
    type: LOAD_DOMAINE_CONNAISSANCE_SUCCESS,
    domaines_connaissances: payload.domaines_connaissances,
  };
}

function load_domaine_connaissance_error(payload) {
  return {
    type: LOAD_DOMAINE_CONNAISSANCE_ERROR,
    error: payload.error,
  };
}

export function load_domaine_connaissance() {
  return dispatch => {
    getApi('/domaine/connaissance', {})
      .then((response) => {
        return dispatch(load_domaine_connaissance_success(response));
      })
      .catch((response) => {
        dispatch(load_domaine_connaissance_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function search_domaines_connaissance_success(payload) {
  return {
    type: SEARCH_DOMAINES_CONNAISSANCE_SUCCESS,
    domaines_connaissances: payload.domaines_connaissances,
  };
}

function search_domaines_connaissance_error() {
  return {
    type: SEARCH_DOMAINES_CONNAISSANCE_ERROR,
  };
}

export function search_domaines_connaissance(search_text) {
  return dispatch => {
    getApi('/domaine/connaissance/' + search_text)
      .then((response) => {
        return dispatch(search_domaines_connaissance_success(response));
      })
      .catch((response) => {
        dispatch(search_domaines_connaissance_error());
        return dispatch(send_error_message(response.error));
      });
  }
}