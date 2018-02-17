/**
 * Created by pierremarsot on 03/02/2017.
 */

import {
  LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR,
  LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS,
  ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR,
  ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS,
  REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR,
  REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS,
} from '../actions/animations_incentive_evenementiel_sportif';

const initialState = {
  animations_incentive_evenementiel_sportif: [],
};

export default function animationsIncentiveEvenementielSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS:
      if(!action.animations_formation_incentive_evenementiel_sportif)
      {
        return state;
      }

      return {
        ...state,
        animations_incentive_evenementiel_sportif: action.animations_formation_incentive_evenementiel_sportif
      };

    case LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR:
      return {
        ...state,
        animations_incentive_evenementiel_sportif: [],
      };

    case ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS:
      if(!action.animation_incentive_sportif)
      {
        return state;
      }

      return {
        ...state,
        animations_incentive_evenementiel_sportif: state.animations_incentive_evenementiel_sportif.concat(action.animation_incentive_sportif),
      };

    case ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR:
      return state;

    case REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS:
      const { id_thematique_animation_incentive_evenementiel } = action;
      if(!id_thematique_animation_incentive_evenementiel)
      {
        return state;
      }

      return {
        ...state,
        animations_incentive_evenementiel_sportif: state.animations_incentive_evenementiel_sportif.filter((animation_incentive_sportif) => {
          return animation_incentive_sportif.id_thematique_animation_incentive_evenementiel !== id_thematique_animation_incentive_evenementiel;
        }),
      };

    case REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR:
      return state;

    default:
      return state;
  }
}