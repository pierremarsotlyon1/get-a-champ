/**
 * Created by pierremarsot on 04/03/2017.
 */
import MetierDao from '../dao/MetierDao';

class MetierMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  search(metier) {
    return new Promise((resolve, reject) => {
      if (!metier || metier.length === 0) {
        return reject('Erreur lors de la récupération du métier');
      }

      const metierDao = new MetierDao(this._bdd);
      metierDao.search(metier)
        .then((metiers) => {
          return resolve(metiers);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur lors de la récupération de l\'identifiant du métier');
      }

      const metierDao = new MetierDao(this._bdd);
      metierDao.get(id)
        .then((metier) => {
          return resolve(metier);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  find(size = 10){
    return new Promise((resolve, reject) => {
      const metierDao = new MetierDao(this._bdd);
      metierDao.find(size)
        .then((metier) => {
          return resolve(metier);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  findRandom(size = 10){
    return new Promise((resolve, reject) => {
      const metierDao = new MetierDao(this._bdd);
      metierDao.randomFind(size)
        .then((metier) => {
          return resolve(metier);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default MetierMetier;