/**
 * Created by pierremarsot on 04/02/2017.
 */
import {
  LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR,
  LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS,
  ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR,
  ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS,
  REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR,
  REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS,
  REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_WHEN_REMOVE_DOMAINE_COMPETENCE_SPORTIF,
} from '../actions/contrats_mission_entreprise_sportif';

const initialeState = {
  contrats_mission_entreprise_sportif: [],
};

export default function contratsMissionEntrepriseSportif(state = initialeState, action = {}) {
  switch (action.type) {
    case LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS:
      const {contracts_mission_entreprise_sportif} = action;
      if (!contracts_mission_entreprise_sportif) {
        return {
          ...state,
          contrats_mission_entreprise_sportif: [],
        };
      }

      return {
        ...state,
        contrats_mission_entreprise_sportif: contracts_mission_entreprise_sportif,
      };

    case LOAD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR:
      return {
        ...state,
        contrats_mission_entreprise_sportif: [],
      };

    case ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS:
      const {contrat_mission_entreprise_sportif} = action;
      if (!contrat_mission_entreprise_sportif) {
        return state;
      }

      return {
        ...state,
        contrats_mission_entreprise_sportif: state.contrats_mission_entreprise_sportif.concat(contrat_mission_entreprise_sportif),
      };

    case ADD_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR:
      return state;

    case REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_SUCCESS:
      const { id_domaine_connaissance_sportif } = action;
      if(!id_domaine_connaissance_sportif)
      {
        return state;
      }

      return {
        ...state,
        contrats_mission_entreprise_sportif: state.contrats_mission_entreprise_sportif.filter((contrats_mission_entreprise_sportif) => {
          return contrats_mission_entreprise_sportif.id_domaine_connaissance_sportif !== id_domaine_connaissance_sportif;
        }),
      };

    case REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_ERROR:
      return state;

    case REMOVE_CONTRATS_MISSION_ENTREPRISE_SPORTIF_WHEN_REMOVE_DOMAINE_COMPETENCE_SPORTIF:
      const id_domaine_connaissance_sportif_to_remove = action.id_domaine_connaissance_sportif;
      if(!id_domaine_connaissance_sportif_to_remove)
      {
        return state;
      }

      return {
        ...state,
        contrats_mission_entreprise_sportif: state.contrats_mission_entreprise_sportif.filter((contrats_mission_entreprise_sportif) => {
          return contrats_mission_entreprise_sportif.id_domaine_connaissance_sportif !== id_domaine_connaissance_sportif_to_remove;
        }),
      };

    default:
      return state;
  }
}

