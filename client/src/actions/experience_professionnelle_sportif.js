/**
 * Created by pierremarsot on 20/01/2017.
 */
import {getApi, postApi, removeApi, putApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const SET_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE = 'SET_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE';
export const REMOVE_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE = 'REMOVE_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE';

export const LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_SUCCESS = 'LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_SUCCESS';
export const LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_ERROR = 'LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_ERROR';

export const ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS = 'ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS';
export const ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR = 'ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR';

export const REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS = 'REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS';
export const REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR = 'REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR';

export const UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS = 'UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS';
export const UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR = 'UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR';

export function load_parcours_professionnel_sportif() {
  return dispatch => {
    getApi('/api/sportif/experience/professionnelle')
      .then((response) => {
        if (!response.experience_professionnelle_sportif) {
          return dispatch({
            type: LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_ERROR,
            error: 'Erreur lors de la récupération de vos experiences professionnelles',
          });
        }
        return dispatch({
          type: LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_SUCCESS,
          experiences_professionnelles_sportif: response.experience_professionnelle_sportif
        });
      })
      .catch((response) => {
        dispatch({
          type: LOAD_PARCOURS_PROFESSIONNEL_SPORTIF_ERROR,
          error: response.error,
        });
        dispatch(send_error_message(response.error));
      });
  };
}

function check_values_experience_professionnelle_sportif(experience_professionnelle_sportif) {
  return new Promise((resolve, reject) => {
    if (!experience_professionnelle_sportif) {
      return reject('Erreur lors de la récupération de l\'experience professionnelle');
    }

    if (!experience_professionnelle_sportif.lieu_experience_professionnelle_sportif
      || !experience_professionnelle_sportif.lieu_experience_professionnelle_sportif.nom
      || !experience_professionnelle_sportif.lieu_experience_professionnelle_sportif._id
      || !experience_professionnelle_sportif.lieu_experience_professionnelle_sportif.location
      || !experience_professionnelle_sportif.lieu_experience_professionnelle_sportif.location.lat
      || !experience_professionnelle_sportif.lieu_experience_professionnelle_sportif.location.lon) {
      return reject('Erreur lors de la récupération du lieu de l\'experience professionnelle');
    }

    if (!experience_professionnelle_sportif.nom_entreprise_experience_professionnelle_sportif) {
      return reject('Erreur lors de la récupération du nom de l\'entreprise');
    }

    if (!experience_professionnelle_sportif.metier_experience_professionnelle_sportif) {
      return reject('Erreur lors de la récupération du titre du poste');
    }

    if (!experience_professionnelle_sportif.date_debut_experience_professionnelle_sportif) {
      return reject('Erreur lors de la récupération de la date de début');
    }

    if(!experience_professionnelle_sportif.toujours_en_poste_experience_professionnelle_sportif)
    {
      if (!experience_professionnelle_sportif.date_fin_experience_professionnelle_sportif) {
        return reject('Erreur lors de la récupération de la date de fin');
      }
    }

    return resolve(experience_professionnelle_sportif);
  });
}

export function add_experience_professionnelle_sportif(experience_professionnelle_sportif) {
  return dispatch => {
    let error;

    check_values_experience_professionnelle_sportif(experience_professionnelle_sportif)
      .then((experience_professionnelle_sportif) => {
        postApi('/api/sportif/experience/professionnelle', experience_professionnelle_sportif)
          .then((data_response) => {
            const id_experience_professionnelle_sportif = data_response.id_experience_professionnelle_sportif;
            if (!id_experience_professionnelle_sportif) {
              error = 'Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle';
              dispatch({
                type: ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
                error: error,
              });
              dispatch(send_error_message(error));

              return false;
            }

            experience_professionnelle_sportif = {
              _id: id_experience_professionnelle_sportif,
              _source: experience_professionnelle_sportif,
            };

            dispatch({
              type: ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS,
              experience_professionnelle_sportif: experience_professionnelle_sportif,
            });
            dispatch(send_success_message('Votre experience professionnelle a bien été ajoutée'));
          })
          .catch((response) => {
            dispatch({
              type: ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
              error: response.error,
            });
            dispatch(send_error_message(response.error));
          });
      })
      .catch((error) => {
        dispatch({
          type: ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
          error: error,
        });
        return dispatch(send_error_message(error));
      });
  };
}

export function update_experience_professionnelle_sportif(experience_professionnelle_sportif) {
  return dispatch => {
    if(!experience_professionnelle_sportif._id)
    {
      dispatch({
        type: ADD_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
      });
      return dispatch(send_error_message('Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle'));
    }

    check_values_experience_professionnelle_sportif(experience_professionnelle_sportif._source)
      .then(() => {
        putApi(
          '/api/sportif/experience/professionnelle/' + experience_professionnelle_sportif._id,
          experience_professionnelle_sportif._source)
          .then(() => {
            dispatch({
              type: UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS,
              experience_professionnelle_sportif: experience_professionnelle_sportif,
            });
            return dispatch(send_success_message('Votre experience professionnelle a bien été modifiée'));
          })
          .catch((response) => {
            dispatch({
              type: UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
              error: response.error,
            });
            return dispatch(send_error_message(response.error));
          });
      })
      .catch((response) => {
        dispatch({
          type: UPDATE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
          error: response.error,
        });
        return dispatch(send_error_message(response.error));
      });
  };
}

export function remove_experience_professionnelle_sportif(id_experience_professionnelle_sportif) {
  return dispatch => {
    if(!id_experience_professionnelle_sportif)
    {
      const error = 'Erreur lors de la récupération e l\'identitfiant de l\'experience sportive';
      dispatch({
        type: REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
        error: error,
      });
      dispatch(send_error_message(error));

      return false;
    }

    removeApi('/api/sportif/experience/professionnelle/' + id_experience_professionnelle_sportif)
      .then(() => {
        dispatch({
          type: REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_SUCCESS,
          id_experience_professionnelle_sportif: id_experience_professionnelle_sportif,
        });
        dispatch(send_success_message('Votre experience professionnelle a bien été supprimée'));
      })
      .catch((response) => {
        dispatch({
          type: REMOVE_EXPERIENCE_PROFESSIONNELLE_SPORTIF_ERROR,
          error: response.error,
        });
        dispatch(send_error_message(response.error));
      });
  };
}

export function set_experience_professionnelle_to_update(experience_pro)
{
  return dispatch => {
    return dispatch({
      type: SET_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE,
      experience_professionnelle_to_update: experience_pro,
    });
  };
}

export function remove_experience_professionnelle_to_update()
{
  return dispatch => {
    return dispatch({
      type: REMOVE_EXPERIENCE_PROFESSIONNELLE_TO_UPDATE,
    });
  };
}