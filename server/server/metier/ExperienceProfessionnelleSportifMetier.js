/**
 * Created by pierremarsot on 20/01/2017.
 */
import SportifMetier from '../metier/SportifMetier';
import ExperienceProfessionnelleSportifDao from '../dao/ExperienceProfessionnelleSportifDao';
import DateManager from '../utils/DateManager';
import MetierMetier from '../metier/MetierMetier';

const moment = require('moment');

class ExperienceProfessionnelleSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de modifier une experience professionnelle d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience_professionnelle_sportif - Id de l'experience professionnelle
   * @param date_debut_experience_professionnelle_sportif - Nouvelle date de début
   * @param date_fin_experience_professionnelle_sportif - Nouvelle date de fin
   * @param lieu_experience_professionnelle_sportif - Nouveau lieu
   * @param nom_entreprise_experience_professionnelle_sportif - Nouveau nom de l'entreprise
   * @param metier_experience_professionnelle_sportif -
   * @param description_poste_experience_professionnelle_sportif - Nouvelle description
   * @param mission_poste_experience_professionnelle_sportif - Mission faite lors du poste
   * @param realisation_poste_experience_professionnelle_sportif - Réalisation faite lors du poste
   * @param toujours_en_poste_experience_professionnelle_sportif - Boolean indiquant si il est toujours en poste
   * @returns {Promise} - Erreur ou nouveau document de l'experience professionnelle
   */
  update(id_sportif,
         id_experience_professionnelle_sportif,
         date_debut_experience_professionnelle_sportif,
         date_fin_experience_professionnelle_sportif,
         lieu_experience_professionnelle_sportif,
         nom_entreprise_experience_professionnelle_sportif,
         metier_experience_professionnelle_sportif,
         description_poste_experience_professionnelle_sportif,
         mission_poste_experience_professionnelle_sportif,
         realisation_poste_experience_professionnelle_sportif,
         toujours_en_poste_experience_professionnelle_sportif,) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de l\'identifiant du compte');
      }

      if (!id_experience_professionnelle_sportif) {
        return reject('Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          const experienceProfessionnelleSportifDao = new ExperienceProfessionnelleSportifDao(this._bdd);
          experienceProfessionnelleSportifDao.exist(id_sportif, id_experience_professionnelle_sportif)
            .then((exists) => {
              if (!exists) {
                return reject('Erreur lors de la récupération de l\'experience professionnelle');
              }

              this.check_values_experience_professionnelle(
                date_debut_experience_professionnelle_sportif,
                date_fin_experience_professionnelle_sportif,
                lieu_experience_professionnelle_sportif,
                nom_entreprise_experience_professionnelle_sportif,
                metier_experience_professionnelle_sportif,
                description_poste_experience_professionnelle_sportif,
                mission_poste_experience_professionnelle_sportif,
                realisation_poste_experience_professionnelle_sportif,
                toujours_en_poste_experience_professionnelle_sportif,
              )
                .then((experience_professionnelle_sportif) => {
                  const experienceProfessionnelleSportifDao = new ExperienceProfessionnelleSportifDao(this._bdd);
                  experienceProfessionnelleSportifDao.update(
                    id_sportif,
                    id_experience_professionnelle_sportif,
                    experience_professionnelle_sportif,
                    true)
                    .then(() => {
                      //On récup le métier
                      const metierMetier = new MetierMetier(this._bdd);
                      metierMetier.get(experience_professionnelle_sportif.metier_experience_professionnelle_sportif._id)
                        .then((metier) => {
                          //On ajoute le métier à l'experience pro
                          experience_professionnelle_sportif.metier_experience_professionnelle_sportif = {
                            libelle_metier: metier._source.libelle_metier,
                            _id: metier._id,
                            id_emplois_direct_metier: metier._source.id_emplois_direct_metier,
                            id_emplois_proche_metier: metier._source.id_emplois_proche_metier,
                          };

                          //On récup toutes les experiences pro du sportif
                          const experience_professionnelle_sportif_dao = new ExperienceProfessionnelleSportifDao(this._bdd);
                          experience_professionnelle_sportif_dao.find(id_sportif)
                            .then((experiences_pro) => {
                              //On génère les array avec les id unique des emplois
                              this.generate_set_id_emplois_direct_proche_metier(experiences_pro)
                                .then((sets) => {
                                  if (!sets || !sets.set_id_emplois_proche_metier || !sets.set_id_emplois_direct_metier) {
                                    return reject('Votre experience a bien été ajoutée mais une erreur s\'est produite');
                                  }

                                  //On ajoute les tableaux d'id dans le document sportif
                                  if (!sportif._source) {
                                    return reject('Votre experience a bien été ajoutée mais une erreur s\'est produite');
                                  }

                                  sportif._source.id_emplois_direct_metier = sets.set_id_emplois_direct_metier;
                                  sportif._source.id_emplois_proche_metier = sets.set_id_emplois_proche_metier;
                                  sportif._source.set_id_emplois_actif_metier = sets.set_id_emplois_actif_metier;

                                  //On update le document du sportif
                                  sportifMetier.update_all(id_sportif, sportif._source)
                                    .then(() => {
                                      return resolve(id_experience_professionnelle_sportif);
                                    })
                                    .catch((error) => {
                                      return reject(error);
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
   * Permet de récupérer toutes les experiences professionnelles d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des experiences professionnelles
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.exist(id_sportif)
        .then((exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          const experience_professionnelle_sportif_dao = new ExperienceProfessionnelleSportifDao(this._bdd);
          experience_professionnelle_sportif_dao.find(id_sportif)
            .then((experience_professionnelle_sportif) => {
              return resolve(experience_professionnelle_sportif);
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
   * Permet de supprimer une experience professionnelle d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_experience_professionnelle_sportif - Id de l'experience professionnelle
   * @returns {Promise} - Erreur ou id de l'experience professionnelle supprimée
   */
  remove(id_sportif, id_experience_professionnelle_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          const experienceProfessionnelleSportifDao = new ExperienceProfessionnelleSportifDao(this._bdd);
          experienceProfessionnelleSportifDao.exist(id_sportif, id_experience_professionnelle_sportif)
            .then((exists) => {
              if (!exists) {
                return reject('Erreur lors de la récupération de l\'experience professionnelle');
              }

              experienceProfessionnelleSportifDao.remove(id_sportif, id_experience_professionnelle_sportif, true)
                .then((id_experience_professionnelle_sportif) => {
                  //On récup toutes les experiences pro du sortif
                  experienceProfessionnelleSportifDao.find(id_sportif)
                    .then((experiences_pro) => {
                      //On génère les array avec les id unique des emplois
                      this.generate_set_id_emplois_direct_proche_metier(experiences_pro)
                        .then((sets) => {
                          if (!sets || !sets.set_id_emplois_proche_metier || !sets.set_id_emplois_direct_metier) {
                            return reject('Votre experience a bien été ajoutée mais une erreur s\'est produite');
                          }

                          //On ajoute les tableaux d'id dans le document sportif
                          if (!sportif._source) {
                            return reject('Votre experience a bien été ajoutée mais une erreur s\'est produite');
                          }

                          sportif._source.id_emplois_direct_metier = sets.set_id_emplois_direct_metier;
                          sportif._source.id_emplois_proche_metier = sets.set_id_emplois_proche_metier;
                          sportif._source.set_id_emplois_actif_metier = sets.set_id_emplois_actif_metier;

                          //On update le document du sportif
                          sportifMetier.update_all(id_sportif, sportif._source)
                            .then(() => {
                              return resolve(id_experience_professionnelle_sportif);
                            })
                            .catch((error) => {
                              return reject(error);
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
   * Permet d'ajouter une experience professionnelle à un sportif
   * @param id_sportif - Id du sportif
   * @param date_debut_experience_professionnelle_sportif - Date de début
   * @param date_fin_experience_professionnelle_sportif - Date de fin
   * @param lieu_experience_professionnelle_sportif - Lieu de l'experience
   * @param nom_entreprise_experience_professionnelle_sportif - Nom de l'entreprise
   * @param titre_poste_experience_professionnelle_sportif - Titre du poste occupé
   * @param description_poste_experience_professionnelle_sportif - Description du poste
   * @returns {Promise} - Erreur ou id de l'experience professionnelle ajoutée
   */
  add(id_sportif,
      date_debut_experience_professionnelle_sportif,
      date_fin_experience_professionnelle_sportif,
      lieu_experience_professionnelle_sportif,
      nom_entreprise_experience_professionnelle_sportif,
      metier_experience_professionnelle_sportif,
      description_poste_experience_professionnelle_sportif,
      mission_poste_experience_professionnelle_sportif,
      realisation_poste_experience_professionnelle_sportif,
      toujours_en_poste_experience_professionnelle_sportif) {
    return new Promise((resolve, reject) => {
      //On vérifie que l'utilisateur soit bien un sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On vérifie les infos de l'experience
          this.check_values_experience_professionnelle(
            date_debut_experience_professionnelle_sportif,
            date_fin_experience_professionnelle_sportif,
            lieu_experience_professionnelle_sportif,
            nom_entreprise_experience_professionnelle_sportif,
            metier_experience_professionnelle_sportif,
            description_poste_experience_professionnelle_sportif,
            mission_poste_experience_professionnelle_sportif,
            realisation_poste_experience_professionnelle_sportif,
            toujours_en_poste_experience_professionnelle_sportif
          )
            .then((experience_professionnelle_sportif) => {
              if (!experience_professionnelle_sportif) {
                return reject('Erreur lors de la vérification des données de l\'experience professionnelle');
              }

              //On récup le métier
              const metierMetier = new MetierMetier(this._bdd);
              metierMetier.get(experience_professionnelle_sportif.metier_experience_professionnelle_sportif._id)
                .then((metier) => {
                  //On ajoute le métier à l'experience pro
                  experience_professionnelle_sportif.metier_experience_professionnelle_sportif = {
                    libelle_metier: metier._source.libelle_metier,
                    _id: metier._id,
                    id_emplois_direct_metier: metier._source.id_emplois_direct_metier,
                    id_emplois_proche_metier: metier._source.id_emplois_proche_metier,
                  };

                  //On ajoute l'experience pro
                  const experience_professionnelle_sportif_dao = new ExperienceProfessionnelleSportifDao(this._bdd);
                  experience_professionnelle_sportif_dao.add(id_sportif, experience_professionnelle_sportif, true)
                    .then((id_experience_professionnelle_sportif) => {
                      if (!id_experience_professionnelle_sportif) {
                        return reject('Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle');
                      }

                      //On récup toutes les experiences pro du sportif
                      experience_professionnelle_sportif_dao.find(id_sportif)
                        .then((experiences_pro) => {
                          //On génère les array avec les id unique des emplois
                          this.generate_set_id_emplois_direct_proche_metier(experiences_pro)
                            .then((sets) => {
                              if (!sets || !sets.set_id_emplois_proche_metier || !sets.set_id_emplois_direct_metier) {
                                return reject('Votre experience a bien été ajoutée mais une erreur s\'est produite');
                              }

                              //On ajoute les tableaux d'id dans le document sportif
                              if (!sportif._source) {
                                return reject('Votre experience a bien été ajoutée mais une erreur s\'est produite');
                              }

                              sportif._source.id_emplois_direct_metier = sets.set_id_emplois_direct_metier;
                              sportif._source.id_emplois_proche_metier = sets.set_id_emplois_proche_metier;
                              sportif._source.set_id_emplois_actif_metier = sets.set_id_emplois_actif_metier;

                              //On update le document du sportif
                              sportifMetier.update_all(id_sportif, sportif._source)
                                .then(() => {
                                  return resolve(id_experience_professionnelle_sportif);
                                })
                                .catch((error) => {
                                  return reject(error);
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
   * Permet de vérifier les données d'une experience professionnelle sportive
   * @param date_debut_experience_professionnelle_sportif - Date de début
   * @param date_fin_experience_professionnelle_sportif - Date de fin
   * @param lieu_experience_professionnelle_sportif - Lieu
   * @param nom_entreprise_experience_professionnelle_sportif - Nom de l'entreprise
   * @param titre_poste_experience_professionnelle_sportif - Titre du poste occupé
   * @param description_poste_experience_professionnelle_sportif - Description du poste occupé
   * @returns {Promise} - Erreur ou document de l'experience professionnelle créée
   */
  check_values_experience_professionnelle(date_debut_experience_professionnelle_sportif,
                                          date_fin_experience_professionnelle_sportif,
                                          lieu_experience_professionnelle_sportif,
                                          nom_entreprise_experience_professionnelle_sportif,
                                          metier_experience_professionnelle_sportif,
                                          description_poste_experience_professionnelle_sportif,
                                          mission_poste_experience_professionnelle_sportif,
                                          realisation_poste_experience_professionnelle_sportif,
                                          toujours_en_poste_experience_professionnelle_sportif) {
    return new Promise((resolve, reject) => {
      //Création du manager des dates
      const dateManager = new DateManager();

      //Convertion de la date de début
      const moment_date_debut = dateManager.stringToMoment(date_debut_experience_professionnelle_sportif);
      if (!moment_date_debut) {
        return reject('Erreur lors de la récupération de la date de début');
      }

      //On regarde si la date de début n'est pas > à celle d'aujourd'hui
      if (dateManager.isAfterNow(moment_date_debut)) {
        return reject('La date de début ne peut être supérieur à celle d\'aujourd\'hui');
      }

      //On regarde si le lieu est bien formaté
      if (!lieu_experience_professionnelle_sportif
        || !lieu_experience_professionnelle_sportif._id
        || !lieu_experience_professionnelle_sportif.nom
        || !lieu_experience_professionnelle_sportif.location
        || !lieu_experience_professionnelle_sportif.location.lat
        || !lieu_experience_professionnelle_sportif.location.lon) {
        return reject('Erreur lors de la récupération du lieu');
      }

      //On cast en float la location
      lieu_experience_professionnelle_sportif.location.lat = Number.parseFloat(lieu_experience_professionnelle_sportif.location.lat);
      lieu_experience_professionnelle_sportif.location.lon = Number.parseFloat(lieu_experience_professionnelle_sportif.location.lon);

      if (!lieu_experience_professionnelle_sportif.location.lat || !lieu_experience_professionnelle_sportif.location.lon) {
        return reject('Les coordonnées GPS ne sont pas des float');
      }

      //On regarde si on a un nom d'entreprise
      if (!nom_entreprise_experience_professionnelle_sportif) {
        return reject('Erreur lors de la récupération du nom de l\'entreprise');
      }

      //On regarde si on a le titre du poste
      if (!metier_experience_professionnelle_sportif || !metier_experience_professionnelle_sportif._id) {
        return reject('Erreur lors de la récupération du titre du poste');
      }

      //Création de l'objet de l'experience
      let experience_professionnelle_sportif = {
        date_debut_experience_professionnelle_sportif: date_debut_experience_professionnelle_sportif,
        lieu_experience_professionnelle_sportif: lieu_experience_professionnelle_sportif,
        nom_entreprise_experience_professionnelle_sportif: nom_entreprise_experience_professionnelle_sportif,
        metier_experience_professionnelle_sportif: metier_experience_professionnelle_sportif,
        toujours_en_poste_experience_professionnelle_sportif: toujours_en_poste_experience_professionnelle_sportif,
      };

      //On regarde si c'est le poste actuel
      toujours_en_poste_experience_professionnelle_sportif = Boolean(toujours_en_poste_experience_professionnelle_sportif);
      if (!toujours_en_poste_experience_professionnelle_sportif) {
        //Convertion de la date de fin
        const moment_date_fin = dateManager.stringToMoment(date_fin_experience_professionnelle_sportif);
        if (!moment_date_fin) {
          return reject('Erreur lors de la récupération de la date de fin');
        }

        //On regarde si la date de fin n'est pas > à celle d'aujourd'hui
        if (dateManager.isAfterNow(moment_date_fin)) {
          return reject('La date de fin ne peut être supérieur à celle d\'aujourd\'hui');
        }

        //On regarde si la date de fin n'est pas avant celle de début
        if (dateManager.isBefore(moment_date_fin, moment_date_debut)) {
          return reject('La date de début ne peut être supérieur à la date de fin');
        }

        experience_professionnelle_sportif.date_fin_experience_professionnelle_sportif = date_fin_experience_professionnelle_sportif;
      }

      experience_professionnelle_sportif.toujours_en_poste_experience_professionnelle_sportif = toujours_en_poste_experience_professionnelle_sportif;

      if (description_poste_experience_professionnelle_sportif) {
        experience_professionnelle_sportif.description_poste_experience_professionnelle_sportif = description_poste_experience_professionnelle_sportif;
      }

      if (mission_poste_experience_professionnelle_sportif) {
        experience_professionnelle_sportif.mission_poste_experience_professionnelle_sportif = mission_poste_experience_professionnelle_sportif;
      }

      if (realisation_poste_experience_professionnelle_sportif) {
        experience_professionnelle_sportif.realisation_poste_experience_professionnelle_sportif = realisation_poste_experience_professionnelle_sportif;
      }

      return resolve(experience_professionnelle_sportif);
    });
  }

  generate_set_id_emplois_direct_proche_metier(experiences_pro) {
    return new Promise((resolve, reject) => {
      let set_id_emplois_direct_metier = new Set();
      let set_id_emplois_proche_metier = new Set();
      let set_id_emplois_actif_metier = new Set();

      for (const experience_pro of experiences_pro) {
        const {_source} = experience_pro;
        if (!_source) {
          continue;
        }

        const {metier_experience_professionnelle_sportif} = _source;
        if (!metier_experience_professionnelle_sportif) {
          continue;
        }

        let {_id} = metier_experience_professionnelle_sportif;
        if (!_id) {
          continue;
        }

        _id = Number.parseInt(_id);
        if (!_id) {
          continue;
        }

        const {id_emplois_direct_metier} = metier_experience_professionnelle_sportif;
        if (!id_emplois_direct_metier) {
          continue;
        }

        const {id_emplois_proche_metier} = metier_experience_professionnelle_sportif;
        if (!id_emplois_proche_metier) {
          continue;
        }

        let set_id_emplois_direct_metier_temp = new Set(id_emplois_direct_metier);
        let set_id_emplois_proche_metier_temp = new Set(id_emplois_proche_metier);

        set_id_emplois_direct_metier = new Set([...set_id_emplois_direct_metier, ...set_id_emplois_direct_metier_temp]);
        set_id_emplois_proche_metier = new Set([...set_id_emplois_proche_metier, ...set_id_emplois_proche_metier_temp]);
        set_id_emplois_actif_metier.add(_id);
      }

      return resolve({
        set_id_emplois_direct_metier: set_id_emplois_direct_metier,
        set_id_emplois_proche_metier: set_id_emplois_proche_metier,
        set_id_emplois_actif_metier: set_id_emplois_actif_metier,
      });
    });
  }
}

export default ExperienceProfessionnelleSportifMetier;