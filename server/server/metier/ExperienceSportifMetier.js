/**
 * Created by pierremarsot on 18/01/2017.
 */
import SportifMetier from '../metier/SportifMetier';
import SportMetier from '../metier/SportMetier';
import ExperienceSportifDao from '../dao/ExperienceSportifDao';
import DateManager from '../utils/DateManager';
const moment = require('moment');
import isFloat from 'is-float';

class ExperienceSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les experiences sportives d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des experiences sportives
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //on récup toutes les experiences sportives
          const experienceSportifDao = new ExperienceSportifDao(this._bdd);
          experienceSportifDao.find(id_sportif)
            .then((experiences_sportif) => {
              if (!experiences_sportif) {
                return reject('Erreur lors de la récupération de vos experiences sportives');
              }
              return resolve(experiences_sportif);
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
   * Permet de mettre à jour une experience sportive d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience - Id de l'experience sportive
   * @param lieu_experience - Nouveau lieu de l'experience sportive
   * @param sport_experience - Nouveau sport
   * @param date_debut_experience - Nouvelle date de début
   * @param date_fin_experience - Nouvelle date de fin
   * @param description_experience - Nouvelle description
   * @returns {Promise} - Erreur ou nouveau document de l'experience sportive
   */
  update(id_sportif,
         id_experience,
         lieu_experience,
         sport_experience,
         date_debut_experience,
         date_fin_experience,
         description_experience,
         nom_club_experience_sportif) {
    return new Promise((resolve, reject) => {
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then(async(exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On vérifie que l'experience liée au sportif existe
          const experienceSportifDao = new ExperienceSportifDao(this._bdd);
          experienceSportifDao.exist(id_sportif, id_experience)
            .then((exists) => {
              if (!exists) {
                return reject('Erreur lors de la récupération de l\'experience sportif');
              }
              //On vérifie que les informations reçues sont valides
              this.check_values_experience(
                lieu_experience,
                sport_experience,
                date_debut_experience,
                date_fin_experience,
                description_experience,
                nom_club_experience_sportif
              )
                .then((experience) => {
                  //On ajoute l'experience sportive
                  const experienceSportifDao = new ExperienceSportifDao(this._bdd);
                  experienceSportifDao.update(id_sportif, id_experience, experience)
                    .then((response) => {
                      return resolve(response);
                    })
                    .catch((error) => {
                      return reject(error);
                    });
                })
                .catch((error) => {
                  return reject(error);
                });
            })
            .catch((error) => {
              return reject(error);
            });
        });
    });
  }

  /**
   * Permet d'ajouter une experience sportive à un sportif
   * @param id_sportif - Id du sportif
   * @param lieu_experience - Lieu de l'experience sportive
   * @param sport_experience - Sport pratiqué lors de l'experience sportive
   * @param date_debut_experience - Date de début de l'experience sportive
   * @param date_fin_experience - Date de fin de l'experience sportive
   * @param description_experience - Description e l'experience
   * @returns {Promise} - Erreur ou document de l'experience sportive
   */
  add(id_sportif,
      lieu_experience,
      sport_experience,
      date_debut_experience,
      date_fin_experience,
      description_experience,
      nom_club_experience_sportif) {
    return new Promise((resolve, reject) => {
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then(async(sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          this.check_values_experience(
            lieu_experience,
            sport_experience,
            date_debut_experience,
            date_fin_experience,
            description_experience,
            nom_club_experience_sportif
          )
            .then((experience) => {
              //On ajoute l'experience sportive
              const experienceSportifDao = new ExperienceSportifDao(this._bdd);
              experienceSportifDao.add(id_sportif, experience)
                .then((response) => {
                  if (!response.created) {
                    return reject('Erreur lors de l\'ajout de l\'experience sportive');
                  }
                  return resolve(response._id);
                })
                .catch((error) => {
                  return reject(error);
                });
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
   * Permet de supprimer une experience sportive d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience_sportif - Id de l'experience sportive
   * @returns {Promise} - Erreur ou id de l'experience sportive supprimée
   */
  remove(id_sportif, id_experience_sportif) {
    return new Promise((resolve, reject) => {
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          const experienceSportifDao = new ExperienceSportifDao(this._bdd);
          experienceSportifDao.remove(id_sportif, id_experience_sportif)
            .then((id_experience_sportif) => {
              return resolve(id_experience_sportif);
            })
            .catch((error) => {
              return reject(error);
            });
        })
        .catch((error) => {
          return reject(error);
        });
    })
  }

  /**
   * Permet de vérifier les données d'une experience sportive
   * @param lieu_experience - Lieu de l'experience sportive
   * @param sport_experience - Sport de l'experience sportive
   * @param date_debut_experience - Date de début de l'experience sportive
   * @param date_fin_experience - Date de fin de l'experience sportive
   * @param description_experience - Description de l'experience
   * @returns {Promise} - Erreur ou document de l'experience sportive créé
   */
  check_values_experience(lieu_experience,
                          sport_experience,
                          date_debut_experience,
                          date_fin_experience,
                          description_experience,
                          nom_club_experience_sportif) {
    return new Promise(async(resolve, reject) => {
      //Vérification du lieu d'experience
      if (!lieu_experience.location || !lieu_experience._id || !lieu_experience.nom) {
        return reject('Le lieu de l\'experience n\'est pas correctement formaté');
      }

      if (!lieu_experience.location.lat || !lieu_experience.location.lon) {
        return reject('Le lieu de l\'experience n\'est pas correctement formaté');
      }

      lieu_experience.location.lat = Number.parseFloat(lieu_experience.location.lat);
      lieu_experience.location.lon = Number.parseFloat(lieu_experience.location.lon);
      if (!isFloat(lieu_experience.location.lat) || !isFloat(lieu_experience.location.lon)) {
        return reject('Les coordonnées GPS ne sont pas des float');
      }

      if (!sport_experience || !sport_experience._id) {
        return reject('Le sport choisit est incorrect');
      }

      //Vérification du sport experience
      try {
        const sportMetier = new SportMetier(this._bdd);
        sport_experience = await sportMetier.get(sport_experience._id);
        if (!sport_experience) {
          return reject('Erreur lors de la récupération du sport');
        }
      }
      catch (error) {
        return reject(error);
      }

      //On cast les dates en moment
      const dateManager = new DateManager();
      const moment_date_debut_experience = dateManager.stringToMoment(date_debut_experience);
      if (!moment_date_debut_experience) {
        return reject('Erreur lors de la récupération de la date de début d\experience');
      }

      const moment_date_fin_experience = dateManager.stringToMoment(date_fin_experience);
      if (!moment_date_fin_experience) {
        return reject('Erreur lors de la récupération de la date de fin d\experience');
      }

      //Vérification des dates
      if (dateManager.isAfterNow(moment_date_debut_experience)) {
        return reject('La date de début ne peut être supérieur à celle d\'aujourd\'hui');
      }

      if (dateManager.isAfterNow(moment_date_fin_experience)) {
        return reject('La date de fin ne peut être supérieur à celle d\'aujourd\'hui');
      }

      if (dateManager.isAfter(moment_date_debut_experience, moment_date_fin_experience)) {
        return reject('La date de début ne peut être supérieur à celle de fin');
      }

      //on regarde si on a un nom de club
      if(!nom_club_experience_sportif || nom_club_experience_sportif.length === 0)
      {
        return reject('Vous devez spécifier un nom de club');
      }

      //Création du document de l'experience sportive
      let experience = {
        lieu_experience_sportif: lieu_experience,
        sport_experience_sportif: {
          _id: sport_experience._id,
          nom_sport: sport_experience._source.nom_sport,
        },
        date_debut_experience_sportif: dateManager.toDate(moment_date_debut_experience),
        date_fin_experience_sportif: dateManager.toDate(moment_date_fin_experience),
        nom_club_experience_sportif: nom_club_experience_sportif,
      };

      if (description_experience && description_experience.length > 0) {
        experience.description_experience_sportif = description_experience;
      }
      else {
        experience.description_experience_sportif = '';
      }

      return resolve(experience);
    });
  }
}

export default ExperienceSportifMetier;