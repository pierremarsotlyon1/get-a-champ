/**
 * Created by pierremarsot on 31/01/2017.
 */

import {
  LOAD_NIVEAU_DOMAINE_CONNAISSANCE_SUCCESS,
  LOAD_NIVEAU_DOMAINE_CONNAISSANCE_ERROR,
} from '../actions/niveau_domaine_connaissance';

let initialState = {
  niveaux_domaine_connaissance: [],
};

export default function niveauDomaineConnaissance(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_NIVEAU_DOMAINE_CONNAISSANCE_SUCCESS:
      if(!action.niveaux_domaine_connaissance)
      {
        return state;
      }

      return {
        ...state,
        niveaux_domaine_connaissance: action.niveaux_domaine_connaissance,
      };
    case LOAD_NIVEAU_DOMAINE_CONNAISSANCE_ERROR:
      return {
        ...state,
        niveaux_domaine_connaissance: [],
      };
    default:
      return state;
  }
};