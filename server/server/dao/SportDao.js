/**
 * Created by pierremarsot on 13/01/2017.
 */
class SportDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'sport';
  }

  /**
   * Permet de récupérer un sport
   * @param id - Id du sport
   * @returns {Promise} - Erreur ou document du sport
   */
  get(id) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id
      })
        .then((sport) => {
          return resolve(sport);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du sport');
        });
    });
  }

  findAll() {
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
      }).then((results) => {
        if (!results || !results.hits.hits) {
          return reject('Erreur lors de la recherche des sports');
        }
        return resolve(results.hits.hits);
      }).catch(() => {
        return reject('Erreur lors de la recherche des sports');
      });
    });
  }

  /**
   * Permet de rechercher un sport via son prefix
   * @param sport - Le début du nom du sport
   * @returns {Promise} - Erreur ou Array des documents des sports
   */
  find(sport) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          _source: ["nom_sport"],
          query: {
            prefix: {
              nom_sport: sport
            }
          }
        }
      }).then((results) => {
        if (!results || !results.hits.hits) {
          return reject('Erreur lors de la recherche des sports');
        }
        return resolve(results.hits.hits);
      }).catch(() => {
        return reject('Erreur lors de la recherche des sports');
      });
    });
  }

  searchByDimensionsSportives(idsDimensionsSportives){
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            nested : {
              path : "dimensions_sportives_sport",
              query : {
                bool : {
                  must : [
                    {
                      terms : {
                        "dimensions_sportives_sport._id" : idsDimensionsSportives
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }).then((results) => {
        if (!results || !results.hits.hits) {
          return reject('Erreur lors de la recherche des sports');
        }
        return resolve(results.hits.hits);
      }).catch(() => {
        return reject('Erreur lors de la recherche des sports');
      });
    });
  }
}

export default SportDao;