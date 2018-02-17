/**
 * Created by pierremarsot on 24/02/2017.
 */
import {getApi, putApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_PROFIL_ENTREPRISE_SUCCESS = 'LOAD_PROFIL_ENTREPRISE_SUCCESS';
export const LOAD_PROFIL_ENTREPRISE_ERROR = 'LOAD_PROFIL_ENTREPRISE_ERROR';

export const UPDATE_PROFIL_ENTREPRISE_SUCCESS = 'UPDATE_PROFIL_ENTREPRISE_SUCCESS';
export const UPDATE_PROFIL_ENTREPRISE_ERROR = 'UPDATE_PROFIL_ENTREPRISE_ERROR';

function load_profil_entreprise_success(payload) {
  return {
    type: LOAD_PROFIL_ENTREPRISE_SUCCESS,
    profil_entreprise: payload.profil_entreprise,
  };
}

function load_profil_entreprise_error(payload) {
  return {
    type: LOAD_PROFIL_ENTREPRISE_ERROR,
    error: payload.error,
  };
}

export function load_profil_entreprise() {
  return dispatch => {
    getApi('/api/profil/entreprise')
      .then((response) => {
        return dispatch(load_profil_entreprise_success(response));
      })
      .catch((response) => {
        dispatch(load_profil_entreprise_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function update_profil_entreprise_success(profil_entreprise) {
  return {
    type: UPDATE_PROFIL_ENTREPRISE_SUCCESS,
    profil_entreprise: profil_entreprise,
  };
}

function update_profil_entreprise_error(payload) {
  return {
    type: UPDATE_PROFIL_ENTREPRISE_ERROR,
    error: payload.error,
  };
}

export function update_profil_entreprise(profil_entreprise) {
  return dispatch => {
    let error;

    if (!profil_entreprise || !profil_entreprise._source) {
      error = 'Erreur lors de la récupération de votre profil';

      dispatch(update_profil_entreprise_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    //On récup la source du document de l'entreprise
    const source_profil_entreprise = profil_entreprise._source;

    //On vérifie les informations
    if(!source_profil_entreprise.nom_gerant)
    {
      error = 'Vous devez spécifier le nom du gérant';

      dispatch(update_profil_entreprise_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!source_profil_entreprise.prenom_gerant)
    {
      error = 'Vous devez spécifier le prénom du gérant';

      dispatch(update_profil_entreprise_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!source_profil_entreprise.nom_entreprise)
    {
      error = 'Vous devez spécifier le nom de votre entreprise';

      dispatch(update_profil_entreprise_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!source_profil_entreprise.siret_entreprise)
    {
      error = 'Vous devez spécifier le numéro SIRET de votre entreprise';

      dispatch(update_profil_entreprise_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    putApi('/api/profil/entreprise', {
      profil_entreprise: profil_entreprise._source
    })
      .then(() => {
        dispatch(update_profil_entreprise_success(profil_entreprise));
        dispatch(send_success_message('Votre profil a bien été mis à jour'));
      })
      .catch((response) => {
        dispatch(update_profil_entreprise_error(response));
        dispatch(send_error_message(response.error));
      });
  }
}