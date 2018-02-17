/**
 * Created by pierremarsot on 04/02/2017.
 */
import {getApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS = 'LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS';
export const LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR = 'LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR';

export const ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS = 'ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS';
export const ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR = 'ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR';

export const REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS = 'REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS';
export const REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR = 'REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR';

export const REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_WHEN_REMOVE_DOMAINE_COMPETENCE_SPORTIF =
  'REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_WHEN_REMOVE_DOMAINE_COMPETENCE_SPORTIF';

function load_contrats_mission_entreprise_sportif_success(payload) {
  return {
    type: LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS,
    contracts_mission_entreprise_sportif: payload.contrats_mission_entreprise_sportif,
  };
}

function load_contrats_mission_entreprise_sportif_error(payload) {
  return {
    type: LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_contrats_mission_entreprise_sportif() {
  return dispatch => {
    getApi('/api/sportif/contrats_mission_entreprise')
      .then((response) => {
        return dispatch(load_contrats_mission_entreprise_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_contrats_mission_entreprise_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_contrats_mission_entreprise_sportif_success(contrat_mission_entreprise_sportif) {
  return {
    type: ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS,
    contrat_mission_entreprise_sportif: contrat_mission_entreprise_sportif,
  };
}

function add_contrats_mission_entreprise_sportif_error(payload) {
  return {
    type: ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function add_contrats_mission_entreprise_sportif(domaine_connaissance_sportif) {
  return dispatch => {
    let error;

    if (!domaine_connaissance_sportif._source) {
      error = 'Erreur lors de la récupération de votre domaine de compétence';

      dispatch(add_contrats_mission_entreprise_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    postApi('/api/sportif/contrats_mission_entreprise', {
      id_domaine_connaissance_sportif: domaine_connaissance_sportif._id,
    })
      .then(() => {
        const contrat_mission_entreprise_sportif = {
          id_domaine_connaissance_sportif: domaine_connaissance_sportif._id,
          nom_domaine_connaissance: domaine_connaissance_sportif._source.nom_domaine_connaissance,
          id_domaine_connaissance: domaine_connaissance_sportif._source.id_domaine_connaissance,
          niveau_connaissance: domaine_connaissance_sportif._source.niveau_connaissance,
        };
        dispatch(add_contrats_mission_entreprise_sportif_success(contrat_mission_entreprise_sportif));
        dispatch(send_success_message('Votre contrat de mission a bien été ajouté'));
      })
      .catch((response) => {
        dispatch(add_contrats_mission_entreprise_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function remove_contrats_mission_entreprise_sportif_success(id_domaine_connaissance_sportif) {
  return {
    type: REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS,
    id_domaine_connaissance_sportif: id_domaine_connaissance_sportif,
  };
}

function remove_contrats_mission_entreprise_sportif_error(payload) {
  return {
    type: REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function remove_contrats_mission_entreprise_sportif(id_domaine_connaissance_sportif) {
  return dispatch => {
    let error;

    if(!id_domaine_connaissance_sportif)
    {
      error = 'Erreur lors de la récupération de l\'identifiant du contrat de mission';

      dispatch(remove_contrats_mission_entreprise_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    removeApi('/api/sportif/contrats_mission_entreprise/' + id_domaine_connaissance_sportif)
      .then(() => {
        dispatch(remove_contrats_mission_entreprise_sportif_success(id_domaine_connaissance_sportif));
        dispatch(send_success_message('Votre contrat de mission a bien été supprimée'));
      })
      .catch((response) => {
        dispatch(remove_contrats_mission_entreprise_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

export function remove_contrats_mission_entreprise_sportif_when_remove_domaine_competence(id_domaine_connaissance_sportif) {
  return {
    type: REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_WHEN_REMOVE_DOMAINE_COMPETENCE_SPORTIF,
    id_domaine_connaissance_sportif: id_domaine_connaissance_sportif,
  }
}