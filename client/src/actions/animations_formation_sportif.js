/**
 * Created by pierremarsot on 01/02/2017.
 */
import {getApi, postApi, removeApi} from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_ANIMATION_FORMATION_SPORTIF_SUCCESS = 'LOAD_ANIMATION_FORMATION_SPORTIF_SUCCESS';
export const LOAD_ANIMATION_FORMATION_SPORTIF_ERROR = 'LOAD_ANIMATION_FORMATION_SPORTIF_ERROR';

export const ADD_ANIMATION_FORMATION_SPORTIF_SUCCESS = 'ADD_ANIMATION_FORMATION_SPORTIF_SUCCESS';
export const ADD_ANIMATION_FORMATION_SPORTIF_ERROR = 'ADD_ANIMATION_FORMATION_SPORTIF_ERROR';

export const REMOVE_ANIMATION_FORMATION_SPORTIF_SUCCESS = 'REMOVE_ANIMATION_FORMATION_SPORTIF_SUCCESS';
export const REMOVE_ANIMATION_FORMATION_SPORTIF_ERROR = 'REMOVE_ANIMATION_FORMATION_SPORTIF_ERROR';

function load_animation_formation_sportif_success(payload) {
  return {
    type: LOAD_ANIMATION_FORMATION_SPORTIF_SUCCESS,
    animations_formation_sportif: payload.animations_formation_sportif,
  };
}

function load_animation_formation_sportif_error(payload) {
  return {
    type: LOAD_ANIMATION_FORMATION_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_animation_formation_sportif() {
  return async dispatch => {
    getApi('/api/user/sportif/intervention/entreprise/animation/formation', {})
      .then((response) => {
        return dispatch(load_animation_formation_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_animation_formation_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function add_animation_formation_sportif_success(animation_formation_sportif) {
  return {
    type: ADD_ANIMATION_FORMATION_SPORTIF_SUCCESS,
    animation_formation_sportif: animation_formation_sportif,
  };
}

function add_animation_formation_sportif_error() {
  return {
    type: ADD_ANIMATION_FORMATION_SPORTIF_ERROR,
  };
}

export function add_animation_formation_sportif(id_thematique_animation_formation, animer_seul) {
  return (dispatch, getState) => {

    if (!id_thematique_animation_formation) {
      dispatch(add_animation_formation_sportif_error());
      return dispatch(send_error_message('Vous devez selectionner une thématique'));
    }

    //On cherche la catégorie de thématique de formation
    let thematiqueAnimationFormation = getState().thematiqueAnimationFormation;
    if(!thematiqueAnimationFormation){
      dispatch(add_animation_formation_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    thematiqueAnimationFormation = thematiqueAnimationFormation.thematiques_animation_formation;
    if(!thematiqueAnimationFormation){
      dispatch(add_animation_formation_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    //On cherche la thématique
    let thematique;
    for(const categorie of thematiqueAnimationFormation){
      if(!categorie || !categorie._source || !categorie._source.thematique_animation_formation){
        continue;
      }

      for(const thema of categorie._source.thematique_animation_formation){
        if(thema.id === id_thematique_animation_formation){
          thematique = thema;
          break;
        }
      }

      if(thematique){
        break;
      }
    }

    if(!thematique){
      dispatch(add_animation_formation_sportif_error());
      return dispatch(send_error_message('Erreur lors de la récupération de la thématique'));
    }

    postApi('/api/user/sportif/intervention/entreprise/animation/formation', {
      id_thematique_animation_formation: id_thematique_animation_formation,
      animer_seul: animer_seul,
    })
      .then(() => {
        const animation_formation_sportif = {
          animer_seul: animer_seul,
          id_thematique_animation_formation: id_thematique_animation_formation,
          nom_thematique_animation_formation: thematique.nom_thematique_animation_formation,
        };
        dispatch(add_animation_formation_sportif_success(animation_formation_sportif));
        return dispatch(send_success_message('Thématique de formation bien ajoutée'));
      })
      .catch((response) => {
        dispatch(add_animation_formation_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}

export function delete_animation_formation_sportif(id_thematique_animation_formation) {
  return dispatch => {
    if (!id_thematique_animation_formation) {
      return dispatch(send_error_message('Vous devez séléctionner une thématique'));
    }

    removeApi('/api/user/sportif/intervention/entreprise/animation/formation/' + id_thematique_animation_formation, {})
      .then(() => {
        dispatch({
          type: REMOVE_ANIMATION_FORMATION_SPORTIF_SUCCESS,
          id_thematique_animation_formation: id_thematique_animation_formation,
        });
        return dispatch(send_success_message('Thématique de formation bien supprimée'));
      })
      .catch((response) => {
        dispatch({
          type: REMOVE_ANIMATION_FORMATION_SPORTIF_ERROR,
          error: response.error,
        });
        return dispatch(send_error_message(response.error));
      });
  };
}