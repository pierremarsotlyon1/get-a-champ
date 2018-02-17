/**
 * Created by pierremarsot on 21/02/2017.
 */
class LangueDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'langue';
  }

  /**
   * Permet de rechercher une langue par préfix
   * @param langue - Début de la langue
   * @returns {Promise} - Erreur ou Array des documents des langues
   */
  search(langue) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match: {
              nom_langue: langue
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des langues');
          }

          if(response.hits.total === 0)
          {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des langues');
        });
    });
  }

  /**
   * Permet de récupérer une langue via son id
   * @param id_langue - Id de la langue
   * @returns {Promise} - Erreur ou document de la langue
   */
  get(id_langue) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_langue
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la récupération de la langue');
          }

          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la langue');
        });
    });
  }
}

export default LangueDao;