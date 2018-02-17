/**
 * Created by pierremarsot on 25/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_DIMENSIONS_SPORTIVES_SUCCESS = 'LOAD_DIMENSIONS_SPORTIVES_SUCCESS';
export const LOAD_DIMENSIONS_SPORTIVES_ERROR = 'LOAD_DIMENSIONS_SPORTIVES_ERROR';

function load_dimensions_sportives_success(payload) {
  return {
    type: LOAD_DIMENSIONS_SPORTIVES_SUCCESS,
    dimensions_sportives: payload.dimensions_sportives,
  };
}

function load_dimensions_sportives_error() {
  return {
    type: LOAD_DIMENSIONS_SPORTIVES_ERROR,
  };
}

export function load_dimensions_sportives() {
  return dispatch => {
    getApi('/dimensions_sportive')
      .then((response) => {
        return dispatch(load_dimensions_sportives_success(response));
      })
      .catch((response) => {
        dispatch(load_dimensions_sportives_error());
        return dispatch(send_error_message(response.error));
      });
  }
}