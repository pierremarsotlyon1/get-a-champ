/**
 * Created by pierremarsot on 14/01/2017.
 */
import CentreInteretDao from '../dao/CentreInteretDao';

class CentreInteretMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer tous les centre d'interet
   * @returns {Promise} - Erreur ou Array des documents des centres d'interêts
   */
  find() {
    return new Promise((resolve, reject) => {
      const centreInteretDao = new CentreInteretDao(this._bdd);
      centreInteretDao.find()
        .then((centres_interet) => {
          return resolve(centres_interet);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un ou plusieurs centres d'interêt
   * @param ids - Array d'id des centres d'interets
   * @returns {Promise} - Erreur ou Array des documents des centres d'interêts
   */
  get_multi_ids(ids) {
    return new Promise((resolve, reject) => {
      if (!ids || ids.length === 0) {
        return reject('Le tableau est vide');
      }

      const centreInteretDao = new CentreInteretDao(this._bdd);
      centreInteretDao.get_multi_ids(ids)
        .then((centres_interet) => {
          return resolve(centres_interet);
        })
        .catch((error) => {
          return reject(error);
        })
    })
  }
}

export default CentreInteretMetier;