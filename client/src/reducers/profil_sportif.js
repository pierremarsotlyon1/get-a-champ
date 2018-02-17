/**
 * Created by pierremarsot on 13/01/2017.
 */
import {
  SEARCH_SPORT_SUCCESS, SEARCH_SPORT_ERROR,
  CATEGORIE_SPORTIF_ERROR, CATEGORIE_SPORTIF_SUCCESS,
  GET_PROFIL_SPORTIF_ERROR, GET_PROFIL_SPORTIF_SUCCESS,
  GET_SITUATION_SPORTIF_ERROR, GET_SITUATION_SPORTIF_SUCCESS,
  GET_CENTRES_INTERET_SUCCESS, GET_CENTRES_INTERET_ERROR,
  UPDATE_PROFIL_SPORTIF_SUCCESS, UPDATE_PROFIL_SPORTIF_ERROR,
  CHANGE_NOM_SPORTIF, CHANGE_PRENOM_SPORTIF, CHANGE_DATE_NAISSANCE_SPORTIF, CHANGE_LIEU_NAISSANCE_SPORTIF,
  CHANGE_CURRENT_SPORT_SPORTIF, CHANGE_SITUATION_SPORTIF, CHANGE_CATEGORIE_SPORTIF, CHANGE_CENTRE_INTERET_SPORTIF,
  CHANGE_NUMERO_SS_SPORTIF,
  LOAD_NIVEAUX_COMPETITION_SUCCESS, LOAD_NIVEAUX_COMPETITION_ERROR,
} from '../actions/profil_sportif';

let initialState = {};

function initState() {
  initialState = {
    profil_sportif: undefined,
    search_sports: [],
    categories_sportif: [],
    situation_sportif: [],
    centres_interet: [],
    current_nom_sportif: '',
    current_prenom_sportif: '',
    current_date_naissance_sportif: new Date(),
    current_lieu_naissance_sportif: undefined,
    value_geosuggest: default_value_geosuggest(),
    current_numero_ss_sportif: '',
    current_sport_sportif: undefined,
    current_categorie_sportif: undefined,
    current_situation_sportif: undefined,
    current_centre_interet: [],
    niveaux_competition: [],
    value_geosuggest_competition: default_value_geosuggest(),
    value_sport_competition: undefined,
    value_niveau_competition: undefined,
    value_date_debut_competition: undefined,
    value_date_fin_competition: undefined,
    value_rang_competition: undefined,
    competitions_sportif: [],
    value_geosuggest_experience: default_value_geosuggest(),
    value_sport_experience: undefined,
    value_date_debut_experience: undefined,
    value_date_fin_experience: undefined,
    value_description_experience: undefined,
    experiences_sportif: [],
    id_current_update: undefined,
    competition_sportif_update: undefined,
  };
}

initState();

export default function profil_sportif(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_SPORT_SUCCESS:
      if (!action.sports) {
        return {
          ...state,
          search_sports: [],
        };
      }

      /*let search_sports = [];
      for (const sport of action.sports) {
        search_sports.push({
          label: sport._source.nom_sport,
          value: sport._id,
        });
      }*/

      return {
        ...state,
        search_sports: action.sports,
      };

    case SEARCH_SPORT_ERROR:
      return {
        ...state,
        search_sports: [],
      };

    case CATEGORIE_SPORTIF_ERROR:
      return {
        ...state,
        categories_sportif: [],
      };

    case CATEGORIE_SPORTIF_SUCCESS:
      if (!action.categories_sportif) {
        return {
          ...state,
          categories_sportif: []
        };
      }

      /*let tab_categories_sportif = [];
      for (const x of action.categories_sportif) {
        tab_categories_sportif.push({
          value: x._id,
          label: x.nom_categorie_sportif,
        });
      }*/

      return {
        ...state,
        categories_sportif: action.categories_sportif,
      };

    case GET_PROFIL_SPORTIF_ERROR:
      return {
        ...state,
        profil_sportif: default_profil_sportif(),
      };

    case GET_PROFIL_SPORTIF_SUCCESS:
      if (!action || !action.profil_sportif) {
        return {
          ...state,
          profil_sportif: default_profil_sportif(),
        };
      }

      return {
        ...state,
        profil_sportif: action.profil_sportif
      };

    case GET_SITUATION_SPORTIF_ERROR:
      return {
        ...state,
        categories_sportif: [],
      };

    case GET_SITUATION_SPORTIF_SUCCESS:
      if (!action.situation_sportif) {
        return {
          ...state,
          situation_sportif: [],
        };
      }

      /*let situation_sportif = [];
      for (const categorie of action.situation_sportif) {
        situation_sportif.push({
          value: categorie._id,
          label: categorie._source.nom_situation_sportif
        });
      }*/

      return {
        ...state,
        situation_sportif: action.situation_sportif,
      };

    case GET_CENTRES_INTERET_ERROR:
      return {
        ...state,
        centres_interet: []
      };

    case GET_CENTRES_INTERET_SUCCESS:
      /*let centres_interet = [];
      for (const centre_interet of action.centres_interet) {
        centres_interet.push({
          value: centre_interet._id,
          label: centre_interet._source.nom_centre_interet,
        });
      }*/
      if(!action.centres_interet || action.centres_interet.length === 0){
        return {
          ...state,
          centres_interet: [],
        };
      }

      return {
        ...state,
        centres_interet: action.centres_interet,
      };

    case UPDATE_PROFIL_SPORTIF_SUCCESS:
      const {profil_sportif} = action;

      if(!profil_sportif)
      {
        return state;
      }

      return {
        ...state,
        profil_sportif: profil_sportif,
      };

    case UPDATE_PROFIL_SPORTIF_ERROR:
      return state;

    case CHANGE_NOM_SPORTIF:
      return Object.assign({}, state, {
        profil_sportif: {
          nom_sportif : action.nom_sportif
        }
      });

    case CHANGE_PRENOM_SPORTIF:
      return {
        ...state,
        current_prenom_sportif: action.prenom_sportif,
      };

    case CHANGE_DATE_NAISSANCE_SPORTIF:
      return {
        ...state,
        current_date_naissance_sportif: action.date_naissance_sportif,
      };

    case CHANGE_LIEU_NAISSANCE_SPORTIF:
      const geosuggest = action.geosuggest;

      if (!geosuggest || !geosuggest.location || !geosuggest.location.lat || !geosuggest.location.lng || !geosuggest.label) {
        return {
          ...state,
          current_lieu_naissance_sportif: undefined,
          value_geosuggest: default_value_geosuggest(),
        };
      }

      return {
        ...state,
        current_lieu_naissance_sportif: {
          location: {
            lat: geosuggest.location.lat,
            lon: geosuggest.location.lng,
          },
          nom: geosuggest.label,
        },
      };

    case CHANGE_CURRENT_SPORT_SPORTIF:
      return {
        ...state,
        current_sport_sportif: action.sport_sportif,
      };

    case CHANGE_CATEGORIE_SPORTIF:
      return {
        ...state,
        current_categorie_sportif: action.categorie_sport_sportif,
      };

    case CHANGE_SITUATION_SPORTIF:
      return {
        ...state,
        current_situation_sportif: action.situation_sportif,
      };

    case CHANGE_CENTRE_INTERET_SPORTIF:
      return {
        ...state,
        current_centre_interet: action.centres_interet,
      };

    case CHANGE_NUMERO_SS_SPORTIF:
      return {
        ...state,
        current_numero_ss_sportif: action.numero_ss_sportif,
      };

    case LOAD_NIVEAUX_COMPETITION_SUCCESS:
      if(!action.niveaux_competition){
        return {
          ...state,
          niveaux_competition: [],
        };
      }

      return {
        ...state,
        niveaux_competition: action.niveaux_competition,
      };

    case LOAD_NIVEAUX_COMPETITION_ERROR:
      return {
        ...state,
        niveaux_competition: [],
      };

    default:
      return state;
  }
}

function default_profil_sportif() {
  return {
    nom_sportif: undefined,
    prenom_sportif: undefined,
    date_naissance_sportif: undefined,
    lieu_naissance_sportif: undefined,
    numero_ss_sportif: undefined,
    current_sport_sportif: undefined,
    categorie_sportif: undefined,
    situation_sportif: undefined,
    centres_interets_sportif: [],
  };
}

export function default_value_geosuggest() {
  return {
    lat: () => {
      return null;
    },
    lng: () => {
      return null;
    }
  };
}