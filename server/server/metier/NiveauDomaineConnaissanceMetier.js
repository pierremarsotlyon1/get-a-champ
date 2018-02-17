/**
 * Created by pierremarsot on 27/01/2017.
 */

import NiveauDomaineConnaissanceDao from '../dao/NiveauDomaineConnaissanceDao';

class NiveauDomaineConnaissanceMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer tous les niveaux de domaine de connaissance
   * @returns {Promise} - Erreur ou Array des documents des niveaux de domaine de connaissance
   */
  find() {
    return new Promise((resolve, reject) => {
      const niveauDomaineConnaissanceDao = new NiveauDomaineConnaissanceDao(this._bdd);
      niveauDomaineConnaissanceDao.find()
        .then((niveaux_domaine_connaissance) => {
          return resolve(niveaux_domaine_connaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un niveau de domaine de connaissance
   * @param id_niveau_domaine_connaissance - Id du niveau de domaine de connaissance
   * @returns {Promise} - Erreur ou document du niveau de domaine de connaissance   */
  get(id_niveau_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if(!id_niveau_domaine_connaissance)
      {
        return reject('Erreur lors de la récupération de l\'identifiant du niveau de domaine de connaissance');
      }

      const niveauDomaineConnaissanceDao = new NiveauDomaineConnaissanceDao(this._bdd);
      niveauDomaineConnaissanceDao.get(id_niveau_domaine_connaissance)
        .then((niveau_domaine_connaissance) => {
          return resolve(niveau_domaine_connaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default NiveauDomaineConnaissanceMetier;