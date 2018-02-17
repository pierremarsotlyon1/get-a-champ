/**
 * Created by pierremarsot on 22/02/2017.
 */
import {getApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_LANGUE_SPORTIF_SUCCESS = 'LOAD_LANGUE_SPORTIF_SUCCESS';
export const LOAD_LANGUE_SPORTIF_ERROR = 'LOAD_LANGUE_SPORTIF_ERROR';

export const ADD_LANGUE_SPORTIF_SUCCESS = 'ADD_LANGUE_SPORTIF_SUCCESS';
export const ADD_LANGUE_SPORTIF_ERROR = 'ADD_LANGUE_SPORTIF_ERROR';

export const REMOVE_LANGUE_SPORTIF_SUCCESS = 'REMOVE_LANGUE_SPORTIF_SUCCESS';
export const REMOVE_LANGUE_SPORTIF_ERROR = 'REMOVE_LANGUE_SPORTIF_ERROR';

export const UPDATE_LANGUE_SPORTIF_SUCCESS = 'UPDATE_LANGUE_SPORTIF_SUCCESS';
export const UPDATE_LANGUE_SPORTIF_ERROR = 'UPDATE_LANGUE_SPORTIF_ERROR';

function load_langue_sportif_success(payload) {
  return {
    type: LOAD_LANGUE_SPORTIF_SUCCESS,
    langues_sportif: payload.langues_sportif,
  };
}

function load_langue_sportif_error(payload) {
  return {
    type: LOAD_LANGUE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_langue_sportif() {
  return dispatch => {
    getApi('/api/sportif/langues')
      .then((response) => {
        return dispatch(load_langue_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_langue_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_langue_sportif_success(langue_sportif) {
  return {
    type: ADD_LANGUE_SPORTIF_SUCCESS,
    langue_sportif: langue_sportif,
  };
}

function add_langue_sportif_error(payload) {
  return {
    type: ADD_LANGUE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function add_langue_sportif(id_langue, id_niveau_langue) {
  return (dispatch, getState) => {
    let error;

    if (!id_langue) {
      error = 'Erreur lors de la récupération de la langue';

      dispatch(add_langue_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!id_niveau_langue) {
      error = 'Erreur lors de la récupération du niveau de la langue';
      dispatch(add_langue_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    const {langues} = getState().langue;
    const {niveaux_langue} = getState().niveauLangue;

    let langue = undefined;

    for (const l of langues) {
      if (l._id === id_langue) {
        langue = l;
        break;
      }
    }

    if (!langue) {
      error = 'Erreur lors de la récupération de la langue';
      dispatch(add_langue_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    let niveau_langue = undefined;

    for (const nl of niveaux_langue) {
      if (nl._id === id_niveau_langue) {
        niveau_langue = nl;
        break;
      }
    }

    if (!niveau_langue) {
      error = 'Erreur lors de la récupération du niveau de la langue';

      dispatch(add_langue_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    const langue_sportif = {
      langue: {
        _id: langue._id,
        nom_langue: langue._source.nom_langue,
      },
      niveau_langue: {
        _id: niveau_langue._id,
        nom_niveau_langue: niveau_langue._source.nom_niveau_langue,
      },
    };

    postApi('/api/sportif/langues', {
      id_langue: langue_sportif.langue._id,
      id_niveau_langue: langue_sportif.niveau_langue._id,
    })
      .then(() => {
        dispatch(add_langue_sportif_success(langue_sportif));
        dispatch(send_success_message('La langue a bien été ajoutée'));
      })
      .catch((response) => {
        dispatch(add_langue_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function remove_langue_sportif_success(id_langue) {
  return {
    type: REMOVE_LANGUE_SPORTIF_SUCCESS,
    id_langue: id_langue,
  };
}

function remove_langue_sportif_error(payload) {
  return {
    type: REMOVE_LANGUE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function remove_langue_sportif(id_langue) {
  return dispatch => {
    if (!id_langue) {
      const error = 'Erreur lors de la récupération de la langue';
      dispatch(remove_langue_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

    }

    removeApi('/api/sportif/langues/' + id_langue)
      .then(() => {
        dispatch(remove_langue_sportif_success(id_langue));
        dispatch(send_success_message('La langue a bien été supprimée'));
      })
      .catch((response) => {
        dispatch(remove_langue_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}