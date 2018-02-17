/**
 * Created by pierremarsot on 21/01/2017.
 */
class DomaineConnaissanceDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'domaine_connaissance';
  }

  /**
   * Permet de récupérer tous les domaines de connaissance
   * @returns {Promise} - Erreur ou Array des documents des domaines de connaissance
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
        .then((response) => {
          if (!response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des domaines de connaissances');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des domaines de connaissances');
        });
    });
  }

  /**
   * Permet de récupérer un domaine de connaissance
   * @param id_domaine_connaissance - Id du domaine de connaissance
   * @returns {Promise} - Erreur ou document du domaine de connaissance
   */
  get(id_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_domaine_connaissance,
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la récupération du domaine de connaissance');
          }

          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du domaine de connaissance');
        });
    });
  }

  /**
   * Permet de rechercher un domaine de connaissance
   * @param nom_domaine_connaissance - Le nom du domaine de connaissance à rechercher
   * @returns {Promise} - Erreur ou Array des documents des domaines de connaissance
   */
  search(nom_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match_phrase_prefix: {
              nom_domaine_connaissance: nom_domaine_connaissance
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la recherche des domaines de connaissance');
          }

          if(response.hits.total === 0){
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la recherche des domaines de connaissance');
        });
    });
  }
}

export default DomaineConnaissanceDao;