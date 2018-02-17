/**
 * Created by pierremarsot on 29/03/2017.
 */
import {
  LOAD_FULL_QUESTIONS_IPIP_ERROR,
  LOAD_SHORT_QUESTIONS_IPIP_ERROR,
  LOAD_SHORT_QUESTIONS_IPIP_SUCCESS,
  LOAD_FULL_QUESTIONS_IPIP_SUCCESS,
  LOAD_REPONSES_IPIP_ERROR,
  LOAD_REPONSES_IPIP_SUCCESS,
  LOAD_RESULTATS_SHORT_TEST_SPORTIF_SUCCESS,
  LOAD_RESULTATS_SHORT_TEST_SPORTIF_ERROR,
  LOAD_RESULTATS_FULL_TEST_SPORTIF_ERROR,
  LOAD_RESULTATS_FULL_TEST_SPORTIF_SUCCESS,
  SAVE_ANSWER_FULL_IPIP_ERROR,
  SAVE_ANSWER_FULL_IPIP_SUCCESS,
  SAVE_ANSWER_SHORT_IPIP_ERROR,
  SAVE_ANSWER_SHORT_IPIP_SUCCESS,
} from '../actions/ipip';

const initaleState = {
  full_questions: [],
  short_questions: [],
  reponses: [],
  resultatsShortTest: [],
  resultatsFullTest: [],
};

export default function ipip(state = initaleState, action = {}) {
  switch (action.type) {

    case SAVE_ANSWER_SHORT_IPIP_ERROR :
    case LOAD_RESULTATS_SHORT_TEST_SPORTIF_ERROR:
      return {
        ...state,
        resultatsShortTest: [],
      };

    case SAVE_ANSWER_FULL_IPIP_ERROR :
    case LOAD_RESULTATS_FULL_TEST_SPORTIF_ERROR:
      return {
        ...state,
        resultatsFullTest: [],
      };

    case SAVE_ANSWER_SHORT_IPIP_SUCCESS:
    case LOAD_RESULTATS_SHORT_TEST_SPORTIF_SUCCESS:
      if (!action.resultatsShortTest) {
        return {
          ...state,
          resultatsShortTest: [],
        }
      }

      return {
        ...state,
        resultatsShortTest: action.resultatsShortTest,
      };

    case SAVE_ANSWER_FULL_IPIP_SUCCESS:
    case LOAD_RESULTATS_FULL_TEST_SPORTIF_SUCCESS:
      if (!action.resultatsFullTest) {
        return {
          ...state,
          resultatsFullTest: [],
        }
      }

      return {
        ...state,
        resultatsFullTest: action.resultatsFullTest,
      };

    case LOAD_FULL_QUESTIONS_IPIP_SUCCESS:
      const {full_questions} = action;
      if (!full_questions) {
        return {
          ...state,
          full_questions: [],
        };
      }

      return {
        ...state,
        full_questions: full_questions,
      };

    case LOAD_FULL_QUESTIONS_IPIP_ERROR:
      return {
        ...state,
        full_questions: [],
      };

    case LOAD_SHORT_QUESTIONS_IPIP_SUCCESS:
      const {short_questions} = action;
      if (!short_questions) {
        return {
          ...state,
          short_questions: [],
        };
      }

      return {
        ...state,
        short_questions: short_questions,
      };

    case LOAD_SHORT_QUESTIONS_IPIP_ERROR:
      return {
        ...state,
        short_questions: [],
      };

    case LOAD_REPONSES_IPIP_SUCCESS:
      const {reponses} = action;
      if (!reponses) {
        return {
          ...state,
          reponses: [],
        };
      }

      return {
        ...state,
        reponses: reponses,
      };

    case LOAD_REPONSES_IPIP_ERROR:
      return {
        ...state,
        reponses: [],
      };

    default:
      return state;
  }
}