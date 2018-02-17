/**
 * Created by pierremarsot on 01/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_SUCCESS = 'LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_SUCCESS';
export const LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_ERROR = 'LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_ERROR';

function load_thematique_animation_incentive_evenementiel_success(payload) {
  return {
    type: LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_SUCCESS,
    thematiques_animation_incentive_evenementiel: payload.categories_animation_incentive,
  };
}

function load_thematique_animation_incentive_evenementiel_error(payload) {
  return {
    type: LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_ERROR,
    error: payload.error,
  };
}

export function load_thematique_animation_incentive_evenementiel() {
  return dispatch => {
    getApi('/categorie/animation/incentive', {})
      .then((response) => {
        return dispatch(load_thematique_animation_incentive_evenementiel_success(response));
      })
      .catch((response) => {
        dispatch(load_thematique_animation_incentive_evenementiel_error(response));
        return dispatch(send_error_message(response.error));
      });
  }
}