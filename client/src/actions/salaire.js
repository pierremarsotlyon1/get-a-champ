/**
 * Created by pierremarsot on 28/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_SALAIRES_SUCCESS = 'LOAD_SALAIRES_SUCCESS';
export const LOAD_SALAIRES_ERROR = 'LOAD_SALAIRES_ERROR';

function load_salaires_success(payload) {
  return {
    type: LOAD_SALAIRES_SUCCESS,
    salaires: payload.salaires,
  };
}

function load_salaires_error() {
  return {
    type: LOAD_SALAIRES_ERROR,
  };
}

export function load_salaires() {
  return dispatch => {
    getApi('/salaires')
      .then((response) => {
        return dispatch(load_salaires_success(response));
      })
      .catch((response) => {
        dispatch(load_salaires_error());
        return dispatch(send_error_message(response.error));
      });
  };
}