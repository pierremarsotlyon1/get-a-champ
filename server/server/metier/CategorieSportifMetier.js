/**
 * Created by pierremarsot on 14/01/2017.
 */
import CategorieSportifDao from '../dao/CategorieSportifDao';

class CategorieSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les catégories sportives
   * @returns {Promise} - Erreur ou Array des catégories sportives
   */
  getAll() {
    return new Promise((resolve, reject) => {
      const categorieSportifDao = new CategorieSportifDao(this._bdd);
      categorieSportifDao.find()
        .then((categories_sportif) => {
          return resolve(categories_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une catégorie sportive
   * @param id - Id de la catégorie sportive
   * @returns {Promise} - Erreur ou document de la catégorie sportive
   */
  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur dans l\'id');
      }

      const categorieSportifDao = new CategorieSportifDao(this._bdd);
      categorieSportifDao.get(id)
        .then((categorie_sportif) => {
          return resolve(categorie_sportif);
        })
        .catch((error) => {
          return reject(error);
        })
    });
  }
}

export default CategorieSportifMetier;
