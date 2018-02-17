/**
 * Created by pierremarsot on 22/02/2017.
 */
import {
  LOAD_SITUATION_ENTREPRISE_ERROR,
  LOAD_SITUATION_ENTREPRISE_SUCCESS,
} from '../actions/situation_entreprise';

const initialState = {
  situations_entreprise: [],
};

export default function situationEntreprise(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_SITUATION_ENTREPRISE_SUCCESS:
      const {situations_entreprise} = action;
      if(!situations_entreprise)
      {
        return {
          ...state,
          situations_entreprise: [],
        };
      }

      return {
        ...state,
        situations_entreprise: situations_entreprise,
      };

    case LOAD_SITUATION_ENTREPRISE_ERROR:
      return {
        ...state,
        situations_entreprise: [],
      };

    default:
      return state;
  }
}