/**
 * Created by pierremarsot on 04/02/2017.
 */
import {
  LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR,
  LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS,
  UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR,
  UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS,
  CHANGE_PROMOUVOIR_LANCEMENT_PRODUIT_PROMOTION_IMAGE,
} from '../actions/mission_produit_image_sportif';

const initialState = {
  promotionProduit: false,
  promotionImage: false,
};

export default function missionProduitImageSportif(state = initialState, action = {}) {
  let promotionImage, promotionProduit;
  switch (action.type) {
    case LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS:
      promotionImage = action.promotionImage;
      promotionProduit = action.promotionProduit;

      return {
        ...state,
        promotionProduit: promotionProduit,
        promotionImage: promotionImage,
      };

    case LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR:
      return {
        ...state,
        promotionProduit: false,
        promotionImage: false,
      };

    case UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS:
      promotionImage = action.promotionImage;
      promotionProduit = action.promotionProduit;
      return {
        ...state,
        promotionProduit: promotionProduit,
        promotionImage: promotionImage,
      };

    case UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR:
      return {
        ...state,
        promotionProduit: false,
        promotionImage: false,
      };

    default:
      return state;
  }
}