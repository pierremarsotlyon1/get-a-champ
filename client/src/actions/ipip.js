/**
 * Created by pierremarsot on 29/03/2017.
 */
import {getApi, postApi} from '../utils/apiUtils';
import {send_error_message} from './toasts';

export const LOAD_SHORT_QUESTIONS_IPIP_SUCCESS = 'LOAD_SHORT_QUESTIONS_IPIP_SUCCESS';
export const LOAD_SHORT_QUESTIONS_IPIP_ERROR = 'LOAD_SHORT_QUESTIONS_IPIP_ERROR';

export const LOAD_FULL_QUESTIONS_IPIP_SUCCESS = 'LOAD_FULL_QUESTIONS_IPIP_SUCCESS';
export const LOAD_FULL_QUESTIONS_IPIP_ERROR = 'LOAD_FULL_QUESTIONS_IPIP_ERROR';

export const LOAD_REPONSES_IPIP_SUCCESS = 'LOAD_REPONSES_IPIP_SUCCESS';
export const LOAD_REPONSES_IPIP_ERROR = 'LOAD_REPONSES_IPIP_ERROR';

export const SAVE_ANSWER_SHORT_IPIP_SUCCESS = 'SAVE_ANSWER_SHORT_IPIP_SUCCESS';
export const SAVE_ANSWER_SHORT_IPIP_ERROR = 'SAVE_ANSWER_SHORT_IPIP_ERROR';

export const SAVE_ANSWER_FULL_IPIP_SUCCESS = 'SAVE_ANSWER_FULL_IPIP_SUCCESS';
export const SAVE_ANSWER_FULL_IPIP_ERROR = 'SAVE_ANSWER_FULL_IPIP_ERROR';

export const LOAD_RESULTATS_SHORT_TEST_SPORTIF_SUCCESS = 'LOAD_RESULTATS_SHORT_TEST_SPORTIF_SUCCESS';
export const LOAD_RESULTATS_SHORT_TEST_SPORTIF_ERROR = 'LOAD_RESULTATS_SHORT_TEST_SPORTIF_ERROR';

export const LOAD_RESULTATS_FULL_TEST_SPORTIF_SUCCESS = 'LOAD_RESULTATS_FULL_TEST_SPORTIF_SUCCESS';
export const LOAD_RESULTATS_FULL_TEST_SPORTIF_ERROR = 'LOAD_RESULTATS_FULL_TEST_SPORTIF_ERROR';

function loadResultatsShortTestSportifSuccess(payload) {
  return {
    type: LOAD_RESULTATS_SHORT_TEST_SPORTIF_SUCCESS,
    resultatsShortTest: payload.resultatsShortTest,
  };
}

function loadResultatsShortTestSportifError() {
  return {
    type: LOAD_RESULTATS_SHORT_TEST_SPORTIF_ERROR,
  };
}

export function loadResultatsShortTestSportif() {
  return dispatch => {
    getApi('/api/user/sportif/resultats/test/short')
      .then((response) => {
        return dispatch(loadResultatsShortTestSportifSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          send_error_message(response.error);
        }

        return dispatch(loadResultatsShortTestSportifError());
      });
  }
}

function loadResultatsFullTestSportifSuccess(payload) {
  return {
    type: LOAD_RESULTATS_FULL_TEST_SPORTIF_SUCCESS,
    resultatsFullTest: payload.resultatsFullTest,
  };
}

function loadResultatsFullTestSportifError() {
  return {
    type: LOAD_RESULTATS_FULL_TEST_SPORTIF_ERROR,
  };
}

export function loadResultatsFullTestSportif() {
  return dispatch => {
    getApi('/api/user/sportif/resultats/test/full')
      .then((response) => {
        return dispatch(loadResultatsFullTestSportifSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          send_error_message(response.error);
        }

        return dispatch(loadResultatsFullTestSportifError());
      });
  }
}

function saveAnswerShortIpipSuccess(payload) {
  return {
    type: SAVE_ANSWER_SHORT_IPIP_SUCCESS,
    resultatsShortTest: payload.resultatsShortTest,
  };
}

function saveAnswerShortIpipError() {
  return {
    type: SAVE_ANSWER_SHORT_IPIP_ERROR
  };
}

export function saveAnswerShortIpip(reponses) {
  return dispatch => {
    if (!reponses || reponses.length === 0) {
      send_error_message('Vous n\'avez pas répondu aux questions');
      return dispatch(saveAnswerShortIpipError());
    }

    postApi('/api/ipip/reponses/short', {
      reponses: reponses,
    })
      .then((response) => {
        return dispatch(saveAnswerShortIpipSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          send_error_message(response.error);
        }

        return dispatch(saveAnswerShortIpipError());
      });
  }
}

function saveAnswerFullIpipSuccess(payload) {
  return {
    type: SAVE_ANSWER_FULL_IPIP_SUCCESS,
    resultatsFullTest: payload.resultatsFullTest,
  };
}

function saveAnswerFullIpipError() {
  return {
    type: SAVE_ANSWER_FULL_IPIP_ERROR
  };
}

export function saveAnswerFullIpip(reponses) {
  return dispatch => {
    if (!reponses || reponses.length === 0) {
      send_error_message('Vous n\'avez pas répondu aux questions');
      return dispatch(saveAnswerShortIpipError());
    }

    postApi('/api/ipip/reponses/full', {
      reponses: reponses,
    })
      .then((response) => {
        return dispatch(saveAnswerFullIpipSuccess(response));
      })
      .catch((response) => {
        if (response && response.error) {
          send_error_message(response.error);
        }

        return dispatch(saveAnswerFullIpipError());
      });
  }
}

function load_short_questions_ipip_success(payload) {
  return {
    type: LOAD_SHORT_QUESTIONS_IPIP_SUCCESS,
    short_questions: payload.short_questions,
  };
}

function load_short_questions_ipip_error() {
  return {
    type: LOAD_SHORT_QUESTIONS_IPIP_ERROR,
  };
}

export function load_short_questions_ipip() {
  return dispatch => {
    getApi('/ipip/questions/short')
      .then((response) => {
        return dispatch(load_short_questions_ipip_success(response));
      })
      .catch((response) => {
        dispatch(load_short_questions_ipip_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

function load_full_questions_ipip_success(payload) {
  return {
    type: LOAD_FULL_QUESTIONS_IPIP_SUCCESS,
    full_questions: payload.full_questions,
  };
}

function load_full_questions_ipip_error() {
  return {
    type: LOAD_FULL_QUESTIONS_IPIP_ERROR,
  };
}

export function load_full_questions_ipip() {
  return dispatch => {
    getApi('/ipip/questions/full')
      .then((response) => {
        return dispatch(load_full_questions_ipip_success(response));
      })
      .catch((response) => {
        dispatch(load_full_questions_ipip_error());
        return dispatch(send_error_message(response.error));
      });
  };
}

function load_reponses_ipip_success(payload) {
  return {
    type: LOAD_REPONSES_IPIP_SUCCESS,
    reponses: payload.reponses,
  };
}

function load_reponses_ipip_error() {
  return {
    type: LOAD_REPONSES_IPIP_ERROR,
  };
}

export function load_reponses_ipip() {
  return dispatch => {
    getApi('/ipip/reponses')
      .then((response) => {
        return dispatch(load_reponses_ipip_success(response));
      })
      .catch((response) => {
        dispatch(load_reponses_ipip_error());
        return dispatch(send_error_message(response.error));
      });
  };
}