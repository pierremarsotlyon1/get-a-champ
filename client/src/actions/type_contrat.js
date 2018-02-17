/**
 * Created by pierremarsot on 25/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_TYPES_CONTRAT_SUCCESS = 'LOAD_TYPES_CONTRAT_SUCCESS';
export const LOAD_TYPES_CONTRAT_ERROR = 'LOAD_TYPES_CONTRAT_ERROR';

function load_types_contrat_success(payload) {
  return {
    type: LOAD_TYPES_CONTRAT_SUCCESS,
    types_contrat: payload.types_contrat_travail,
  };
}

function load_types_contrat_error() {
  return {
    type: LOAD_TYPES_CONTRAT_ERROR,
  };
}

export function load_types_contrat() {
  return dispatch => {
    getApi('/type_contrat_travail')
      .then((response) => {
        return dispatch(load_types_contrat_success(response));
      })
      .catch((response) => {
        dispatch(load_types_contrat_error());
        return dispatch(send_error_message(response.error));
      });
  }
}