/**
 * Created by pierremarsot on 01/02/2017.
 */

import {
  LOAD_ANIMATION_FORMATION_SPORTIF_SUCCESS,
  LOAD_ANIMATION_FORMATION_SPORTIF_ERROR,
  ADD_ANIMATION_FORMATION_SPORTIF_SUCCESS,
  ADD_ANIMATION_FORMATION_SPORTIF_ERROR,
  REMOVE_ANIMATION_FORMATION_SPORTIF_SUCCESS,
  REMOVE_ANIMATION_FORMATION_SPORTIF_ERROR,
} from '../actions/animations_formation_sportif';

const initialState = {
  animations_formation_sportif: [],
};

export default function animationsFormationSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_ANIMATION_FORMATION_SPORTIF_SUCCESS:
      if(!action.animations_formation_sportif)
      {
        return state;
      }

      return {
        ...state,
        animations_formation_sportif: action.animations_formation_sportif
      };

    case LOAD_ANIMATION_FORMATION_SPORTIF_ERROR:
      return {
        ...state,
        animations_formation_sportif: [],
      };

    case ADD_ANIMATION_FORMATION_SPORTIF_SUCCESS:
      if(!action.animation_formation_sportif)
      {
        return state;
      }

      return {
        ...state,
        animations_formation_sportif: state.animations_formation_sportif.concat(action.animation_formation_sportif),
      };

    case ADD_ANIMATION_FORMATION_SPORTIF_ERROR:
      return state;

    case REMOVE_ANIMATION_FORMATION_SPORTIF_SUCCESS:
      const { id_thematique_animation_formation } = action;
      if(!id_thematique_animation_formation)
      {
        return state;
      }

      return {
        ...state,
        animations_formation_sportif: state.animations_formation_sportif.filter((animation_formation_sportif) => {
          return animation_formation_sportif.id_thematique_animation_formation !== id_thematique_animation_formation;
        }),
      };

    case REMOVE_ANIMATION_FORMATION_SPORTIF_ERROR:
      return state;

    default:
      return state;
  }
}