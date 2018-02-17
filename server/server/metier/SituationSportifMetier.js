/**
 * Created by pierremarsot on 14/01/2017.
 */
import SituationSportifDao from '../dao/SituationSportifDao';

class SituationSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les situations sportives
   * @returns {Promise} - Erreur ou Array des documents des situations sportives
   */
  find() {
    return new Promise((resolve, reject) => {
      const situationSportifDao = new SituationSportifDao(this._bdd);
      situationSportifDao.find()
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    })
  }

  /**
   * Permet de récupérer une situation sportive
   * @param id - Id de la situation sportive
   * @returns {Promise}
   */
  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur dans l\'id');
      }

      const situationSportifDao = new SituationSportifDao(this._bdd);
      situationSportifDao.get(id)
        .then((situation_sportif) => {
          return resolve(situation_sportif);
        })
        .catch((error) => {
          return reject(error);
        })
    });
  }
}

export default SituationSportifMetier;