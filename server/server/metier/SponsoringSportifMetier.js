/**
 * Created by pierremarsot on 10/02/2017.
 */
import SponsoringSportifDao from '../dao/SponsoringSportifDao';
import SportifMetier from './SportifMetier';
import TypeSponsoringMetier from '../metier/TypeSponsoringMetier';
import DateManager from '../utils/DateManager';

class SponsoringSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  search(id_type_sponsoring,
         montant_recherche,
         date_depart,
         date_fin) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_type_sponsoring || id_type_sponsoring.length === 0) {
        return reject('Erreur lors de la récupération de l\'identifiant du type de sponsoring');
      }

      if (!montant_recherche) {
        return reject('Erreur lors de la récupération du montant recherché');
      }

      if (!date_depart) {
        return reject('Erreur lors de la récupération de la date de départ');
      }

      if (!date_fin) {
        return reject('Erreur lors de la récupération de la date de fin');
      }

      //On regarde si on a bien un montant en int
      montant_recherche = Number.parseInt(montant_recherche);
      if (!montant_recherche) {
        return reject('Erreur lors de la récupération du montant recherché');
      }

      //Vérification des dates
      const dateManager = new DateManager();

      date_depart = DateManager.frenchDateToMoment(date_depart);
      if (!date_depart) {
        return reject('Erreur lors de la récupération de la date de départ');
      }

      date_fin = DateManager.frenchDateToMoment(date_fin);
      if (!date_fin) {
        return reject('Erreur lors de la récupération de la date de fin');
      }

      if (dateManager.isAfter(date_depart, date_fin)) {
        return reject('La date de départ doit être antérieur à celle de fin');
      }

      date_depart = dateManager.toDate(date_depart);
      date_fin = dateManager.toDate(date_fin);

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.search_by_sponsoring(
        id_type_sponsoring,
        montant_recherche,
        date_depart,
        date_fin
      )
        .then((sportif) => {
          return resolve(sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer un sponsoring d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_sponsoring_sportif - Id du sponsoring
   * @returns {Promise} - Erreur ou id du sponsoring supprimé
   */
  remove(id_sportif, id_sponsoring_sportif) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sponsoring_sportif) {
        return reject('Erreur lors de la récupération de l\'identifiant du sponsoring');
      }

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

          //On supprime le sponsoring
          const sponsoringSportifDao = new SponsoringSportifDao(this._bdd);
          sponsoringSportifDao.remove(id_sportif, id_sponsoring_sportif)
            .then((id_sponsoring_sportif) => {
              if (!id_sponsoring_sportif) {
                return reject('Erreur lors de la suppression du sponsoring');
              }

              return resolve(id_sponsoring_sportif);
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
   * Permet de récupérer tous les sponsoring d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des sponsorings du sportif
   */
  find(id_sportif) {
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

          //On récupère tous les sponsorings du sportif
          const sponsoringSportifDao = new SponsoringSportifDao(this._bdd);
          sponsoringSportifDao.find(id_sportif)
            .then((sponsorings_sportif) => {
              return resolve(sponsorings_sportif);
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
   * Permet d'ajouter un sponsoring au sportif
   * @param id_sportif - Id du sportif
   * @param type_sponsoring_sportif - Type du sponsoring sportif (Object {_id, nom_type_sponsoring})
   * @param date_debut_sponsoring - Date de début
   * @param date_fin_sponsoring - Date de fin
   * @param id_lieu_sponsoring - Id du lieu du sponsoring
   * @param latitude_lieu_sponsoring - Latitude du lieu
   * @param longitude_lieu_sponsoring - Longitude du lieu
   * @param nom_lieu_sponsoring - Nom du lieu
   * @param description_sponsoring - Description du sponsoring
   * @param montant_recherche - Montant en int
   * @returns {Promise} - Erreur ou Id du document du sponsoring ajouté
   */
  add(id_sportif,
      type_sponsoring_sportif,
      date_debut_sponsoring,
      date_fin_sponsoring,
      id_lieu_sponsoring,
      latitude_lieu_sponsoring,
      longitude_lieu_sponsoring,
      nom_lieu_sponsoring,
      description_sponsoring,
      montant_recherche) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      //On récupère le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          //Vérification du sportif
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //Vérification du type de sponsoring
          if (!type_sponsoring_sportif) {
            return reject('Erreur lors de la récupération du type de sponsoring');
          }

          //On récup le type de sponsoring
          const typeSponsoringMetier = new TypeSponsoringMetier(this._bdd);
          typeSponsoringMetier.get(type_sponsoring_sportif._id)
            .then((type_sponsoring) => {
              if (!type_sponsoring) {
                return reject('Erreur lors de la récupération du type de sponsoring');
              }

              //Vérification des informations du sponsoring
              const dateManager = new DateManager();

              date_debut_sponsoring = dateManager.stringToMoment(date_debut_sponsoring);
              if (!date_debut_sponsoring) {
                return reject('Erreur lors de la récupération de la date de début');
              }

              date_fin_sponsoring = dateManager.stringToMoment(date_fin_sponsoring);
              if (!date_fin_sponsoring) {
                return reject('Erreur lors de la récupération de la date de fin');
              }

              if (dateManager.isAfter(date_debut_sponsoring, date_fin_sponsoring)) {
                return reject('La date de début ne peut être après la date de fin');
              }

              if (dateManager.isBefore(date_fin_sponsoring, date_debut_sponsoring)) {
                return reject('La date de fin ne peut pas être inférieur à la date de début');
              }

              if (!id_lieu_sponsoring) {
                return reject('Erreur lors de la récupération de l\'identifiant du lieu');
              }

              if (!latitude_lieu_sponsoring) {
                return reject('Erreur lors de la récupération de la latitude');
              }

              if (!longitude_lieu_sponsoring) {
                return reject('Erreur lors de la récupération de la longitude');
              }

              if (!nom_lieu_sponsoring) {
                return reject('Erreur lors de la récupération du nom du lieu');
              }

              //On regarde si on peut parser le montant en int
              montant_recherche = Number.parseInt(montant_recherche);
              if (!montant_recherche) {
                return reject('Erreur lors de la récupération du montant');
              }

              //Création de l'objet du sponsoring à ajouter
              const sponsoring_sportif = {
                nom_sportif_sponsoring_sportif: sportif.nom_sportif,
                prenom_sportif_sponsoring_sportif: sportif.prenom_sportif,
                date_depart_sponsoring_sportif: dateManager.toDate(date_debut_sponsoring),
                date_fin_sponsoring_sportif: dateManager.toDate(date_fin_sponsoring),
                lieu_sponsoring_sportif: {
                  _id: id_lieu_sponsoring,
                  location: {
                    lat: Number.parseFloat(latitude_lieu_sponsoring),
                    lon: Number.parseFloat(longitude_lieu_sponsoring)
                  },
                  nom: nom_lieu_sponsoring,
                },
                type_sponsoring_sportif: {
                  _id: type_sponsoring._id,
                  nom_type_sponsoring: type_sponsoring._source.nom_type_sponsoring,
                },
                montant_recherche: montant_recherche,
              };

              if (description_sponsoring) {
                sponsoring_sportif.description_sponsoring_sportif = description_sponsoring;
              }

              //On ajoute le sponsoring
              const sponsoringSportifDao = new SponsoringSportifDao(this._bdd);
              sponsoringSportifDao.add(id_sportif, sponsoring_sportif)
                .then((id_sponsoring_sportif) => {
                  if (!id_sponsoring_sportif) {
                    return reject('Erreur lors de l\'ajout du sponsoring');
                  }

                  return resolve(id_sponsoring_sportif);
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
}

export default SponsoringSportifMetier;