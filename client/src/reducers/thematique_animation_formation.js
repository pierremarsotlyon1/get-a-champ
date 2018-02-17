/**
 * Created by pierremarsot on 01/02/2017.
 */

import {
  LOAD_THEMATIQUE_ANIMATION_FORMATION_SUCCESS,
  LOAD_THEMATIQUE_ANIMATION_FORMATION_ERROR,
} from '../actions/thematique_animation_formation';

const initialState = {
  thematiques_animation_formation: []
};

export default function thematiqueAnimationFormation(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_THEMATIQUE_ANIMATION_FORMATION_SUCCESS:
      if (!action.thematiques_animation_formation) {
        return state;
      }

      return {
        ...state,
        thematiques_animation_formation: action.thematiques_animation_formation,
      };

    case LOAD_THEMATIQUE_ANIMATION_FORMATION_ERROR:
      return {
        ...state,
        thematiques_animation_formation: []
      };

    default:
      return state;
  }
}