/**
 * Created by pierremarsot on 21/01/2017.
 */
class DomaineConnaissanceSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'domaine_connaissance_sportif';
  }

  /**
   * Permet de récupérer un domaine de connaissance d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance_sportif - Id du domaine de connaissance
   * @returns {Promise} - Erreur ou document du domaine de connaissance
   */
  get(id_sportif, id_domaine_connaissance_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_domaine_connaissance_sportif,
        parent: id_sportif
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
   * Permet de supprimer un domaine de connaissance d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance_sportif - Id du domaine de connaissance à supprimer
   * @returns {Promise} - Erreur ou Id du domaine de connaissance supprimé
   */
  remove(id_sportif, id_domaine_connaissance_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.delete({
        index: this._index,
        type: this._type,
        id: id_domaine_connaissance_sportif,
        parent: id_sportif
      })
        .then((response) => {
          if (response.result !== 'deleted') {
            return reject('Erreur lors de la suppression de votre domaine de connaissance');
          }
          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de la suppression de votre domaine de connaissance');
        });
    });
  }

  /**
   * Permet de récupérer tous les domaines de connaissance d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des domaines de compéconnaissancestences du sportif
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            has_parent: {
              type: "sportif",
              query: {
                match: {
                  _id: id_sportif
                }
              }
            }
          }
        }
      })
        .then((domaines_competence_sportif) => {
          if (!domaines_competence_sportif || !domaines_competence_sportif.hits || !domaines_competence_sportif.hits.hits) {
            return reject('Erreur lors de la récupération de vos domaines de connaissance');
          }

          return resolve(domaines_competence_sportif.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de vos domaines de connaissance');
        });
    });
  }

  /**
   * Permet de savoir si un sportif a un domaine de connaissance
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance_sportif - Id du domaine de connaissance à vérifier
   * @returns {Promise} - Erreur ou boolean de l'existance du domaine de connaissance dans le sportif
   */
  exist(id_sportif, id_domaine_connaissance_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_domaine_connaissance_sportif,
        parent: id_sportif
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('Erreur lors du test de l\'existence du domaine de connaissance');
        })
    });
  }

  /**
   * Permet d'ajouter un domaine de connaissance à un sportif
   * @param id_sportif - Id du sportif
   * @param domaine_connaissance_sportif - Objet du domaine de connaissance à ajouter
   * @returns {Promise} - Erreur ou document du domaine de connaissance ajouté
   */
  add(id_sportif, domaine_connaissance_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.index({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        body: domaine_connaissance_sportif,
      })
        .then((response) => {
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de l\'ajout du domaine de connaissance');
        });
    });
  }

  /**
   * Permet de savoir si un sportif possède déjà le domaine de connaissance
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance - Id du domaine de connaissance
   * @returns {Promise} - Erreur ou nombre
   */
  have(id_sportif, id_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      this._bdd.count({
        index: this._index,
        type: this._type,
        routing: id_sportif,
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    id_domaine_connaissance: id_domaine_connaissance
                  }
                }
              ]
            }
          }
        }
      })
        .then((response) => {
          if (!response || response.count === undefined) {
            return reject('Erreur lors de la vérification de l\'existance du domaine de connaissance');
          }
          return resolve(response.count > 0);
        })
        .catch(() => {
          return reject('Erreur lors de la vérification de l\'existance du domaine de connaissance');
        });
    });
  }
}

export default DomaineConnaissanceSportifDao;