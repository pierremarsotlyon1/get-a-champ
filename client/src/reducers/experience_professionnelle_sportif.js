/**
 * Created by pierremarsot on 20/01/2017.
 */

import {
  LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_SUCCESS,
  LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_ERROR,
  ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS,
  ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
  REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS,
  REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
  UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS,
  UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
  SET_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE,
  REMOVE_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE,
} from '../actions/experience_professionnelle_sportif';

const initialState = {
  experiences_professionnelles_sportif: [],
  experience_professionnelle_to_update: undefined,
};

export default function experience_professionnelle_sportif(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_SUCCESS:
      if(!action.experiences_professionnelles_sportif)
      {
        return state;
      }

      return {
        ...state,
        experiences_professionnelles_sportif: action.experiences_professionnelles_sportif,
      };

    case LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_ERROR:
      return {
        ...state,
        experiences_professionnelles_sportif: [],
      };

    case ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS:
      const experience_professionnelle_sportif = action.experience_professionnelle_sportif;
      if(!experience_professionnelle_sportif)
      {
        return state;
      }

      return {
        ...state,
        experiences_professionnelles_sportif:
          state.experiences_professionnelles_sportif.concat(experience_professionnelle_sportif),
      };

    case ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR:
      return state;

    case REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS:
      const { id_experience_professionnelle_sportif } = action;
      if (!id_experience_professionnelle_sportif) {
        return state;
      }

      return {
        ...state,
        experiences_professionnelles_sportif: state.experiences_professionnelles_sportif.filter((experience_pro) => {
          return experience_pro._id !== id_experience_professionnelle_sportif;
        }),
      };

    case REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR:
      return state;

    case UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS:
      const experience_professionnelle_sportif_updated = action.experience_professionnelle_sportif;
      if(!experience_professionnelle_sportif_updated)
      {
        return state;
      }

      return {
        ...state,
        experiences_professionnelles_sportif:
          state.experiences_professionnelles_sportif.map((experience_professionnelle_sportif) => {
            if(experience_professionnelle_sportif._id === experience_professionnelle_sportif_updated._id)
            {
              experience_professionnelle_sportif = experience_professionnelle_sportif_updated;
            }

            return experience_professionnelle_sportif
          }),
      };

    case UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR:
      return state;

    case SET_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE:
      const {experience_professionnelle_to_update} = action;

      if(!experience_professionnelle_to_update)
      {
        return {
          ...state,
          experience_professionnelle_to_update: undefined,
        };
      }

      return {
        ...state,
        experience_professionnelle_to_update: experience_professionnelle_to_update,
      };

    case REMOVE_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE:
      return {
        ...state,
        experience_professionnelle_to_update: undefined,
      };

    default:
      return state;
  }
}