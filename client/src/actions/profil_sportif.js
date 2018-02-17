/**
 * Created by pierremarsot on 13/01/2017.
 */
import {getApi, putApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';
import {isNumberSSValide} from '../utils/ManagerMask';

export const SEARCH_SPORT_SUCCESS = 'SEARCH_SPORT_SUCCESS';
export const SEARCH_SPORT_ERROR = 'SEARCH_SPORT_ERROR';

export const CATEGORIE_SPORTIF_SUCCESS = 'CATEGORIE_SPORTIF_SUCCESS';
export const CATEGORIE_SPORTIF_ERROR = 'CATEGORIE_SPORTIF_ERROR';

export const GET_PROFIL_SPORTIF_SUCCESS = 'GET_PROFIL_SPORTIF_SUCCESS';
export const GET_PROFIL_SPORTIF_ERROR = 'GET_PROFIL_SPORTIF_ERROR';

export const GET_SITUATION_SPORTIF_SUCCESS = 'GET_SITUATION_SPORTIF_SUCCESS';
export const GET_SITUATION_SPORTIF_ERROR = 'GET_SITUATION_SPORTIF_ERROR';

export const GET_CENTRES_INTERET_SUCCESS = 'GET_CENTRES_INTERET_SUCCESS';
export const GET_CENTRES_INTERET_ERROR = 'GET_CENTRES_INTERET_ERROR';

export const UPDATE_PROFIL_SPORTIF_SUCCESS = 'UPDATE_PROFIL_SPORTIF_SUCCESS';
export const UPDATE_PROFIL_SPORTIF_ERROR = 'UPDATE_PROFIL_SPORTIF_ERROR';

export const CHANGE_NOM_SPORTIF = 'CHANGE_NOM_SPORTIF';
export const CHANGE_PRENOM_SPORTIF = 'CHANGE_PRENOM_SPORTIF';
export const CHANGE_DATE_NAISSANCE_SPORTIF = 'CHANGE_DATE_NAISSANCE_SPORTIF';
export const CHANGE_LIEU_NAISSANCE_SPORTIF = 'CHANGE_LIEU_NAISSANCE_SPORTIF';
export const CHANGE_CURRENT_SPORT_SPORTIF = 'CHANGE_CURRENT_SPORT_SPORTIF';
export const CHANGE_CATEGORIE_SPORTIF = 'CHANGE_CATEGORIE_SPORTIF';
export const CHANGE_SITUATION_SPORTIF = 'CHANGE_SITUATION_SPORTIF';
export const CHANGE_CENTRE_INTERET_SPORTIF = 'CHANGE_CENTRE_INTERET_SPORTIF';
export const CHANGE_NUMERO_SS_SPORTIF = 'CHANGE_NUMERO_SS_SPORTIF';

export const LOAD_NIVEAUX_COMPETITION_SUCCESS = 'LOAD_NIVEAUX_COMPETITION_SUCCESS';
export const LOAD_NIVEAUX_COMPETITION_ERROR = 'LOAD_NIVEAUX_COMPETITION_ERROR';

export const LOAD_COMPETITION_SPORTIF_SUCCESS = 'LOAD_COMPETITION_SPORTIF_SUCCESS';
export const LOAD_COMPETITION_SPORTIF_ERROR = 'LOAD_COMPETITION_SPORTIF_ERROR';

function search_sport_success(payload) {
  if (!payload || !payload.sports) {
    return search_sport_error({
      error: 'Erreur lors de la récupération des sports'
    });
  }

  return {
    type: SEARCH_SPORT_SUCCESS,
    sports: payload.sports,
  };
}

function search_sport_error(payload) {
  return {
    type: SEARCH_SPORT_ERROR,
    error: payload,
  };
}

export function search_sport(sport) {
  return dispatch => {
    if (!sport || sport.length === 0) {
      const error = 'Vous devez spécifier un sport';
      dispatch(search_sport_error({
        error: error
      }));
      return dispatch(send_error_message(error));
    }

    getApi('/sport/' + sport, {})
      .then((data_response, response, query) => {
        return dispatch(search_sport_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(search_sport_error(data_response, response, query));
        return dispatch(send_error_message(data_response.error));
      });
  };
  //return getApi('/sport/' + sport, {}, search_sport_success, search_sport_error);
}

function categorie_sportif_success(payload) {
  if (!payload || !payload.categories_sportif) {
    return categorie_sportif_error({
      error: 'Erreur lors de la récupération des catégories de sportif'
    });
  }

  return {
    type: CATEGORIE_SPORTIF_SUCCESS,
    categories_sportif: payload.categories_sportif
  };
}

function categorie_sportif_error(payload) {

  return {
    type: CATEGORIE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_categorie_sportif() {
  return dispatch => {
    getApi('/categorie_sportif', {})
      .then((data_response, response, query) => {
        return dispatch(categorie_sportif_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(categorie_sportif_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };


  //return getApi('/categorie_sportif', {}, categorie_sportif_success, categorie_sportif_error);
}

function get_profil_sportif_success(payload) {
  if (!payload) {
    return {
      type: GET_PROFIL_SPORTIF_ERROR,
      error: 'Erreur lors de la récupération des informations de votre profil',
    };
  }

  return {
    type: GET_PROFIL_SPORTIF_SUCCESS,
    profil_sportif: payload.profil_sportif,
  };
}

function get_profil_sportif_error(payload) {
  if (!payload || !payload.error) {
    return {
      type: GET_PROFIL_SPORTIF_ERROR,
      error: 'Erreur lors de la récupération des informations de votre profil',
    };
  }

  return {
    type: GET_PROFIL_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function get_profil_sportif() {
  return dispatch => {
    getApi("/api/user/sportif", {})
      .then((data_response, response, query) => {
        return dispatch(get_profil_sportif_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(get_profil_sportif_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
  //return getApi("/api/user/sportif", {}, get_profil_sportif_success, get_profil_sportif_error);
}

function get_situation_sportif_success(payload) {
  if (!payload) {
    return get_situation_sportif_error({
      error: 'Erreur lors de la récupération de la liste des catégories sportives'
    });
  }

  return {
    type: GET_SITUATION_SPORTIF_SUCCESS,
    situation_sportif: payload.situation_sportif,
  };
}

function get_situation_sportif_error(payload) {
  return {
    type: GET_SITUATION_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function get_situation_sportif() {
  return dispatch => {
    getApi("/situation_sportif", {})
      .then((data_response, response, query) => {
        return dispatch(get_situation_sportif_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(get_situation_sportif_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
  //return getApi("/situation_sportif", {}, get_situation_sportif_success, get_situation_sportif_error);
}

function get_centres_interet_success(payload) {
  if (!payload) {
    return get_centres_interet_error({
      error: 'Erreur lors de la récupération des centres d\'interet'
    });
  }

  return {
    type: GET_CENTRES_INTERET_SUCCESS,
    centres_interet: payload.centres_interet,
  };
}

function get_centres_interet_error(payload) {
  return {
    type: GET_CENTRES_INTERET_ERROR,
    error: payload.error,
  };
}

export function get_centres_interet() {
  return dispatch => {
    getApi('/centres_interet', {})
      .then((data_response, response, query) => {
        return dispatch(get_centres_interet_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(get_centres_interet_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
  //return getApi('/centres_interet', {}, get_centres_interet_success, get_centres_interet_error);
}

function update_profil_sportif_success(profil_sportif) {
  return {
    type: UPDATE_PROFIL_SPORTIF_SUCCESS,
    profil_sportif: profil_sportif,
  }
}

function update_profil_sportif_error() {
  return {
    type: UPDATE_PROFIL_SPORTIF_ERROR
  };
}

export function update_profil_sportif(profil_sportif) {
  return dispatch => {
    let error;

    if(!profil_sportif)
    {
      error = 'Erreur lors de la récupération de votre profil';
      dispatch(update_profil_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!profil_sportif.nom_sportif) {
      error = 'Vous devez spécifier un nom';

      dispatch(update_profil_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    //On regarde si on a un numéro ss
    if(profil_sportif.numero_ss_sportif)
    {
      //On regarde si le numéro est au bon format
      const valideNumeroSs = isNumberSSValide(profil_sportif.numero_ss_sportif);

      if(!valideNumeroSs)
      {
        dispatch(update_profil_sportif_error());
        return dispatch(send_error_message('Votre numéro de sécurité social n\'est pas au bon format'));
      }
    }

    putApi("/api/user/sportif", profil_sportif)
      .then(() => {
        dispatch(update_profil_sportif_success(profil_sportif));
        dispatch(send_success_message('Votre profil a bien été mis à jour'));
      })
      .catch((data_response, response, query) => {
        dispatch(update_profil_sportif_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
}

export function change_nom_sportif(nom_sportif) {
  return {
    type: CHANGE_NOM_SPORTIF,
    nom_sportif: nom_sportif,
  };
}

export function change_prenom_sportif(prenom_sportif) {
  return {
    type: CHANGE_PRENOM_SPORTIF,
    prenom_sportif: prenom_sportif,
  };
}

export function change_date_naissance_sportif(date_naissance_sportif) {
  return {
    type: CHANGE_DATE_NAISSANCE_SPORTIF,
    date_naissance_sportif: date_naissance_sportif
  };
}

export function change_lieu_naissance_sportif(geosuggest) {
  return {
    type: CHANGE_LIEU_NAISSANCE_SPORTIF,
    geosuggest: geosuggest,
  };
}

export function change_sport_sportif(sport_sportif) {
  return {
    type: CHANGE_CURRENT_SPORT_SPORTIF,
    sport_sportif: sport_sportif,
  };
}

export function change_categorie_sport_sportif(categorie_sport_sportif) {
  return {
    type: CHANGE_CATEGORIE_SPORTIF,
    categorie_sport_sportif: categorie_sport_sportif,
  };
}

export function change_situation_sportif(situation_sportif) {
  return {
    type: CHANGE_SITUATION_SPORTIF,
    situation_sportif: situation_sportif,
  };
}

export function change_centres_interet_sportif(centres_interet_sportif) {
  return {
    type: CHANGE_CENTRE_INTERET_SPORTIF,
    centres_interet: centres_interet_sportif,
  };
}

export function change_numero_ss_sportif(numero_ss_sportif) {
  return {
    type: CHANGE_NUMERO_SS_SPORTIF,
    numero_ss_sportif: numero_ss_sportif,
  };
}

function load_niveaux_competition_success(payload) {
  let niveaux_competition = [];
  /*for (const niveau of payload.niveaux_competition) {
    if (niveau._source && niveau._source.nom_niveau_competition) {
      niveaux_competition.push({
        value: niveau._id,
        label: niveau._source.nom_niveau_competition,
      });
    }
  }*/

  return {
    type: LOAD_NIVEAUX_COMPETITION_SUCCESS,
    niveaux_competition: payload.niveaux_competition,
  };
}

function load_niveaux_competition_error(payload) {
  return {
    type: LOAD_NIVEAUX_COMPETITION_ERROR,
    error: payload.error,
  };
}

export function load_niveaux_competition() {
  return dispatch => {
    getApi('/niveaux_competition', {})
      .then((data_response, response, query) => {
        return dispatch(load_niveaux_competition_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(load_niveaux_competition_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
}