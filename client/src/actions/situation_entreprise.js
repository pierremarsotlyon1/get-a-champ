/**
 * Created by pierremarsot on 22/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_SITUATION_ENTREPRISE_SUCCESS = 'LOAD_SITUATION_ENTREPRISE_SUCCESS';
export const LOAD_SITUATION_ENTREPRISE_ERROR = 'LOAD_SITUATION_ENTREPRISE_ERROR';

function load_situation_entreprise_success(payload) {
  return {
    type: LOAD_SITUATION_ENTREPRISE_SUCCESS,
    situations_entreprise: payload.situations_entreprise,
  };
}

function load_situation_entreprise_error(payload) {
  return {
    type: LOAD_SITUATION_ENTREPRISE_ERROR,
    error: payload.error,
  };
}

export function load_situation_entreprise() {
  return dispatch => {
    getApi('/situation/entreprise')
      .then((response) => {
        return dispatch(load_situation_entreprise_success(response));
      })
      .catch((response) => {
        dispatch(load_situation_entreprise_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}