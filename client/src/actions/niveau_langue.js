/**
 * Created by pierremarsot on 21/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_NIVEAU_LANGUE_SUCCESS = 'LOAD_NIVEAU_LANGUE_SUCCESS';
export const LOAD_NIVEAU_LANGUE_ERROR = 'LOAD_NIVEAU_LANGUE_ERROR';

function load_niveau_langue_success(payload) {
  return {
    type: LOAD_NIVEAU_LANGUE_SUCCESS,
    niveaux_langue: payload.niveaux_langue,
  };
}

function load_niveau_langue_error(payload) {
  return {
    type: LOAD_NIVEAU_LANGUE_ERROR,
    error: payload.error,
  };
}

export function load_niveau_langue() {
  return dispatch => {
    getApi('/niveau/langue')
      .then((response) => {
        return dispatch(load_niveau_langue_success(response));
      })
      .catch((response) => {
        dispatch(load_niveau_langue_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}