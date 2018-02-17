import {hashPassword} from '../utils/hash/password';
import ManagerInt from '../utils/ManagerInt';

class SportifDao {
  constructor(elasticsearch) {
    this._index = "sport";
    this._type = "sportif";
    this._bdd = elasticsearch;
  }

  /**
   * Permet de modifier le document d'un sportif via un script
   * @param script - Le script à appliquer
   * @param id_sportif - Id du sportif
   * @param sportif - Les nouvelles données du sportif
   * @returns {Promise} - Erreur ou nouveau document du sportif
   */
  update_by_script(script, id_sportif, sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Vous devez spécifier un identifiant de compte');
      }

      if (!sportif) {
        return reject('Erreur sur l\'objet sportif');
      }

      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_sportif,
        body: {
          script: {
            inline: script,
            lang: 'painless',
            params: sportif,
          },
        }
      }).then((response) => {
        if (!response) {
          return reject('Erreur lors de la mise à jour de votre profil');
        }
        return resolve(response);
      })
        .catch((error) => {
          return reject('Erreur lors de la mise à jour de votre profil');
        });
    });
  }

  /**
   * Permet de modifier un sportif
   * @param id_sportif - Id du sportif
   * @param sportif - Le nouveau document du sportif
   * @returns {Promise} - Erreur ou le nouveau document du sportif
   */
  update(id_sportif, sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Vous devez spécifier un identifiant de compte');
      }

      if (!sportif) {
        return reject('Erreur sur l\'objet sportif');
      }

      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_sportif,
        body: {
          doc: {
            nom_sportif: sportif.nom_sportif,
            prenom_sportif: sportif.prenom_sportif,
            numero_ss_sportif: sportif.numero_ss_sportif,
            date_naissance_sportif: sportif.date_naissance_sportif,
            categorie_sportif: sportif.categorie_sportif,
            situation_sportif: sportif.situation_sportif,
            centres_interets_sportif: sportif.centres_interets_sportif,
            current_sport_sportif: sportif.current_sport_sportif,
          }
        }
      }).then((response) => {
        return resolve(response);
      })
        .catch(() => {
          return reject('Erreur lors de la mise à jour de votre profil');
        });
    });
  }

  /**
   * Permet de récupérer les informations pour la page profil d'un sportif
   * @param id_user - Id du sportif
   * @returns {Promise} - Erreur ou document du sportif
   */
  get_profil(id_user) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_user,
        _source: ["nom_sportif,prenom_sportif,categorie_sportif,centres_interets_sportif,date_naissance_sportif," +
        "lieu_naissance_sportif,numero_ss_sportif,situation_sportif,current_sport_sportif,situation_entreprise_sportif," +
        "recherche_situation_sportif"],
      }).then((profil_sportif) => {
        if (!profil_sportif) {
          return reject('Erreur lors de la récupération de votre profil');
        }

        if (!profil_sportif._source) {
          return reject('Erreur lors de la récupération de votre profil');
        }

        return resolve(profil_sportif._source);
      }).catch(() => {
        return reject('Erreur lors de la récupération de votre profil');
      });
    });
  }

  getResultatsShortTest(id_user) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_user,
        _source: ["resultats_short_test"],
      }).then((profil_sportif) => {
        if (!profil_sportif) {
          return reject('Erreur lors de la récupération de vos résultats');
        }

        if (!profil_sportif._source) {
          return reject('Erreur lors de la récupération de vos résultats');
        }

        return resolve(profil_sportif._source.resultats_short_test);
      }).catch(() => {
        return reject('Erreur lors de la récupération de vos résultats');
      });
    });
  }

  getResultatsFullTest(id_user) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_user,
        _source: ["resultats_full_test"],
      }).then((profil_sportif) => {
        if (!profil_sportif) {
          return reject('Erreur lors de la récupération de vos résultats');
        }

        if (!profil_sportif._source) {
          return reject('Erreur lors de la récupération de vos résultats');
        }

        return resolve(profil_sportif._source.resultats_full_test);
      }).catch(() => {
        return reject('Erreur lors de la récupération de vos résultats');
      });
    });
  }

  /**
   * Permet d'ajouter un sportif
   * @param nom - Nom du sportif
   * @param prenom - Prénom du sportif
   * @param email - Email du sportif
   * @param password - Mot de passe du sportif
   * @returns {Promise} - Erreur ou Id du document du sportif
   */
  add(nom, prenom, email, password) {
    return new Promise((resolve, reject) => {
      hashPassword(password, (error, password) => {
        if (error) {
          return reject(error);
        }

        this.exist(email)
          .then((exists) => {
            if (exists === true) {
              return reject('Un compte avec ces identifiants existe déjà');
            }

            this._bdd.index({
              index: this._index,
              type: this._type,
              body: {
                nom_sportif: nom,
                prenom_sportif: prenom,
                email: email,
                password: password,
                activated: true,
              }
            }).then((response) => {
              if (!response.created) {
                return reject('Erreur lors de la création de votre compte');
              }

              return resolve(response._id);
            }).catch(() => {
              return reject("Erreur lors de l'ajout de votre compte");
            });
          }).catch((error) => {
          return reject(error);
        });
      });
    });
  };

  /**
   * Permet de récupérer un compte sportif
   * @param email - Email du sportif
   * @param password - Mot de passe du sportif
   * @returns {Promise} - Erreur ou document du sportif
   */
  get(email, password) {
    return new Promise((resolve, reject) => {
      if (!email) {
        return reject('Vous devez spécifier un email');
      }

      if (!password) {
        return reject('Vous devez spécifier un mot de passe');
      }

      hashPassword(password, (error, password) => {
        if (error) {
          return reject(error);
        }

        this._bdd.search({
          index: this._index,
          type: this._type,
          body: {
            bool: {
              should: [
                {
                  must: {
                    email: email
                  }
                },
                {
                  must: {
                    password: password
                  }
                }
              ]
            }
          }
        }).then((response) => {
          return resolve(response);
        }).catch(() => {
          return reject('Erreur lors de la récupération de votre compte');
        });
      });
    });
  };

  /**
   * Permet de récupérer un sportif via son id
   * @param id - Id du sportif
   * @returns {Promise} - Erreur ou document du sportif
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject('Erreur lors de la récupération de votre identifiant');
      }

      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id
      })
        .then((response) => {
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de votre compte');
        });
    });
  };

  /**
   * Permet de savoir si un sportif existe avec cet identifiant
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou boolean de l'existance du sportif
   */
  exist_by_id(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_sportif
      })
        .then((exists) => {
          if (!exists) {
            return reject('Le compte sportif n\'existe pas');
          }

          return resolve(true);
        })
        .catch(() => {
          return reject('Le compte sportif n\'existe pas');
        })
    });
  }

  /**
   * Permet de vérifier si un sportif existe déjà avec cet email
   * @param email - Email à verifier
   * @returns {Promise} - Erreur ou boolean de l'existance d'un sportif avec cet email
   */
  exist(email) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    email: email
                  }
                }
              ]
            }
          }
        }
      }).then((response) => {
        if (!response.hits) {
          return reject('Une erreur est survenue');
        }

        return resolve(response.hits.total > 0);
      }).catch(() => {
        return reject('Une erreur est survenue lors de la vérification des comptes');
      });
    });
  };

  /**
   * Permet de mettre à jour le document entier du sportif
   * @param id_sportif - Id du sportif
   * @param new_sportif - Nouveau document
   * @returns {Promise} - Erreur ou nouveau document enregistré
   */
  update_all(id_sportif, new_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_sportif,
        body: {
          doc: new_sportif
        }
      })
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }


  search_by_animation_formation(id_thematique, montant_max) {
    return new Promise((resolve, reject) => {
      let must = [
        {
          match: {
            'animations_formation.id_thematique_animation_formation': id_thematique
          }
        }
      ];

      if(montant_max && montant_max.length > 0){
        montant_max = ManagerInt.stringToInt(montant_max);
        if(ManagerInt.isInt(montant_max)){
          must.push(
            {
              range : {
                'animations_formation.montant_minimum' : {
                  "lte" : montant_max,
                }
              }
            });
        }
      }

      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            nested: {
              path: 'animations_formation',
              query: {
                bool: {
                  must: must
                }
              },
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la recherche des sportifs possédant cette thématique de formation');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la recherche des sportifs possédant cette thématique de formation');
        });
    });
  }

  search_by_animation_incentive(id_thematique, montant_max) {
    return new Promise((resolve, reject) => {
      let must = [
        {
          match: {
            'animations_incentive_evenementiel.id_thematique_animation_incentive_evenementiel': id_thematique
          }
        }
      ];

      if(montant_max && montant_max.length > 0){
        montant_max = ManagerInt.stringToInt(montant_max);
        if(ManagerInt.isInt(montant_max)){
          must.push(
            {
              range : {
                'animations_incentive_evenementiel.montant_minimum' : {
                  "lte" : montant_max,
                }
              }
            });
        }
      }

      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            nested: {
              path: 'animations_incentive_evenementiel',
              query: {
                bool: {
                  must: must
                }
              },
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la recherche des sportifs possédant cette thématique incentive');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la recherche des sportifs possédant cette thématique incentive');
        });
    });
  }

  search_by_animation_conference(id_thematique_animation_conference, montant_max) {
    return new Promise((resolve, reject) => {
      let must = [
        {
          match: {
            'animations_conference.id_thematique_animation_conference': id_thematique_animation_conference
          }
        }
      ];

      if(montant_max && montant_max.length > 0){
        montant_max = ManagerInt.stringToInt(montant_max);
        if(ManagerInt.isInt(montant_max)){
          must.push(
            {
              range : {
                'animations_conference.montant_minimum' : {
                  "lte" : montant_max,
                }
              }
          });
        }
      }

      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            nested: {
              path: 'animations_conference',
              query: {
                bool: {
                  must: must
                }
              },
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la recherche des sportifs possédant cette thématique de conférence');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la recherche des sportifs possédant cette thématique de conférence');
        });
    });
  }

  search_by_sponsoring(id_type_sponsoring,
                       montant_recherche,
                       date_depart,
                       date_fin) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            has_child: {
              type: 'sponsoring_sportif',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'type_sponsoring_sportif._id': id_type_sponsoring
                      }
                    },
                    {
                      range: {
                        montant_recherche: {
                          lte: montant_recherche
                        }
                      }
                    },
                    {
                      range: {
                        date_depart_sponsoring_sportif: {
                          lte: date_depart
                        }
                      }
                    },
                    {
                      range: {
                        date_fin_sponsoring_sportif: {
                          gte: date_fin
                        }
                      }
                    }
                  ]
                }
              },
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la recherche des sportifs possédant ces sponsorings');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la recherche des sportifs possédant ces sponsorings');
        });
    });
  }

  search_by_metier(id_metier) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            bool: {
              minimum_should_match: 1,
              should: [
                {
                  match: {
                    "set_id_emplois_actif_metier": {
                      query: id_metier,
                      boost: 10
                    }
                  }
                },
                {
                  match: {
                    "id_emplois_direct_metier": {
                      query: id_metier,
                      boost: 5
                    }
                  }
                },
                {
                  match: {
                    "id_emplois_proche_metier": {
                      query: id_metier,
                      boost: 2
                    }
                  }
                }
              ],
              must: [
                {
                  nested: {
                    path: "recherche_situation_sportif",
                    query: {
                      bool : {
                        must : [
                          {
                            match: {
                              "recherche_situation_sportif._id": '1'
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des sportifs');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch((error) => {
          return reject('Erreur lors de la récupération des sportifs');
        });
    })
  }
}

export default SportifDao;