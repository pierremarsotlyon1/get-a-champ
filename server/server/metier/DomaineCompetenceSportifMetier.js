/**
 * Created by pierremarsot on 28/01/2017.
 */
import SportifMetier from '../metier/SportifMetier';
import NiveauDomaineConnaissanceMetier from './NiveauDomaineConnaissanceMetier';
import DomaineCompetenceMetier from './DomaineCompetenceMetier';

class DomaineCompetenceSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer un domaine de compétence d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_competence - Id du domaine de compétence
   * @returns {Promise} - Erreur ou document du domaine de compétence lié au sportif
   */
  get(id_sportif, id_domaine_competence) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_domaine_competence) {
        return reject('Erreur lors de la récupération de l\'identifiant du domaine de compétence');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          if (!sportif._source.domaines_competence) {
            return reject('Vous n\'avez pas de domaine de compétence');
          }

          const domaine_competence = sportif._source.domaines_competence.find((domaine_competence) => {
            return domaine_competence.id_domaine_competence === id_domaine_competence;
          });

          if (!domaine_competence) {
            return reject('Erreur lors de la récupération du domaine de compétence');
          }

          return resolve(domaine_competence);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer tous les domaines de compétence d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des domaines de compétence
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

          if (!sportif._source.domaines_competence) {
            return resolve([]);
          }

          return resolve(sportif._source.domaines_competence);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de supprimer un domaine de compétence d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_competence - Id du domaine de compétence
   * @returns {Promise} - Erreur ou Id du domaine de compétence supprimé
   */
  remove(id_sportif, id_domaine_competence) {
    return new Promise((resolve, reject) => {
      //On récup le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {

          //On vérifie si on a bien le sportif
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le sportif a le domaine de compétence
          if (!sportif._source.domaines_competence) {
            return reject('Vous n\'avez pas de domaine de compétence');
          }

          sportif._source.domaines_competence = sportif._source.domaines_competence.filter((domaine_competence) => {
            return domaine_competence.id_domaine_competence !== id_domaine_competence;
          });

          let script = "ctx._source.domaines_competence = params.domaines_competence; ";
          let params = {
            domaines_competence: sportif._source.domaines_competence,
          };

          sportifMetier.updateByScript(id_sportif, script, params)
            .then(() => {
              return resolve(id_domaine_competence);
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
   * Permet d'ajouter un domaine de compétence à un sportif
   * @param id_sportif - Id du sportif
   * @param id_domaine_competence - Id du domaine de compétence
   * @param id_niveau_domaine_connaissance - Id du niveau du domaine de connaissance
   * @returns {Promise}
   */
  add(id_sportif, id_domaine_competence, id_niveau_domaine_connaissance) {
    return new Promise((resolve, reject) => {
      //On vérifie les informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre compte');
      }

      if (!id_domaine_competence) {
        return reject('Erreur lors de la récupération de l\'identifiant du domaine de compétence');
      }

      if (!id_niveau_domaine_connaissance) {
        return reject('Erreur lors de la récupération de l\'identifiant du niveau du domaine de compétence');
      }

      //On regarde si le sportif existe
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le sportif ne possède pas déjà le domaine de compétence
          if (sportif._source.domaines_competence && sportif._source.domaines_competence.length > 0) {
            const domaine_competence_find = sportif._source.domaines_competence.find((domaine_competence) => {
              return domaine_competence.id_domaine_competence === id_domaine_competence;
            });

            if (domaine_competence_find) {
              return reject('Vous avez déjà enregistré ce domaine de compétence');
            }
          }

          //On récupère le domaine de compétence
          const domaineCompetenceMetier = new DomaineCompetenceMetier(this._bdd);
          domaineCompetenceMetier.get(id_domaine_competence)
            .then((domaine_competence) => {

              if (!domaine_competence) {
                return reject('Erreur lors de la récupération du domaine de compétence');
              }

              //On récupère le niveau du domaine de connaissance
              const niveauDomaineConnaissanceMetier = new NiveauDomaineConnaissanceMetier(this._bdd);
              niveauDomaineConnaissanceMetier.get(id_niveau_domaine_connaissance)
                .then((niveau_domaine_competence) => {

                  if (!niveau_domaine_competence) {
                    return reject('Erreur lors de la récupération du niveau de connaissance');
                  }

                  //On génére le domaine de connaissance que l'on va ajouter
                  const domaine_competence_sportif = {
                    id_domaine_competence: domaine_competence._id,
                    nom_domaine_competence: domaine_competence._source.nom_domaine_competence,
                    id_niveau_domaine_connaissance_competence: niveau_domaine_competence._id,
                    nom_niveau_domaine_connaissance_competence: niveau_domaine_competence._source.nom_niveau_domaine_connaissance_competence,
                  };

                  if (!sportif._source.domaines_competence) {
                    sportif._source.domaines_competence = [];
                  }

                  sportif._source.domaines_competence.push(domaine_competence_sportif);

                  const script = "ctx._source.domaines_competence = params.domaines_competence";
                  const params = {
                    domaines_competence: sportif._source.domaines_competence,
                  };


                  sportifMetier.updateByScript(id_sportif, script, params)
                    .then(() => {
                      return resolve(domaine_competence_sportif);
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

export default DomaineCompetenceSportifMetier;