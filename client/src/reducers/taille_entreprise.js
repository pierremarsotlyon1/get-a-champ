/**
 * Created by pierremarsot on 24/02/2017.
 */
import {
  LOAD_TAILLE_ENTREPRISE_ERROR,
  LOAD_TAILLE_ENTREPRISE_SUCCESS,
} from '../actions/taille_entreprise';

const initialState = {
  tailles_entreprise: [],
};

export default function tailleEntreprise(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_TAILLE_ENTREPRISE_SUCCESS:
      const {tailles_entreprise} = action;
      if(!tailles_entreprise)
      {
        return {
          ...state,
          tailles_entreprise: [],
        };
      }

      return {
        ...state,
        tailles_entreprise: tailles_entreprise,
      };

    case LOAD_TAILLE_ENTREPRISE_ERROR:
      return {
        ...state,
        tailles_entreprise: [],
      };

    default:
      return state;
  }
}