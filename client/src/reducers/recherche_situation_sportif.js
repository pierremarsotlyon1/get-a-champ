/**
 * Created by pierremarsot on 25/02/2017.
 */
import {
  LOAD_RECHERCHE_SITUATION_SPORTIF_ERROR,
  LOAD_RECHERCHE_SITUATION_SPORTIF_SUCCESS,
} from '../actions/recherche_situation_sportif';

const initialState = {
  recherches_situations_sportif: [],
};

export default function rechercheSituationSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_RECHERCHE_SITUATION_SPORTIF_SUCCESS:
      const {recherches_situations_sportif} = action;
      if(!recherches_situations_sportif)
      {
        return {
          ...state,
          recherches_situations_sportif: [],
        };
      }

      return {
        ...state,
        recherches_situations_sportif: recherches_situations_sportif,
      };

    case LOAD_RECHERCHE_SITUATION_SPORTIF_ERROR:
      return {
        ...state,
        recherches_situations_sportif: [],
      };

    default:
      return state;
  }
}