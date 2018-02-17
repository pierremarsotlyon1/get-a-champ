/**
 * Created by pierremarsot on 25/03/2017.
 */
import DimensionSportiveDao from '../dao/DimensionSportiveDao';

class DimensionSportiveMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const dimensionSportiveDao = new DimensionSportiveDao(this._elasticsearch);
      dimensionSportiveDao.find()
        .then((dimensions_sportives) => {
          return resolve(dimensions_sportives);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur lors de la récupération de l\'identifiant de la dimension sportive');
      }

      const dimensionSportiveDao = new DimensionSportiveDao(this._elasticsearch);
      dimensionSportiveDao.get(id)
        .then((dimension_sportive) => {
          return resolve(dimension_sportive);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  mget(ids) {
    return new Promise((resolve, reject) => {
      if (!ids || ids.length === 0) {
        return reject('Le tableau des identifiants est vide');
      }

      const dimensionSportiveDao = new DimensionSportiveDao(this._elasticsearch);
      dimensionSportiveDao.mget(ids)
        .then((dimensions_sportives) => {
          return resolve(dimensions_sportives);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default DimensionSportiveMetier;