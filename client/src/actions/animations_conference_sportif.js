/**
 * Created by pierremarsot on 03/02/2017.
 */

import { getApi, postApi, removeApi } from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS = 'LOAD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS';
export const LOAD_ANIMATION_CONFERENCE_SPORTIF_ERROR = 'LOAD_ANIMATION_CONFERENCE_SPORTIF_ERROR';

export const ADD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS = 'ADD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS';
export const ADD_ANIMATION_CONFERENCE_SPORTIF_ERROR = 'ADD_ANIMATION_CONFERENCE_SPORTIF_ERROR';

export const REMOVE_ANIMATION_CONFERENCE_SPORTIF_SUCCESS = 'REMOVE_ANIMATION_CONFERENCE_SPORTIF_SUCCESS';
export const REMOVE_ANIMATION_CONFERENCE_SPORTIF_ERROR = 'REMOVE_ANIMATION_CONFERENCE_SPORTIF_ERROR';

function load_animation_conference_sportif_success(payload)
{
  return {
    type: LOAD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS,
    animations_conference_sportif: payload.animations_conference_sportif,
  };
}

function load_animation_conference_sportif_error(payload)
{
  return {
    type: LOAD_ANIMATION_CONFERENCE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_animation_conference_sportif()
{
  return async dispatch => {
    getApi('/api/user/sportif/intervention/entreprise/animation/conference', {})
      .then((response) => {
        return dispatch(load_animation_conference_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_animation_conference_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_animation_conference_sportif_success(animation_conference)
{
  return {
    type: ADD_ANIMATION_CONFERENCE_SPORTIF_SUCCESS,
    animation_conference: animation_conference,
  };
}

function add_animation_conference_sportif_error()
{
  return {
    type: ADD_ANIMATION_CONFERENCE_SPORTIF_ERROR
  };
}

export function add_animation_conference_sportif(id_thematique, montant_minimum)
{
  return async (dispatch, getState) => {
    let error;

    if(!id_thematique)
    {
      error = 'Vous devez selectionner une thématique';

      dispatch(add_animation_conference_sportif_error({
        error: error,
      }));
      return dispatch(send_error_message(error));
    }

    if(!montant_minimum || montant_minimum.length === 0){
      dispatch(add_animation_conference_sportif_error());
      return dispatch(send_error_message('Vous devez spécifier un montant minimum'));
    }

    //On récup le state des thématiques de conférence
    let thematiqueAnimationConference = getState().thematiqueAnimationConference;
    if(!thematiqueAnimationConference){
      dispatch(add_animation_conference_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la catégorie de la thématique'));
    }

    //On récup le tableau des thématiques de conférence
    thematiqueAnimationConference = thematiqueAnimationConference.thematiques_animation_conference;
    if(!thematiqueAnimationConference){
      dispatch(add_animation_conference_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique 2'));
    }

    //On parcourt toutes les catégories pour trouver la conférence
    let thematique;
    for(const categorie of thematiqueAnimationConference){
      if(!categorie || !categorie._source || !categorie._source.thematique_animation_conference){
        continue;
      }

      for(const thema of categorie._source.thematique_animation_conference){
        if(!thema || !thema.id){
          continue;
        }

        if(thema.id === id_thematique){
          thematique = thema;
          break;
        }
      }

      if(thematique){
        break;
      }
    }

    if(!thematique){
      dispatch(add_animation_conference_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    postApi('/api/user/sportif/intervention/entreprise/animation/conference', {
      id_thematique_animation_conference: id_thematique,
      montant_minimum: montant_minimum,
    })
      .then(() => {
        const animation_conference = {
          montant_minimum: montant_minimum,
          id_thematique_animation_conference: id_thematique,
          nom_thematique_animation_conference: thematique.nom_thematique_animation_conference,
        };
        dispatch(add_animation_conference_sportif_success(animation_conference));
        return dispatch(send_success_message('Animation de conférence bien ajoutée'));
      })
      .catch((response) => {
        dispatch(add_animation_conference_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}

export function delete_animation_conference_sportif(id_thematique_animation_conference)
{
  return async dispatch => {
    let error;

    if(!id_thematique_animation_conference)
    {
      error = 'Vous devez selectionner une thématique';
      dispatch(add_animation_conference_sportif_error({
        error: error,
      }));
      dispatch(send_error_message(error));

      return false;
    }

    removeApi('/api/user/sportif/intervention/entreprise/animation/conference/' + id_thematique_animation_conference, {})
      .then(() => {
        dispatch({
          type: REMOVE_ANIMATION_CONFERENCE_SPORTIF_SUCCESS,
          id_thematique_animation_conference: id_thematique_animation_conference,
        });
        dispatch(send_success_message('Animation de conférence bien supprimée'));
      })
      .catch((response) => {
        dispatch({
          type: REMOVE_ANIMATION_CONFERENCE_SPORTIF_ERROR,
          error: response.error,
        });
        dispatch(send_error_message(response.error));
      });
  };
}