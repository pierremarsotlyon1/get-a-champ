/**
 * Created by pierremarsot on 09/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SET_METIER_RECHERCHE_SPORTIF = 'SET_METIER_RECHERCHE_SPORTIF';

export const SEARCH_RECRUTEMENT_SPORTIF_SUCCESS = 'SEARCH_RECRUTEMENT_SPORTIF_SUCCESS';
export const SEARCH_RECRUTEMENT_SPORTIF_ERROR = 'SEARCH_RECRUTEMENT_SPORTIF_ERROR';

function search_recrutement_sportif_success(payload) {
  return {
    type: SEARCH_RECRUTEMENT_SPORTIF_SUCCESS,
    sportifs: payload.sportifs,
  };
}

function search_recrutement_sportif_error() {
  return {
    type: SEARCH_RECRUTEMENT_SPORTIF_ERROR,
  };
}

export function search_recrutement_sportif(idOffreEmploi) {
  return (dispatch, getState) => {
    if (!idOffreEmploi) {
      return dispatch(send_error_message('Erreur lors de la récupération de l\'identifiant de l\'offre d\'emploi'));
    }

    getApi('/api/entreprise/offre_emploi/' + idOffreEmploi + '/matching')
      .then((response) => {
        if (!response) {
          dispatch(search_recrutement_sportif_error());
          return dispatch(send_error_message('Erreur lors de la récupération des sportifs'));
        }

        if (!response.sportifs) {
          dispatch(search_recrutement_sportif_error());
          return dispatch(send_error_message('Erreur lors de la récupération des sportifs'));
        }

        return dispatch(search_recrutement_sportif_success(response));
      })
      .catch((response) => {
        dispatch(search_recrutement_sportif_error());
        if(response.error){
          return dispatch(send_error_message(response.error));
        }
      });
  };
}

export function set_metier_recherche_sportif(id_metier) {
  return dispatch => {
    return dispatch({
      type: SET_METIER_RECHERCHE_SPORTIF,
      id_metier_recherche: id_metier,
    });
  };
}