/**
 * Created by pierremarsot on 14/01/2017.
 */
class CentreInteretDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'centre_interet';
  }

  /**
   * Permet de récupérer plusieurs centres d'interet
   * @param ids - Array des Id des centres d'interet à récupérer
   * @returns {Promise} - Erreur ou les documents des centres d'intérets
   */
  get_multi_ids(ids)
  {
    return new Promise((resolve, reject) => {
      this._bdd.mget({
        index: this._index,
        type: this._type,
        body: {
          ids: ids
        }
      })
        .then((centre_interet) => {
          return resolve(centre_interet);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du centre d\'intérêt');
        });
    });
  }

  /**
   * Permet de récupérer un centre d'interet
   * @param id_centre_interet - Id du centre d'interet
   * @returns {Promise} - Erreur ou document du centre d'interet
   */
  get(id_centre_interet) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_centre_interet
      })
        .then((centre_interet) => {
          return resolve(centre_interet);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du centre d\'intérêt');
        });
    });
  }

  /**
   * Permet de récupérer tous les centres d'interets
   * @returns {Promise} - Erreur ou Array de documents des centres d'interets
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        size: 9999,
        body: {
          query: {
            match_all: {}
          }
        }
      })
        .then((centres_interet) => {
          if (!centres_interet || !centres_interet.hits.hits) {
            reject('Erreur lors de la récupération des centres d\'intérêt');
          }

          return resolve(centres_interet.hits.hits)
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des centres d\'intérêt');
        });
    });
  }
}

export default CentreInteretDao;