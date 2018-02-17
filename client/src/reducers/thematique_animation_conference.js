/**
 * Created by pierremarsot on 01/02/2017.
 */

import {
  LOAD_THEMATIQUE_ANIMATION_CONFERENCE_ERROR,
  LOAD_THEMATIQUE_ANIMATION_CONFERENCE_SUCCESS
} from '../actions/thematique_animation_conference';

const initialState = {
  thematiques_animation_conference: []
};

export default function thematiqueAnimationConference(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_THEMATIQUE_ANIMATION_CONFERENCE_SUCCESS:
      if (!action.thematiques_animation_conference) {
        return state;
      }

      return {
        ...state,
        thematiques_animation_conference: action.thematiques_animation_conference,
      };

    case LOAD_THEMATIQUE_ANIMATION_CONFERENCE_ERROR:
      return {
        ...state,
        thematiques_animation_conference: []
      };

    default:
      return state;
  }
}