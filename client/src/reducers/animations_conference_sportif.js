/**
 * Created by pierremarsot on 03/02/2017.
 */

import {
  LOAD_ANIMATION_CONFERENCE_SPORTIF_ERROR,
  LOAD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS,
  ADD_ANIMATION_CONFERENCE_SPORTIF_ERROR,
  ADD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS,
  REMOVE_ANIMATION_CONFERENCE_SPORTIF_ERROR,
  REMOVE_ANIMATION_CONFERENCE_SPORTIF_SUCCESS
} from '../actions/animations_conference_sportif';

const initialState = {
  animations_conference_sportif: [],
};

export default function animationsConferenceSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS:
      if(!action.animations_conference_sportif)
      {
        return state;
      }

      return {
        ...state,
        animations_conference_sportif: action.animations_conference_sportif
      };

    case LOAD_ANIMATION_CONFERENCE_SPORTIF_ERROR:
      return {
        ...state,
        animations_conference_sportif: [],
      };

    case ADD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS:
      if(!action.animation_conference)
      {
        return state;
      }

      return {
        ...state,
        animations_conference_sportif: state.animations_conference_sportif.concat(action.animation_conference),
      };

    case ADD_ANIMATION_CONFERENCE_SPORTIF_ERROR:
      return state;

    case REMOVE_ANIMATION_CONFERENCE_SPORTIF_SUCCESS:
      const { id_thematique_animation_conference } = action;
      if(!id_thematique_animation_conference)
      {
        return state;
      }

      return {
        ...state,
        animations_conference_sportif: state.animations_conference_sportif.filter((animation_conference_sportif) => {
          return animation_conference_sportif.id_thematique_animation_conference !== id_thematique_animation_conference;
        }),
      };

    case REMOVE_ANIMATION_CONFERENCE_SPORTIF_ERROR:
      return state;

    default:
      return state;
  }
}