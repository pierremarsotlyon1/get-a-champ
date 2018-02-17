/**
 * Created by pierremarsot on 10/02/2017.
 */
import {getApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';
import moment from 'moment';

export const LOAD_SPONSORING_SPORTIF_SUCCESS = 'LOAD_SPONSORING_SPORTIF_SUCCESS';
export const LOAD_SPONSORING_SPORTIF_ERROR = 'LOAD_SPONSORING_SPORTIF_ERROR';

export const ADD_SPONSORING_SPORTIF_SUCCESS = 'ADD_SPONSORING_SPORTIF_SUCCESS';
export const ADD_SPONSORING_SPORTIF_ERROR = 'ADD_SPONSORING_SPORTIF_ERROR';

export const DELETE_SPONSORING_SPORTIF_SUCCESS = 'DELETE_SPONSORING_SPORTIF_SUCCESS';
export const DELETE_SPONSORING_SPORTIF_ERROR = 'DELETE_SPONSORING_SPORTIF_ERROR';

function load_sponsoring_sportif_success(payload) {
  return {
    type: LOAD_SPONSORING_SPORTIF_SUCCESS,
    sponsorings_sportif: payload.sponsorings_sportif,
  };
}

function load_sponsoring_sportif_error(payload) {
  return {
    type: LOAD_SPONSORING_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_sponsoring_sportif() {
  return dispatch => {
    getApi('/api/sportif/sponsoring', {})
      .then((response) => {
        return dispatch(load_sponsoring_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_sponsoring_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_sponsoring_sportif_success(sponsoring_sportif) {
  return {
    type: ADD_SPONSORING_SPORTIF_SUCCESS,
    sponsoring_sportif: sponsoring_sportif,
  };
}

function add_sponsoring_sportif_error(payload) {
  return {
    type: ADD_SPONSORING_SPORTIF_ERROR,
    error: payload.error,
  }
}

export function add_sponsoring_sportif(id_type_sponsoring,
                                       date_depart_sponsoring_sportif,
                                       date_fin_sponsoring_sportif,
                                       lieu_sponsoring_sportif,
                                       description_sponsoring_sportif,
                                       montant_recherche) {
  return (dispatch, getState) => {
    let error;
    if(!id_type_sponsoring)
    {
      error = 'Erreur lors de la récupération du type de sponsoring';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!date_depart_sponsoring_sportif)
    {
      error = 'Erreur lors de la récupération de la date de départ';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!date_fin_sponsoring_sportif)
    {
      error = 'Erreur lors de la récupération de la date de fin';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!lieu_sponsoring_sportif)
    {
      error = 'Erreur lors de la récupération du lieu du sponsoring';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    if(!montant_recherche){
      error = 'Erreur lors de la récupération du montant recherché';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    montant_recherche = Number.parseInt(montant_recherche, 0);
    if(!montant_recherche)
    {
      error = 'Erreur lors de la récupération du montant recherché';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    const {types_sponsoring} = getState().typeSponsoring;

    let type_sponsoring = undefined;
    for(const type_s of types_sponsoring)
    {
      if(type_s._id === id_type_sponsoring)
      {
        type_sponsoring = type_s;
        break;
      }
    }

    if(!type_sponsoring)
    {
      error = 'Erreur lors de la récupération du type de sponsoring';
      dispatch(add_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    const sponsoring_sportif = {
      _id: undefined,
      _source: {
        date_depart_sponsoring_sportif: moment(date_depart_sponsoring_sportif).format('YYYY-MM-DD'),
        date_fin_sponsoring_sportif: moment(date_fin_sponsoring_sportif).format('YYYY-MM-DD'),
        description_sponsoring_sportif: description_sponsoring_sportif,
        lieu_sponsoring_sportif: {
          _id: lieu_sponsoring_sportif.placeId,
          location: {
            lat: lieu_sponsoring_sportif.location.lat,
            lon: lieu_sponsoring_sportif.location.lng,
          },
          nom: lieu_sponsoring_sportif.label,
        },
        type_sponsoring_sportif: {
          _id: type_sponsoring._id,
          nom_type_sponsoring: type_sponsoring._source.nom_type_sponsoring,
        },
        montant_recherche: montant_recherche,
      }
    };

    postApi('/api/sportif/sponsoring', sponsoring_sportif._source)
      .then((response) => {
        const id_sponsoring_sportif = response.id_sponsoring_sportif;
        if (!id_sponsoring_sportif) {
          return dispatch(add_sponsoring_sportif_error({
            error: 'Le sponsoring semble etre bien ajouté mais nous avons eu un problème lors de la récupération des informations',
          }));
        }

        sponsoring_sportif._id = id_sponsoring_sportif;
        dispatch(add_sponsoring_sportif_success(sponsoring_sportif));
        dispatch(send_success_message('La demande de sponsoring a bien été enregistrée'));
      })
      .catch((response) => {
        dispatch(add_sponsoring_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  }
}

function delete_sponsoring_sportif_success(id_sponsoring_sportif) {
  return {
    type: DELETE_SPONSORING_SPORTIF_SUCCESS,
    id_sponsoring_sportif: id_sponsoring_sportif,
  };
}

function delete_sponsoring_sportif_error(payload) {
  return {
    type: DELETE_SPONSORING_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function delete_sponsoring_sportif(id_sponsoring_sportif) {
  return dispatch => {
    let error;
    if (!id_sponsoring_sportif) {
      error = 'Erreur de la récupération de l\'identifiant du sponsoring';

      dispatch(delete_sponsoring_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    removeApi('/api/sportif/sponsoring/' + id_sponsoring_sportif)
      .then(() => {
        dispatch(delete_sponsoring_sportif_success(id_sponsoring_sportif));
        dispatch(send_success_message('La demande de sponsoring a bien été supprimée'));
      })
      .catch((response) => {
        dispatch(delete_sponsoring_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}