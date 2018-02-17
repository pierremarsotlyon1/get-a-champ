import { LOGIN_SUCCESS, LOGIN_ERROR, REGISTER_SPORTIF_ERROR,
  REGISTER_SPORTIF_SUCCESS, REGISTER_ENTREPRISE_ERROR, REGISTER_ENTREPRISE_SUCCESS, LOGOUT } from '../actions/auth';
import { setLocalStorage, getLocalStorage, clearLocalStorage, ID_TOKEN, TYPE_USER } from '../utils/localStorage';

let initialeState = {};

function initState()
{
  const type_user = Number.parseInt(getLocalStorage(TYPE_USER), 0);

  initialeState = {
    login_error: '',
    register_error: '',
    connected: getLocalStorage(ID_TOKEN) !== null,
    type_user: type_user === null || type_user < 1 || type_user > 2 ? 0 : type_user,
  };
}

initState();

export default function auth(state = initialeState, action = {})
{
  switch(action.type)
  {
    case LOGIN_SUCCESS:
      if(!setLocalStorage(ID_TOKEN, action.token) || !setLocalStorage(TYPE_USER, action.type_user))
      {
        return {
          ...state,
          connected: false,
          type_user: 0,
          login_error: 'Erreur inconnue',
        };
      }

      return {
        ...state,
        connected: true,
        type_user: action.type_user,
        login_error: '',
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login_error: action.error,
        type_user: 0,
        connected: false,
      };
    case REGISTER_SPORTIF_SUCCESS:
      if(!setLocalStorage(ID_TOKEN, action.token))
      {
        return {
          ...state,
          connected: false,
          type_user: 0,
          register_error: 'Erreur inconnue',
        };
      }

      return {
        ...state,
        connected: true,
        type_user: 1,
        register_error: '',
      };
    case REGISTER_SPORTIF_ERROR:
      return {
        ...state,
        connected: false,
        type_user: 0,
        register_error: action.error,
      };
    case REGISTER_ENTREPRISE_SUCCESS:
      if(!setLocalStorage(ID_TOKEN, action.token))
      {
        return {
          ...state,
          connected: false,
          type_user: 0,
          register_error: 'Erreur inconnue',
        };
      }

      return {
        ...state,
        connected: true,
        type_user: 2,
        register_error: '',
      };
    case REGISTER_ENTREPRISE_ERROR:
      return {
        ...state,
        connected: false,
        type_user: 0,
        register_error: action.error,
      };
    case LOGOUT:
      if(!clearLocalStorage())
      {
        return state;
      }

      return {
        ...state,
        type_user: 0,
        connected: false,
      };
    default:
      return state;
  }
}