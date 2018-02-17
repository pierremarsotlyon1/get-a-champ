import BaseMetier from "./BaseMetier";
import SportifDao from "../dao/SportifDao";
import CategorieSportifMetier from '../metier/CategorieSportifMetier';
import CentreInteretMetier from '../metier/CentreInteretMetier';
import SituationSportifMetier from '../metier/SituationSportifMetier';
import SituationEntrepriseMetier from '../metier/SituationEntrepriseMetier';
import SportMetier from '../metier/SportMetier';
import AuthentificationMetier from "./AuthentificationMetier";
import RechercheSituationSportifMetier from "./RechercheSituationSportifMetier";
import validator from "validator";
import DateManager from '../utils/DateManager';

class SportifMetier extends BaseMetier {
  constructor(elasticsearch) {
    super();
    this._bdd = elasticsearch;
  }

  /**
   * Permet de modifier le document d'un sportif
   * @param id_sportif - Id du sportif
   * @param new_sportif - Nouveau document
   * @returns {Promise} - Erreur ou nouveau document du sportif
   */
  update_all(id_sportif, new_sportif) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.update_all(id_sportif, new_sportif)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de mettre à jour les données "profil" du sportif
   * @param id_user - Id du sportif
   * @param nom_sportif - Nouveau nom du sportif
   * @param prenom_sportif - Nouveau prénom du sportif
   * @param lieu_naissance_sportif - Nouveau lieu de naissance
   * @param date_naissance_sportif - Nouvelle date de naissance
   * @param sport_sportif - Nouveau sport du sportif
   * @param categorie_sportif - Nouvelle catégorie du sportif
   * @param situation_sportif - Nouvelle situation du sportif
   * @param centres_interet_sportif - Nouveaux centres d'interet
   * @param numero_ss_sportif - Nouveau numéro ss
   * @returns {Promise}
   */
  update(id_user,
         nom_sportif,
         prenom_sportif,
         lieu_naissance_sportif,
         date_naissance_sportif,
         sport_sportif,
         categorie_sportif,
         situation_sportif,
         centres_interet_sportif,
         numero_ss_sportif,
         situation_entreprise_sportif,
         recherche_situation_sportif) {
    return new Promise((resolve, reject) => {
      if (!nom_sportif) {
        return reject('Vous devez spécifier un nom');
      }

      if (!prenom_sportif) {
        return reject('Vous devez spécifier un prénom');
      }

      this.getById(id_user)
        .then(async (sportif) => {
          sportif = sportif._source;
          if (!sportif) {
            return reject('Erreur lors de la récupération du profil');
          }

          let scripts_elasticsearch = '';

          sportif.nom_sportif = nom_sportif;
          scripts_elasticsearch += 'ctx._source.nom_sportif = params.nom_sportif; ';

          sportif.prenom_sportif = prenom_sportif;
          scripts_elasticsearch += 'ctx._source.prenom_sportif = params.prenom_sportif; ';

          if (numero_ss_sportif) {
            sportif.numero_ss_sportif = numero_ss_sportif;
            scripts_elasticsearch += 'ctx._source.numero_ss_sportif = params.numero_ss_sportif; ';
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("numero_ss_sportif"); ';
          }


          if (date_naissance_sportif) {
            const dateManager = new DateManager();
            const moment_date_naissance = dateManager.stringToMoment(date_naissance_sportif);
            if (moment_date_naissance) {
              sportif.date_naissance_sportif = dateManager.toDate(moment_date_naissance);
              scripts_elasticsearch += 'ctx._source.date_naissance_sportif = params.date_naissance_sportif; ';
            }
            else {
              scripts_elasticsearch += 'ctx._source.remove("date_naissance_sportif"); ';
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("date_naissance_sportif"); ';
          }

          if (categorie_sportif) {
            try {
              const categorieSportifMetier = new CategorieSportifMetier(this._bdd);
              const value_categorie_sportif = await categorieSportifMetier.get(categorie_sportif._id);
              if (!value_categorie_sportif) {
                return reject('Erreur lors de la récupération de la catégorie sportive');
              }

              sportif.categorie_sportif = {
                _id: value_categorie_sportif._id,
                nom: value_categorie_sportif._source.nom_categorie_sportif,
              };

              scripts_elasticsearch += 'ctx._source.categorie_sportif = params.categorie_sportif; ';
            }
            catch (error) {
              return reject(error);
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("categorie_sportif"); ';
          }

          if (situation_sportif) {
            try {
              const situationSportifMetier = new SituationSportifMetier(this._bdd);
              const value_situation_sportif = await situationSportifMetier.get(situation_sportif._id);
              if (!value_situation_sportif) {
                return reject('Erreur lors de la récupération de la situation sportive');
              }

              sportif.situation_sportif = {
                _id: value_situation_sportif._id,
                nom: value_situation_sportif._source.nom_situation_sportif,
              };
              scripts_elasticsearch += 'ctx._source.situation_sportif = params.situation_sportif; ';
            }
            catch (error) {
              return reject(error);
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("situation_sportif"); ';
          }

          if (situation_entreprise_sportif) {
            try {
              const situationEntrepriseMetier = new SituationEntrepriseMetier(this._bdd);
              const situation_entreprise = await situationEntrepriseMetier.get(situation_entreprise_sportif._id);
              if (!situation_entreprise) {
                return reject('Erreur lors de la récupération de la situation d\'entreprise');
              }

              sportif.situation_entreprise_sportif = {
                _id: situation_entreprise._id,
                nom_situation_entreprise: situation_entreprise._source.nom_situation_entreprise,
              };
              scripts_elasticsearch += 'ctx._source.situation_entreprise_sportif = params.situation_entreprise_sportif; ';
            }
            catch (error) {
              return reject(error);
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("situation_entreprise_sportif"); ';
          }

          if (centres_interet_sportif && centres_interet_sportif.length > 0) {
            try {
              //Création du tableau d'id des centres d'interets
              let id_centres_interet_sportif = [];
              for (const c of centres_interet_sportif) {
                id_centres_interet_sportif.push(c._id);
              }

              const centreInteretMetier = new CentreInteretMetier(this._bdd);
              const value_centre_interet_sportif = await centreInteretMetier.get_multi_ids(id_centres_interet_sportif);

              if (!value_centre_interet_sportif || !value_centre_interet_sportif.docs) {
                return reject('Erreur lors de la récupération du centre d\'interet');
              }

              sportif.centres_interets_sportif = [];
              for (const centre of value_centre_interet_sportif.docs) {
                sportif.centres_interets_sportif.push(
                  {
                    _id: centre._id,
                    nom: centre._source.nom_centre_interet,
                  });
              }

              scripts_elasticsearch += 'ctx._source.centres_interets_sportif = params.centres_interets_sportif; ';
            }
            catch (error) {
              return reject(error);
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("centres_interets_sportif"); ';
          }

          if (sport_sportif !== undefined) {
            try {
              const sportMetier = new SportMetier(this._bdd);
              const value_sport_sportif = await sportMetier.get(sport_sportif._id);

              if (!value_sport_sportif) {
                return reject('Erreur lors de la récupération du sport');
              }

              sportif.current_sport_sportif = {
                _id: value_sport_sportif._id,
                nom_sport: value_sport_sportif._source.nom_sport,
              };

              scripts_elasticsearch += 'ctx._source.current_sport_sportif = params.current_sport_sportif; ';
            }
            catch (error) {
              return reject(error);
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("current_sport_sportif"); ';
          }

          if (lieu_naissance_sportif && lieu_naissance_sportif.location && lieu_naissance_sportif.location.lat
            && lieu_naissance_sportif.location.lon) {

            lieu_naissance_sportif.location.lat = Number.parseFloat(lieu_naissance_sportif.location.lat);
            lieu_naissance_sportif.location.lon = Number.parseFloat(lieu_naissance_sportif.location.lon);
            sportif.lieu_naissance_sportif = lieu_naissance_sportif;

            scripts_elasticsearch += 'ctx._source.lieu_naissance_sportif = params.lieu_naissance_sportif; ';
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("lieu_naissance_sportif"); ';
          }

          //On regarde si la personne a saisie des recherches de situations
          if (recherche_situation_sportif && recherche_situation_sportif.length > 0) {
            try {
              const rechercheSituationSportifMetier = new RechercheSituationSportifMetier(this._bdd);
              const recherches_situations_sportif = await rechercheSituationSportifMetier.getByIds(recherche_situation_sportif);
              if (!recherches_situations_sportif || recherches_situations_sportif.length === 0) {
                return reject('Erreur lors de la récupération des recherches de situation sportif');
              }

              sportif.recherche_situation_sportif = [];
              for (const recherche_situation of recherches_situations_sportif) {
                sportif.recherche_situation_sportif.push({
                  _id: recherche_situation._id,
                  nom_recherche_situation_sportif: recherche_situation._source.nom_recherche_situation_sportif,
                });
              }

              scripts_elasticsearch += 'ctx._source.recherche_situation_sportif = params.recherche_situation_sportif; ';
            }
            catch (e) {
              return reject(e);
            }
          }
          else {
            scripts_elasticsearch += 'ctx._source.remove("recherche_situation_sportif"); ';
          }

          const sportifDao = new SportifDao(this._bdd);
          sportifDao.update_by_script(scripts_elasticsearch, id_user, sportif)
            .then(() => {
              return resolve(sportif);
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

  updateByScript(id_sportif, script, data) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.update_by_script(script, id_sportif, data)
        .then((sportif) => {
          return resolve(sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer les données "profil" d'un sportif
   * @param id_user - Id du sportif
   * @returns {Promise} - Erreur ou document comprenant uniquement les données du profil
   */
  get_profil(id_user) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.get_profil(id_user)
        .then((profil_sportif) => {
          return resolve(profil_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer les résultats du short test
   * @param id_user
   * @returns {Promise}
   */
  getResultatsShortTest(id_user) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.getResultatsShortTest(id_user)
        .then((resultatsShortTest) => {
          return resolve(resultatsShortTest);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer les résultats du full test
   * @param id_user
   * @returns {Promise}
   */
  getResultatsFullTest(id_user) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.getResultatsFullTest(id_user)
        .then((resultatsFullTest) => {
          return resolve(resultatsFullTest);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un sportif via son id
   * @param id_user - Id du sportif
   * @returns {Promise} - Erreur ou document du sportif
   */
  getById(id_user) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.getById(id_user)
        .then((sportif) => {
          return resolve(sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer un sportif via son email et mot de passe
   * @param email - Email du sportif
   * @param password - Mot de passe du sportif
   * @returns {Promise} - Erreur ou document du sportif
   */
  get(email, password) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.get(email, password)
        .then((idSportif) => {
          const authentificationMetier = new AuthentificationMetier();
          const token = authentificationMetier.encode(idSportif);
          if (!token) {
            return reject('Erreur lors de la génération du token');
          }

          return resolve(token);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

  /**
   * Permet d'ajouter un sportif
   * @param nom - Nom du sportif
   * @param prenom - Prénom du sportif
   * @param email - Email du sportif
   * @param password - Mot de passe du sportif
   * @param confirm_password - Confirmation du mot de passe
   * @returns {Promise} - Erreur ou token
   */
  add(nom, prenom, email, password, confirm_password) {
    return new Promise((resolve, reject) => {
      if (!validator.isEmail(email)) {
        return reject('L\'email n\'est pas au bon format');
      }

      if (password !== confirm_password) {
        return reject('Vos mot de passe doivent être identique');
      }

      const sportifDao = new SportifDao(this._bdd);
      sportifDao.add(nom, prenom, email, password)
        .then((idSportif) => {
          const authentificationMetier = new AuthentificationMetier();
          const token = authentificationMetier.encode(idSportif);
          if (!token) {
            return reject('Erreur lors de la génération du token d\'authentification');
          }

          return resolve(token);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de vérifier si un sportif existe via son id
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou booléan de l'existance du sportif
   */
  exist(id_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur de l\'id sportif');
      }

      const sportifDao = new SportifDao(this._bdd);
      sportifDao.exist_by_id(id_sportif)
        .then((exists) => {
          return resolve(exists);
        })
        .catch((error) => {
          return reject(error);
        })
    });
  }

  search_by_animation_formation(id_thematique_animation_formation, montant_max) {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_formation) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de formation');
      }

      const sportifDao = new SportifDao(this._bdd);
      sportifDao.search_by_animation_formation(id_thematique_animation_formation, montant_max)
        .then((sportifs) => {
          return resolve(sportifs);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  search_by_animation_incentive(id_thematique_animation_incentive, montant_max) {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_incentive) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique incentive');
      }

      const sportifDao = new SportifDao(this._bdd);
      sportifDao.search_by_animation_incentive(id_thematique_animation_incentive, montant_max)
        .then((sportifs) => {
          return resolve(sportifs);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  search_by_animation_conference(id_thematique_animation_conference, montant_max) {
    return new Promise((resolve, reject) => {
      if (!id_thematique_animation_conference) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique de conférence');
      }

      const sportifDao = new SportifDao(this._bdd);
      sportifDao.search_by_animation_conference(id_thematique_animation_conference, montant_max)
        .then((sportifs) => {
          return resolve(sportifs);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  search_by_sponsoring(id_type_sponsoring,
                       montant_recherche,
                       date_depart,
                       date_fin) {
    return new Promise((resolve, reject) => {
      const sportifDao = new SportifDao(this._bdd);
      sportifDao.search_by_sponsoring(
        id_type_sponsoring,
        montant_recherche,
        date_depart,
        date_fin
      )
        .then((sportifs) => {
          return resolve(sportifs);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  search_by_metier(id_metier) {
    return new Promise((resolve, reject) => {
      if (!id_metier) {
        return reject('Erreur lors de la récupération de l\'identifiant du métier');
      }

      const sportifDao = new SportifDao(this._bdd);
      sportifDao.search_by_metier(id_metier)
        .then((sportifs) => {
          return resolve(sportifs);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default SportifMetier;