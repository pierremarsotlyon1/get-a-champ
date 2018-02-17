/**
 * Created by pierremarsot on 28/03/2017.
 */
import {
  LOAD_SALAIRES_ERROR,
  LOAD_SALAIRES_SUCCESS
} from '../actions/salaire';

const initialState = {
  salaires: [],
};

export default function salaire(state = initialState, action = {}){
  switch(action.type){
    case LOAD_SALAIRES_SUCCESS:
      const {salaires} = action;
      if(!salaires){
        return {
          ...state,
          salaires: [],
        };
      }

      return {
        ...state,
        salaires: salaires,
      };

    case LOAD_SALAIRES_ERROR:
      return {
        ...state,
        salaires: [],
      };

    default:
      return state;
  }
}