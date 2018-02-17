/**
 * Created by pierremarsot on 17/01/2017.
 */
class CompetitionSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = "competition_sportif";
  }

  /**
   * Permet de supprimer une compétition d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_competition - Id de la compétition
   * @returns {Promise} - Erreur ou Id de la compétition supprimée
   */
  remove(id_sportif, id_competition) {
    return new Promise((resolve, reject) => {
      this._bdd.delete({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        id: id_competition
      })
        .then((response) => {
          if (response.result !== 'deleted') {
            return reject('Erreur lors de la suppression de la compétition sportive');
          }
          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de la mise à jour des compétitions');
        })
    });
  }

  /**
   * Permet de récupérer toutes les compétition d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des compétitions du sportif
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          "query": {
            "has_parent": {
              "type": "sportif",
              "query": {
                "match": {
                  "_id": id_sportif
                }
              }
            }
          }
        }
      })
        .then((response) => {
          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des compétitions');
        });
    });
  }

  /**
   * Permet d'ajouter une compétition à un sportif
   * @param id_sportif - Id du sportif
   * @param competition - Objet de la compétition
   * @returns {Promise} - Erreur ou Id de la compétition ajoutée
   */
  add(id_sportif, competition) {
    return new Promise((resolve, reject) => {
      this._bdd.index({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        body: competition,
      })
        .then((response) => {
          if(!response || response.result !== 'created'){
            return reject('Erreur lors de l\'ajout de la compétition');
          }

          competition = {
            _id: response._id,
            _source: competition
          };
          return resolve(competition);
        })
        .catch(() => {
          return reject('Erreur lors de l\'ajout de la compétition');
        })
    });
  }

  /**
   * Permet de modifier une compétition d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_competition - Id de la compétition
   * @param competition - Nouvelle compétition avec les nouvelles données
   * @returns {Promise} - Erreur ou le nouveau document de la compétition
   */
  update(id_sportif, id_competition, competition) {
    return new Promise((resolve, reject) => {
      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_competition,
        parent: id_sportif,
        body: {
          doc: competition
        }
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la mise à jour des compétitions');
          }
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la mise à jour des compétitions');
        });
    });
  }

  /**
   * Permet de supprimer le path de la vidéo et de la date d'ajout dans une compétition
   * @param id_sportif - Id du sportif
   * @param id_competition_sportive - Id de la coméptition
   * @returns {Promise} - Erreur ou nouveau document de la compétition
   */
  removeVideo(id_sportif, id_competition_sportive)
  {
    return new Promise((resolve, reject) => {
      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_competition_sportive,
        parent: id_sportif,
        body: {
          script: {
            inline: "ctx._source.remove('video_competition_sportif'); ctx._source.remove('date_upload_video_competition_sportif'); ",
            lang: 'painless',
          },
        }
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la mise à jour des compétitions');
          }
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la mise à jour des compétitions');
        });
    });
  }

  /**
   * Permet de savoir si une compétition d'un sportif existe
   * @param id_sportif - Id du sportif
   * @param id_competition - Id de la compétition
   * @returns {Promise} - Erreur ou boolean de l'existance de la compétition
   */
  exist(id_sportif, id_competition) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_competition,
        parent: id_sportif
      })
        .then((exists) => {
          if (!exists) {
            return reject('La competition n\'existe pas');
          }
          return resolve(exists);
        })
        .catch(() => {
          return reject('La competition n\'existe pas');
        });
    })
  }

  /**
   * Permet de récupérer une compétition sportive
   * @param id_sportif - Id du sportif
   * @param id_competition_sportif - Id de la compétition sportive
   * @returns {Promise} - Erreur ou document de la compétition sportive
   */
  get(id_sportif, id_competition_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_competition_sportif,
        parent: id_sportif
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la récupération de la compétition sportive');
          }

          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la compétition sportive');
        });
    });
  }
}

export default CompetitionSportifDao;