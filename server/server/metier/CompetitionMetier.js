/**
 * Created by pierremarsot on 17/01/2017.
 */
import CompetitionDao from '../dao/CompetitionSportifDao';
import SportifMetier from '../metier/SportifMetier';
import isFloat from 'is-float';
import SportMetier from '../metier/SportMetier';
import NiveauCompetitionMetier from '../metier/NiveauCompetitionMetier';
import DateManager from '../utils/DateManager';
import youtubeUrl from 'youtube-url';
const moment = require('moment');
const path = require('path');
const uuid = require('node-uuid');
const fs = require('fs');

class CompetitionMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._pathVideoFolder = path.join(__dirname, '../uploads/videos/competitions/');
  }

  /**
   * Permet de générer le path pour pouvoir sauvegarder une vidéo localement (serveur)
   * @param filename_video - Le nom de la vidéo avec l'extension
   * @returns {*} - Chemin complet
   * @private
   */
  _generateLocalPathVideoFromCompetition(filename_video) {
    return path.join(__dirname, '../uploads', filename_video);
  }

  /**
   * Permet de supprimer une vidéo locale (serveur)
   * @param path_video_local - Nom de la vidéo
   * @returns {Promise} - Erreur ou boolean de succés
   * @private
   */
  _removeLocalVideoCompetition(path_video_local) {
    return new Promise((resolve, reject) => {
      fs.unlink(this._generateLocalPathVideoFromCompetition(path_video_local), (error) => {
        if (error) {
          return reject('Erreur lors de la suppression de la vidéo');
        }

        return resolve(true);
      });
    });
  }

  /**
   * Permet de supprimer une vidéo d'une compétition
   * @param id_sportif - Id du sportif
   * @param id_competition_sportive - Id de la compétition
   * @returns {Promise} - Erreur ou bolean de succés
   */
  /*removeVideo(id_sportif, id_competition_sportive) {
   return new Promise((resolve, reject) => {
   //On vérifie les informations
   if (!id_sportif) {
   return reject('Erreur lors de la récupération de votre identifiant');
   }

   if (!id_competition_sportive) {
   return reject('Erreur lors de la récupération de l\'identifiant de la compétition sportive');
   }

   //On récup la compétition
   const competitionDao = new CompetitionDao(this._bdd);
   competitionDao.get(id_sportif, id_competition_sportive)
   .then((competition_sportive) => {
   //On regarde si on a bien la compétition
   if (!competition_sportive) {
   return reject('Erreur lors de la récupération de la compétition sportive');
   }

   //On regarde si la compétition à une vidéo
   if (!competition_sportive._source.video_competition_sportif) {
   return reject('Vous n\'avez pas de vidéo sur cette compétition');
   }

   //On supprime la vidéo en local
   this._removeLocalVideoCompetition(competition_sportive._source.video_competition_sportif)
   .then(() => {
   //On update le document sans la vidéo
   competitionDao.removeVideo(id_sportif, id_competition_sportive)
   .then((competition_sportive) => {
   if (!competition_sportive) {
   return reject('Erreur lors de la modification en base de donnée');
   }

   return resolve(true);
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
   }*/

  removeVideo(id_sportif, id_competition_sportive) {
    return new Promise((resolve, reject) => {
      //On vérifie les informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_competition_sportive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la compétition sportive');
      }

      //On récup la compétition
      const competitionDao = new CompetitionDao(this._bdd);
      competitionDao.get(id_sportif, id_competition_sportive)
        .then((competition_sportive) => {
          //On regarde si on a bien la compétition
          if (!competition_sportive) {
            return reject('Erreur lors de la récupération de la compétition sportive');
          }

          //On regarde si la compétition à une vidéo
          if (!competition_sportive._source.video_competition_sportif) {
            return reject('Vous n\'avez pas de vidéo sur cette compétition');
          }
          //On update le document sans la vidéo
          competitionDao.removeVideo(id_sportif, id_competition_sportive)
            .then((competition_sportive) => {
              if (!competition_sportive) {
                return reject('Erreur lors de la modification en base de donnée');
              }

              return resolve(true);
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
   * Permet d'ajouter une vidéo à une compétition
   * @param req - La requête
   * @returns {Promise} - Erreur ou chemin de la vidéo ajoutée
   */
  /*addVideo(req) {
   return new Promise((resolve, reject) => {
   //On regarde si on a l'id de la compétition
   const id_competition_sportive = req.params.id;
   if (!id_competition_sportive) {
   return reject('Erreur lors de la récupération de l\'identifiant de la compétition');
   }

   //On récup l'id du sportif
   const id_sportif = req.id_user;
   if (!id_sportif) {
   return reject('Erreur lors de la récupération de votre identifiant');
   }

   //On regarde si on a des fichiers
   const files = req.files;
   if (!files || files.length === 0 || !files.video) {
   return reject('Erreur lors du transfert de la vidéo');
   }

   //On récup le path temporaire de la vidéo
   const path_video = req.files.video.path;
   if (!path_video || path_video.length === 0) {
   return reject('Erreur lors de la récupération du chemin de la vidéo');
   }

   //On récup l'extension de la vidéo
   const extension_video = path.extname(req.files.video.name);
   if (!extension_video) {
   return reject('Erreur lors de la récupération de l\'extension de la vidéo');
   }

   //On génére la date courante (millisecondes)
   const value_date = new Date().valueOf();
   if (!value_date) {
   return reject('Erreur lors de la génération du nouveau nom de la vidéo');
   }

   //On génére un second string random
   const v4 = uuid.v4();
   if (!v4) {
   return reject('Erreur lors de la génération du nouveau nom de la vidéo');
   }

   //Création du path destination de la vidéo
   const new_name_video = value_date + v4 + extension_video;
   let path_dest = this._pathVideoFolder + new_name_video;

   //On regarde si le compte du sportif existe
   const sportifMetier = new SportifMetier(this._bdd);
   sportifMetier.exist(id_sportif)
   .then((exists) => {
   if (!exists) {
   return reject('Erreur lors de la récupération de votre compte');
   }

   //On regarde si la compétition sportive existe
   const competitionDao = new CompetitionDao(this._bdd);
   competitionDao.get(id_sportif, id_competition_sportive)
   .then((competition_sportive) => {
   if (!competition_sportive) {
   return reject('Erreur lors de la récupération de la compétition sportive');
   }

   //On déplace la vidéo
   fs.rename(path_video, path_dest, function (err) {
   if (err) {
   return reject('Erreur lors du transfert de la vidéo');
   }

   //On supprime la vidéo dans le dossier temp
   fs.unlink(path_video, function () {
   if (err) {
   return reject('Erreur lors de la suppression de la vidéo temporaire, cependant, votre vidéo à bien du être téléchargée');
   }

   //On modifie le document de la compétition sportive
   path_dest = "/videos/competitions/" + new_name_video;
   competition_sportive._source.video_competition_sportif = path_dest;
   competition_sportive._source.date_upload_video_competition_sportif = DateManager.getStringDateTime();

   //On update le document de la compétition sportive
   competitionDao.update(id_sportif, id_competition_sportive, competition_sportive._source)
   .then((competition_sportive) => {
   if (!competition_sportive) {
   return reject('Erreur lors de la modification de la compétition sportive');
   }
   return resolve(path_dest);
   })
   .catch((error) => {
   return reject(error);
   });
   });
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
   }*/

  addVideo(id_sportif, id_competition_sportive, url_video) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_competition_sportive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la competition');
      }

      if (!url_video) {
        return reject('Erreur lors de la récupération de l\'url de la vidéo');
      }

      //On vérifie que l'url youtube soit au bon format
      if (!youtubeUrl.valid(url_video)) {
        return reject('L\'url de la vidéo Youtube n\'est pas au bon format');
      }

      //On regarde si le compte du sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si la compétition sportive existe
          const competitionDao = new CompetitionDao(this._bdd);
          competitionDao.get(id_sportif, id_competition_sportive)
            .then((competition_sportive) => {
              if (!competition_sportive) {
                return reject('Erreur lors de la récupération de la compétition sportive');
              }

              //On modifie les informations de la compétition
              competition_sportive._source.video_competition_sportif = url_video;
              competition_sportive._source.date_upload_video_competition_sportif = DateManager.getStringDateTime();

              //On update le document de la compétition sportive
              competitionDao.update(id_sportif, id_competition_sportive, competition_sportive._source)
                .then((competition_sportive) => {
                  if (!competition_sportive) {
                    return reject('Erreur lors de la modification de la compétition sportive');
                  }

                  return resolve(true);
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
   * Permet de modifier une compétition sportive
   * @param id_sportif - Id du sportif
   * @param id_competition - Id de la compétition
   * @param lieu_competition - Nouveau lieu de la compétition
   * @param sport_competition - Nouveau document du sport de la compétition
   * @param niveau_competition - Nouveau document du niveau de la compétition
   * @param date_debut_competition - Nouvelle date de début
   * @param date_fin_competition - Nouvelle date de fin
   * @param rang_competition - Nouveau rang
   * @returns {Promise} - Erreur ou nouveau document de la compétition
   */
  update(id_sportif, id_competition, lieu_competition, sport_competition, niveau_competition, date_debut_competition,
         /*date_fin_competition,*/ rang_competition) {
    return new Promise((resolve, reject) => {

      //On regarde si les données de la competition sont valide
      this.validate_competition(lieu_competition, sport_competition, niveau_competition, date_debut_competition,
        /*date_fin_competition,*/ rang_competition)
        .then((competition) => {

          //On vérifie que le sportif existe
          const sportifMetier = new SportifMetier(this._bdd);
          sportifMetier.exist(id_sportif)
            .then(() => {

              //On vérifie que la compétition existe
              const competitionDao = new CompetitionDao(this._bdd);
              competitionDao.exist(id_sportif, id_competition)
                .then(() => {

                  //On met à jour la compétition
                  competitionDao.update(id_sportif, id_competition, competition)
                    .then(() => {
                      competition = {
                        _id: id_competition,
                        _source: competition,
                      };
                      return resolve(competition);
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
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer une compétition sportive
   * @param id_sportif - Id du sportif
   * @param id_competition - Id de la compétition sportive
   * @returns {Promise}
   */
  remove(id_sportif, id_competition) {
    return new Promise((resolve, reject) => {
      //On vérifie les informations
      if (!id_sportif) {
        return reject('Vous devez être identifié');
      }

      if (!id_competition) {
        return reject('Erreur lors de la récupération de l\'identifiant de la compétition sportive');
      }

      //On supprime la compétition sportive en bdd
      const competitionDao = new CompetitionDao(this._bdd);
      competitionDao.get(id_sportif, id_competition)
        .then((competition_sportive) => {
          if (!competition_sportive) {
            return reject('Erreur lors de la récupération de la compétition sportive');
          }

          //On récup le path de la vidéo
          const path_video_local = competition_sportive._source.video_competition_sportif;

          //On supprime la compétition
          competitionDao.remove(id_sportif, id_competition)
            .then((id_competition_sportif) => {

              //On supprime la vidéo locale si il y en a une
              if (path_video_local && path_video_local.length > 0) {
                this._removeLocalVideoCompetition(path_video_local)
                  .then(() => {
                    return resolve(id_competition_sportif);
                  })
                  .catch((error) => {
                    return reject(error);
                  });
              }
              else {
                return resolve(id_competition_sportif);
              }
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
   * Permet de récupérer toutes les compétitions sportive d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des compétitions sportives
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      //On récupère les compétitions sportives du sportif
      const competitionDao = new CompetitionDao(this._bdd);
      competitionDao.find(id_sportif)
        .then((competition_sportif) => {
          return resolve(competition_sportif);
        })
        .catch((error) => {
          return reject(error);
        })
    });
  }

  /**
   * Permet d'ajouter une compétition sportive
   * @param id_sportif - Id du sportif
   * @param lieu_competition - Lieu de la compétition
   * @param sport_competition - Document du sport de la compétition
   * @param niveau_competition - Document du niveau de la compétition
   * @param date_debut_competition - Date de début
   * @param date_fin_competition - Date de fin
   * @param rang_competition - Rang de fin de la compétition
   * @returns {Promise}
   */
  add(id_sportif, lieu_competition, sport_competition, niveau_competition, date_debut_competition,
      /*date_fin_competition,*/ rang_competition) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On vérifie les données de la compétition
          this.validate_competition(lieu_competition, sport_competition, niveau_competition, date_debut_competition,
            /*date_fin_competition,*/ rang_competition)
            .then((competition) => {

              //On ajoute la compétition
              const competitionDao = new CompetitionDao(this._bdd);
              competitionDao.add(id_sportif, competition)
                .then((competition) => {
                  return resolve(competition);
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
   * Permet de vérifier les informations d'une compétition
   * @param lieu_competition - Lieu de la compétition
   * @param sport_competition - Document du sport de la compétition
   * @param niveau_competition - Document du niveau de la compétition
   * @param date_debut_competition - Date de début de la compétition
   * @param date_fin_competition - Date de fin de la compétition
   * @param rang_competition - Rang de fin du sportif
   * @returns {Promise} - Erreur ou document de la compétition
   */
  validate_competition(lieu_competition, sport_competition, niveau_competition, date_debut_competition,
                       /*date_fin_competition,*/ rang_competition) {
    return new Promise(async(resolve, reject) => {
      //Vérification du lieu
      if (!lieu_competition.location || !lieu_competition._id || !lieu_competition.nom) {
        return reject('Le lieu de la compétition n\'est pas correctement formaté');
      }

      if (!lieu_competition.location.lat || !lieu_competition.location.lon) {
        return reject('Le lieu de la compétition n\'est pas correctement formaté');
      }

      lieu_competition.location.lat = Number.parseFloat(lieu_competition.location.lat);
      lieu_competition.location.lon = Number.parseFloat(lieu_competition.location.lon);
      if (!isFloat(lieu_competition.location.lat) || !isFloat(lieu_competition.location.lon)) {
        return reject('Les coordonnées GPS ne sont pas des float');
      }

      //Vérification du sport competition
      //const id_sport_competition = Number.parseInt(sport_competition._id);
      if (!sport_competition._id || sport_competition._id.length === 0) {
        return reject('Le sport de la compétition est mal formaté');
      }

      //On récup l'objet Sport de la bdd
      const sportMetier = new SportMetier(this._bdd);

      try {
        sport_competition = await sportMetier.get(sport_competition._id);
      }
      catch (error) {
        return reject(error);
      }

      //Vérification du niveau de competition
      const id_niveau_competition = Number.parseInt(niveau_competition);
      if (!id_niveau_competition) {
        return reject('Le niveau de compétition est mal formaté');
      }

      //On récup l'objet NiveauCompetition de la bdd
      const niveauCompetitionMetier = new NiveauCompetitionMetier(this._bdd);

      try {
        niveau_competition = await niveauCompetitionMetier.get(id_niveau_competition);
      }
      catch (error) {
        return reject(error);
      }

      //Vérification de la date de début
      if (!date_debut_competition) {
        return reject('La date de début de compétition est invalide');
      }

      const dateManager = new DateManager();
      date_debut_competition = dateManager.stringToMoment(date_debut_competition);
      if (!date_debut_competition) {
        return reject('La date de début de compétition est invalide');
      }

      const date_now = moment({});
      if (date_debut_competition.isAfter(date_now)) {
        return reject('La date de départ doit être inférieur ou égale à celle d\'aujourd\'hui');
      }

      //Vérification de la date de fin
      /*if (!date_fin_competition) {
        return reject('La date de fin de compétition est invalide');
      }*/

      /*date_fin_competition = dateManager.stringToMoment(date_fin_competition);
      if (!date_fin_competition) {
        return reject('La date de fin de compétition est invalide');
      }*/

      /*if (date_fin_competition.isAfter(date_now)) {
        return reject('La date de fin doit être inférieur ou égale à celle d\'aujourd\'hui');
      }

      if (date_debut_competition.isAfter(date_fin_competition)) {
        return reject('La date de début doit être inférieur ou égale à celle de fin');
      }*/

      rang_competition = Number.parseInt(rang_competition);
      if (!rang_competition) {
        return reject('Le rang n\'est pas au bon format');
      }

      //const id_competition = await competitionDao.getMaxIdCompetition(id_sportif);
      const competition = {
        //_id: id_competition + 1,
        lieu_competition: lieu_competition,
        sport_competition_sportif: {
          _id: sport_competition._id,
          nom_sport: sport_competition._source.nom_sport,
        },
        niveau_competition_sportif: {
          _id: niveau_competition._id,
          nom_niveau_competition_sportif: niveau_competition._source.nom_niveau_competition,
        },
        date_debut_competition_sportif: dateManager.toDate(date_debut_competition),
        //date_fin_competition_sportif: dateManager.toDate(date_fin_competition),
        rang_competiton_sportif: rang_competition,
      };

      return resolve(competition);
    });
  }

  /**
   * Permet d'extraire les informations de la compétition dans la requête
   * @param req - La requête
   * @returns {Promise} - Erreur ou Array des informations de la compétition
   */
  extract_competition(req) {
    return new Promise((resolve, reject) => {
      const lieu_competition = req.params._source.lieu_competition;
      if (!lieu_competition) {
        return reject('Erreur lors de la récupération du lieu de la compétition');
      }

      const sport_competition = req.params._source.sport_competition_sportif;
      if (!sport_competition || !sport_competition._id) {
        return reject('Erreur lors de la récupération de votre sport pratiqué lors de la compétition');
      }

      const id_niveau_competition = req.params._source.niveau_competition_sportif;
      if (!id_niveau_competition) {
        return reject('Erreur lors de la récupération du votre niveau lors de la compétition');
      }

      const date_debut_competition = req.params._source.date_debut_competition_sportif;
      if (!date_debut_competition) {
        return reject('Erreur lors de la récupération de la date de début de la compétition');
      }

      /*const date_fin_competition = req.params._source.date_fin_competition_sportif;
      if (!date_debut_competition) {
        return reject('Erreur lors de la récupération de la date de fin de la compétition');
      }*/

      const rang_competition = req.params._source.rang_competiton_sportif;
      if (!rang_competition) {
        return reject('Erreur lors de la récupération de votre rang durant la compétition');
      }

      return resolve([lieu_competition, sport_competition, id_niveau_competition, date_debut_competition,
        /*date_fin_competition,*/ rang_competition]);
    });
  }
}

export default CompetitionMetier;