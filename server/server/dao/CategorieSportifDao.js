/**
 * Created by pierremarsot on 14/01/2017.
 */
class CategorieSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'categorie_sportif';
  }

  /**
   * Permet de récupérer une catégorie sportif
   * @param id - Id de la catégorie sportif
   * @returns {Promise} - Erreur ou le document de la catégorie sportif
   */
  get(id) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id
      })
        .then((categorie_sportif) => {
          resolve(categorie_sportif);
        })
        .catch(() => {
          reject('Erreur lors de la récupération de la catégorie sportive');
        });
    });
  }

  /**
   * Permet de récupérer toutes les catégories sportif
   * @returns {Promise} - Erreur ou array des catégories sportif
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
      }).then((results) => {
        if (!results || !results.hits || !results.hits.hits) {
          return reject('Erreur lors de la récupération des catégorie de sportif');
        }

        return resolve(results.hits.hits);
      }, () => {
        return reject('Erreur lors de la récupération des catégorie de sportif');
      });
    });
  }
}

export default CategorieSportifDao;
