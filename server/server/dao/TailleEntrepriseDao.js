/**
 * Created by pierremarsot on 24/02/2017.
 */
class TailleEntrepriseDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'taille_entreprise';
  }

  /**
   * Permet de récupérer toutes les tailles entreprise
   * @returns {Promise} - Erreur ou Array des documents des tailles d'entreprise
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des tailles d\'entreprise');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des tailles d\'entreprise');
        });
    });
  }

  /**
   * Permet de récupérer une taille d'entreprise
   * @param id - Id de la taille d'entreprise
   * @returns {Promise} - Erreur ou document de la taille d'entreprise
   */
  get(id) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id,
      })
        .then((taille_entreprise) => {
          if (!taille_entreprise) {
            return reject('Erreur lors de la récupération de la taille de l\'entreprise');
          }

          return resolve(taille_entreprise);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la taille de l\'entreprise');
        });
    });
  }
}

export default TailleEntrepriseDao;