/**
 * Created by pierremarsot on 25/03/2017.
 */
import {
  ADD_OFFRE_EMPLOI_ENTREPRISE_SUCCESS,
  LOAD_OFFRES_EMPLOI_ENTREPRISE_ERROR,
  LOAD_OFFRES_EMPLOI_ENTREPRISE_SUCCESS,
  REMOVE_OFFRE_EMPLOI_ENTREPRISE_SUCCESS,
} from '../actions/offre_emploi_entreprise';

const initialState = {
  offres_emploi: [],
};

export default function offreEmploiEntreprise(state = initialState, action = {}){
  switch(action.type){
    case LOAD_OFFRES_EMPLOI_ENTREPRISE_SUCCESS:
      const {offres_emploi} = action;
      if(!offres_emploi){
        return {
          ...state,
          offres_emploi: [],
        };
      }

      return {
        ...state,
        offres_emploi: offres_emploi,
      };

    case LOAD_OFFRES_EMPLOI_ENTREPRISE_ERROR:
      return {
        ...state,
        offres_emploi: [],
      };

    case ADD_OFFRE_EMPLOI_ENTREPRISE_SUCCESS:
      const {offre_emploi} = action;
      if(!offre_emploi){
        return state;
      }

      return {
        ...state,
        offres_emploi: state.offres_emploi.concat(offre_emploi),
      };

    case REMOVE_OFFRE_EMPLOI_ENTREPRISE_SUCCESS:
      const {id_offre_emploi} = action;
      if(!id_offre_emploi)
      {
        return state;
      }

      return {
        ...state,
        offres_emploi: state.offres_emploi.filter((offre_emploi) => {
          return offre_emploi._id !== id_offre_emploi;
        }),
      };
    default:
      return state;
  }
}