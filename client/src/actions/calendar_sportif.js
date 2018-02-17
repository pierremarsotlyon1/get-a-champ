/**
 * Created by pierremarsot on 17/02/2017.
 */
import {getApi, postApi, removeApi, putApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_CALENDAR_SPORTIF_SUCCESS = 'LOAD_CALENDAR_SPORTIF_SUCCESS';
export const LOAD_CALENDAR_SPORTIF_ERROR = 'LOAD_CALENDAR_SPORTIF_ERROR';

export const ADD_EVENT_CALENDAR_SPORTIF_SUCCESS = 'ADD_EVENT_CALENDAR_SPORTIF_SUCCESS';
export const ADD_EVENT_CALENDAR_SPORTIF_ERROR = 'ADD_EVENT_CALENDAR_SPORTIF_ERROR';

export const REMOVE_EVENT_CALENDAR_SPORTIF_SUCCESS = 'REMOVE_EVENT_CALENDAR_SPORTIF_SUCCESS';
export const REMOVE_EVENT_CALENDAR_SPORTIF_ERROR = 'REMOVE_EVENT_CALENDAR_SPORTIF_ERROR';

export const UPDATE_EVENT_CALENDAR_SPORTIF_SUCCESS = 'UPDATE_EVENT_CALENDAR_SPORTIF_SUCCESS';
export const UPDATE_EVENT_CALENDAR_SPORTIF_ERROR = 'UPDATE_EVENT_CALENDAR_SPORTIF_ERROR';

export const MOVE_EVENT_CALENDAR_SPORTIF_SUCCESS = 'MOVE_EVENT_CALENDAR_SPORTIF_SUCCESS';
export const MOVE_EVENT_CALENDAR_SPORTIF_ERROR = 'MOVE_EVENT_CALENDAR_SPORTIF_ERROR';

function load_calendar_sportif_success(payload) {
  return {
    type: LOAD_CALENDAR_SPORTIF_SUCCESS,
    events: payload.events,
  };
}

function load_calendar_sportif_error(payload) {
  return {
    type: LOAD_CALENDAR_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_calendar_sportif(date_debut, date_fin) {
  return dispatch => {
    let error;

    if (!date_debut) {
      error = 'Erreur lors de la récupération de la date de début';

      dispatch(load_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!date_fin) {
      error = 'Erreur lors de la récupération de la date de fin';
      dispatch(load_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    getApi('/api/sportif/calendar/event/' + date_debut + '/' + date_fin)
      .then((response) => {
        return dispatch(load_calendar_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_calendar_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_event_calendar_sportif_success(event) {
  return {
    type: ADD_EVENT_CALENDAR_SPORTIF_SUCCESS,
    event: event,
  };
}

function add_event_calendar_sportif_error(payload) {
  return {
    type: ADD_EVENT_CALENDAR_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function add_event_calendar_sportif(titre, description, date_debut, date_fin) {
  return dispatch => {
    let error;

    if (!titre) {
      error = 'Vous devez spécifier le titre de l\'évenement';

      dispatch(add_event_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!date_debut) {
      error = 'Erreur lors de la récupération de la date de début';

      dispatch(load_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!date_fin) {
      error = 'Erreur lors de la récupération de la date de fin';

      dispatch(load_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    postApi('/api/sportif/calendar/event', {
      titre: titre,
      description: description,
      date_debut: date_debut,
      date_fin: date_fin
    })
      .then((response) => {
        const id_event = response.id_event;
        if (!id_event) {
          error = 'Votre evenement semble être bien enregistré mais il y a eu un problème lors de la récéption des informations';

          dispatch(add_event_calendar_sportif_error({
            error: error,
          }));
          dispatch(send_error_message(error));

          return false;
        }

        const event = {
          _id: id_event,
          _source: {
            titre: titre,
            description: description,
            date_debut: date_debut,
            date_fin: date_fin
          },
        };

        dispatch(add_event_calendar_sportif_success(event));
        dispatch(send_success_message('Votre évenement a bien été ajouté'));
      })
      .catch((response) => {
        dispatch(add_event_calendar_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function remove_event_calendar_sportif_success(id_event_removed) {
  return {
    type: REMOVE_EVENT_CALENDAR_SPORTIF_SUCCESS,
    id_event_removed: id_event_removed,
  };
}

function remove_event_calendar_sportif_error(payload) {
  return {
    type: REMOVE_EVENT_CALENDAR_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function remove_event_calendar_sportif(id_event) {
  return dispatch => {
    let error;

    if (!id_event) {
      error = 'Erreur lors de la récupération de l\'identifiant de l\'évenement';

      dispatch(remove_event_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    removeApi('/api/sportif/calendar/event/' + id_event)
      .then(() => {
        dispatch(remove_event_calendar_sportif_success(id_event));
        dispatch(send_success_message('Votre évenement a bien été supprimé'));
      })
      .catch((response) => {
        dispatch(remove_event_calendar_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function update_event_calendar_sportif_success(event) {
  return {
    type: UPDATE_EVENT_CALENDAR_SPORTIF_SUCCESS,
    event: event,
  };
}

function update_event_calendar_sportif_error(payload) {
  return {
    type: UPDATE_EVENT_CALENDAR_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function update_event_calendar_sportif(id_event, titre, description, date_debut, date_fin) {
  return dispatch => {
    let error;

    if (!id_event) {
      error = 'Erreur lors de la récupération de l\'identifiant de l\'évenement';

      dispatch(update_event_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!titre) {
      error = 'Erreur lors de la récupération du titre de l\'évenement';

      dispatch(update_event_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!date_debut) {
      error = 'Erreur lors de la récupération de la date de début de l\'évenement';

      dispatch(update_event_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if (!date_fin) {
      error = 'Erreur lors de la récupération de la date de fin de l\'évenement';

      dispatch(update_event_calendar_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    putApi('/api/sportif/calendar/event/' + id_event, {
      titre: titre,
      description: description,
      date_debut: date_debut,
      date_fin: date_fin
    })
      .then(() => {
        const event = {
          _id: id_event,
          _source: {
            titre: titre,
            description: description,
            date_debut: date_debut,
            date_fin: date_fin
          },
        };

        dispatch(update_event_calendar_sportif_success(event));
        dispatch(send_success_message('Votre évenement a bien été mis à jour'));
      })
      .catch((response) => {
        dispatch(update_event_calendar_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}