/**
 * Created by pierremarsot on 01/03/2017.
 */

import {
  SEARCH_SPORTIF_ANIMATION_CONFERENCE_ERROR,
  SEARCH_SPORTIF_ANIMATION_CONFERENCE_SUCCESS,
  INIT_SEARCH_SPORTIF_ANIMATION_CONFERENCE,
} from '../actions/search_sportif_animation_conference';

const initialState = {
  search_sportif_animation_conference: []
};

export default function searchSportifAnimationConference(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_SPORTIF_ANIMATION_CONFERENCE_SUCCESS:
      if (!action.search_sportif_animation_conference) {
        return state;
      }

      return {
        ...state,
        search_sportif_animation_conference: action.search_sportif_animation_conference,
      };

    case INIT_SEARCH_SPORTIF_ANIMATION_CONFERENCE:
    case SEARCH_SPORTIF_ANIMATION_CONFERENCE_ERROR:
      return {
        ...state,
        search_sportif_animation_conference: []
      };

    default:
      return state;
  }
}
