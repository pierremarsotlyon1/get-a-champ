/**
 * Created by pierremarsot on 27/02/2017.
 */
import {
  SEARCH_ECOLE_ERROR,
  SEARCH_ECOLE_SUCCESS,
} from '../actions/ecole';

const initialState = {
  ecoles: [],
};

export default function ecole(state = initialState, action = {})
{
  switch(action.type)
  {
    case SEARCH_ECOLE_SUCCESS:
      const {ecoles} = action;
      if(!ecoles)
      {
        return {
          ...state,
          ecoles: [],
        };
      }

      return {
        ...state,
        ecoles: ecoles,
      };

    case SEARCH_ECOLE_ERROR:
      return {
        ...state,
        ecoles: [],
      };
    default:
      return state;
  }
}