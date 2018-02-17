/**
 * Created by pierremarsot on 31/01/2017.
 */

import {
  LOAD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS,
  LOAD_DOMAINE_CONNAISANCE_SPORTIF_ERROR,
  ADD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS,
  ADD_DOMAINE_CONNAISANCE_SPORTIF_ERROR,
  REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_ERROR,
  REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS,
} from '../actions/domaine_connaissance_sportif';

let initialState = {
  domaines_connaissance_sportif: [],
};

export default function domainesConnaissanceSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS:
      if(!action.domaines_connaissance_sportif)
      {
        return {
          ...state,
          domaines_connaissance_sportif: [],
        };
      }

      return {
        ...state,
        domaines_connaissance_sportif: action.domaines_connaissance_sportif,
      };
    case LOAD_DOMAINE_CONNAISANCE_SPORTIF_ERROR:
      return {
        ...state,
        domaines_connaissance_sportif: [],
      };

    case ADD_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS:
      const domaine_connaissance_sportif = action.domaine_connaissance_sportif;
      if(!domaine_connaissance_sportif)
      {
        return state;
      }

      return {
        ...state,
        domaines_connaissance_sportif: state.domaines_connaissance_sportif.concat(domaine_connaissance_sportif)
      };

    case ADD_DOMAINE_CONNAISANCE_SPORTIF_ERROR:
      return state;

    case REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_SUCCESS:
      const id_domaine_connaissance_sportif = action.id_domaine_connaissance_sportif;
      if(!id_domaine_connaissance_sportif)
      {
        return state;
      }

      return {
        ...state,
        domaines_connaissance_sportif: state.domaines_connaissance_sportif.filter((domaine_connaissance_sportif) => {
          return domaine_connaissance_sportif.id_domaine_connaissance !== id_domaine_connaissance_sportif;
        })
      };

    case REMOVE_DOMAINE_CONNAISSANCE_SPORTIF_ERROR:
      return state;

    default:
      return state;
  }
};