/**
 * Created by pierremarsot on 01/03/2017.
 */
import {getApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';
import moment from 'moment';
import {frenchDate} from '../utils/DatePicker';

export const SEARCH_SPONSORING_SUCCESS = 'SEARCH_SPONSORING_SUCCESS';
export const SEARCH_SPONSORING_ERROR = 'SEARCH_SPONSORING_ERROR';

function search_sponsoring_success(payload) {
  return {
    type: SEARCH_SPONSORING_SUCCESS,
    search_sportif_sponsoring: payload.search_sportif_sponsoring,
  };
}

function search_sponsoring_error() {
  return {
    type: SEARCH_SPONSORING_ERROR
  };
}

export function search_sponsoring(id_type_sponsoring,
                           montant_recherche,
                           date_depart,
                           date_fin,) {
  return dispatch => {
    if (!id_type_sponsoring) {
      dispatch(search_sponsoring_error());
      return dispatch(send_error_message('Erreur lors de la récupération du type de sponsoring'));
    }

    if (!montant_recherche) {
      dispatch(search_sponsoring_error());
      return dispatch(send_error_message('Vous devez spécifier un montant'));
    }

    if (!date_depart) {
      dispatch(search_sponsoring_error());
      return dispatch(send_error_message('Vous devez spécifier une date de départ'));
    }

    if (!date_fin) {
      dispatch(search_sponsoring_error());
      return dispatch(send_error_message('Vous devez spécifier une date de fin'));
    }

    const date_depart_temp = moment(date_depart);
    if (!date_depart_temp) {
      dispatch(search_sponsoring_error());
      return dispatch('Erreur lors de la conversion de la date de départ');
    }

    const date_fin_temp = moment(date_fin);
    if (!date_fin_temp) {
      dispatch(search_sponsoring_error());
      return dispatch('Erreur lors de la conversion de la date de fin');
    }

    if (date_depart_temp.isAfter(date_fin_temp)) {
      dispatch(search_sponsoring_error());
      return dispatch(send_error_message('La date de départ doit être antérieur à celle de fin'));
    }

    getApi('/api/search/sportif/sponsoring', {
      id_type_sponsoring: id_type_sponsoring,
      montant_recherche: montant_recherche,
      date_depart: frenchDate(date_depart),
      date_fin: frenchDate(date_fin)
    })
      .then((response) => {
        return dispatch(search_sponsoring_success(response));
      })
      .catch((response) => {
        dispatch(search_sponsoring_error());
        return dispatch(send_error_message(response.error));
      });
  };
}