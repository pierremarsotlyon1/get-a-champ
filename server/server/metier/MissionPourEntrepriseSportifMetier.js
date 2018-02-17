/**
 * Created by pierremarsot on 04/02/2017.
 */
import SportifMetier from '../metier/SportifMetier';
import LancementProduitPromotionSportifDao from '../dao/LancementProduitPromotionSportifDao';
import ContratMissionEntrepriseSportifDao from '../dao/ContratMissionEntrepriseSportifDao';
import DomaineConnaissanceSportifMetier from './DomaineConnaissanceSportifMetier';

class MissionPourEntrepriseSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer les paramètres (objet) pour le lancement/promotion/image
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou objet
   */
  get_settings_lancement_produit_promotion(id_sportif) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      const lancementProduitPromotionSportifDao = new LancementProduitPromotionSportifDao(this._bdd);
      lancementProduitPromotionSportifDao.get_settings_lancement_produit_promotion(id_sportif)
        .then((settings_lancement_produit_promotion_image_sportif) => {
          if (!settings_lancement_produit_promotion_image_sportif) {
            return resolve({});
          }

          return resolve({
            promotionProduit: settings_lancement_produit_promotion_image_sportif.accepte_lancement_produit_promotion_image_sportif,
            promotionImage: settings_lancement_produit_promotion_image_sportif.promotion_image,
          });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de modifier les paramètres pour le lancement/promotion/image d'un sportif
   * @param id_sportif - Id du sportif
   * @param promotionProduit - Boolean qui dit si le psortif accepte de promouvoir un produit
   * @param promotionImage - Boolean qui dit si le psortif accepte de promouvoir l'image d'une entreprise
   * @returns {Promise} - Erreur ou boolean du succés de la modification
   */
  update_settings_lancement_produit_promotion(id_sportif,
                                              promotionProduit,
                                              promotionImage) {
    return new Promise((resolve, reject) => {
      //Vérification des information
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if(promotionProduit === undefined){
        promotionProduit = false;
      }

      if(promotionImage === undefined){
        promotionImage = false;
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si on a déjà l'objet
          if (!sportif._source.lancement_produit_promotion_image_sportif) {
            sportif._source.lancement_produit_promotion_image_sportif = {};
          }

          //On modifie l'objet du sportif
          sportif._source.lancement_produit_promotion_image_sportif.accepte_lancement_produit_promotion_image_sportif
            = promotionProduit;
          sportif._source.lancement_produit_promotion_image_sportif.promotion_image
            = promotionImage;

          //On update le sportif
          sportifMetier.update_all(id_sportif, sportif._source)
            .then((sportif) => {
              if (!sportif) {
                return reject('Erreur lors de la modification de vos paramètres');
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
   * Permet de récupérer les contrats de mission d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des contrats de mission
   */
  get_contracts_mission_entreprise_sportif(id_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      const contratMissionEntrepriseSportifDao = new ContratMissionEntrepriseSportifDao(this._bdd);
      contratMissionEntrepriseSportifDao.get_contrat_mission_entreprise_sportif(id_sportif)
        .then((contrat_mission_entreprise_sportif) => {
          if (!contrat_mission_entreprise_sportif) {
            return resolve([]);
          }

          return resolve(contrat_mission_entreprise_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet d'ajouter un contrat de mission entreprise pour un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance_sportif - Id du domaine de connaissance lié à un sportif
   * @returns {Promise} - Erreur ou boolean disant si l'ajout à été éffectué
   */
  add_contrats_mission_entreprise(id_sportif, id_domaine_connaissance_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_domaine_connaissance_sportif) {
        return reject('Erreur lors de la récupération de votre domaine de connaissance');
      }

      //On récup le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On récup le domaine de compétence du sportif
          const domaineConnaissanceSportifMetier = new DomaineConnaissanceSportifMetier(this._bdd);
          domaineConnaissanceSportifMetier.get(id_sportif, id_domaine_connaissance_sportif)
            .then((domaine_connaissance_sportif) => {
              if (!domaine_connaissance_sportif) {
                return reject('Erreur lors de la récupération de votre domaine de compétence');
              }

              //On regarde si le sportif a déjà ce domaine de compétence dans ses contrats de mission d'entreprise
              if (sportif._source.contrats_mission_entreprise_sportif) {
                const contrat_mission_entreprise = sportif._source.contrats_mission_entreprise_sportif.find((contrat_mission_entreprise) => {
                  return contrat_mission_entreprise.id_domaine_connaissance === domaine_connaissance_sportif._source.id_domaine_connaissance;
                });

                if (contrat_mission_entreprise) {
                  return reject('Vous avez déjà ce domaine de compétence dans vos contrats de mission');
                }
              }

              //On regarde si on a déjà un contrat, sinon on initialise le tableau nested
              if (!sportif._source.contrats_mission_entreprise_sportif) {
                sportif._source.contrats_mission_entreprise_sportif = [];
              }

              //On ajoute le contrat
              sportif._source.contrats_mission_entreprise_sportif.push({
                id_domaine_connaissance: domaine_connaissance_sportif._source.id_domaine_connaissance,
                id_domaine_connaissance_sportif: id_domaine_connaissance_sportif,
                niveau_connaissance: domaine_connaissance_sportif._source.niveau_connaissance,
                nom_domaine_connaissance: domaine_connaissance_sportif._source.nom_domaine_connaissance
              });

              //On update le document sportif
              sportifMetier.update_all(id_sportif, sportif._source)
                .then((sportif) => {
                  if (!sportif) {
                    return reject('Erreur lors de l\'ajout du contrat de mission');
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
    })
  }

  /**
   * Permet de supprimer un contrat de mission entreprise d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance_sportif - Id du domaine de compétence lié au sportif
   * @returns {Promise} - Erreur ou booléan de succés
   */
  remove_contrats_mission_entreprise(id_sportif, id_domaine_connaissance_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_domaine_connaissance_sportif) {
        return reject('Erreur lors de la récupération de votre contrat de mission');
      }

      //On récup le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //on regarde si on a des contrats dans le tableau (car on ne peut supprimer dans un tableau vide)
          if (!sportif._source.contrats_mission_entreprise_sportif) {
            return reject('Erreur lors de la récupération de votre contrat de mission');
          }

          //On supprime le contrat
          const new_contrats_mission_entreprise = sportif._source.contrats_mission_entreprise_sportif
            .filter((contrat_mission_entreprise) => {
              return contrat_mission_entreprise.id_domaine_connaissance_sportif !== id_domaine_connaissance_sportif;
            });

          //On regarde si on a moins de contrat qu'avant
          if (new_contrats_mission_entreprise.length >= sportif._source.contrats_mission_entreprise_sportif.length) {
            return reject('Erreur lors de la suppression de votre contrat de mission');
          }

          //On affecte le nouveau tableau nested des contrats au sportif
          sportif._source.contrats_mission_entreprise_sportif = new_contrats_mission_entreprise;

          //On update le document sportif
          sportifMetier.update_all(id_sportif, sportif._source)
            .then((sportif) => {
              if (!sportif) {
                return reject('Erreur lors de la suppression du contrat de mission');
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
  }
}

export default MissionPourEntrepriseSportifMetier;