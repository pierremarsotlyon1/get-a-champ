/**
 * Created by pierremarsot on 21/02/2017.
 */
import LangueMetier from './LangueMetier';
import NiveauLangueMetier from './NiveauLangueMetier';
import SportifMetier from './SportifMetier';
import LangueSportifDao from '../dao/LangueSportifDao';

class LangueSportifMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les langues du sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des documents des langues du sportif
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      const langueSportifDao = new LangueSportifDao(this._bdd);
      langueSportifDao.find(id_sportif)
        .then((langues_sportif) => {
          return resolve(langues_sportif);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de modifier le tableau des langues du sportif
   * @param id_sportif - Id du sportif
   * @param id_langue - Id de la langue à ajouter
   * @param id_niveau_langue - Id du niveau de la langue
   * @returns {Promise} - Erreur ou boolean du succés de l'ajout
   */
  update(id_sportif, id_langue, id_niveau_langue) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_langue) {
        return reject('Erreur lors de la récupération de l\'identifiant de la langue');
      }

      if (!id_niveau_langue) {
        return reject('Erreur lors de la récupération de l\'identifiant du niveau de la langue');
      }

      //On récup le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On récup le nouveau niveau de langue
          const niveauLangueMetier = new NiveauLangueMetier(this._bdd);
          niveauLangueMetier.get(id_niveau_langue)
            .then((niveau_langue) => {
              if (!niveau_langue) {
                return reject('Erreur lors de la récupération du niveau de langue');
              }

              //On modifie le document sportif
              sportif._source.langues_sportif = sportif._source.langues_sportif.map((langue_sportif) => {
                if (!langue_sportif.langue || langue_sportif.langue._id !== id_langue) {
                  return langue_sportif;
                }

                return {
                  langue: langue_sportif.langue,
                  niveau_langue: {
                    _id: niveau_langue._id,
                    nom_niveau_langue: niveau_langue._source.nom_niveau_langue,
                  },
                };
              });

              //On met à jour le document sportif
              sportifMetier.update_all(id_sportif, sportif._source)
                .then((sportif) => {
                  if (!sportif) {
                    return reject('Erreur lors de la modification de vos informations');
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
   * Permet de supprimer une langue au sportif
   * @param id_sportif - Id du sportif
   * @param id_langue - Id de la langue à supprimer
   * @returns {Promise} - Erreur ou boolean de succés de la suppression
   */
  remove(id_sportif, id_langue) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_langue) {
        return reject('Erreur lors de la récupération de l\'identifiant de la langue');
      }

      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          if (!sportif._source.langues_sportif) {
            return reject('Vous n\'avez aucune langue d\'enregistrée');
          }

          //On supprime la langue
          const oldLength = sportif._source.langues_sportif.length;

          sportif._source.langues_sportif = sportif._source.langues_sportif.filter((langue_sportif) => {
            if (!langue_sportif.langue) {
              return false;
            }

            return langue_sportif.langue._id !== id_langue;
          });

          //On regarde si on a bien supprimé la langue
          if(sportif._source.langues_sportif.length >= oldLength) {
            return reject('Erreur lors de la suppression de la langue');
          }

          //On met à jour le document sportif
          sportifMetier.update_all(id_sportif, sportif._source)
            .then((sportif) => {
              if (!sportif) {
                return reject('Erreur lors de la modification de vos informations');
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
   * Permet d'ajouter une langue à un sportif
   * @param id_sportif - Id du sportif
   * @param id_langue - Id de la langue
   * @param id_niveau_langue - Id du niveau de langue
   * @returns {Promise} - Erreur ou boolean de l'ajout de la langue
   */
  add(id_sportif, id_langue, id_niveau_langue) {
    return new Promise((resolve, reject) => {
      //Vérification des informations
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_langue) {
        return reject('Erreur lors de la récupération de l\'identifiant de la langue');
      }

      if (!id_niveau_langue) {
        return reject('Erreur lors de la récupération de l\'identifiant du niveau de la langue');
      }

      //On récup le sportif
      const sportifMetier = new SportifMetier(this._bdd);
      sportifMetier.getById(id_sportif)
        .then((sportif) => {
          if (!sportif) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //On regarde si le sportif n'a pas déjà la langue
          if (sportif._source.langues_sportif) {
            for (const langue of sportif._source.langues_sportif) {
              if (!langue || !langue.langue) {
                continue;
              }

              if (langue.langue._id === id_langue) {
                return reject('Vous avez déjà cette langue d\'enregistré');
              }
            }
          }

          //On récup la langue
          const langueMetier = new LangueMetier(this._bdd);
          langueMetier.get(id_langue)
            .then((langue) => {

              if (!langue) {
                return reject('Erreur lors de la récupération de la langue');
              }

              //On récup le niveau de la langue
              const niveauLangueMetier = new NiveauLangueMetier(this._bdd);
              niveauLangueMetier.get(id_niveau_langue)
                .then((niveau_langue) => {

                  if (!niveau_langue) {
                    return reject('Erreur lors de la récupération du niveau de la langue');
                  }

                  //Création de l'objet
                  const langue_sportif = {
                    langue: {
                      _id: langue._id,
                      nom_langue: langue._source.nom_langue,
                    },
                    niveau_langue: {
                      _id: niveau_langue._id,
                      nom_niveau_langue: niveau_langue._source.nom_niveau_langue,
                    },
                  };

                  //On ajoute l'objet dans le document sportif
                  if (!sportif._source.langues_sportif) {
                    sportif._source.langues_sportif = [];
                  }

                  sportif._source.langues_sportif.push(langue_sportif);

                  sportifMetier.update_all(id_sportif, sportif._source)
                    .then((sportif) => {
                      if (!sportif) {
                        return reject('Erreur lors de la modification de votre profil');
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
}

export default LangueSportifMetier;