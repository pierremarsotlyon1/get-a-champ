/**
 * Created by pierremarsot on 31/01/2017.
 */

import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_DOMAINES_COMPETENCE_SUCCESS = 'SEARCH_DOMAINES_COMPETENCE_SUCCESS';
export const SEARCH_DOMAINES_COMPETENCE_ERROR = 'SEARCH_DOMAINES_COMPETENCE_ERROR';

function search_domaines_competence_success(payload) {
  return {
    type: SEARCH_DOMAINES_COMPETENCE_SUCCESS,
    domaines_competences: payload.domaines_competences,
  };
}

function search_domaines_competence_error() {
  return {
    type: SEARCH_DOMAINES_COMPETENCE_ERROR,
  };
}

export function search_domaines_competence(search_text) {
  return dispatch => {
    getApi('/domaine/competence/' + search_text)
      .then((response) => {
        return dispatch(search_domaines_competence_success(response));
      })
      .catch((response) => {
        dispatch(search_domaines_competence_error());
        return dispatch(send_error_message(response.error));
      });
  }
}