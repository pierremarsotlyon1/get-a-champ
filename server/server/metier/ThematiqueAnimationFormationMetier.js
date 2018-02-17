/**
 * Created by pierremarsot on 31/01/2017.
 */

import ThematiqueAnimationFormationDao from '../dao/ThematiqueAnimationFormationDao';

class ThematiqueAnimationFormationMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les thématiques d'animation de formation
   * @returns {Promise} - Erreur ou Array des documents des thématiques d'animation de formation
   */
  find() {
    return new Promise((resolve, reject) => {
      const thematiqueAnimationFormationDao = new ThematiqueAnimationFormationDao(this._bdd);
      thematiqueAnimationFormationDao.find()
        .then((thematiquesAnimationFormation) => {
          return resolve(thematiquesAnimationFormation);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une thématique d'animation de formation
   * @param id_thematique_animation_formation - Id de la thématique d'animation de formation
   * @returns {Promise} - Erreur ou document de la thématique d'animation de formation
   */
  get(id_thematique_animation_formation) {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_formation) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      const thematiqueAnimationFormationDao = new ThematiqueAnimationFormationDao(this._bdd);
      thematiqueAnimationFormationDao.get(id_thematique_animation_formation)
        .then((thematique_animation_formation) => {
          return resolve(thematique_animation_formation);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  exist(id_thematique_animation_formation)
  {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_formation) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      const thematiqueAnimationFormationDao = new ThematiqueAnimationFormationDao(this._bdd);
      thematiqueAnimationFormationDao.exists(id_thematique_animation_formation)
        .then((exists) => {
          return resolve(exists);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default ThematiqueAnimationFormationMetier;