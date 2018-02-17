/**
 * Created by pierremarsot on 01/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_THEMATIQUE_ANIMATION_FORMATION_SUCCESS = 'LOAD_THEMATIQUE_ANIMATION_FORMATION_SUCCESS';
export const LOAD_THEMATIQUE_ANIMATION_FORMATION_ERROR = 'LOAD_THEMATIQUE_ANIMATION_FORMATION_ERROR';

function load_thematique_animation_formation_success(payload) {
  return {
    type: LOAD_THEMATIQUE_ANIMATION_FORMATION_SUCCESS,
    thematiques_animation_formation: payload.categories_animation_formation,
  };
}

function load_thematique_animation_formation_error(payload) {
  return {
    type: LOAD_THEMATIQUE_ANIMATION_FORMATION_ERROR,
    error: payload.error,
  };
}

export function load_thematique_animation_formation() {
  return dispatch => {
    getApi('/categorie/animation/formation', {})
      .then((response) => {
        return dispatch(load_thematique_animation_formation_success(response));
      })
      .catch((response) => {
        dispatch(load_thematique_animation_formation_error(response));
        return dispatch(send_error_message(response.error));
      });
  }
}