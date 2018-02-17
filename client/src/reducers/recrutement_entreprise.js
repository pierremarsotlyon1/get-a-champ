/**
 * Created by pierremarsot on 09/03/2017.
 */
import {
  SEARCH_RECRUTEMENT_SPORTIF_ERROR,
  SEARCH_RECRUTEMENT_SPORTIF_SUCCESS,
  SET_METIER_RECHERCHE_SPORTIF,
} from '../actions/recrutement_entreprise';

const initialState = {
  sportifs: [],
  id_metier_recherche: undefined,
};

export default function recrutementEntreprise(state = initialState, action = {})
{
  switch(action.type)
  {
    case SEARCH_RECRUTEMENT_SPORTIF_SUCCESS:
      const {sportifs} = action;
      if(!sportifs)
      {
        return {
          ...state,
          sportifs: [],
        };
      }

      return {
        ...state,
        sportifs: sportifs,
      };

    case SEARCH_RECRUTEMENT_SPORTIF_ERROR:
      return {
        ...state,
        sportifs: [],
      };

    case SET_METIER_RECHERCHE_SPORTIF:
      const {id_metier_recherche} = action;

      return {
        ...state,
        id_metier_recherche: id_metier_recherche ? id_metier_recherche : undefined,
      };
    default:
      return state;
  }
}