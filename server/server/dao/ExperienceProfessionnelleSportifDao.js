/**
 * Created by pierremarsot on 20/01/2017.
 */
class ExperienceProfessionnelleSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'experience_professionnelle_sportif';
  }

  /**
   * Permet de modifier une experience professionnelle d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience_professionnelle_sportif - Id de l'experience professionnelle
   * @param experience_professionnelle_sportif - Nouvelle donnée de l'experience professionnelle
   * @returns {Promise} - Erreur ou nouveau document de l'experience professionnelle
   */
  update(id_sportif, id_experience_professionnelle_sportif, experience_professionnelle_sportif, refresh = false) {
    return new Promise((resolve, reject) => {
      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_experience_professionnelle_sportif,
        parent: id_sportif,
        refresh: refresh,
        body: {
          doc: experience_professionnelle_sportif
        }
      })
        .then((response) => {
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la modification de l\'experience sportive');
        });
    });
  }

  /**
   * Permet de récupérer toutes les experiences professionnelles d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des experiences professionnelles du sportif
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
        .then((response) => {
          if (!response || !response.hits.hits) {
            return reject('Erreur lors de la récupération des experiences professionnelle');
          }
          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des experiences professionnelle');
        });
    });
  }

  /**
   * Permet d'ajouter une experience professionnelle à un sportif
   * @param id_sportif - Id du sportif
   * @param experience_professionnelle_sportif - Objet de l'experience professionnelle à ajouter
   * @returns {Promise} - Erreur ou Id de l'experience professionnelle ajoutée
   */
  add(id_sportif, experience_professionnelle_sportif, refresh = false) {
    return new Promise((resolve, reject) => {
      this._bdd.index({
        index: this._index,
        type: this._type,
        refresh: refresh,
        parent: id_sportif,
        body: experience_professionnelle_sportif
      })
        .then((response) => {
          if (!response._id) {
            return reject('Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle');
          }

          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de l\'ajout de l\'experience professionnelle');
        });
    });
  }

  /**
   * Permet de supprimer un experience professionnelle d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience_professionnelle_sportif - Id de l'experience professionnelle à supprimer
   * @returns {Promise} - Erreur ou Id de l'experience professionnelle supprimée
   */
  remove(id_sportif, id_experience_professionnelle_sportif, refresh = false) {
    return new Promise((resolve, reject) => {
      this._bdd.delete({
        index: this._index,
        type: this._type,
        refresh: refresh,
        id: id_experience_professionnelle_sportif,
        parent: id_sportif,
      })
        .then((response) => {
          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de la suppression de l\'experience professionnelle');
        });
    });
  }

  /**
   * Permet de vérifier si un sportif à une experience professionnelle
   * @param id_sportif - Id du sportif
   * @param id_experience_professionnelle_sportif - Id de l'experience professionnelle
   * @returns {Promise} - Erreur ou boolean de l'existance de l'experience professionnelle
   */
  exist(id_sportif, id_experience_professionnelle_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_experience_professionnelle_sportif,
        parent: id_sportif
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('Erreur lors du test de l\'existence du domaine de compétence');
        })
    });
  }
}

export default ExperienceProfessionnelleSportifDao;