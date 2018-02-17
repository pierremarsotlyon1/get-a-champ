/**
 * Created by pierremarsot on 21/01/2017.
 */

import {
  LOAD_COMPETITION_SPORTIF_SUCCESS,
  LOAD_COMPETITION_SPORTIF_ERROR,
  UPDATE_COMPETITION_SUCCESS,
  UPDATE_COMPETITION_ERROR,
  REMOVE_COMPETITION_SPORTIF_ERROR,
  REMOVE_COMPETITION_SPORTIF_SUCCESS,
  ADD_COMPETITION_SPORTIF_SUCCESS,
  OPEN_MODAL_UPDATE_COMPETITION,
  CLOSE_MODAL_UPDATE_COMPETITION,
  UPLOAD_VIDEO_COMPETITION_SUCCESS,
  UPLOAD_VIDEO_COMPETITION_ERROR,
  REMOVE_VIDEO_COMPETITION_ERROR,
  REMOVE_VIDEO_COMPETITION_SUCCESS,
} from '../actions/competition_sportif';

let initialState = {
  competitions_sportif: [],
  competition_sportif_update: undefined,
};

export default function competition_sportif(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_COMPETITION_SPORTIF_SUCCESS:
      return {
        ...state,
        competitions_sportif: action.competitions_sportif,
      };

    case LOAD_COMPETITION_SPORTIF_ERROR:
      return {
        ...state,
        competitions_sportif: [],
      };

    case OPEN_MODAL_UPDATE_COMPETITION:
      const id_competition = action.id_competition;
      const competition = state.competitions_sportif.find((competition) => {
        return competition._id === id_competition;
      });

      if (!id_competition || !competition) {
        return {
          ...state,
          competition_sportif_update: undefined,
        };
      }

      return {
        ...state,
        competition_sportif_update: competition,
      };

    case CLOSE_MODAL_UPDATE_COMPETITION:
      return {
        ...state,
        competition_sportif_update: undefined,
      };

    case UPDATE_COMPETITION_ERROR:
      return Object.assign({}, state, {
        competition_sportif_update: undefined,
      });

    case UPDATE_COMPETITION_SUCCESS:
      let competition_updated = action.competition;

      if (!competition_updated || !competition_updated._id) {
        return {
          ...state,
          competition_sportif_update: undefined,
        };
      }

      return {
        ...state,
        competitions_sportif: state.competitions_sportif.map((element) => {
          if (element._id === competition_updated._id) {
            //element = competition_updated;
            return Object.assign({}, element, competition_updated);
          }

          return element;
        }),
        competition_sportif_update: undefined,
      };

    case REMOVE_COMPETITION_SPORTIF_ERROR:
      return state;

    case REMOVE_COMPETITION_SPORTIF_SUCCESS:
      return {
        ...state,
        competitions_sportif: state.competitions_sportif.filter((competition) => {
          return competition._id !== action.id_competition;
        }),
      };

    case ADD_COMPETITION_SPORTIF_SUCCESS:
      const competition_added = action.competition;

      return {
        ...state,
        competitions_sportif: state.competitions_sportif.concat(competition_added),
      };

    case UPLOAD_VIDEO_COMPETITION_SUCCESS:
      const {
        url_video,
        id_competition_sportive
      } = action;

      if (!url_video || !id_competition_sportive) {
        return state;
      }

      return {
        ...state,
        competitions_sportif: state.competitions_sportif.map((competition_sportive) => {
          if(competition_sportive
            && competition_sportive._source
            && competition_sportive._id === id_competition_sportive)
          {
            competition_sportive._source.video_competition_sportif = url_video;
            return Object.assign({}, competition_sportive, competition_sportive);
          }

          return competition_sportive;
        }),
      };

    case UPLOAD_VIDEO_COMPETITION_ERROR:
      return state;

    case REMOVE_VIDEO_COMPETITION_SUCCESS:
      const id_competition_sportive_removed = action.id_competition_sportive;
      if(!id_competition_sportive_removed)
      {
        return state;
      }

      return {
        ...state,
        competitions_sportif: state.competitions_sportif.map((competition) => {
          if(competition._id === id_competition_sportive_removed && competition._source)
          {
            delete competition._source.video_competition_sportif;
            return Object.assign({}, competition, competition);
          }

          return competition;
        }),
      };

    case REMOVE_VIDEO_COMPETITION_ERROR:
      return state;
    default:
      return state;
  }
}