/**
 * Created by pierremarsot on 13/01/2017.
 */
import SportDao from '../dao/SportDao';

class SportMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const sportDao = new SportDao(this._bdd);
      sportDao.findAll()
        .then((sports) => {
          return resolve(sports);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de rechercher un sport
   * @param sport - Nom du sport
   * @returns {Promise} - Erreur ou Array des documents des sports trouvés
   */
  searchSport(sport) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!sport || sport.length === 0) {
        return reject('Vous devez spécifier un sport');
      }

      //On fait un lower case pour la recherche sur le sport
      sport = sport.toLowerCase();

      //On recherche les sports
      const sportDao = new SportDao(this._bdd);
      sportDao.find(sport)
        .then((sports) => {
          if (!sports) {
            return reject('Erreur lors de la récupération des sports');
          }

          return resolve(sports);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un sport
   * @param id - Id du sport
   * @returns {Promise} - Erreur ou document du sport
   */
  get(id) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id) {
        return reject('Erreur dans l\'id');
      }

      //On récup le sport
      const sportDao = new SportDao(this._bdd);
      sportDao.get(id)
        .then((sport) => {
          return resolve(sport);
        })
        .catch((error) => {
          return reject(error);
        })
    })
  }

  searchByDimensionsSportives(idsDimensionsSportives) {
    return new Promise((resolve, reject) => {
      if (!idsDimensionsSportives || idsDimensionsSportives.length === 0) {
        return reject('Vous devez spécifier des ids de dimensions sportives');
      }

      const sportDao = new SportDao(this._bdd);
      sportDao.searchByDimensionsSportives(idsDimensionsSportives)
        .then((sports) => {
          return resolve(sports);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default SportMetier;
