/**
 * Created by pierremarsot on 03/02/2017.
 */
import {
  LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_SUCCESS,
  LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_ERROR,
} from '../actions/thematique_animation_incentive_evenementiel';

const initialState = {
  thematiques_animation_incentive_evenementiel: []
};

export default function thematiqueAnimationIncentiveEvenementiel(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_SUCCESS:
      if (!action.thematiques_animation_incentive_evenementiel) {
        return state;
      }

      return {
        ...state,
        thematiques_animation_incentive_evenementiel: action.thematiques_animation_incentive_evenementiel,
      };

    case LOAD_THEMATIQUE_ANIMATION_INCENTIVE_EVENEMENTIEL_ERROR:
      return {
        ...state,
        thematiques_animation_incentive_evenementiel: []
      };

    default:
      return state;
  }
}