/**
 * Created by pierremarsot on 24/02/2017.
 */
import TailleEntrepriseDao from '../dao/TailleEntrepriseDao';

class TailleEntrepriseMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les tailles d'entreprise
   * @returns {Promise} - Erreur ou Array des documents des tailles d'entreprise
   */
  find() {
    return new Promise((resolve, reject) => {
      const tailleEntrepriseDao = new TailleEntrepriseDao(this._bdd);
      tailleEntrepriseDao.find()
        .then((tailles_entreprise) => {
          return resolve(tailles_entreprise);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une tailel d'entreprise via son id
   * @param id - Id de la taille d'entreprise
   * @returns {Promise} - Erreur ou document de la taille d'entreprise
   */
  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur lors de la récupération de l\'identifiant de la taille de l\'entreprise');
      }

      const tailleEntrepriseDao = new TailleEntrepriseDao(this._bdd);
      tailleEntrepriseDao.get(id)
        .then((taille_entreprise) => {
          return resolve(taille_entreprise);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default TailleEntrepriseMetier;