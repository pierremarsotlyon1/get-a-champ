/**
 * Created by pierremarsot on 04/02/2017.
 */

export const SEND_SUCCESS_MESSAGE = 'SEND_SUCCESS_MESSAGE';
export const SEND_ERROR_MESSAGE = 'SEND_ERROR_MESSAGE';
export const SEND_WARNING_MESSAGE = 'SEND_WARNING_MESSAGE';
export const SEND_INFO_MESSAGE = 'SEND_INFO_MESSAGE';
export const INIT_ALL_MESSAGE = 'INIT_ALL_MESSAGE';

export function init_all_message()
{
  return dispatch => {
    return dispatch({
      type: INIT_ALL_MESSAGE
    });
  }
}

export function send_error_message(error)
{
  return dispatch => {
    if(!error || error.length === 0){
      return false;
    }
    return dispatch({
      type: SEND_ERROR_MESSAGE,
      error: error,
    });
  };
}

export function send_success_message(success)
{
  return dispatch => {
    return dispatch({
      type: SEND_SUCCESS_MESSAGE,
      success: success,
    });
  };
}