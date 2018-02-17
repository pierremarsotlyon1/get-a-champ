/**
 * Created by pierremarsot on 22/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_TYPE_SPONSORING_SUCCESS = 'LOAD_TYPE_SPONSORING_SUCCESS';
export const LOAD_TYPE_SPONSORING_ERROR = 'LOAD_TYPE_SPONSORING_ERROR';

function load_type_sponsoring_success(payload) {
  return {
    type: LOAD_TYPE_SPONSORING_SUCCESS,
    types_sponsoring: payload.types_sponsoring,
  };
}

function load_type_sponsoring_error(payload) {
  return {
    type: LOAD_TYPE_SPONSORING_ERROR,
    error: payload.error,
  };
}

export function load_type_sponsoring() {
  return dispatch => {
    getApi('/type/sponsoring')
      .then((response) => {
        return dispatch(load_type_sponsoring_success(response));
      })
      .catch((response) => {
        dispatch(load_type_sponsoring_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}