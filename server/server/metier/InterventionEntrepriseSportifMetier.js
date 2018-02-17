/**
 * Created by pierremarsot on 31/01/2017.
 */
import InterventionEntrepriseSportifDao from '../dao/InterventionEntrepriseSportifDao';
import SportifMetier from '../metier/SportifMetier';
import ManagerInt from '../utils/ManagerInt';

import CategorieAnimationConferenceMetier from '../metier/CategorieAnimationConferenceMetier';
import CategorieAnimationIncentiveMetier from '../metier/CategorieAnimationIncentiveMetier';
import CategorieAnimationFormationMetier from '../metier/CategorieAnimationFormationMetier';

class InterventionEntrepriseSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les animations de formation d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des animations de formation
   */
  find_animation_formation(id_sportif) {
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

          //On récupère toutes les animations de formation du sportif
          const interventionEntrepriseSportifDao = new InterventionEntrepriseSportifDao(this._bdd);
          interventionEntrepriseSportifDao.find_animation_formation(id_sportif)
            .then((animations_formation) => {
              if (!animations_formation) {
                animations_formation = [];
              }
              return resolve(animations_formation);
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

  search_animation_formation(id_thematique_animation_formation, montant_max) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_thematique_animation_formation) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de formation');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.search_by_animation_formation(
        id_thematique_animation_formation,
        montant_max
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
   * Permet d'ajouter une animation de formation à un sportif
   * @param id_sportif - Id du sportif
   * @param id_thematique_animation_formation - Id de la thématique d'animation de formation
   * @param animer_seul - Boolean disant si il peut l'animer seul ou pas
   * @returns {Promise} - Erreur ou boolean disant si l'ajout a été un succés
   */
  add_animation_formation(id_sportif, id_thematique_animation_formation, animer_seul) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_thematique_animation_formation) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de formation');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le sportif à déjà des formations
          if (!sportif._source.animations_formation) {
            sportif._source.animations_formation = [];
          }

          const animation_formation = sportif._source.animations_formation.find((animation_formation) => {
            return animation_formation.id_thematique_animation_formation === id_thematique_animation_formation;
          });

          if (animation_formation) {
            return reject('Vous avez déjà ajouté cette thématique');
          }

          //On récupère la thématique de formation
          const categorieAnimationFormationMetier = new CategorieAnimationFormationMetier(this._bdd);
          categorieAnimationFormationMetier.getByThematique(id_thematique_animation_formation)
            .then((categorie) => {
              if (!categorie) {
                return reject('Erreur lors de la récupération de la thématique');
              }

              //On cherche la thématique dans la catégorie
              categorieAnimationFormationMetier.extractThematique(id_thematique_animation_formation, categorie)
                .then((thematique) => {
                  if (!thematique) {
                    return reject('Erreur lors de la récupération de la thématique');
                  }

                  const bool_animer_seul = Boolean(animer_seul);
                  sportif._source.animations_formation.push({
                    animer_seul: bool_animer_seul,
                    id_thematique_animation_formation: thematique.id,
                    nom_thematique_animation_formation: thematique.nom_thematique_animation_formation,
                  });

                  //On met à jour le document du sportif
                  sportifMetier.update_all(id_sportif, sportif._source)
                    .then((sportif) => {
                      if (!sportif) {
                        return reject('Erreur lors de l\'ajout de l\'animation incentive');
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
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer une animation de formation d'un sportif
   * @param id_sportif - id du sportif
   * @param id_thematique_animation_formation - Id de la thématique d'animation de formation
   * @returns {Promise} - Erreur ou boolean de succés
   */
  remove_animation_formation(id_sportif, id_thematique_animation_formation) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_thematique_animation_formation) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de formation');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le tableau des formations conference n'est pas undefined ou vide
          if (!sportif._source.animations_formation || sportif._source.animations_formation.length === 0) {
            return reject('Vous n\'avez pas enregistré de thématique de conférence');
          }

          //On supprime la thématique conférence
          const new_animations_formation = sportif._source.animations_formation.filter((animation_formation) => {
            return animation_formation.id_thematique_animation_formation !== id_thematique_animation_formation;
          });

          //On regarde si on a bien supprimé la thématique
          if (new_animations_formation.length >= sportif._source.animations_formation.length) {
            return reject('Erreur lors de la suppression de la thématique');
          }

          //On update le tableau
          sportif._source.animations_formation = new_animations_formation;

          //On met à jour le document du sportif
          sportifMetier.update_all(id_sportif, sportif._source)
            .then((sportif) => {
              if (!sportif) {
                return reject('Erreur lors de la suppression de l\'animation de formation');
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
   * Permet de récupèrer toutes les animations incentives d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des animation incentives
   */
  find_animations_incentive_evenementiel(id_sportif) {
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

          //On récupère toutes les formations incentive du sportif
          const interventionEntrepriseSportifDao = new InterventionEntrepriseSportifDao(this._bdd);
          interventionEntrepriseSportifDao.find_animations_incentive_evenementiel(id_sportif)
            .then((animations_formation_incentive_sportif) => {
              if (!animations_formation_incentive_sportif) {
                animations_formation_incentive_sportif = [];
              }

              return resolve(animations_formation_incentive_sportif);
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

  search_animation_incentive(id_thematique_animation_incentive, montant_max) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_thematique_animation_incentive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique incentive');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.search_by_animation_incentive(
        id_thematique_animation_incentive,
        montant_max
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
   * Permet d'ajouter une animation incentive à un sportif
   * @param id_sportif - Id du sportif
   * @param id_thematique_animation_incentive - Id de la thématique incentive
   * @param animer_seul - Boolean disant si il peut l'animer seul ou pas
   * @returns {Promise} - Erreur ou boolean de succes
   */
  add_animation_incentive_evenementiel(id_sportif, id_thematique_animation_incentive, animer_seul) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_thematique_animation_incentive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le tableau nested des formation incentive existe, sinon on l'initialise
          if (!sportif._source.animations_incentive_evenementiel) {
            sportif._source.animations_incentive_evenementiel = [];
          }

          //On regarde si le sportif n'a pas déjà la thématique de formation
          const animation_incentive_evenementiel = sportif._source.animations_incentive_evenementiel.find((animation_incentive_evenementiel) => {
            return animation_incentive_evenementiel.id_thematique_animation_incentive_evenementiel === id_thematique_animation_incentive;
          });

          if (animation_incentive_evenementiel) {
            return reject('Vous avez déjà ajouté cette formation');
          }

          //On récupère la thématique de formation
          const categorieAnimationIncentiveMetier = new CategorieAnimationIncentiveMetier(this._bdd);
          categorieAnimationIncentiveMetier.getByThematique(id_thematique_animation_incentive)
            .then((categorie) => {
              if (!categorie) {
                return reject('Erreur lors de la récupération de la thématique');
              }

              //On cherche la thématique dans la catégorie
              categorieAnimationIncentiveMetier.extractThematique(id_thematique_animation_incentive, categorie)
                .then((thematique) => {
                  if (!thematique) {
                    return reject('Erreur lors de la récupération de la thématique');
                  }

                  const bool_animer_seul = Boolean(animer_seul);
                  sportif._source.animations_incentive_evenementiel.push({
                    animer_seul: bool_animer_seul,
                    id_thematique_animation_incentive_evenementiel: thematique.id,
                    nom_thematique_animation_incentive_evenementiel: thematique.nom_thematique_animation_incentive,
                  });

                  //On met à jour le document du sportif
                  sportifMetier.update_all(id_sportif, sportif._source)
                    .then((sportif) => {
                      if (!sportif) {
                        return reject('Erreur lors de l\'ajout de l\'animation incentive');
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
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer une animation incentive d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_thematique_animation_incentive - Id de la thématique d'animation incentive
   * @returns {Promise} - Erreur ou boolean de succés
   */
  remove_animation_incentive_evenementiel(id_sportif, id_thematique_animation_incentive) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_thematique_animation_incentive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de formation');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le tableau des formations conference n'est pas undefined ou vide
          if (!sportif._source.animations_incentive_evenementiel || sportif._source.animations_incentive_evenementiel.length === 0) {
            return reject('Vous n\'avez pas enregistré de thématique de conférence');
          }

          //On supprime la thématique conférence
          const new_animations_incentive_evenementiel = sportif._source.animations_incentive_evenementiel.filter((animation_incentive) => {
            return animation_incentive.id_thematique_animation_incentive_evenementiel !== id_thematique_animation_incentive;
          });

          //On regarde si on a bien supprimé la thématique
          if (new_animations_incentive_evenementiel.length >= sportif._source.animations_incentive_evenementiel.length) {
            return reject('Erreur lors de la suppression de la thématique');
          }

          //On update le tableau
          sportif._source.animations_incentive_evenementiel = new_animations_incentive_evenementiel;

          sportifMetier.update_all(id_sportif, sportif._source)
            .then((sportif) => {
              if (!sportif) {
                return reject('Erreur lors de la suppression de l\'animation de formation');
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
   * Permet de récupèrer toutes les animations de conférence d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des animations de conférence
   */
  find_animations_conference(id_sportif) {
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

          //On récupère toutes les formations de conférence du sportif
          const interventionEntrepriseSportifDao = new InterventionEntrepriseSportifDao(this._bdd);
          interventionEntrepriseSportifDao.find_animations_conference(id_sportif)
            .then((animations_formation) => {
              if (!animations_formation) {
                animations_formation = [];
              }

              return resolve(animations_formation);
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

  search_animation_conference(idThematique, montant_max) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!idThematique) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de conférence');
      }
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.search_by_animation_conference(
        idThematique,
        montant_max
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
   * Permet d'ajouter une animation de conférence à un sportif
   * @param id_sportif - Id du sportif
   * @param id_thematique_animation_conference - Id de la thémtatique d'animation de conférence
   * @param animer_seul - Boolean disant si il peut l'animer seul
   * @returns {Promise} - Erreur ou boolean de succés
   */
  add_animation_conference(id_sportif, id_thematique_animation_conference, montant_minimum) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_thematique_animation_conference) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      //On cast en int le montant min
      montant_minimum = ManagerInt.stringToInt(montant_minimum);
      if(!ManagerInt.isInt(montant_minimum)){
        return reject('Le montant n\'est pas au bon format, merci de saisir un nombre entier');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le tableau nested des formation incentive existe, sinon on l'initialise
          if (!sportif._source.animations_conference) {
            sportif._source.animations_conference = [];
          }

          //On regarde si le sportif n'a pas déjà la thématique de formation
          const animation_conference = sportif._source.animations_conference.find((animation_conference) => {
            return animation_conference.id_thematique_animation_conference === id_thematique_animation_conference;
          });

          if (animation_conference) {
            return reject('Vous avez déjà ajouté cette formation');
          }

          //on récupère la thématique de formation
          const categorieAnimationConferenceMetier = new CategorieAnimationConferenceMetier(this._bdd);
          categorieAnimationConferenceMetier.getByThematique(id_thematique_animation_conference)
            .then((categorie) => {
              if (!categorie) {
                return reject('Erreur lors de la récupération de la thématique');
              }

              //On cherche la thématique dans la catégorie
              categorieAnimationConferenceMetier.extractThematique(id_thematique_animation_conference, categorie)
                .then((thematique) => {
                  if (!thematique) {
                    return reject('Erreur lors de la récupération de la thématique');
                  }

                  sportif._source.animations_conference.push({
                    id_thematique_animation_conference: thematique.id,
                    nom_thematique_animation_conference: thematique.nom_thematique_animation_conference,
                    montant_minimum: montant_minimum,
                  });

                  //On met à jour le document du sportif
                  sportifMetier.update_all(id_sportif, sportif._source)
                    .then((sportif) => {
                      if (!sportif) {
                        return reject('Erreur lors de l\'ajout de l\'animation de formation');
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
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer une animation de conférence d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_thematique_animation_conference - Id de la thématique de conférence
   * @returns {Promise} -Erreur ou boolean de succés
   */
  remove_animation_conference(id_sportif, id_thematique_animation_conference) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_thematique_animation_conference) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de formation');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le tableau des formations conference n'est pas undefined ou vide
          if (!sportif._source.animations_conference || sportif._source.animations_conference.length === 0) {
            return reject('Vous n\'avez pas enregistré de thématique de conférence');
          }

          //On supprime la thématique conférence
          const new_animations_conference = sportif._source.animations_conference.filter((animation_conference) => {
            return animation_conference.id_thematique_animation_conference !== id_thematique_animation_conference;
          });

          //On regarde si on a bien supprimé la thématique
          if (new_animations_conference.length >= sportif._source.animations_conference.length) {
            return reject('Erreur lors de la suppression de la thématique');
          }

          //On update le tableau
          sportif._source.animations_conference = new_animations_conference;

          //On update en bdd
          sportifMetier.update_all(id_sportif, sportif._source)
            .then((sportif) => {
              if (!sportif) {
                return reject('Erreur lors de la suppression de l\'animation de formation');
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
}


export default InterventionEntrepriseSportifMetier;