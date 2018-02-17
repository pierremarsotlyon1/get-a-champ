/**
 * Created by pierremarsot on 01/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_SPORTIF_ANIMATION_INCENTIVE_SUCCESS = 'SEARCH_SPORTIF_ANIMATION_INCENTIVE_SUCCESS';
export const SEARCH_SPORTIF_ANIMATION_INCENTIVE_ERROR = 'SEARCH_SPORTIF_ANIMATION_INCENTIVE_ERROR';

export const INIT_SEARCH_SPORTIF_ANIMATION_INCENTIVE = 'SEARCH_SPORTIF_ANIMATION_INCENTIVE_ERROR';

function search_sportif_animation_incentive_success(payload) {
  return {
    type: SEARCH_SPORTIF_ANIMATION_INCENTIVE_SUCCESS,
    search_sportif_animation_incentive: payload.search_sportif_animation_incentive,
  };
}

function search_sportif_animation_incentive_error() {
  return {
    type: SEARCH_SPORTIF_ANIMATION_INCENTIVE_ERROR,
  };
}

export function search_sportif_animation_incentive(idThematique, montant_max) {
  return (dispatch) => {
    //On regarde si on a l'identifiant de la thématique
    if (!idThematique) {
      dispatch(search_sportif_animation_incentive_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique incentive'));
    }

    getApi('/api/search/sportif/animation/incentive', {
      idThematique: idThematique,
      montant_max: montant_max,
    })
      .then((response) => {
        return dispatch(search_sportif_animation_incentive_success(response));
      })
      .catch((response) => {
        dispatch(search_sportif_animation_incentive_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

export function init_search_sportif_animation_incentive(){
  return dispatch => {
    return dispatch({
      type: INIT_SEARCH_SPORTIF_ANIMATION_INCENTIVE
    });
  }
}