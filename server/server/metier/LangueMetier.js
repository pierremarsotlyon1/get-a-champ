/**
 * Created by pierremarsot on 21/02/2017.
 */
import LangueDao from '../dao/LangueDao';

class LangueMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de rechercher une langue par préfix
   * @param langue - Début de la langue
   * @returns {Promise} - Erreur ou Array des documents des langues
   */
  search(langue) {
    return new Promise((resolve, reject) => {
      if (!langue || langue.length === 0) {
        return reject('Erreur lors de la récupération de votre recherche');
      }

      const langueDao = new LangueDao(this._bdd);
      langueDao.search(langue)
        .then((langues) => {
          if (!langues) {
            return resolve([]);
          }
          return resolve(langues);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une langue via son id
   * @param id_langue - Id de la langue
   * @returns {Promise} - Erreur ou document de la langue
   */
  get(id_langue) {
    return new Promise((resolve, reject) => {
      if (!id_langue) {
        return reject('Erreur lors de la récupération de l\'identifiant de la langue');
      }

      const langueDao = new LangueDao(this._bdd);
      langueDao.get(id_langue)
        .then((langue) => {
          if (!langue) {
            return reject('Erreur lors de la récupération de la langue');
          }
          return resolve(langue);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default LangueMetier;