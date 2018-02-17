/**
 * Created by pierremarsot on 31/01/2017.
 */

import {postApi, getApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS = 'LOAD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS';
export const LOAD_DOMAINE_COMPETENCE_SPORTIF_ERROR = 'LOAD_DOMAINE_COMPETENCE_SPORTIF_ERROR';

export const ADD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS = 'ADD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS';
export const ADD_DOMAINE_COMPETENCE_SPORTIF_ERROR = 'ADD_DOMAINE_COMPETENCE_SPORTIF_ERROR';

export const REMOVE_DOMAINE_COMPETENCE_SPORTIF_SUCCESS = 'REMOVE_DOMAINE_COMPETENCE_SPORTIF_SUCCESS';
export const REMOVE_DOMAINE_COMPETENCE_SPORTIF_ERROR = 'REMOVE_DOMAINE_COMPETENCE_SPORTIF_ERROR';

function load_domaine_competence_sportif_success(payload) {
  return {
    type: LOAD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS,
    domaines_competence_sportif: payload.domaines_competence_sportif,
  };
}

function load_domaine_competence_sportif_error() {
  return {
    type: LOAD_DOMAINE_COMPETENCE_SPORTIF_ERROR
  };
}

export function load_domaine_competence_sportif() {
  return dispatch => {
    getApi('/api/sportif/domaines/competences', {})
      .then((response) => {
        return dispatch(load_domaine_competence_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_domaine_competence_sportif_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

function add_domaine_competence_sportif_success(payload) {
  return {
    type: ADD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS,
    domaine_competence_sportif: payload.domaine_competence_sportif,
  };
}

function add_domaine_competence_sportif_error() {
  return {
    type: ADD_DOMAINE_COMPETENCE_SPORTIF_ERROR,
  };
}

export function add_domaine_competence_sportif(id_domaine_competence, id_niveau_domaine_competence) {
  return dispatch => {
    let error;

    if (!id_domaine_competence) {
      dispatch(add_domaine_competence_sportif_error());
      return dispatch(send_error_message('Vous devez selectionner un domaine de compétence'));
    }

    if (!id_niveau_domaine_competence) {
      dispatch(add_domaine_competence_sportif_error());
      return dispatch(send_error_message('Vous devez selectionner un niveau de domaine de compétence'));
    }

    postApi('/api/sportif/domaines/competence', {
      id_domaine_competence: id_domaine_competence,
      id_niveau_domaine_competence: id_niveau_domaine_competence,
    })
      .then((payload) => {
        if (!payload.domaine_competence_sportif) {
          error = 'Votre domaine de compétence semble être ajouté cependant nous n\'avons pu récupérer certaines informations';

          dispatch(add_domaine_competence_sportif_error());
          return dispatch(send_error_message(error));
        }

        dispatch(add_domaine_competence_sportif_success(payload));
        return dispatch(send_success_message('Votre domaine de compétence a bien été ajouté'));
      })
      .catch((response) => {
        dispatch(add_domaine_competence_sportif_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

function remove_domaine_competence_sportif_success(id_domaine_competence_sportif) {
  return {
    type: REMOVE_DOMAINE_COMPETENCE_SPORTIF_SUCCESS,
    id_domaine_competence_sportif: id_domaine_competence_sportif,
  };
}

function remove_domaine_competence_sportif_error() {
  return {
    type: REMOVE_DOMAINE_COMPETENCE_SPORTIF_ERROR,
  };
}

export function remove_domaine_competence_sportif(id_domaine_competence_sportif) {
  return dispatch => {
    let error;

    if (!id_domaine_competence_sportif) {
      error = 'Vous devez selectionner un domaine de compétence';

      dispatch(remove_domaine_competence_sportif_error());
      return dispatch(send_error_message(error));
    }

    removeApi('/api/sportif/domaines/competence/' + id_domaine_competence_sportif)
      .then(() => {
        dispatch(remove_domaine_competence_sportif_success(id_domaine_competence_sportif));
        return dispatch(send_success_message('Votre domaine de compétence a bien été supprimé'));
      })
      .catch((response) => {
        dispatch(remove_domaine_competence_sportif_error());
        return dispatch(send_error_message(response.error));
      });
  };
}