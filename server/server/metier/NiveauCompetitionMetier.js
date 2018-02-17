/**
 * Created by pierremarsot on 17/01/2017.
 */
import NiveauCompetitionDao from '../dao/NiveauCompetitionDao';

class NiveauCompetitionMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer tous les niveaux de compétitions
   * @returns {Promise} - Erreur ou Array des documents des niveaux de compétitions
   */
  find() {
    return new Promise((resolve, reject) => {
      const niveauCompetitionDao = new NiveauCompetitionDao(this._bdd);
      niveauCompetitionDao.find()
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un niveau de compétition
   * @param id_niveau_competition - Id du niveau de compétition
   * @returns {Promise} - Erreur ou document du niveau de compétition
   */
  get(id_niveau_competition) {
    return new Promise((resolve, reject) => {
      const niveauCompetitionDao = new NiveauCompetitionDao(this._bdd);
      niveauCompetitionDao.get(id_niveau_competition)
        .then((niveau_competition) => {
          return resolve(niveau_competition);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default NiveauCompetitionMetier;