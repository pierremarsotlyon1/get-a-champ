/**
 * Created by pierremarsot on 04/03/2017.
 */
import {
  SEARCH_METIER_ERROR,
  SEARCH_METIER_SUCCESS,
} from '../actions/metier';

const initialState = {
  search_metier: [],
};

export default function metier(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_METIER_SUCCESS:
      const {search_metier} = action;
      if (!search_metier) {
        return {
          search_metier: [],
        };
      }

      return {
        search_metier: search_metier,
      };

    case SEARCH_METIER_ERROR:
      return {
        search_metier: [],
      };

    default:
      return state;
  }
}