/**
 * Created by pierremarsot on 27/01/2017.
 */

class NiveauDomaineConnaissanceDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'niveau_domaine_connaissance_competence';
  }

  /**
   * Permet de récupérer tous les niveaux concernant les domaines de connaissances
   * @returns {Promise} - Erreur ou Array des documents des niveaux des domaines de connaissances
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match_all: {}
          },
          sort: [
            {
            _uid: "asc"
            }
          ]
        }
      })
        .then((niveaux_domaine_competence) => {
          if (!niveaux_domaine_competence || !niveaux_domaine_competence.hits || !niveaux_domaine_competence.hits.hits) {
            return reject('Erreur lors de la récupération des niveaux de connaissances');
          }

          return resolve(niveaux_domaine_competence.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des niveaux de connaissances');
        });
    });
  }

  /**
   * Permet de récupérer un niveau de domaine de connaissance
   * @param id_niveau_domaine_connaissance - Id du niveau de domaine de connaissance
   * @returns {Promise} - Erreur ou document du niveau
   */
  get(id_niveau_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_niveau_domaine_connaissance
      })
        .then((niveau_domaine_connaissance) => {
          if (!niveau_domaine_connaissance || !niveau_domaine_connaissance._source) {
            return reject('Erreur lors de la récupération du niveai de connaissance');
          }

          return resolve(niveau_domaine_connaissance);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du niveai de connaissance');
        });
    });
  }
}

export default NiveauDomaineConnaissanceDao;