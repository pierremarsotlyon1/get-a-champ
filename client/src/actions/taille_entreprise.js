/**
 * Created by pierremarsot on 24/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_TAILLE_ENTREPRISE_SUCCESS = 'LOAD_TAILLE_ENTREPRISE_SUCCESS';
export const LOAD_TAILLE_ENTREPRISE_ERROR = 'LOAD_TAILLE_ENTREPRISE_ERROR';

function load_taille_entreprise_success(payload) {
  return {
    type: LOAD_TAILLE_ENTREPRISE_SUCCESS,
    tailles_entreprise: payload.tailles_entreprise,
  };
}

function load_taille_entreprise_error(payload) {
  return {
    type: LOAD_TAILLE_ENTREPRISE_ERROR,
    error: payload.error,
  };
}

export function load_taille_entreprise() {
  return dispatch => {
    getApi('/taille/entreprise')
      .then((response) => {
        return dispatch(load_taille_entreprise_success(response));
      })
      .catch((response) => {
        dispatch(load_taille_entreprise_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}