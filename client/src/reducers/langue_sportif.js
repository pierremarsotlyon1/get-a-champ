/**
 * Created by pierremarsot on 22/02/2017.
 */
import {
  LOAD_LANGUE_SPORTIF_ERROR,
  LOAD_LANGUE_SPORTIF_SUCCESS,
  ADD_LANGUE_SPORTIF_ERROR,
  ADD_LANGUE_SPORTIF_SUCCESS,
  REMOVE_LANGUE_SPORTIF_ERROR,
  REMOVE_LANGUE_SPORTIF_SUCCESS,
} from '../actions/langue_sportif';

const initialeState = {
  langues_sportif: [],
};

export default function languesSportif(state = initialeState, action = {})
{
  switch(action.type)
  {
    case LOAD_LANGUE_SPORTIF_SUCCESS:
      const {langues_sportif} = action;
      if(!langues_sportif)
      {
        return {
          ...state,
          langues_sportif: [],
        };
      }

      return {
        ...state,
        langues_sportif: langues_sportif,
      };

    case LOAD_LANGUE_SPORTIF_ERROR:
      return {
        ...state,
        langues_sportif: [],
      };

    case ADD_LANGUE_SPORTIF_SUCCESS:
      const {langue_sportif} = action;
      if(!langue_sportif)
      {
        return state;
      }

      return {
        ...state,
        langues_sportif: state.langues_sportif.concat(langue_sportif),
      };

    case ADD_LANGUE_SPORTIF_ERROR:
      return state;

    case REMOVE_LANGUE_SPORTIF_SUCCESS:
      const {id_langue} = action;
      if(!id_langue)
      {
        return state;
      }

      return {
        ...state,
        langues_sportif: state.langues_sportif.filter((langue_sportif) => {
          if(!langue_sportif.langue)
          {
            return false;
          }

          return langue_sportif.langue._id !== id_langue;
        }),
      };

    case REMOVE_LANGUE_SPORTIF_ERROR:
      return state;

    default:
      return state;
  }
}