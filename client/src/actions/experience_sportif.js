/**
 * Created by pierremarsot on 21/01/2017.
 */
import {getApi, putApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';
const moment = require('moment');

export const LOAD_EXPERIENCES_SPORTIF_SUCCESS = 'LOAD_EXPERIENCES_SPORTIF_SUCCESS';

export const REMOVE_EXPERIENCE_SPORTIF_SUCCESS = 'REMOVE_EXPERIENCE_SPORTIF_SUCCESS';
export const REMOVE_EXPERIENCE_SPORTIF_ERROR = 'REMOVE_EXPERIENCE_SPORTIF_ERROR';

export const ADD_EXPERIENCE_SPORTIF_SUCCESS = 'ADD_EXPERIENCE_SPORTIF_SUCCESS';
export const ADD_EXPERIENCE_SPORTIF_ERROR = 'ADD_EXPERIENCE_SPORTIF_ERROR';

export const UPDATE_EXPERIENCE_SUCCESS = 'UPDATE_EXPERIENCE_SUCCESS';
export const UPDATE_EXPERIENCE_ERROR = 'UPDATE_EXPERIENCE_ERROR';

export const CLOSE_MODAL_UPDATE_EXPERIENCE = 'CLOSE_MODAL_UPDATE_EXPERIENCE';
export const OPEN_MODAL_UPDATE_EXPERIENCE = 'OPEN_MODAL_UPDATE_EXPERIENCE';

function load_experiences_sportif_success(payload) {
  return {
    type: LOAD_EXPERIENCES_SPORTIF_SUCCESS,
    experiences_sportif: payload.experiences_sportif,
  };
}

function load_experiences_sportif_error(paylaod) {

}

export function load_experiences_sportif() {
  return dispatch => {
    getApi('/api/experience', {})
      .then((data_response, response, query) => {
        return dispatch(load_experiences_sportif_success(data_response, response, query));
      })
      .catch((response) => {
        dispatch(load_experiences_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
  //return getApi('/api/experience', {}, load_experiences_sportif_success, load_experiences_sportif_error);
}

function add_experience_success(experience) {
  return {
    type: ADD_EXPERIENCE_SPORTIF_SUCCESS,
    experience: experience,
  };
}

function add_experience_error(payload) {
  return {
    type: ADD_EXPERIENCE_SPORTIF_ERROR,
    error: payload.error,
  };
}

function check_values_experience(experience) {
  return new Promise((resolve, reject) => {
    if(!experience || !experience._source)
    {
      return reject('Erreur lors de la récupération de l\'experience');
    }
    //Vérification lieu competition

    const lieu_experience_sportif = experience._source.lieu_experience_sportif;
    if (!lieu_experience_sportif
      || !lieu_experience_sportif._id
      || !lieu_experience_sportif.location
      || !lieu_experience_sportif.nom
      || !lieu_experience_sportif.location.lat
      || !lieu_experience_sportif.location.lon) {
      return reject('Le lieu n\'est pas correcte');
    }

    const sport_experience_sportif = experience._source.sport_experience_sportif;
    //Vérification du sport competition
    if (!sport_experience_sportif || !sport_experience_sportif._id || !sport_experience_sportif.nom_sport) {
      return reject('Le sport choisit n\'est pas correct');
    }

    //Vérification de la date de début
    if (!experience._source.date_debut_experience_sportif) {
      return reject('La date de début de compétition est invalide');
    }

    //Vérification de la date de fin
    if (!experience._source.date_fin_experience_sportif) {
      return reject('La date de fin de compétition est invalide');
    }

    return resolve(true);
  });
}

export function add_experience(experience) {

  return dispatch => {
    let error;
    check_values_experience(experience)
      .then(() => {
        postApi('/api/experience', experience)
          .then((data_response, response, query) => {
            const id_experience_sportif = data_response.id_experience_sportif;
            if(!id_experience_sportif)
            {
              error = 'Erreur lors de la récupération de l\'identifiant de l\'experience sportive';

              dispatch(add_experience_error({
                error: error,
              }));
              dispatch(send_error_message(error));

              return false;
            }

            experience._id = id_experience_sportif;
            experience._source.date_debut_experience_sportif =
              moment(experience._source.date_debut_experience_sportif).format('YYYY-MM-DD');
            experience._source.date_fin_experience_sportif =
              moment(experience._source.date_fin_experience_sportif).format('YYYY-MM-DD');
            dispatch(add_experience_success(experience));
            dispatch(send_success_message('Votre experience sportive a bien été ajoutée'));
          })
          .catch((data_response, response, query) => {
            dispatch(add_experience_error(data_response, response, query));
            dispatch(send_error_message(data_response.error));
          });

        //return postApi('/api/experience', experience, add_experience_success, add_experience_error);
      })
      .catch((error) => {
        dispatch(add_experience_error(error));
        dispatch(send_error_message(error));
      });
  };
}

function update_experience_success(experience) {
  return {
    type: UPDATE_EXPERIENCE_SUCCESS,
    experience: experience,
  };
}

function update_experience_error(payload) {
  return {
    type: UPDATE_EXPERIENCE_ERROR,
    error: payload.error,
  };
}

export function update_experience(experience) {
  return dispatch => {
    if(!experience || !experience._id)
    {
      const error = 'L\'id de l\'experience est invalide';
      dispatch(add_experience_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    check_values_experience(experience)
      .then(() => {

        putApi('/api/experience/' + experience._id, experience)
          .then(() => {
            experience._source.date_debut_experience_sportif =
              moment(experience._source.date_debut_experience_sportif).format('YYYY-MM-DD');
            experience._source.date_fin_experience_sportif =
              moment(experience._source.date_fin_experience_sportif).format('YYYY-MM-DD');
            dispatch(update_experience_success(experience));
            dispatch(send_success_message('Votre experience sportive a bien été modifiée'));
          })
          .catch((data_response, response, query) => {
            dispatch(update_experience_error(data_response, response, query));
            dispatch(send_error_message(data_response.error));
          });

        //return putApi('/api/experience/'+id_experience, experience, add_experience_success, add_experience_error);
      })
      .catch((error) => {
        dispatch(update_experience_error({
          error: error,
        }));
        dispatch(send_error_message(error));
      });
  };
}

function remove_experience_sportif_success(payload) {
  return {
    type: REMOVE_EXPERIENCE_SPORTIF_SUCCESS,
    id_experience_sportif: payload.id_experience_sportif,
  };
}

function remove_experience_sportif_error(payload) {
  return {
    type: REMOVE_EXPERIENCE_SPORTIF_ERROR,
    error: payload.error,
  }
}

export function remove_experience_sportif(index_experience_sportif) {
  return dispatch => {
    let error;

    if(!index_experience_sportif)
    {
      error = 'Erreur lors de la récupération de l\'identifiant de l\'experience sportive';
      dispatch(remove_experience_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }
    removeApi(
      '/api/experience/' + index_experience_sportif,
      {})
      .then((data_response, response, query) => {
        dispatch(remove_experience_sportif_success(data_response, response, query));
        dispatch(send_success_message('Votre experience sportive a bien été supprimée'));
      })
      .catch((data_response, response, query) => {
        dispatch(remove_experience_sportif_error(data_response, response, query));
        dispatch(send_error_message(data_response.error));
      });
  };
}

export function open_modal_update_experience(id_experience) {
  return {
    type: OPEN_MODAL_UPDATE_EXPERIENCE,
    id_experience: id_experience,
  };
}

export function close_modal_update_experience() {
  return {
    type: CLOSE_MODAL_UPDATE_EXPERIENCE,
  };
}