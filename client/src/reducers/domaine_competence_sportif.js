/**
 * Created by pierremarsot on 31/01/2017.
 */

import {
  LOAD_DOMAINE_COMPETENCE_SPORTIF_ERROR,
  LOAD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS,
  ADD_DOMAINE_COMPETENCE_SPORTIF_ERROR,
  ADD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS,
  REMOVE_DOMAINE_COMPETENCE_SPORTIF_ERROR,
  REMOVE_DOMAINE_COMPETENCE_SPORTIF_SUCCESS
} from '../actions/domaine_competence_sportif';

let initialState = {
  domaines_competence_sportif: [],
};

export default function domainesCompetenceSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS:
      if(!action.domaines_competence_sportif)
      {
        return {
          ...state,
          domaines_competence_sportif: [],
        };
      }

      return {
        ...state,
        domaines_competence_sportif: action.domaines_competence_sportif,
      };
    case LOAD_DOMAINE_COMPETENCE_SPORTIF_ERROR:
      return {
        ...state,
        domaines_competence_sportif: [],
      };

    case ADD_DOMAINE_COMPETENCE_SPORTIF_SUCCESS:
      const {domaine_competence_sportif} = action;
      if(!domaine_competence_sportif)
      {
        return state;
      }

      return {
        ...state,
        domaines_competence_sportif: state.domaines_competence_sportif.concat(domaine_competence_sportif)
      };

    case ADD_DOMAINE_COMPETENCE_SPORTIF_ERROR:
      return state;

    case REMOVE_DOMAINE_COMPETENCE_SPORTIF_SUCCESS:
      const {id_domaine_competence_sportif} = action;
      
      if(!id_domaine_competence_sportif)
      {
        return state;
      }

      return {
        ...state,
        domaines_competence_sportif: state.domaines_competence_sportif.filter((domaine_competence_sportif) => {
          return domaine_competence_sportif.id_domaine_competence !== id_domaine_competence_sportif;
        })
      };

    case REMOVE_DOMAINE_COMPETENCE_SPORTIF_ERROR:
      return state;

    default:
      return state;
  }
};