/**
 * Created by pierremarsot on 21/02/2017.
 */
import {
  SEARCH_LANGUE_SUCCESS,
  SEARCH_LANGUE_ERROR,
} from '../actions/langue';

const initialState = {
  langues: [],
};

export default function langue(state = initialState, action = {})
{
  switch(action.type)
  {
    case SEARCH_LANGUE_SUCCESS:
      const {langues} = action;
      if(!langues)
      {
        return {
          ...state,
          langues: [],
        };
      }

      return {
        ...state,
        langues: langues,
      };

    case SEARCH_LANGUE_ERROR:
      return {
        ...state,
        langues: [],
      };

    default:
      return state;
  }
}