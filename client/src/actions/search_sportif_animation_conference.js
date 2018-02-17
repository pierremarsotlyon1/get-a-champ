/**
 * Created by pierremarsot on 01/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_SPORTIF_ANIMATION_CONFERENCE_SUCCESS = 'SEARCH_SPORTIF_ANIMATION_CONFERENCE_SUCCESS';
export const SEARCH_SPORTIF_ANIMATION_CONFERENCE_ERROR = 'SEARCH_SPORTIF_ANIMATION_CONFERENCE_ERROR';

export const INIT_SEARCH_SPORTIF_ANIMATION_CONFERENCE = 'INIT_SEARCH_SPORTIF_ANIMATION_CONFERENCE';

function search_sportif_animation_conference_success(payload) {
  return {
    type: SEARCH_SPORTIF_ANIMATION_CONFERENCE_SUCCESS,
    search_sportif_animation_conference: payload.search_sportif_animation_conference,
  };
}

function search_sportif_animation_conference_error() {
  return {
    type: SEARCH_SPORTIF_ANIMATION_CONFERENCE_ERROR,
  };
}

export function search_sportif_animation_conference(idThematique, montant_max) {
  return (dispatch) => {
    //On regarde si on a l'identifiant de la thématique
    if (!idThematique) {
      dispatch(search_sportif_animation_conference_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique de conférence'));
    }

    getApi('/api/search/sportif/animation/conference', {
      idThematique: idThematique,
      montant_max: montant_max,
    })
      .then((response) => {
        return dispatch(search_sportif_animation_conference_success(response));
      })
      .catch((response) => {
        dispatch(search_sportif_animation_conference_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

export function init_search_sportif_animation_conference(){
  return dispatch => {
    return dispatch({
      type: INIT_SEARCH_SPORTIF_ANIMATION_CONFERENCE,
    });
  }
}