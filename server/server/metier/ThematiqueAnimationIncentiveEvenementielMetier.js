/**
 * Created by pierremarsot on 31/01/2017.
 */

import ThematiqueAnimationIncentiveEvenementielDao from '../dao/ThematiqueAnimationIncentiveEvenementielDao';

class ThematiqueAnimationIncentiveEvenementielMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les thématiques d'animation incentive
   * @returns {Promise} - Erreur ou Array des documents des thématiques d'animation incentive
   */
  find() {
    return new Promise((resolve, reject) => {
      const thematiqueAnimationIncentiveEvenementielDao = new ThematiqueAnimationIncentiveEvenementielDao(this._bdd);
      thematiqueAnimationIncentiveEvenementielDao.find()
        .then((thematiquesAnimationIncentiveEvenementiel) => {
          return resolve(thematiquesAnimationIncentiveEvenementiel);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une thématique d'animation incentive
   * @param id_thematique_animation_incentive - Id de la thématique d'animation incentive
   * @returns {Promise} - Erreur ou document de la thématique d'animation incentive
   */
  get(id_thematique_animation_incentive) {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_incentive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      const thematiqueAnimationIncentiveEvenementielDao = new ThematiqueAnimationIncentiveEvenementielDao(this._bdd);
      thematiqueAnimationIncentiveEvenementielDao.get(id_thematique_animation_incentive)
        .then((thematique_animation_incentive) => {
          return resolve(thematique_animation_incentive);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  exist(id_thematique_animation_incentive)
  {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_incentive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      const thematiqueAnimationIncentiveEvenementielDao = new ThematiqueAnimationIncentiveEvenementielDao(this._bdd);
      thematiqueAnimationIncentiveEvenementielDao.exists(id_thematique_animation_incentive)
        .then((exists) => {
          return resolve(exists);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default ThematiqueAnimationIncentiveEvenementielMetier;