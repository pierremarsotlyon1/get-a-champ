/**
 * Created by pierremarsot on 27/02/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const SEARCH_ECOLE_SUCCESS = 'SEARCH_ECOLE_SUCCESS';
export const SEARCH_ECOLE_ERROR = 'SEARCH_ECOLE_ERROR';

function search_ecole_success(payload)
{
  return {
    type: SEARCH_ECOLE_SUCCESS,
    ecoles: payload.ecoles,
  };
}

function search_ecole_error()
{
  return {
    type: SEARCH_ECOLE_ERROR
  };
}

export function search_ecole(ecole)
{
  return dispatch => {
    if(!ecole)
    {
      dispatch(search_ecole_error());
      dispatch(send_error_message('Erreur lors de la récupération de l\'école voulue'));

      return false;
    }

    if(ecole.length === 0)
    {
      dispatch(search_ecole_error());
      return false;
    }

    getApi('/ecoles/'+ecole)
      .then((response) => {
        return dispatch(search_ecole_success(response));
      })
      .catch((response) => {
        dispatch(search_ecole_error());
        return dispatch(send_error_message(response));
      });
  };
}