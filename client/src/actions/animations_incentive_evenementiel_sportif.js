/**
 * Created by pierremarsot on 03/02/2017.
 */

import {getApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS = 'LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS';
export const LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR = 'LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR';

export const ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS = 'ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS';
export const ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR = 'ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR';

export const REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS = 'REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS';
export const REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR = 'REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR';

function load_animation_incentive_evenementiel_sportif_success(payload) {
  return {
    type: LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS,
    animations_formation_incentive_evenementiel_sportif: payload.animations_formation_incentive_evenementiel_sportif,
  };
}

function load_animation_incentive_evenementiel_sportif_error(payload) {
  return {
    type: LOAD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_animation_incentive_evenementiel_sportif() {
  return dispatch => {
    getApi('/api/user/sportif/intervention/entreprise/animation/incentive', {})
      .then((response) => {
        return dispatch(load_animation_incentive_evenementiel_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_animation_incentive_evenementiel_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_animation_incentive_evenementiel_sportif_success(animation_incentive_sportif) {
  return {
    type: ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS,
    animation_incentive_sportif: animation_incentive_sportif,
  };
}

function add_animation_incentive_evenementiel_sportif_error() {
  return {
    type: ADD_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR,
  };
}

export function add_animation_incentive_evenementiel_sportif(id_thematique_animation_incentive_sportif, animer_seul) {
  return (dispatch, getState) => {

    if (!id_thematique_animation_incentive_sportif) {
      dispatch(add_animation_incentive_evenementiel_sportif_error());
      return dispatch(send_error_message('Vous devez selectionner une thématique'));
    }

    //On récup la catégorie de thématique incentive
    let thematiqueAnimationIncentiveEvenementiel = getState().thematiqueAnimationIncentiveEvenementiel;
    if(!thematiqueAnimationIncentiveEvenementiel){
      dispatch(add_animation_incentive_evenementiel_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    thematiqueAnimationIncentiveEvenementiel = thematiqueAnimationIncentiveEvenementiel.thematiques_animation_incentive_evenementiel;
    if(!thematiqueAnimationIncentiveEvenementiel){
      dispatch(add_animation_incentive_evenementiel_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    //On récup la thématique
    let thematique;
    for(const categorie of thematiqueAnimationIncentiveEvenementiel){
      if(!categorie || !categorie._source || !categorie._source.thematique_animation_incentive){
        continue;
      }

      for(const thema of categorie._source.thematique_animation_incentive){
        if(thema.id === id_thematique_animation_incentive_sportif){
          thematique = thema;
          break;
        }
      }

      if(thematique){
        break;
      }
    }

    if(!thematique){
      dispatch(add_animation_incentive_evenementiel_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    postApi('/api/user/sportif/intervention/entreprise/animation/incentive', {
      id_thematique_animation_incentive: id_thematique_animation_incentive_sportif,
      animer_seul: animer_seul,
    })
      .then(() => {
        const animation_incentive_sportif = {
          animer_seul: animer_seul,
          id_thematique_animation_incentive_evenementiel: id_thematique_animation_incentive_sportif,
          nom_thematique_animation_incentive_evenementiel: thematique.nom_thematique_animation_incentive,
        };
        dispatch(add_animation_incentive_evenementiel_sportif_success(animation_incentive_sportif));
        return dispatch(send_success_message('Animation incentive bien ajoutée'));
      })
      .catch((response) => {
        dispatch(add_animation_incentive_evenementiel_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}

export function delete_animation_incentive_evenementiel_sportif(id_thematique_animation_incentive_evenementiel) {
  return dispatch => {
    if (!id_thematique_animation_incentive_evenementiel) {
      return dispatch(send_error_message('Vous devez séléctionner une thématique'));
    }

    removeApi('/api/user/sportif/intervention/entreprise/animation/incentive/' + id_thematique_animation_incentive_evenementiel, {})
      .then(() => {
        dispatch({
          type: REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_SUCCESS,
          id_thematique_animation_incentive_evenementiel: id_thematique_animation_incentive_evenementiel,
        });
        dispatch(send_success_message('Thématique incentive bien supprimée'));
      })
      .catch((response) => {
        dispatch({
          type: REMOVE_ANIMATION_FORMATION_INCENTIVE_SPORTIF_ERROR,
          error: response.error,
        });
        dispatch(send_error_message(response.error));
      });
  };
}