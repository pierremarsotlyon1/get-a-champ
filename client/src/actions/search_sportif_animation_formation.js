/**
 * Created by pierremarsot on 01/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_SPORTIF_ANIMATION_FORMATION_SUCCESS = 'SEARCH_ANIMATION_FORMATION_SUCCESS';
export const SEARCH_SPORTIF_ANIMATION_FORMATION_ERROR = 'SEARCH_ANIMATION_FORMATION_ERROR';

export const INIT_SEARCH_SPORTIF_ANIMATION_FORMATION = 'INIT_SEARCH_SPORTIF_ANIMATION_FORMATION';

function search_sportif_animation_formation_success(payload) {
  return {
    type: SEARCH_SPORTIF_ANIMATION_FORMATION_SUCCESS,
    search_sportif_animation_formation: payload.search_sportif_animation_formation,
  };
}

function search_sportif_animation_formation_error() {
  return {
    type: SEARCH_SPORTIF_ANIMATION_FORMATION_ERROR,
  };
}

export function search_sportif_animation_formation(idThematique, montant_max) {
  return (dispatch) => {
    //On regarde si on a l'identifiant de la thématique
    if (!idThematique) {
      dispatch(search_sportif_animation_formation_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique de formation'));
    }

    getApi('/api/search/sportif/animation/formation', {
      idThematique: idThematique,
      montant_max: montant_max,
    })
      .then((response) => {
        return dispatch(search_sportif_animation_formation_success(response));
      })
      .catch((response) => {
        dispatch(search_sportif_animation_formation_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

export function init_search_sportif_animation_formation(){
  return dispatch => {
    return dispatch({
      type: INIT_SEARCH_SPORTIF_ANIMATION_FORMATION,
    });
  }
}