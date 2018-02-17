/**
 * Created by pierremarsot on 01/03/2017.
 */
import {
  SEARCH_SPONSORING_ERROR,
  SEARCH_SPONSORING_SUCCESS,
} from '../actions/search_sponsoring';

const initialState = {
  search_sportif_sponsoring: [],
};

export default function searchSportifSponsoring(state = initialState, action = {})
{
  switch(action.type)
  {
    case SEARCH_SPONSORING_SUCCESS:
      const {search_sportif_sponsoring} = action;
      if(!search_sportif_sponsoring)
      {
        return {
          ...state,
          search_sportif_sponsoring: [],
        };
      }

      return {
        ...state,
        search_sportif_sponsoring: search_sportif_sponsoring,
      };

    case SEARCH_SPONSORING_ERROR:
      return {
        ...state,
        search_sportif_sponsoring: [],
      };

    default:
      return state;
  }
}