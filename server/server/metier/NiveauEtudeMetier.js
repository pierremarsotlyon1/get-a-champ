/**
 * Created by pierremarsot on 25/03/2017.
 */
import NiveauEtudeDao from '../dao/NiveauEtudeDao';

class NiveauEtudeMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const niveauEtudeDao = new NiveauEtudeDao(this._elasticsearch);
      niveauEtudeDao.find()
        .then((niveaux_etude) => {
          return resolve(niveaux_etude);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      const niveauEtudeDao = new NiveauEtudeDao(this._elasticsearch);
      niveauEtudeDao.get(id)
        .then((niveau_etude) => {
          return resolve(niveau_etude);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default NiveauEtudeMetier;