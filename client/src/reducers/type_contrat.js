/**
 * Created by pierremarsot on 25/03/2017.
 */
import {
  LOAD_TYPES_CONTRAT_ERROR,
  LOAD_TYPES_CONTRAT_SUCCESS,
} from '../actions/type_contrat';

const initialState = {
  types_contrat: [],
};

export default function typeContrat(state = initialState, action = {}){
  switch(action.type){
    case LOAD_TYPES_CONTRAT_SUCCESS:
      const {types_contrat} = action;
      if(!types_contrat){
        return {
          ...state,
          types_contrat: [],
        };
      }

      return {
        ...state,
        types_contrat: types_contrat,
      };

    case LOAD_TYPES_CONTRAT_ERROR:
      return {
        ...state,
        types_contrat: [],
      };

    default:
      return state;
  }
}