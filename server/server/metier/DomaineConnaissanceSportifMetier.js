/**
 * Created by pierremarsot on 28/01/2017.
 */
import SportifMetier from '../metier/SportifMetier';
import NiveauDomaineConnaissanceMetier from './NiveauDomaineConnaissanceMetier';
import DomaineConnaissanceMetier from './DomaineConnaissanceMetier';

class DomaineConnaissanceSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer un domaine de connaissance d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance - Id du domaine de connaissance
   * @returns {Promise} - Erreur ou document du domaine de connaissance lié au sportif
   */
  get(id_sportif, id_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_domaine_connaissance) {
        return reject('Erreur lors de la récupération de l\'identifiant du domaine de connaissance');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          if (!sportif._source.domaines_connaissance) {
            return reject('Vous n\'avez pas de domaine de connaissance');
          }

          const domaine_connaissance = sportif._source.domaines_connaissance.find((domaine_connaissance) => {
            return domaine_connaissance.id_domaine_connaissance === id_domaine_connaissance;
          });

          if (!domaine_connaissance) {
            return reject('Erreur lors de la récupération du domaine de connaissance');
          }

          return resolve(domaine_connaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer tous les domaines de connaissances d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des domaines de connaissances
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          if (!sportif._source.domaines_connaissance) {
            return resolve([]);
          }

          return resolve(sportif._source.domaines_connaissance);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer un domaine de connaissance d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance - Id du domaine de connaissance
   * @returns {Promise} - Erreur ou Id du domaine de connaissance supprimé
   */
  remove(id_sportif, id_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      //On récup le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {

          //On vérifie si on a bien le sportif
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le sportif a le domaine de connaissance
          if (!sportif._source.domaines_connaissance) {
            return reject('Vous n\'avez pas de domaine de connaissance');
          }

          sportif._source.domaines_connaissance = sportif._source.domaines_connaissance.filter((domaine_connaissance) => {
            return domaine_connaissance.id_domaine_connaissance !== id_domaine_connaissance;
          });

          let script = "ctx._source.domaines_connaissance = params.domaines_connaissance; ";
          let params = {
            domaines_connaissance: sportif._source.domaines_connaissance,
          };

          //On regarde si le sportif a des contrats de mission pour entreprise
          if (sportif._source.contrats_mission_entreprise_sportif) {
            //On filtre le tableau des contrats en enlevant le domaine de connaissance que l'on vient de supprimer
            const new_contrats_mission_entreprise = sportif._source.contrats_mission_entreprise_sportif.filter((contrat_mission_entreprise) => {
              return contrat_mission_entreprise.id_domaine_connaissance_sportif !== id_domaine_connaissance;
            });

            //Si on a modifié le tableau (suppression du domaine de connaissance donc longueur du nouveau tableau < ancien tableau)
            if (new_contrats_mission_entreprise.length < sportif._source.contrats_mission_entreprise_sportif.length) {
              //On associe le nouveau tableau au sportif
              sportif._source.contrats_mission_entreprise_sportif = new_contrats_mission_entreprise;
              script += "ctx._source.contrats_mission_entreprise_sportif = params.contrats_mission_entreprise_sportif; ";
              params = {
                ...params,
                contrats_mission_entreprise_sportif: sportif._source.contrats_mission_entreprise_sportif,
              };
            }
          }

          sportifMetier.updateByScript(id_sportif, script, params)
            .then(() => {
              return resolve(id_domaine_connaissance);
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
   * Permet d'ajouter un domaine de connaissance à un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_connaissance - Id du domaine de connaissance
   * @param id_niveau_domaine_connaissance - Id du niveau du domaine de connaissance
   * @returns {Promise}
   */
  add(id_sportif, id_domaine_connaissance, id_niveau_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      //On vérifie les informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_domaine_connaissance) {
        return reject('Erreur lors de la récupération de l\'identifiant du domaine de connaissance');
      }

      if (!id_niveau_domaine_connaissance) {
        return reject('Erreur lors de la récupération de l\'identifiant du niveau du domaine de connaissance');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le sportif ne possède pas déjà le domaine de connaissance
          if (sportif._source.domaines_connaissance && sportif._source.domaines_connaissance.length > 0) {
            const domaine_connaissance_find = sportif._source.domaines_connaissance.find((domaine_connaissance) => {
              return domaine_connaissance.id_domaine_connaissance === id_domaine_connaissance;
            });

            if (domaine_connaissance_find) {
              return reject('Vous avez déjà enregistré ce domaine de connaissance');
            }
          }

          //On récupère le domaine de connaissance
          const domaineConnaissanceMetier = new DomaineConnaissanceMetier(this._bdd);
          domaineConnaissanceMetier.get(id_domaine_connaissance)
            .then((domaine_connaissance) => {

              if (!domaine_connaissance) {
                return reject('Erreur lors de la récupération du domaine de connaissance');
              }

              //On récupère le niveau du domaine de connaissance
              const niveauDomaineConnaissanceMetier = new NiveauDomaineConnaissanceMetier(this._bdd);
              niveauDomaineConnaissanceMetier.get(id_niveau_domaine_connaissance)
                .then((niveau_domaine_connaissance) => {

                  if (!niveau_domaine_connaissance) {
                    return reject('Erreur lors de la récupération du niveau de connaissance');
                  }

                  //On génére le domaine de connaissance que l'on va ajouter
                  const domaine_connaissance_sportif = {
                    id_domaine_connaissance: domaine_connaissance._id,
                    nom_domaine_connaissance: domaine_connaissance._source.nom_domaine_connaissance,
                    id_niveau_domaine_connaissance_competence: niveau_domaine_connaissance._id,
                    nom_niveau_domaine_connaissance_competence: niveau_domaine_connaissance._source.nom_niveau_domaine_connaissance_competence,
                  };

                  if (!sportif._source.domaines_connaissance) {
                    sportif._source.domaines_connaissance = [];
                  }

                  sportif._source.domaines_connaissance.push(domaine_connaissance_sportif);

                  const script = "ctx._source.domaines_connaissance = params.domaines_connaissance";
                  const params = {
                    domaines_connaissance: sportif._source.domaines_connaissance,
                  };


                  sportifMetier.updateByScript(id_sportif, script, params)
                    .then(() => {
                      return resolve(domaine_connaissance_sportif);
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
}

export default DomaineConnaissanceSportifMetier;