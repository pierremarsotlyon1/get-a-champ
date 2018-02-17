/**
 * Created by pierremarsot on 04/02/2017.
 */

import {
  SEND_ERROR_MESSAGE,
  SEND_INFO_MESSAGE,
  SEND_SUCCESS_MESSAGE,
  SEND_WARNING_MESSAGE,
  INIT_ALL_MESSAGE,
} from '../actions/toasts';

const initialState = {
  success: undefined,
  error: undefined,
  warning: undefined,
  info: undefined,
};

export default function toasts(state = initialState, action = {})
{
  switch(action.type)
  {
    case SEND_SUCCESS_MESSAGE:
      const { success } = action;
      if(!success)
      {
        return state;
      }

      return {
        ...state,
        success: success,
      };

    case SEND_WARNING_MESSAGE:
      const { warning } = action;
      if(!warning)
      {
        return state;
      }

      return {
        ...state,
        warning: warning,
      };

    case SEND_INFO_MESSAGE:
      const { info } = action;
      if(!info)
      {
        return state;
      }

      return {
        ...state,
        info: info,
      };

    case SEND_ERROR_MESSAGE:
      const { error } = action;
      if(!error)
      {
        return state;
      }

      return {
        ...state,
        error: error,
      };

    case INIT_ALL_MESSAGE:
      return {
        ...state,
        success: undefined,
        error: undefined,
        warning: undefined,
        info: undefined,
      };
    default:
      return state;
  }
}