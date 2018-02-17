/**
 * Created by pierremarsot on 25/03/2017.
 */
import {
  LOAD_DIMENSIONS_SPORTIVES_ERROR,
  LOAD_DIMENSIONS_SPORTIVES_SUCCESS,
} from '../actions/dimension_sportive';

const initialeState = {
  dimensions_sportives: [],
};

export default function dimensionSportive(state = initialeState, action = {}){
  switch(action.type){
    case LOAD_DIMENSIONS_SPORTIVES_SUCCESS:
      const {dimensions_sportives} = action;
      if(!dimensions_sportives){
        return {
          ...state,
          dimensions_sportives: [],
        };
      }

      return {
        ...state,
        dimensions_sportives: dimensions_sportives,
      };

    case LOAD_DIMENSIONS_SPORTIVES_ERROR:
      return {
        ...state,
        dimensions_sportives: [],
      };

    default:
      return state;
  }
}