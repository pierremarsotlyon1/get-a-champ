/**
 * Created by pierremarsot on 31/01/2017.
 */

import {postApi, getApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS = 'LOAD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS';
export const LOAD_DOMAINE_CONNAISANCE_SPORTIF_ERROR = 'LOAD_DOMAINE_CONNAISANCE_SPORTIF_ERROR';

export const ADD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS = 'ADD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS';
export const ADD_DOMAINE_CONNAISANCE_SPORTIF_ERROR = 'ADD_DOMAINE_CONNAISANCE_SPORTIF_ERROR';

export const REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS = 'REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS';
export const REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_ERROR = 'REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_ERROR';

function load_domaine_connaisance_sportif_success(payload) {
  return {
    type: LOAD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS,
    domaines_connaissance_sportif: payload.domaines_connaissance_sportif,
  };
}

function load_domaine_connaissance_sportif_error(payload) {
  return {
    type: LOAD_DOMAINE_CONNAISANCE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_domaine_connaissance_sportif() {
  return dispatch => {
    getApi('/api/sportif/domaines/connaissances', {})
      .then((response) => {
        return dispatch(load_domaine_connaisance_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_domaine_connaissance_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}

function add_domaine_connaissance_sportif_success(domaine_connaissance_sportif) {
  return {
    type: ADD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS,
    domaine_connaissance_sportif: domaine_connaissance_sportif,
  };
}

function add_domaine_connaissance_sportif_error(payload) {
  return {
    type: ADD_DOMAINE_CONNAISANCE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function add_domaine_connaissance_sportif(id_domaine_connaissance, id_niveau_domaine_connaissance) {
  return dispatch => {
    let error;

    if (!id_domaine_connaissance) {
      error = 'Vous devez selectionner un domaine de connaissance';
      dispatch(add_domaine_connaissance_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!id_niveau_domaine_connaissance) {
      error = 'Vous devez selectionner un niveau de domaine de connaissance';
      dispatch(add_domaine_connaissance_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    postApi('/api/sportif/domaines/connaissance', {
      id_domaine_connaissance: id_domaine_connaissance,
      id_niveau_domaine_connaissance: id_niveau_domaine_connaissance,
    })
      .then((payload) => {
        if (!payload.domaine_connaissance_sportif) {
          error = 'Votre domaine de connaissance semble être ajouté cependant nous n\'avons pu récupérer certaines informations';

          dispatch(add_domaine_connaissance_sportif_error({
            error: error,
          }));
          return dispatch(send_error_message(error));
        }

        dispatch(add_domaine_connaissance_sportif_success(payload.domaine_connaissance_sportif));
        return dispatch(send_success_message('Votre domaine de compétence a bien été ajouté'));
      })
      .catch((response) => {
        dispatch(add_domaine_connaissance_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}

function remove_domaine_connaissance_sportif_success(id_domaine_connaissance_sportif) {
  return {
    type: REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS,
    id_domaine_connaissance_sportif: id_domaine_connaissance_sportif,
  };
}

function remove_domaine_connaissance_sportif_error(payload) {
  return {
    type: REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function remove_domaine_connaissance_sportif(id_domaine_connaissance_sportif) {
  return dispatch => {
    let error;

    if (!id_domaine_connaissance_sportif) {
      error = 'Vous devez selectionner un domaine de compétence';

      dispatch(remove_domaine_connaissance_sportif_error({
        error: error,
      }));
      return dispatch(send_error_message(error));
    }

    removeApi('/api/sportif/domaines/connaissance/' + id_domaine_connaissance_sportif)
      .then(() => {
        dispatch(remove_domaine_connaissance_sportif_success(id_domaine_connaissance_sportif));
        return dispatch(send_success_message('Votre domaine de connaissance a bien été supprimé'));
      })
      .catch((response) => {
        dispatch(remove_domaine_connaissance_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}