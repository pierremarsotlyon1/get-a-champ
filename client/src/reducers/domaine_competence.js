/**
 * Created by pierremarsot on 30/03/2017.
 */
import {
  SEARCH_DOMAINES_COMPETENCE_ERROR,
  SEARCH_DOMAINES_COMPETENCE_SUCCESS,
} from '../actions/domaine_competence';

const initialState = {
  domaines_competences: [],
};

export default function domaineCompetence(state = initialState, action = {}){
  switch(action.type){
    case SEARCH_DOMAINES_COMPETENCE_SUCCESS:
      const {domaines_competences} = action;
      if(!domaines_competences){
        return {
          ...state,
          domaines_competences: []
        };
      }
      
      return {
        ...state,
        domaines_competences: domaines_competences,
      };

    case SEARCH_DOMAINES_COMPETENCE_ERROR:
      return {
        ...state,
        domaines_competences: []
      };

    default:
      return state;
  }
}