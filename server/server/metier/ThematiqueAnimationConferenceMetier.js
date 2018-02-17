/**
 * Created by pierremarsot on 31/01/2017.
 */

import ThematiqueAnimationConferenceDao from '../dao/ThematiqueAnimationConferenceDao';

class ThematiqueAnimationConferenceMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les thématiques d'animation de conférence
   * @returns {Promise} - Erreur ou Array des documents des thématiques d'animation de conférence
   */
  find() {
    return new Promise((resolve, reject) => {
      const thematiqueAnimationConferenceDao = new ThematiqueAnimationConferenceDao(this._bdd);
      thematiqueAnimationConferenceDao.find()
        .then((thematiquesAnimationConference) => {
          return resolve(thematiquesAnimationConference);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un thématique d'animation de conférence
   * @param id_thematique_animation_conference - Id de la thématique d'animation de conférence
   * @returns {Promise}
   */
  get(id_thematique_animation_conference) {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_conference) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      const thematiqueAnimationConferenceDao = new ThematiqueAnimationConferenceDao(this._bdd);
      thematiqueAnimationConferenceDao.get(id_thematique_animation_conference)
        .then((thematique_animation_conference) => {
          return resolve(thematique_animation_conference);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  exist(id_thematique_animation_conference)
  {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_conference) {
        return reject('Erreur lors de la récupération de l\'identifiant de conférence');
      }

      const thematiqueAnimationConferenceDao = new ThematiqueAnimationConferenceDao(this._bdd);
      thematiqueAnimationConferenceDao.exists(id_thematique_animation_conference)
        .then((exists) => {
          return resolve(exists);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  count(id_thematique_animation_conference)
  {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_conference) {
        return reject('Erreur lors de la récupération de l\'identifiant de conférence');
      }

      const thematiqueAnimationConferenceDao = new ThematiqueAnimationConferenceDao(this._bdd);
      thematiqueAnimationConferenceDao.count(id_thematique_animation_conference)
        .then((count) => {
          return resolve(count);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default ThematiqueAnimationConferenceMetier;