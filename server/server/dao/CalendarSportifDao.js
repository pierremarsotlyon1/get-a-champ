/**
 * Created by pierremarsot on 17/02/2017.
 */

class CalendarSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'calendar_sportif';
  }

  /**
   * Permet de supprimer un event du calendrier d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_event - Id de l'event
   * @returns {Promise} - Erreur ou Id de l'event supprimé
   */
  remove(id_sportif, id_event) {
    return new Promise((resolve, reject) => {
      this._bdd.delete({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        id: id_event
      })
        .then((response) => {
          if (response.result !== 'deleted') {
            return reject('Erreur lors de la suppression de l\'évenement');
          }

          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de la suppression de l\'évenement');
        });
    });
  }

  /**
   * Permet d'ajouter un evenement dans le calendrier du sportif
   * @param id_sportif - Id du sportif
   * @param event - Objet de l'évenement
   * @returns {Promise} - Erreur ou document de l'évenement créé
   */
  add(id_sportif, event) {
    return new Promise((resolve, reject) => {
      this._bdd.index({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        body: event,
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de l\'ajout de l\'évenement');
          }

          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de l\'ajout de l\'évenement');
        });
    });
  }

  /**
   * Permet de récupérer les évenements du sportif dans une tranche de jours
   * @param date_debut - La date de début
   * @param date_fin - La date de fin
   * @returns {Promise} - Erreur ou Array des documents des évenements du sportif
   */
  get(date_debut, date_fin) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            bool: {
              must: [
                {
                  range: {
                    date_debut: {
                      gte: date_debut,
                    }
                  }
                },
                {
                  range: {
                    date_fin: {
                      lte: date_fin,
                    }
                  }
                }
              ]
            },
          }
        }
      })
        .then((response) => {
          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des évenements du calendrier');
        });
    });
  }
}

export default CalendarSportifDao;