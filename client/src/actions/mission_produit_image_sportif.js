/**
 * Created by pierremarsot on 04/02/2017.
 */
import { getApi, postApi } from '../utils/apiUtils';
import {send_error_message, send_success_message} from './toasts';

export const LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS = 'LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS';
export const LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR = 'LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR';

export const UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS = 'UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS';
export const UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR = 'UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR';

export const CHANGE_PROMOUVOIR_LANCEMENT_PRODUIT_PROMOTION_IMAGE = 'CHANGE_PROMOUVOIR_LANCEMENT_PRODUIT_PROMOTION_IMAGE';

function load_settings_lancement_produit_promotion_image_sportif_success(payload)
{
  return {
    type: LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS,
    promotionProduit: payload.promotionProduit,
    promotionImage: payload.promotionImage,
  };
}

function load_settings_lancement_produit_promotion_image_sportif_sportif_error(payload)
{
  return {
    type: LOAD_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function load_settings_lancement_produit_promotion_image_sportif()
{
  return dispatch => {
    getApi('/api/sportif/settings/lancement_produit_promotion_image')
      .then((response) => {
        return dispatch(load_settings_lancement_produit_promotion_image_sportif_success(response));
      })
      .catch((response) => {
        dispatch(load_settings_lancement_produit_promotion_image_sportif_sportif_error(response));
        dispatch(send_error_message(response.error));
      });
  };
}

function update_settings_lancement_produit_promotion_image_sportif_success(settings_lancement_produit_promotion_image_sportif_update)
{
  return {
    type: UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_SUCCESS,
    promotionProduit: settings_lancement_produit_promotion_image_sportif_update.promotionProduit,
    promotionImage: settings_lancement_produit_promotion_image_sportif_update.promotionImage,
  };
}

function update_settings_lancement_produit_promotion_image_sportif_error(payload)
{
  return {
    type: UPDATE_SETTINGS_LANCEMENT_PRODUIT_PROMOTION_IMAGE_SPORTIF_ERROR,
    error: payload.error,
  };
}

export function update_settings_lancement_produit_promotion_image_image_sportif(
  promotionProduit,
  promotionImage
)
{
  return dispatch => {
    postApi('/api/sportif/settings/lancement_produit_promotion_image', {
      promotionProduit: promotionProduit,
      promotionImage: promotionImage,
    })
      .then(() => {
        dispatch(update_settings_lancement_produit_promotion_image_sportif_success({
          promotionProduit: promotionProduit,
          promotionImage: promotionImage,
        }));
        return dispatch(send_success_message('Vos paramétres ont bien été mis à jour'));
      })
      .catch((response) => {
        dispatch(update_settings_lancement_produit_promotion_image_sportif_error(response));
        return dispatch(send_error_message(response.error));
      });
  };
}

export function change_promouvoir_lancement_produit_promotionImage(isChecked)
{
  return {
    type: CHANGE_PROMOUVOIR_LANCEMENT_PRODUIT_PROMOTION_IMAGE,
    isChecked: isChecked,
  };
}