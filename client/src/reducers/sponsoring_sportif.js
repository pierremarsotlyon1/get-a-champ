/**
 * Created by pierremarsot on 10/02/2017.
 */
const moment = require('moment');

import {
  LOAD_SPONSORING_SPORTIF_ERROR,
  LOAD_SPONSORING_SPORTIF_SUCCESS,
  ADD_SPONSORING_SPORTIF_SUCCESS,
  ADD_SPONSORING_SPORTIF_ERROR,
  DELETE_SPONSORING_SPORTIF_ERROR,
  DELETE_SPONSORING_SPORTIF_SUCCESS,
} from '../actions/sponsoring_sportif';

const initialState = {
  sponsorings_sportif: [],
};

export default function sponsoringSportif(state = initialState, action = {})
{
  switch(action.type)
  {
    case LOAD_SPONSORING_SPORTIF_ERROR:
      return {
        ...state,
        sponsorings_sportif: [],
      };

    case LOAD_SPONSORING_SPORTIF_SUCCESS:
      const {sponsorings_sportif} = action;
      if(!sponsorings_sportif)
      {
        return {
          ...state,
          sponsorings_sportif: [],
        };
      }

      return {
        ...state,
        sponsorings_sportif: sponsorings_sportif,
      };

    case ADD_SPONSORING_SPORTIF_ERROR:
      return state;

    case ADD_SPONSORING_SPORTIF_SUCCESS:
      const {sponsoring_sportif} = action;
      if(!sponsoring_sportif)
      {
        return state;
      }

      return {
        ...state,
        sponsorings_sportif: state.sponsorings_sportif.concat(sponsoring_sportif).sort((sponsoring_sportif_1, sponsoring_sportif_2) => {
          const date_sponso_1 = moment(sponsoring_sportif_1._source.date_depart_sponsoring_sportif);
          const date_sponso_2 = moment(sponsoring_sportif_2._source.date_depart_sponsoring_sportif);

          if(moment(date_sponso_1).isBefore(date_sponso_2))
          {
            return 1;
          }

          if(moment(date_sponso_1).isAfter(date_sponso_2))
          {
            return -1;
          }

          return 0;
        }),
      };

    case DELETE_SPONSORING_SPORTIF_ERROR:
      return state;

    case DELETE_SPONSORING_SPORTIF_SUCCESS:
      const {id_sponsoring_sportif} = action;
      if(!id_sponsoring_sportif)
      {
        return state;
      }

      return {
        ...state,
        sponsorings_sportif: state.sponsorings_sportif.filter((sponsoring_sportif) => {
          return sponsoring_sportif._id !== id_sponsoring_sportif;
        }),
      };
    default:
      return state;
  }
}