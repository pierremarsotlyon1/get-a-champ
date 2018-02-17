/**
 * Created by pierremarsot on 01/03/2017.
 */

import {
  SEARCH_SPORTIF_ANIMATION_INCENTIVE_ERROR,
  SEARCH_SPORTIF_ANIMATION_INCENTIVE_SUCCESS,
  INIT_SEARCH_SPORTIF_ANIMATION_INCENTIVE,
} from '../actions/search_sportif_animation_incentive';

const initialState = {
  search_sportif_animation_incentive: []
};

export default function searchSportifAnimationIncentive(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_SPORTIF_ANIMATION_INCENTIVE_SUCCESS:
      if (!action.search_sportif_animation_incentive) {
        return state;
      }

      return {
        ...state,
        search_sportif_animation_incentive: action.search_sportif_animation_incentive,
      };

    case INIT_SEARCH_SPORTIF_ANIMATION_INCENTIVE:
    case SEARCH_SPORTIF_ANIMATION_INCENTIVE_ERROR:
      return {
        ...state,
        search_sportif_animation_incentive: []
      };

    default:
      return state;
  }
}
