/**
 * Created by pierremarsot on 25/03/2017.
 */
import {getApi, postApi, removeApi} from '../utils/apiUtils';
import ManagerInt from '../utils/ManagerInt';
import {send_error_message, send_success_message} from './toasts';

export const ADD_OFFRE_EMPLOI_ENTREPRISE_SUCCESS = 'ADD_OFFRE_EMPLOI_ENTREPRISE_SUCCESS';

export const LOAD_OFFRES_EMPLOI_ENTREPRISE_SUCCESS = 'LOAD_OFFRES_EMPLOI_ENTREPRISE_SUCCESS';
export const LOAD_OFFRES_EMPLOI_ENTREPRISE_ERROR = 'LOAD_OFFRES_EMPLOI_ENTREPRISE_ERROR';

export const REMOVE_OFFRE_EMPLOI_ENTREPRISE_SUCCESS = 'REMOVE_OFFRE_EMPLOI_ENTREPRISE_SUCCESS';

function remove_offre_emploi_entreprise_success(id_offre_emploi) {
  return {
    type: REMOVE_OFFRE_EMPLOI_ENTREPRISE_SUCCESS,
    id_offre_emploi: id_offre_emploi,
  };
}

export function remove_offre_emploi_entreprise(id_offre_emploi) {
  return dispatch => {
    if (!id_offre_emploi) {
      return dispatch(send_error_message('Erreur lors de la récupération de l\'identifiant de l\'offre d\'emploi'));
    }

    removeApi('/api/entreprise/offre_emploi/' + id_offre_emploi)
      .then(() => {
        dispatch(remove_offre_emploi_entreprise_success(id_offre_emploi));
        return dispatch(send_success_message('L\'offre d\'emploi a bien été supprimée'));
      })
      .catch((response) => {
        return dispatch(send_error_message(response.error));
      });
  };
}

function load_offres_emploi_entreprise_success(payload) {
  return {
    type: LOAD_OFFRES_EMPLOI_ENTREPRISE_SUCCESS,
    offres_emploi: payload.offres_emploi,
  };
}

function load_offres_emploi_entreprise_error() {
  return {
    type: LOAD_OFFRES_EMPLOI_ENTREPRISE_ERROR,
  };
}

export function load_offres_emploi_entreprise() {
  return dispatch => {
    getApi('/api/entreprise/offre_emploi')
      .then((response) => {
        return dispatch(load_offres_emploi_entreprise_success(response));
      })
      .catch((response) => {
        dispatch(load_offres_emploi_entreprise_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

function add_offre_emploi_entreprise_success(offre_emploi) {
  return {
    type: ADD_OFFRE_EMPLOI_ENTREPRISE_SUCCESS,
    offre_emploi: offre_emploi
  };
}

export function add_offre_emploi_entreprise(id_poste,
                                            lieu_poste,
                                            id_niveau_etude,
                                            id_salaire,
                                            description_offre,
                                            mission,
                                            prerequis,
                                            matcher_sportif,
                                            chasser_tete,
                                            diffuser,
                                            ids_dimensions_sportives,
                                            recherche_confidentielle) {
  return dispatch => {
    if (!id_poste) {
      return dispatch(send_error_message('Vous devez renseigner un poste'));
    }

    if (!lieu_poste) {
      return dispatch(send_error_message('Vous devez renseigner le lieu du poste'));
    }

    if (!description_offre || description_offre.length === 0) {
      return dispatch(send_error_message('Vous devez renseigner la description du poste'));
    }

    if (!mission || mission.length === 0) {
      return dispatch(send_error_message('Vous devez renseigner la mission du poste'));
    }

    if (!prerequis || prerequis.length === 0) {
      return dispatch(send_error_message('Vous devez renseigner les prérequis du poste'));
    }

    if (!matcher_sportif && !chasser_tete && !diffuser) {
      return dispatch(send_error_message('Vous devez renseigner au moins une action à faire avec votre offre'));
    }

    if(!id_salaire){
      return dispatch(send_error_message('Vous devez renseigner une tranche de salaire'));
    }

    postApi('/api/entreprise/offre_emploi', {
      id_poste,
      lieu_poste,
      id_niveau_etude,
      id_salaire,
      description_offre,
      mission,
      prerequis,
      matcher_sportif,
      chasser_tete,
      diffuser,
      ids_dimensions_sportives,
      recherche_confidentielle
    })
      .then((response) => {
        const offre_emploi = response.offre_emploi;
        if (!offre_emploi) {
          return dispatch(send_error_message('Votre offre d\'emploi semble être ajoutée mais un problème est survenu à la confirmation de l\'ajout'));
        }

        dispatch(add_offre_emploi_entreprise_success(offre_emploi));
        return dispatch(send_success_message('Votre offre d\'emploi a bien été ajoutée'));
      })
      .catch((response) => {
        return dispatch(send_error_message(response.error));
      });
  };
}