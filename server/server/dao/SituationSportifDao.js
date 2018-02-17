/**
 * Created by pierremarsot on 14/01/2017.
 */
class SituationSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'situation_sportif';
  }

  /**
   * Permet de récupérer une situation sportive
   * @param id - Id de la situation sportive
   * @returns {Promise} - Erreur ou document de la situation sportive
   */
  get(id) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id
      })
        .then((situation_sportif) => {
          if (!situation_sportif) {
            return reject('Erreur lors de la récupération de la situation sportive');
          }
          return resolve(situation_sportif);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la situation sportive');
        });
    });
  }

  /**
   * Permet de récupérer toutes les situations sportives
   * @returns {Promise} - Erreur ou Array des documents des situations sportives
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
          if (!response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération de la liste des situations sportives');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la liste des situations sportives');
        });
    })
  }
}

export default SituationSportifDao;