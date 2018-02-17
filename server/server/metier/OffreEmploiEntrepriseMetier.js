/**
 * Created by pierremarsot on 25/03/2017.
 */
import EntrepriseMetier from '../metier/EntrepriseMetier';
import MetierMetier from '../metier/MetierMetier';
import NiveauEtudeMetier from '../metier/NiveauEtudeMetier';
import DimensionSportiveMetier from '../metier/DimensionSportiveMetier';
import SportifMetier from '../metier/SportifMetier';
import SportMetier from '../metier/SportMetier';
import OffreEmploiEntrepriseDao from '../dao/OffreEmploiEntrepriseDao';
import SalaireMetier from './SalaireMetier';
import ManagerInt from '../utils/ManagerInt';
const uuidV1 = require('uuid/v1');

class OffreEmploiEntrepriseMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  searchSportif(id_entreprise, id_offre_emploi) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_offre_emploi) {
        return reject('Erreur lors de la récupération de l\'identifiant de l\'offre d\'emploi');
      }

      const entrepriseMetier = new EntrepriseMetier(this._elasticsearch);
      entrepriseMetier.getById(id_entreprise)
        .then((entreprise) => {
          if (!entreprise || !entreprise._source.offres_emploi) {
            return reject('Erreur lors de la récupération de votre profil');
          }

          //On récup l'offre d'emploi
          let offreEmploi;
          for (const offre of entreprise._source.offres_emploi) {
            if (offre._id === id_offre_emploi) {
              offreEmploi = offre;
              break;
            }
          }

          if (!offreEmploi) {
            return reject('Erreur lors de la récupération de l\'offre d\'emploi');
          }

          //On regarde si on a bien le metier dans l'offre d'emploi
          if (!offreEmploi.metier || !offreEmploi.metier._id || offreEmploi.metier._id.length === 0) {
            return reject('Erreur lors de la récupération du métier de l\'offre d\'emploi');
          }

          const id_metier = offreEmploi.metier._id;
          const idMetierInt = ManagerInt.stringToInt(id_metier);

          //On récupère les sportifs qui peuvent matcher avec le metier de l'offre d'emploi
          const sportifMetier = new SportifMetier(this._elasticsearch);
          sportifMetier.search_by_metier(id_metier)
            .then((sportifs) => {
              if (!sportifs) {
                return reject('Erreur lors de la récupération des sportifs');
              }

              if (sportifs.length === 0) {
                return resolve(sportifs);
              }

              //Pour tous les sportif, on calcul le taux de matching
              for (let sportif of sportifs) {
                //On récup le champ _source
                let {_source} = sportif;
                if (!_source) {
                  continue;
                }

                let affected = false;

                //On regarde si c'est dans les metiers actifs
                if (_source.set_id_emplois_actif_metier) {
                  for (const id_metier_actif of _source.set_id_emplois_actif_metier) {
                    if (id_metier_actif === idMetierInt) {
                      sportif._source.taux_matching_metier = 100;
                      affected = true;
                      break;
                    }
                  }

                  if (affected) {
                    continue;
                  }
                }

                //On regarde si c'est dans les metiers directs
                if (_source.id_emplois_direct_metier) {
                  for (const id_metier_actif of _source.id_emplois_direct_metier) {
                    if (id_metier_actif === idMetierInt) {
                      sportif._source.taux_matching_metier = 80;
                      affected = true;
                      break;
                    }
                  }

                  if (affected) {
                    continue;
                  }
                }

                //On regarde si c'est dans les metiers proches
                if (_source.id_emplois_proche_metier) {
                  for (const id_metier_actif of _source.id_emplois_proche_metier) {
                    if (id_metier_actif === idMetierInt) {
                      sportif._source.taux_matching_metier = 60;
                      affected = true;
                      break;
                    }
                  }
                }
              }

              //On récupère les dimensions sportives de l'offre d'emploi
              let idsDimensionsSportives = [];
              if (offreEmploi.dimensions_sportives_attendues && offreEmploi.dimensions_sportives_attendues.length > 0) {
                idsDimensionsSportives = offreEmploi.dimensions_sportives_attendues.map((d) => {
                  return d._id;
                });
              }

              if (idsDimensionsSportives.length > 0) {
                const sportMetier = new SportMetier(this._elasticsearch);
                sportMetier.searchByDimensionsSportives(idsDimensionsSportives)
                  .then((sports) => {
                    //On génère les poids des dimensions
                    let dimensionsSportivesAvecPoids = [];
                    let pas = 1;

                    if (offreEmploi.dimensions_sportives_attendues.length - 1 !== 0) {
                      pas = 1 / (offreEmploi.dimensions_sportives_attendues.length - 1);
                    }

                    for (let i = 0; i < offreEmploi.dimensions_sportives_attendues.length; i++) {
                      const dimension = offreEmploi.dimensions_sportives_attendues[i];
                      dimensionsSportivesAvecPoids.push({
                        ...dimension,
                        poids: 2 - (i * pas)
                      });
                    }

                    let totalPoids = 0;
                    for (const dimension of dimensionsSportivesAvecPoids) {
                      totalPoids += dimension.poids;
                    }

                    //On parcourt les sportifs
                    for (let sportif of sportifs) {
                      //On initialise le taux de matching des dimensions
                      sportif._source.taux_matching_dimension = 0;

                      //On check si les attributs dans le document sportif sont là
                      if (!sportif._source.current_sport_sportif || !sportif._source.current_sport_sportif._id
                        || sportif._source.current_sport_sportif._id.length === 0) {
                        continue;
                      }

                      //On regarde si le sportif fait un sport qui sont dans les sports acceptablent par les dimensions
                      // de l'offre d'emploi
                      let tauxMatchingDimension = 0;

                      for (const sport of sports) {
                        if (sport._id === sportif._source.current_sport_sportif._id) {
                          //Si on est là, c'est que le sportif fait l'un des sports acceptablent par les dimensions
                          //On calcule donc sont taux de matching

                          //On parcourt les dimensions sportives attendues via l'offre d'emploi
                          for (let i = 0; i < dimensionsSportivesAvecPoids.length; i++) {
                            const dimensionSportivesOffreEmploi = dimensionsSportivesAvecPoids[i];

                            //On regarde si la dimension sportive attendue est dans la liste des dimensions du sport
                            for (const dimensionSportivesSport of sport._source.dimensions_sportives_sport) {
                              if (dimensionSportivesSport._id === dimensionSportivesOffreEmploi._id) {
                                //Ici c'est le cas, donc on augmente le taux de matching en fonction de l'importance
                                // de la dimension sportive attendue
                                tauxMatchingDimension += 100 / totalPoids * dimensionSportivesOffreEmploi.poids;
                              }
                            }
                          }
                        }
                      }

                      sportif._source.taux_matching_dimension = tauxMatchingDimension.toPrecision(tauxMatchingDimension > 10 ? 4 : 3);
                    }
                    return resolve(sportifs);
                  })
                  .catch((error) => {
                    return reject(error);
                  });
              }
              else {
                return resolve(sportifs);
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

  remove(id_entreprise, id_offre_emploi) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_offre_emploi) {
        return reject('Erreur lors de la récupération de l\'identifiant de l\'offre d\'emploi');
      }

      const entrepriseMetier = new EntrepriseMetier(this._elasticsearch);
      entrepriseMetier.getById(id_entreprise)
        .then((entreprise) => {
          if (!entreprise || !entreprise._source.offres_emploi) {
            return reject('Erreur lors de la récupération de votre profil');
          }

          //On supprime l'offre d'emploi
          entreprise._source.offres_emploi = entreprise._source.offres_emploi.filter((offre_emploi) => {
            return offre_emploi._id !== id_offre_emploi;
          });

          //On update en bdd le document de l'entreprise
          const script = 'ctx._source.offres_emploi = params.offres_emploi;';
          entrepriseMetier.update_by_script(
            id_entreprise, {
              offres_emploi: entreprise._source.offres_emploi
            },
            script)
            .then(() => {
              return resolve();
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

  find(id_entreprise) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      const offreEmploiEntrepriseDao = new OffreEmploiEntrepriseDao(this._elasticsearch);
      offreEmploiEntrepriseDao.find(id_entreprise)
        .then((offres_emploi) => {
          return resolve(offres_emploi);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  add(id_entreprise,
      id_poste,
      lieu_poste,
      id_niveau_etude,
      id_salaire,
      description_offre,
      mission,
      prerequis,
      matcher_sportif,
      chasser_tete,
      diffuser,
      ids_dimensions_sportives,
      recherche_confidentielle) {
    return new Promise(async (resolve, reject) => {
      //Vérification des informations
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!id_poste) {
        return reject('Vous devez renseigner un poste');
      }

      if (!lieu_poste) {
        return reject('Vous devez renseigner le lieu du poste');
      }

      //On parse en float la location du poste
      const lat = Number.parseFloat(lieu_poste.location.lat);
      const lon = Number.parseFloat(lieu_poste.location.lon);

      if (!lat || !lon) {
        return reject('Erreur lors de la récupération du lieu du poste');
      }

      if (!description_offre || description_offre.length === 0) {
        return reject('Vous devez renseigner la description du poste');
      }

      if (!mission || mission.length === 0) {
        return reject('Vous devez renseigner la mission du poste');
      }

      if (!prerequis || prerequis.length === 0) {
        return reject('Vous devez renseigner les prérequis du poste');
      }

      if (!matcher_sportif && !chasser_tete && !diffuser) {
        return reject('Vous devez renseigner au moins une action à faire avec votre offre');
      }

      if (!id_salaire) {
        return reject('Vous devez renseigner une tranche de salaire');
      }

      try {
        //On récup le metier
        const metierMetier = new MetierMetier(this._elasticsearch);
        const metier = await metierMetier.get(id_poste);
        if (!metier) {
          return reject('Erreur lors de la récupération du métier');
        }

        const salaireMetier = new SalaireMetier(this._elasticsearch);
        const salaire = await salaireMetier.get(id_salaire);
        if (!salaire) {
          return reject('Erreur lors de la récupération du salaire');
        }

        //Création de l'offre d'emploi
        const uuid = uuidV1();
        const offre_emploi = {
          _id: uuid,
          metier: {
            _id: metier._id,
            libelle_metier: metier._source.libelle_metier,
          },
          salaire: {
            _id: salaire._id,
            tranche_salaire: salaire._source.tranche_salaire
          },
          lieu_poste: {
            _id: lieu_poste._id,
            location: {
              lat: lat,
              lon: lon,
            },
            nom: lieu_poste.label,
          },
          description_offre: description_offre,
          mission: mission,
          prerequis: prerequis,
          matcher_sportif: matcher_sportif,
          chasser_tete: chasser_tete,
          diffuser: diffuser,
          recherche_confidentielle: recherche_confidentielle,
        };

        //On regarde si il faut récupérer le niveau d'étude
        let niveau_etude;
        if (id_niveau_etude) {
          const niveauEtudeMetier = new NiveauEtudeMetier(this._elasticsearch);
          niveau_etude = await niveauEtudeMetier.get(id_niveau_etude);
          if (!niveau_etude) {
            return reject('Erreur lors de la récupération du niveau d\'étude');
          }

          offre_emploi.niveau_etude = {
            _id: niveau_etude._id,
            nom_niveau_formation: niveau_etude._source.nom_niveau_formation,
          };
        }

        //On regarde si il faut récupérer les dimensions sportives
        let dimensions_sportives;
        if (ids_dimensions_sportives && ids_dimensions_sportives.length > 0) {

          const dimensionSportiveMetier = new DimensionSportiveMetier(this._elasticsearch);
          dimensions_sportives = await dimensionSportiveMetier.mget(ids_dimensions_sportives);
          if (!dimensions_sportives) {
            return reject('Erreur lors de la récupération des dimensions sportives');
          }

          offre_emploi.dimensions_sportives_attendues = [];

          for (const dimension_sportive of dimensions_sportives) {
            offre_emploi.dimensions_sportives_attendues.push({
              _id: dimension_sportive._id,
              nom_dimension_sportive: dimension_sportive._source.nom_dimension_sportive
            });
          }
        }

        const script = 'if(ctx._source.offres_emploi == null){ctx._source.offres_emploi = new ArrayList();} ctx._source.offres_emploi.add(params.offre_emploi);';
        const data = {
          offre_emploi: offre_emploi
        };

        const entrepriseMetier = new EntrepriseMetier(this._elasticsearch);
        entrepriseMetier.update_by_script(id_entreprise, data, script)
          .then(() => {
            return resolve(offre_emploi);
          })
          .catch((error) => {
            return reject(error);
          });
      }
      catch (error) {
        if (typeof(error) === 'string') {
          return reject(error);
        }
        return reject('Une erreur inconnue est survenue');
      }
    });
  }
}

export default OffreEmploiEntrepriseMetier;