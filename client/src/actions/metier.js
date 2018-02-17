/**
 * Created by pierremarsot on 04/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_METIER_SUCCESS = 'SEARCH_METIER_SUCCESS';
export const SEARCH_METIER_ERROR = 'SEARCH_METIER_ERROR';

function search_metier_success(payload) {
  return {
    type: SEARCH_METIER_SUCCESS,
    search_metier: payload.search_metier,
  };
}

function search_metier_error() {
  return {
    type: SEARCH_METIER_ERROR
  };
}

export function search_metier(metier) {
  return dispatch => {
    if (!metier) {
      dispatch(search_metier_error());
      return dispatch(send_error_message('Vous devez spécifier un nom de métier'));
    }

    getApi('/search/metier', {
      metier: metier
    })
      .then((response) => {
        return dispatch(search_metier_success(response));
      })
      .catch((response) => {
        dispatch(search_metier_error());
        return dispatch(send_error_message(response.error));
      });
  };
}