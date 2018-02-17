/**
 * Created by pierremarsot on 31/01/2017.
 */
import {
  LOAD_DOMAINE_CONNAISSANCE_SUCCESS,
  LOAD_DOMAINE_CONNAISSANCE_ERROR,
  SEARCH_DOMAINES_CONNAISSANCE_ERROR,
  SEARCH_DOMAINES_CONNAISSANCE_SUCCESS,
} from '../actions/domaine_connaissance';

let initialState = {
  domaines_connaissances: [],
};

export default function domainesConnaissance(state = initialState, action = {})
{
  switch(action.type)
  {
    case SEARCH_DOMAINES_CONNAISSANCE_SUCCESS:
    case LOAD_DOMAINE_CONNAISSANCE_SUCCESS:
      if(!action.domaines_connaissances)
      {
        return {
          ...state,
          domaines_connaissances: [],
        };
      }

      return {
        ...state,
        domaines_connaissances: action.domaines_connaissances,
      };

    case SEARCH_DOMAINES_CONNAISSANCE_ERROR:
    case LOAD_DOMAINE_CONNAISSANCE_ERROR:
      return {
        ...state,
        domaines_connaissances: [],
      };

    default:
      return state;
  }
};