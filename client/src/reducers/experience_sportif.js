/**
 * Created by pierremarsot on 21/01/2017.
 */

import {
  LOAD_EXPERIENCES_SPORTIF_SUCCESS,
  REMOVE_EXPERIENCE_SPORTIF_SUCCESS,
  ADD_EXPERIENCE_SPORTIF_SUCCESS,
  ADD_EXPERIENCE_SPORTIF_ERROR,
  CLOSE_MODAL_UPDATE_EXPERIENCE,
  OPEN_MODAL_UPDATE_EXPERIENCE,
  UPDATE_EXPERIENCE_SUCCESS,
} from '../actions/experience_sportif';
const initialState = {
  experiences_sportif: [],
  experience_sportif_update: undefined,
};

export default function experience_sportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_EXPERIENCES_SPORTIF_SUCCESS:
      return {
        ...state,
        experiences_sportif: action.experiences_sportif,
      };

    case REMOVE_EXPERIENCE_SPORTIF_SUCCESS:
      const id_experience_sportif = action.id_experience_sportif;
      if (!id_experience_sportif) {
        return state;
      }

      return {
        ...state,
        experiences_sportif: state.experiences_sportif.filter((experience) => {
          return experience._id !== id_experience_sportif;
        }),
      };

    case ADD_EXPERIENCE_SPORTIF_SUCCESS:
      if (!action.experience) {
        return state;
      }

      return Object.assign({}, state, {
        experiences_sportif: state.experiences_sportif.concat(action.experience)
      });

    case ADD_EXPERIENCE_SPORTIF_ERROR:
      return state;

    case CLOSE_MODAL_UPDATE_EXPERIENCE:
      return {
        ...state,
        experience_sportif_update: undefined,
      };

    case OPEN_MODAL_UPDATE_EXPERIENCE:
      const id_experience = action.id_experience;
      const experience = state.experiences_sportif.find((experience) => {
        return experience._id === id_experience;
      });

      return {
        ...state,
        experience_sportif_update: experience
      };

    case UPDATE_EXPERIENCE_SUCCESS:
      const experience_success = action.experience;
      if (!experience_success) {
        return {
          ...state,
          experience_sportif_update: undefined,
        }
      }

      return {
        ...state,
        experiences_sportif: state.experiences_sportif.map((element) => {
          if (element._id === experience_success._id) {
            element = experience_success;
          }

          return element;
        }),
        experience_sportif_update: undefined,
      };
    default:
      return state;
  }
}