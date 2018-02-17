/**
 * Created by pierremarsot on 22/02/2017.
 */
import {
  LOAD_TYPE_SPONSORING_ERROR,
  LOAD_TYPE_SPONSORING_SUCCESS,
} from '../actions/type_sponsoring';

const initialState = {
  types_sponsoring: [],
};

export default function typeSponsoring(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_TYPE_SPONSORING_SUCCESS:
      const {types_sponsoring} = action;
      if(!types_sponsoring)
      {
        return {
          ...state,
          types_sponsoring: [],
        };
      }

      return {
        ...state,
        types_sponsoring: types_sponsoring,
      };

    case LOAD_TYPE_SPONSORING_ERROR:
      return {
        ...state,
        types_sponsoring: [],
      };

    default:
      return state;
  }
}