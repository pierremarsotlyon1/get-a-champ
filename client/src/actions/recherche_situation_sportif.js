/**
 * Created by pierremarsot on 25/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_RECHERCHE_SITUATION_SPORTIF_SUCCESS = 'LOAD_RECHERCHE_SITUATION_SPORTIF_SUCCESS';
export const LOAD_RECHERCHE_SITUATION_SPORTIF_ERROR = 'LOAD_RECHERCHE_SITUATION_SPORTIF_ERROR';

function load_recherche_situation_sportif_success(payload) {
  return {
    type: LOAD_RECHERCHE_SITUATION_SPORTIF_SUCCESS,
    recherches_situations_sportif: payload.recherches_situations_sportif,
  };
}

function load_recherche_situation_sportif_error(payload) {
  return {
    type: LOAD_RECHERCHE_SITUATION_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_recherche_situation_sportif() {
  return dispatch => {
    getApi('/recherche/situation/sportif')
      .then((response) => {
        return dispatch(load_recherche_situation_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_recherche_situation_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}