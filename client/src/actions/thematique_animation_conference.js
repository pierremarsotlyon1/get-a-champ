/**
 * Created by pierremarsot on 01/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_THEMATIQUE_ANIMATION_CONFERENCE_SUCCESS = 'LOAD_THEMATIQUE_ANIMATION_CONFERENCE_SUCCESS';
export const LOAD_THEMATIQUE_ANIMATION_CONFERENCE_ERROR = 'LOAD_THEMATIQUE_ANIMATION_CONFERENCE_ERROR';

function load_thematique_animation_conference_success(payload) {
  return {
    type: LOAD_THEMATIQUE_ANIMATION_CONFERENCE_SUCCESS,
    thematiques_animation_conference: payload.categories_animation_conference,
  };
}

function load_thematique_animation_conference_error(payload) {
  return {
    type: LOAD_THEMATIQUE_ANIMATION_CONFERENCE_ERROR,
    error: payload.error,
  };
}

export function load_thematique_animation_conference() {
  return dispatch => {
    getApi('/categorie/animation/conference', {})
      .then((response) => {
        return dispatch(load_thematique_animation_conference_success(response));
      })
      .catch((response) => {
        dispatch(load_thematique_animation_conference_error(response));
        return dispatch(send_error_message(response.error));
      });
  }
}
