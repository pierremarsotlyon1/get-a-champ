/**
 * Created by pierremarsot on 22/02/2017.
 */
import SituationEntrepriseDao from '../dao/SituationEntrepriseDao';

class SituationEntrepriseMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les situations d'entreprise
   * @returns {Promise} - Erreur ou Array des documents des situations entreprise
   */
  find() {
    return new Promise((resolve, reject) => {
      const situationEntrepriseDao = new SituationEntrepriseDao(this._bdd);
      situationEntrepriseDao.find()
        .then((situations_entreprise) => {
          return resolve(situations_entreprise);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une situation d'entreprise via son id
   * @param id_situation_entreprise - Id de la situation d'entreprise
   * @returns {Promise} - Erreur ou document de la situation d'entreprise
   */
  get(id_situation_entreprise) {
    return new Promise((resolve, reject) => {
      if (!id_situation_entreprise) {
        return reject('Erreur lors de la récupération de l\'identifiant de la situation entreprise');
      }

      const situationEntrepriseDao = new SituationEntrepriseDao(this._bdd);
      situationEntrepriseDao.get(id_situation_entreprise)
        .then((situation_entreprise) => {
          return resolve(situation_entreprise);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default SituationEntrepriseMetier;