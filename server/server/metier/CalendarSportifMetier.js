/**
 * Created by pierremarsot on 17/02/2017.
 */
import SportifMetier from './SportifMetier';
import DateManager from '../utils/DateManager';
import CalendarSportifDao from '../dao/CalendarSportifDao';

class CalendarSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de supprimer un event du calendrier d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_event - Id de l'event
   * @returns {Promise} - Erreur ou Id de l'event supprimé
   */
  remove(id_sportif, id_event) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_event) {
        return reject('Erreur lors de la récupération de l\'identifiant de l\'évenement');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          const calendrierSportifDao = new CalendarSportifDao(this._bdd);
          calendrierSportifDao.remove(id_sportif, id_event)
            .then((id_event_removed) => {
              if (!id_event_removed || id_event_removed !== id_event) {
                return reject('Erreur lors de la suppression de l\'évenement');
              }

              return resolve(id_event_removed);
            })
            .catch((error) => {
              return reject(error);
            });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet d'ajouter un event au calendrier d'un sportif
   * @param id_sportif - Id du sportif
   * @param titre - Titre de l'évenement
   * @param description - Description de l'évenement
   * @param date_debut - Date de début de l'évenement
   * @param date_fin - Date de fin de l'évenement
   * @returns {Promise} - Erreur ou Id de l'évenement créé
   */
  add(id_sportif, titre, description, date_debut, date_fin) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!titre) {
        return reject('Vous devez spécifier un titre pour l\'évenement');
      }

      if (!date_debut) {
        return reject('Erreur lors de la récupération de la date de début');
      }

      if (!date_fin) {
        return reject('Erreur lors de la récupération de la date de fin');
      }

      //On parse la date
      const dateManager = new DateManager();
      date_debut = dateManager.stringToMoment(date_debut);

      if (!date_debut) {
        return reject('Erreur lors de la conversion de la date de début');
      }

      date_fin = dateManager.stringToMoment(date_fin);
      if (!date_fin) {
        return reject('Erreur lors de la conversion de la date de fin');
      }

      //On regarde si les dates sont valides
      if (dateManager.isAfter(date_debut, date_fin)) {
        return reject('La date de fin doit être supérieur à la date de départ');
      }

      //On parse le moment en string (datetime)
      date_debut = dateManager.momentToStringDateTime(date_debut);
      if (!date_debut) {
        return reject('Erreur lors de la conversion de la date de départ');
      }

      date_fin = dateManager.momentToStringDateTime(date_fin);
      if (!date_fin) {
        return reject('Erreur lors de la conversion de la date de fin');
      }

      //On regarde si le sporti existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //Création de l'objet de l'évenement
          const event = {
            titre: titre,
            date_debut: date_debut,
            date_fin: date_fin,
          };

          if (description) {
            event.description = description;
          }

          //On ajoute l'évenement
          const calendarSportifDao = new CalendarSportifDao(this._bdd);
          calendarSportifDao.add(id_sportif, event)
            .then((id_event) => {
              return resolve(id_event);
            })
            .catch((error) => {
              return reject(error);
            });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer les évenements d'un sportif dans une tranche de jours
   * @param id_sportif - Id du sportif
   * @param date_debut - Date de début
   * @param date_fin - Date de fin
   * @returns {Promise} - Erreur ou Array des documents des évenements
   */
  get(id_sportif, date_debut, date_fin) {
    return new Promise((resolve, reject) => {
      //Vérifications des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!date_debut) {
        return reject('Erreur lors de la récupération de la date de début');
      }

      if (!date_fin) {
        return reject('Erreur lors de la récupération de la date de fin');
      }

      //On parse la date
      const dateManager = new DateManager();
      date_debut = Number.parseInt(date_debut);
      if (!date_debut) {
        return reject('Erreur lors de la conversion de la date de début');
      }

      date_debut = dateManager.stringToMoment(date_debut);
      if (!date_debut) {
        return reject('Erreur lors de la conversion de la date de début');
      }

      //On cast la date en int par mesure de compatibilité avec momentjs
      date_fin = Number.parseInt(date_fin);
      if (!date_fin) {
        return reject('Erreur lors de la conversion de la date de fin');
      }

      date_fin = dateManager.stringToMoment(date_fin);
      if (!date_fin) {
        return reject('Erreur lors de la conversion de la date de fin');
      }

      //On regarde si les dates sont valides
      if (dateManager.isAfter(date_debut, date_fin)) {
        return reject('La date de fin doit être supérieur à la date de départ');
      }

      //On supprime le temps des moment
      date_debut.startOf('day');
      date_fin.startOf('day');

      //On parse le moment en string (datetime)
      date_debut = dateManager.momentToStringDateTime(date_debut);
      if (!date_debut) {
        return reject('Erreur lors de la conversion de la date de départ');
      }

      date_fin = dateManager.momentToStringDateTime(date_fin);
      if (!date_fin) {
        return reject('Erreur lors de la conversion de la date de fin');
      }

      //On regarde si le sortif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On récup les évenements qui sont dans la tranche des jours du sportif
          const calendarSportifDao = new CalendarSportifDao(this._bdd);
          calendarSportifDao.get(date_debut, date_fin)
            .then((events) => {
              return resolve(events);
            })
            .catch((error) => {
              return reject(error);
            });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default CalendarSportifMetier;