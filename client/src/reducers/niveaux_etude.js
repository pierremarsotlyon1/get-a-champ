/**
 * Created by pierremarsot on 25/03/2017.
 */
import {
  LOAD_NIVEAUX_ETUDE_ERROR,
  LOAD_NIVEAUX_ETUDE_SUCCESS
} from '../actions/niveau_etude';

const initialeState = {
  niveaux_etude: [],
};

export default function niveauxEtude(state = initialeState, action = {}){
  switch(action.type){
    case LOAD_NIVEAUX_ETUDE_SUCCESS:
      const {niveaux_etude} = action;
      if(!niveaux_etude){
        return {
          ...state,
          niveaux_etude: [],
        };
      }

      return {
        ...state,
        niveaux_etude: niveaux_etude,
      };

    case LOAD_NIVEAUX_ETUDE_ERROR:
      return {
        ...state,
        niveaux_etude: [],
      };

    default:
      return state;
  }
}