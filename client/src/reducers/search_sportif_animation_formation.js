/**
 * Created by pierremarsot on 01/03/2017.
 */

import {
  SEARCH_SPORTIF_ANIMATION_FORMATION_ERROR,
  SEARCH_SPORTIF_ANIMATION_FORMATION_SUCCESS,
  INIT_SEARCH_SPORTIF_ANIMATION_FORMATION,
} from '../actions/search_sportif_animation_formation';

const initialState = {
  search_sportif_animation_formation: []
};

export default function searchSportifAnimationFormation(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_SPORTIF_ANIMATION_FORMATION_SUCCESS:
      if (!action.search_sportif_animation_formation) {
        return state;
      }
      
      return {
        ...state,
        search_sportif_animation_formation: action.search_sportif_animation_formation,
      };

    case INIT_SEARCH_SPORTIF_ANIMATION_FORMATION:
    case SEARCH_SPORTIF_ANIMATION_FORMATION_ERROR:
      return {
        ...state,
        search_sportif_animation_formation: []
      };

    default:
      return state;
  }
}