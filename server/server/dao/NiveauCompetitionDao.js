/**
 * Created by pierremarsot on 17/01/2017.
 */
class NiveauCompetitionDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'niveau_competition';
  }

  /**
   * Permet de récupérer tous les niveaux de compétitions
   * @returns {Promise} - Erreur ou Array des documents des niveaux de compétition
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match_all: {}
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des niveaux de compétition');
          }
          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des niveaux de compétition');
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
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_niveau_competition
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la récupération du niveau de compétition');
          }
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du niveau de compétition');
        })
    });
  }
}

export default NiveauCompetitionDao;