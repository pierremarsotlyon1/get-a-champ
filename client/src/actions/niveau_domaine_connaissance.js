/**
 * Created by pierremarsot on 31/01/2017.
 */

import { getApi } from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_NIVEAU_DOMAINE_CONNAISSANCE_SUCCESS = 'LOAD_NIVEAU_DOMAINE_CONNAISSANCE_SUCCESS';
export const LOAD_NIVEAU_DOMAINE_CONNAISSANCE_ERROR = 'LOAD_NIVEAU_DOMAINE_CONNAISSANCE_ERROR';

function load_niveau_domaine_connaissance_success(payload)
{
  return {
    type: LOAD_NIVEAU_DOMAINE_CONNAISSANCE_SUCCESS,
    niveaux_domaine_connaissance: payload.niveaux_domaine_connaissance,
  };
}

function load_niveau_domaine_connaissance_error(payload)
{
  return {
    type: LOAD_NIVEAU_DOMAINE_CONNAISSANCE_ERROR,
    error: payload.error,
  };
}

export function load_niveau_domaine_connaissance()
{
  return dispatch => {
    getApi('/niveaux_domaine_connaissance', {})
      .then((response) => {
        return dispatch(load_niveau_domaine_connaissance_success(response));
      })
      .catch((response) => {
        dispatch(load_niveau_domaine_connaissance_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}