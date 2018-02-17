/**
 * Created by pierremarsot on 24/02/2017.
 */
import {
  LOAD_PROFIL_ENTREPRISE_ERROR,
  LOAD_PROFIL_ENTREPRISE_SUCCESS,
  UPDATE_PROFIL_ENTREPRISE_ERROR,
  UPDATE_PROFIL_ENTREPRISE_SUCCESS,
} from '../actions/profil_entreprise';

const initialState = {
  profil_entreprise: undefined,
};

export default function profilEntreprise(state = initialState, action = {})
{
  let profil_entreprise;

  switch(action.type)
  {
    case LOAD_PROFIL_ENTREPRISE_SUCCESS:
      profil_entreprise = action.profil_entreprise;
      if(!profil_entreprise)
      {
        return {
          ...state,
          profil_entreprise: undefined,
        };
      }

      return {
        ...state,
        profil_entreprise: profil_entreprise,
      };

    case LOAD_PROFIL_ENTREPRISE_ERROR:
      return {
        ...state,
        profil_entreprise: undefined,
      };

    case UPDATE_PROFIL_ENTREPRISE_SUCCESS:
      profil_entreprise = action.profil_entreprise;
      if(!profil_entreprise)
      {
        return state;
      }

      return {
        ...state,
        profil_entreprise: profil_entreprise,
      };

    case UPDATE_PROFIL_ENTREPRISE_ERROR:
      return state;

    default:
      return state;
  }
}