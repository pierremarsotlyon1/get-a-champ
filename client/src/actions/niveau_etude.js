/**
 * Created by pierremarsot on 25/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_NIVEAUX_ETUDE_SUCCESS = 'LOAD_NIVEAUX_ETUDE_SUCCESS';
export const LOAD_NIVEAUX_ETUDE_ERROR = 'LOAD_NIVEAUX_ETUDE_ERROR';

function load_niveaux_etude_success(payload) {
  return {
    type: LOAD_NIVEAUX_ETUDE_SUCCESS,
    niveaux_etude: payload.niveaux_etude,
  };
}

function load_niveaux_etude_error() {
  return {
    type: LOAD_NIVEAUX_ETUDE_ERROR,
  };
}

export function load_niveaux_etude() {
  return dispatch => {
    getApi('/niveaux_etude')
      .then((response) => {
        return dispatch(load_niveaux_etude_success(response));
      })
      .catch((response) => {
        dispatch(load_niveaux_etude_error());
        return dispatch(send_error_message(response.error));
      });
  }
}

