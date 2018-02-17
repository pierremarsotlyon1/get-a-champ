/**
 * Created by pierremarsot on 21/02/2017.
 */
import {
  LOAD_NIVEAU_LANGUE_ERROR,
  LOAD_NIVEAU_LANGUE_SUCCESS,
} from '../actions/niveau_langue';

const initialState = {
  niveaux_langue: [],
};

export default function niveauLangue(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_NIVEAU_LANGUE_SUCCESS:
      const {niveaux_langue} = action;
      if(!niveaux_langue)
      {
        return {
          ...state,
          niveaux_langue: [],
        };
      }

      return {
        ...state,
        niveaux_langue: niveaux_langue,
      };

    case LOAD_NIVEAU_LANGUE_ERROR:
      return {
        ...state,
        niveaux_langue: [],
      };

    default:
      return state;
  }
}