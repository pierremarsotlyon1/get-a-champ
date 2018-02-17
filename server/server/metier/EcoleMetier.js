/**
 * Created by pierremarsot on 27/02/2017.
 */
import EcoleDao from '../dao/EcoleDao';

class EcoleMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  search(ecole) {
    return new Promise((resolve, reject) => {
      if (!ecole || ecole.length === 0) {
        return reject('Erreur lors de la récupération de votre recherche');
      }

      const ecoleDao = new EcoleDao(this._bdd);
      ecoleDao.search(ecole)
        .then((ecoles) => {
          return resolve(ecoles);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default EcoleMetier;