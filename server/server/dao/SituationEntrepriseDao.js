/**
 * Created by pierremarsot on 22/02/2017.
 */
class SituationEntrepriseDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'situation_entreprise';
  }

  /**
   * Permet de récupérer toutes les situations d'entreprise
   * @returns {Promise} - Erreur ou Array des documents des situations d'entreprise
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des situations entreprise');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits)
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des situations entreprise');
        });
    });
  }

  /**
   * Permet de récupérer une situation d'entreprise via son id
   * @param id_situation_entreprise - Id de la situation d'entreprise
   * @returns {Promise} - Erreur ou document de la situation d'entreprise
   */
  get(id_situation_entreprise) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_situation_entreprise
      })
        .then((situation_entreprise) => {
          if (!situation_entreprise) {
            return reject('Erreur lors de la récupération de la situation entreprise');
          }

          return resolve(situation_entreprise);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la situation entreprise');
        });
    });
  }
}

export default SituationEntrepriseDao;