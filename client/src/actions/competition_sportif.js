/**
 * Created by pierremarsot on 21/01/2017.
 */
import {getApi, putApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_COMPETITION_SPORTIF_SUCCESS = 'LOAD_COMPETITION_SPORTIF_SUCCESS';
export const LOAD_COMPETITION_SPORTIF_ERROR = 'LOAD_COMPETITION_SPORTIF_ERROR';

export const UPDATE_COMPETITION_SUCCESS = 'UPDATE_COMPETITION_SUCCESS';
export const UPDATE_COMPETITION_ERROR = 'UPDATE_COMPETITION_ERROR';

export const REMOVE_COMPETITION_SPORTIF_SUCCESS = 'REMOVE_COMPETITION_SPORTIF_SUCCESS';
export const REMOVE_COMPETITION_SPORTIF_ERROR = 'REMOVE_COMPETITION_SPORTIF_ERROR';

export const ADD_COMPETITION_SPORTIF_SUCCESS = 'ADD_COMPETITION_SPORTIF_SUCCESS';
export const ADD_COMPETITION_SPORTIF_ERROR = 'ADD_COMPETITION_SPORTIF_ERROR';

export const CLOSE_MODAL_UPDATE_COMPETITION = 'CLOSE_MODAL_UPDATE_COMPETITION';
export const OPEN_MODAL_UPDATE_COMPETITION = 'OPEN_MODAL_UPDATE_COMPETITION';

export const UPLOAD_VIDEO_COMPETITION_SUCCESS = 'UPLOAD_VIDEO_COMPETITION_SUCCESS';
export const UPLOAD_VIDEO_COMPETITION_ERROR = 'UPLOAD_VIDEO_COMPETITION_ERROR';

export const REMOVE_VIDEO_COMPETITION_SUCCESS = 'REMOVE_VIDEO_COMPETITION_SUCCESS';
export const REMOVE_VIDEO_COMPETITION_ERROR = 'REMOVE_VIDEO_COMPETITION_ERROR';

function load_competition_sportif_success(payload) {
  if (!payload.competitions_sportif || !Array.isArray(payload.competitions_sportif)) {
    payload.competitions_sportif = [];
  }

  return {
    type: LOAD_COMPETITION_SPORTIF_SUCCESS,
    competitions_sportif: payload.competitions_sportif,
  };
}

function load_competition_sportif_error(payload) {
  return {
    type: LOAD_COMPETITION_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_competition_sportif() {
  return dispatch => {
    getApi('/api/competition', {})
      .then((data_response, response, query) => {
        return dispatch(load_competition_sportif_success(data_response, response, query));
      })
      .catch((data_response, response, query) => {
        dispatch(load_competition_sportif_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
}

export function update_competition_sportif(competition) {

  return dispatch => {
    check_values_competition(competition)
      .then(() => {
        putApi('/api/competition/' + competition._id, competition)
          .then(() => {
            dispatch({
              type: UPDATE_COMPETITION_SUCCESS,
              competition: competition,
            });
            dispatch(send_success_message('Votre compétition a bien été modifié'));
          })
          .catch((data_response) => {
            dispatch({
              type: UPDATE_COMPETITION_ERROR,
              error: data_response.error,
            });
            dispatch(send_error_message(data_response.error));
          });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_COMPETITION_ERROR,
          error: error
        });
        dispatch(send_error_message(error));
      });
  };
  //return postApi('/api/competition', competition, add_competition_sportif_success, add_competition_sportif_error);
}

function check_values_competition(competition) {
  return new Promise((resolve, reject) => {

    //Vérification lieu competition
    const lieu_competition = competition._source.lieu_competition;
    if (!lieu_competition || !lieu_competition._id || !lieu_competition.location || !lieu_competition.nom
      || !lieu_competition.location.lat || !lieu_competition.location.lon) {
      return reject('Le lieu de la compétition n\'est pas correcte');
    }

    //Vérification du sport competition
    const sport_competition_sportif = competition._source.sport_competition_sportif;
    if (!sport_competition_sportif || !sport_competition_sportif._id || !sport_competition_sportif.nom_sport) {
      return reject('Le sport choisit n\'est pas correct');
    }

    //Vérification du niveau de competition
    const niveau_competition_sportif = competition._source.niveau_competition_sportif;
    if (!niveau_competition_sportif) {
      return reject('Le niveau de compétition choisit n\'est pas correct');
    }

    //Vérification de la date de début
    const date_debut_competition_sportif = competition._source.date_debut_competition_sportif;
    if (!date_debut_competition_sportif) {
      return reject('La date de début de compétition est invalide');
    }

    //Vérification de la date de fin
    /* const date_fin_competition_sportif = competition._source.date_fin_competition_sportif;
     if (!date_fin_competition_sportif) {
     return reject('La date de fin de compétition est invalide');
     }*/

    const rang_competiton_sportif = competition._source.rang_competiton_sportif;
    if (!rang_competiton_sportif || !Number.isInteger(rang_competiton_sportif)) {
      return reject('Les rang n\'est pas au bon format');
    }

    return resolve(true);
  });
}

function add_competition_sportif_success(competition) {
  return {
    type: ADD_COMPETITION_SPORTIF_SUCCESS,
    competition: competition,
  };
}

function add_competition_sportif_error(payload) {
  return {
    type: ADD_COMPETITION_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function add_competition_sportif(competition) {

  return dispatch => {
    let error;

    check_values_competition(competition)
      .then(() => {
        postApi('/api/competition', competition)
          .then((data_response) => {
            competition = data_response.competition;
            if (!competition) {
              error = 'Erreur lors de l\'ajout de la compétition';

              dispatch(add_competition_sportif_error({
                error: error,
              }));
              return dispatch(send_error_message(error));
            }

            dispatch(add_competition_sportif_success(competition));
            return dispatch(send_success_message('Votre compétition a bien été ajoutée'));
          })
          .catch((data_response, response, query) => {
            dispatch(add_competition_sportif_error(data_response, response, query));
            return dispatch(send_error_message(data_response.error));
          });
      })
      .catch((error) => {
        dispatch(add_competition_sportif_error({
          error: error
        }));
        return dispatch(send_error_message(error));
      });
  };
}

function remove_competition_sportif_success(payload) {
  if (!payload.id_competition) {
    return remove_competition_sportif_error({
      error: 'La compétition semble être supprimée, merci de rafraichir la page'
    });
  }

  return {
    type: REMOVE_COMPETITION_SPORTIF_SUCCESS,
    id_competition: payload.id_competition
  };
}

function remove_competition_sportif_error(payload) {
  return {
    type: REMOVE_COMPETITION_SPORTIF_ERROR,
    error: payload.error
  };
}

export function remove_competition_sportif(index_competition) {
  return dispatch => {
    let error;

    if(!index_competition)
    {
      error = 'Erreur lors de la récupération de l\'identifiant de la compétition';
      dispatch(remove_competition_sportif_error({
        error: error,
      }));
      return dispatch(send_error_message(error));
    }

    removeApi('/api/competition/' + index_competition, {})
      .then((data_response, response, query) => {
        dispatch(remove_competition_sportif_success(data_response, response, query));
        return dispatch(send_success_message('Votre compétition a bien été ajoutée'));
      })
      .catch((data_response, response, query) => {
        dispatch(remove_competition_sportif_error(data_response, response, query));
        return dispatch(send_error_message(data_response.error));
      });
  };
}

export function close_modal_update_competition() {
  return {
    type: CLOSE_MODAL_UPDATE_COMPETITION,
  };
}

export function open_modal_update_competition(id_competition) {
  return {
    type: OPEN_MODAL_UPDATE_COMPETITION,
    id_competition: id_competition,
  };
}

function upload_video_competition_success(url_video, id_competition_sportive) {
  return {
    type: UPLOAD_VIDEO_COMPETITION_SUCCESS,
    url_video: url_video,
    id_competition_sportive: id_competition_sportive,
  };
}

function upload_video_competition_error(payload) {
  return {
    type: UPLOAD_VIDEO_COMPETITION_ERROR,
    error: payload.error,
  };
}

export function upload_video_competition(id_competition_sportive, urlYoutube) {
  return dispatch => {
    if (!id_competition_sportive) {
      return upload_video_competition_error({
        error: 'Erreur lors de la récupération de l\'indentifiant de la compétition'
      });
    }

    if (!urlYoutube || urlYoutube.length === 0) {
      return upload_video_competition_error({
        error: 'Erreur lors de la récupération de la vidéo'
      });
    }

    putApi('/api/competition/' + id_competition_sportive + '/video', {
      urlYoutube: urlYoutube,
    })
      .then((response) => {
        return dispatch(upload_video_competition_success(urlYoutube, id_competition_sportive));
      })
      .catch((response) => {
        dispatch(upload_video_competition_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function remove_video_competition_success(id_competition_sportive) {
  return {
    type: REMOVE_VIDEO_COMPETITION_SUCCESS,
    id_competition_sportive: id_competition_sportive,
  };
}

function remove_video_competition_error(payload) {
  return {
    type: REMOVE_VIDEO_COMPETITION_ERROR,
    error: payload.error,
  };
}

export function remove_video_competition(id_competition_sportive) {
  return dispatch => {
    if (!id_competition_sportive) {
      return dispatch(remove_video_competition_error({
        error: 'Erreur lors de la récupération de l\'identifiant de la compétition'
      }));
    }

    removeApi('/api/competition/' + id_competition_sportive + '/video')
      .then(() => {
        return dispatch(remove_video_competition_success(id_competition_sportive));
      })
      .catch((response) => {
        dispatch(remove_video_competition_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}