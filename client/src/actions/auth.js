/**
 * Created by pierremarsot on 11/01/2017.
 */

import {getApi, postApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const REGISTER_SPORTIF_SUCCESS = "REGISTER_SPORTIF_SUCCESS";
export const REGISTER_SPORTIF_ERROR = "REGISTER_SPORTIF_ERROR";

export const REGISTER_ENTREPRISE_SUCCESS = "REGISTER_ENTREPRISE_SUCCESS";
export const REGISTER_ENTREPRISE_ERROR = "REGISTER_ENTREPRISE_ERROR";

export const LOGOUT = 'LOGOUT';

export const RESET_STORE = 'RESET';

export function reset_store() {
  return dispatch => dispatch({
    type: RESET_STORE,
  });
}
export function logout() {
  return async dispatch => {
    dispatch({
      type: RESET_STORE,
    });
    dispatch({
      type: LOGOUT
    });
  };
}

function login_success(payload) {
  if (!payload) {
    return {
      type: LOGIN_ERROR,
      error: 'Erreur lors de la récupération de vos informations',
    }
  }

  return {
    type: LOGIN_SUCCESS,
    token: payload.token,
    type_user: payload.type_user,
  };
}

function login_error() {
  return {
    type: LOGIN_ERROR,
  };
}

export function login(email, password) {
  return dispatch => {
    if (!email) {
      dispatch(send_error_message('Vous devez spécifier un email'));
      return dispatch(login_error());
    }

    if (!password) {
      dispatch(send_error_message('Vous devez spécifier un mot de passe'));
      return dispatch(login_error());
    }

    getApi("/login", {
      email: email,
      password: password,
    })
      .then((data) => {
        return dispatch(login_success(data));
      })
      .catch((data) => {
        dispatch(send_error_message(data.error));
        return dispatch(login_error());
      });
  };
}

function register_sportif_success(payload) {
  if (!payload || !payload.token) {
    return {
      type: REGISTER_SPORTIF_ERROR,
      error: 'Erreur lors de la création de votre compte',
    }
  }

  return {
    type: REGISTER_SPORTIF_SUCCESS,
    token: payload.token,
  }
}

function register_sportif_error() {
  return {
    type: REGISTER_SPORTIF_ERROR,
  }
}

export function register_sportif(nom, prenom, email, password, confirmpassword) {
  return dispatch => {
    if (!email) {
      dispatch(send_error_message('Vous devez spécifier un email'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    if (!prenom) {
      dispatch(send_error_message('Vous devez spécifier un prénom'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    if (!nom) {
      dispatch(send_error_message('Vous devez spécifier un nom'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    if (!password) {
      dispatch(send_error_message('Vous devez spécifier un mot de passe'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    if (!confirmpassword) {
      dispatch(send_error_message('Vous devez spécifier un mot de passe de confirmation'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    if (password !== confirmpassword) {
      dispatch(send_error_message('Votre mot de passe doit être égal à celui de confirmation'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    postApi("/user/sportif", {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password,
      confirm_password: confirmpassword,
    })
      .then((data) => {
        return dispatch(register_sportif_success(data));
      })
      .catch((data) => {
        dispatch(send_error_message(data.error));
        return dispatch(register_sportif_error());
      });
  };
}

function register_entreprise_success(payload) {
  if (!payload || !payload.token) {
    return {
      type: REGISTER_ENTREPRISE_ERROR,
      error: 'Erreur lors de la création de votre compte',
    }
  }

  return {
    type: REGISTER_ENTREPRISE_SUCCESS,
    token: payload.token,
  }
}

function register_entreprise_error() {
  return {
    type: REGISTER_ENTREPRISE_ERROR,
  }
}

export function register_entreprise(siret, nom, prenom, email, password, confirmpassword, nom_entreprise) {
  return dispatch => {
    if (!siret) {
      dispatch(send_error_message('Vous devez spécifier un numéro de siret'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!email) {
      dispatch(send_error_message('Vous devez spécifier un email'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!prenom) {
      dispatch(send_error_message('Vous devez spécifier un prénom'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!nom) {
      dispatch(send_error_message('Vous devez spécifier un nom'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!password) {
      dispatch(send_error_message('Vous devez spécifier un mot de passe'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!confirmpassword) {
      dispatch(send_error_message('Vous devez spécifier un mot de passe de confirmation'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!nom_entreprise) {
      dispatch(send_error_message('Vous devez spécifier un nom d\'entreprise'));
      return dispatch({
        type: REGISTER_ENTREPRISE_ERROR,
      });
    }

    if (!(password === confirmpassword)) {
      dispatch(send_error_message('Votre mot de passe doit être égal à celui de confirmation'));
      return dispatch({
        type: REGISTER_SPORTIF_ERROR,
      });
    }

    postApi("/user/entreprise", {
      siret_entreprise: siret,
      nom_gerant: nom,
      prenom_gerant: prenom,
      email: email,
      password: password,
      confirm_password: confirmpassword,
      nom_entreprise: nom_entreprise,
    })
      .then((data) => {
        return dispatch(register_entreprise_success(data));
      })
      .catch((data) => {
        dispatch(send_error_message(data.error));
        return dispatch(register_entreprise_error());
      });
  };
}