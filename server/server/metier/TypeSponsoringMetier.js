/**
 * Created by pierremarsot on 22/02/2017.
 */
import TypeSponsoringDao from '../dao/TypeSponsoringDao';

class TypeSponsoringMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer tous les types de sponsoring
   * @returns {Promise} - Erreur ou Array des documents des types de sponsoring
   */
  find() {
    return new Promise((resolve, reject) => {
      const typeSponsoringDao = new TypeSponsoringDao(this._bdd);
      typeSponsoringDao.find()
        .then((types_sponsoring) => {
          return resolve(types_sponsoring);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un type de sponsoring via son id
   * @param id_type_sponsoring - Id du type de sponsoring
   * @returns {Promise} - Erreur ou document du type de sponsoring
   */
  get(id_type_sponsoring) {
    return new Promise((resolve, reject) => {
      if (!id_type_sponsoring) {
        return reject('Erreur lors de la récupération de l\'identifiant du type de sponsoring');
      }

      const typeSponsoringDao = new TypeSponsoringDao(this._bdd);
      typeSponsoringDao.get(id_type_sponsoring)
        .then((type_sponsoring) => {
          return resolve(type_sponsoring);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default TypeSponsoringMetier;