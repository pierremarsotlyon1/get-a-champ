/**
 * Created by pierremarsot on 18/01/2017.
 */

class ExperienceSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'experience_sportif';
  }

  /**
   * Permet de supprimer une experience sportive d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience_sportif - Id de l'experience sportive à supprimer
   * @returns {Promise} - Erreur ou Id de l'experience sportive supprimée
   */
  remove(id_sportif, id_experience_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.delete({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        id: id_experience_sportif
      })
        .then((response) => {
          if (response.result !== 'deleted') {
            return reject('Erreur lors de la suppression de l\'experience sportive');
          }
          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de la mise à jour des compétitions');
        })
    });
  }

  /**
   * Permet d'ajouter une experience sportive à un sportif
   * @param id_sportif - Id du sportif
   * @param experience_sportif - Objet de l'experience sportive à ajouter
   * @returns {Promise} - Erreur ou document de l'experience sportive ajouté
   */
  add(id_sportif, experience_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.index({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        body: experience_sportif,
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de l\'ajout de l\'experience sportive');
          }
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de l\'ajout de l\'experience sportive');
        });
    });
  }

  /**
   * Permet de récupérer toutes les experiences sportives d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des experiences sportives du sportif
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
            return reject('Erreur lors de la récupération de vos experiences sportives');
          }
          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de vos experiences sportives');
        });
    })
  }

  /**
   * Permet de récupérer une experience sportive d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience - Id de l'experience sportive
   * @returns {Promise} - Erreur ou document de l'experience sportive
   */
  get(id_sportif, id_experience) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_experience,
        parent: id_sportif,
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la récupération de l\'experience sportive');
          }
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de l\'experience sportive');
        });
    });
  }

  /**
   * Permet de vérifier si un sportif possède l'experience sportive
   * @param id_sportif - Id du sportif
   * @param id_experience - Id de l'experience sportive
   * @returns {Promise} - Erreur ou boolean de l'existance de l'experience sportive
   */
  exist(id_sportif, id_experience) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_experience,
        parent: id_sportif
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('L\'experience n\'existe pas');
        })
    });
  }

  /**
   * Permet de modifier une experience sportive d'un sportif
   * @param id_sportif - Id du sportive
   * @param id_experience - Id de l'experience sportive à modifier
   * @param experience_sportif - Nouvelle objet de l'experience sportive
   * @returns {Promise} - Erreur ou nouveau document de l'experience sportive
   */
  update(id_sportif, id_experience, experience_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_experience,
        parent: id_sportif,
        body: {
          doc: experience_sportif
        }
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la modification de l\'experience sportive');
          }
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la modification de l\'experience sportive');
        })
    });
  }
}

export default ExperienceSportifDao;