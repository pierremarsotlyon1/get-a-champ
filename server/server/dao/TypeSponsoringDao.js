/**
 * Created by pierremarsot on 22/02/2017.
 */
class TypeSponsoringDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'type_sponsoring';
  }

  /**
   * Permet de récupérer tous les types de sponsoring
   * @returns {Promise} - Erreur ou Array des documents des types de sponsoring
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des types de sponsoring');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des types de sponsoring');
        });
    });
  }

  /**
   * Permet de récupérer un type de sponsoring via son id
   * @param id_type_sponsoring - Id du type de l'entreprise
   * @returns {Promise} - Erreur ou document du type de l'entreprise
   */
  get(id_type_sponsoring) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_type_sponsoring
      })
        .then((type_sponsoring) => {
          if (!type_sponsoring) {
            return reject('Erreur lors de la récupération du type de sponsoring');
          }

          return resolve(type_sponsoring);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du type de sponsoring');
        });
    });
  }
}

export default TypeSponsoringDao;