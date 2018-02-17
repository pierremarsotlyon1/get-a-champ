/**
 * Created by pierremarsot on 25/02/2017.
 */
import RechercheSituationSportifDao from '../dao/RechercheSituationSportifDao';

class RechercheSituationSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const rechercheSituationSportifDao = new RechercheSituationSportifDao(this._bdd);
      rechercheSituationSportifDao.find()
        .then((recherches_situations_sportif) => {
          return resolve(recherches_situations_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur lors de la récupération de l\'identifiant de la recherche de situation');
      }

      const rechercheSituationSportifDao = new RechercheSituationSportifDao(this._bdd);
      rechercheSituationSportifDao.get(id)
        .then((recherche_situation_sportif) => {
          return resolve(recherche_situation_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  getByIds(ids) {
    return new Promise((resolve, reject) => {
      if (!ids || ids.length === 0) {
        return reject('Le tableau des identifiants est vide');
      }

      const rechercheSituationSportifDao = new RechercheSituationSportifDao(this._bdd);
      rechercheSituationSportifDao.getByIds(ids)
        .then((recherches_situations_sportif) => {
          return resolve(recherches_situations_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default RechercheSituationSportifMetier;