/**
 * Created by pierremarsot on 21/02/2017.
 */
import NiveauLangueDao from '../dao/NiveauLangueDao';

class NiveauLangueMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const niveauLangueDao = new NiveauLangueDao(this._bdd);
      niveauLangueDao.find()
        .then((niveaux_langue) => {
          return resolve(niveaux_langue);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id_niveau_langue){
    return new Promise((resolve, reject) => {
      if(!id_niveau_langue)
      {
        return reject('Erreur lors de la récupération de l\'identifiant du niveau de la langue');
      }

      const niveauLangueDao = new NiveauLangueDao(this._bdd);
      niveauLangueDao.get(id_niveau_langue)
        .then((niveau_langue) => {
        if(!niveau_langue)
        {
          return reject('Erreur lors de la récupération du niveau de la langue');
        }

        return resolve(niveau_langue);
        })
        .catch((error) => {
        return reject(error);
        });
    });
  }
}

export default NiveauLangueMetier;