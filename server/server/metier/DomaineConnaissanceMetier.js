/**
 * Created by pierremarsot on 21/01/2017.
 */
import DomaineConnaissanceDao from '../dao/DomaineConnaissanceDao';

class DomaineConnaissanceMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  findAll(){
    return new Promise((resolve, reject) => {
      const domaineConnaissanceDao = new DomaineConnaissanceDao(this._bdd);
      domaineConnaissanceDao.findAll()
        .then((domainesConnaissance) => {
          return resolve(domainesConnaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de rechercher un domaine de connaissance
   * @param nom_domaine_connaissance - Nom du domaine de connaissance
   * @returns {Promise}
   */
  search(nom_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!nom_domaine_connaissance || nom_domaine_connaissance.length === 0) {
        return reject('Erreur lors de la récupération du nom du domaine de connaissance');
      }

      //On recherche les domaines de connaissances associés
      const domaineConnaissanceDao = new DomaineConnaissanceDao(this._bdd);
      domaineConnaissanceDao.search(nom_domaine_connaissance)
        .then((domaines_connaissances) => {
          return resolve(domaines_connaissances);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer tous les domaines de connaissances
   * @returns {Promise} - Erreur ou Array des documents des domaines de connaissances
   */
  find() {
    return new Promise((resolve, reject) => {
      const domaineConnaissanceDao = new DomaineConnaissanceDao(this._bdd);
      domaineConnaissanceDao.find()
        .then((domaines_connaissance) => {
          return resolve(domaines_connaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un domaine de connaissance
   * @param id_domaine_connaissance - Id du domaine de connaissance
   * @returns {Promise}
   */
  get(id_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      if (!id_domaine_connaissance) {
        return reject('Erreur lors de la récupération de l\'identifiant du domaine de connaissance');
      }

      const domaineConnaissanceDao = new DomaineConnaissanceDao(this._bdd);
      domaineConnaissanceDao.get(id_domaine_connaissance)
        .then((domaine_connaissance) => {
          return resolve(domaine_connaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default DomaineConnaissanceMetier;