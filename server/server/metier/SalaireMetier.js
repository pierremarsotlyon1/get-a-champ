/**
 * Created by pierremarsot on 28/03/2017.
 */
import SalaireDao from '../dao/SalaireDao';

class SalaireMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const salaireDao = new SalaireDao(this._elasticsearch);
      salaireDao.find()
        .then((salaires) => {
          return resolve(salaires);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      const salaireDao = new SalaireDao(this._elasticsearch);
      salaireDao.get(id)
        .then((salaire) => {
          return resolve(salaire);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default SalaireMetier;