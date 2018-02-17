/**
 * Created by pierremarsot on 28/06/2017.
 */
import {hashPassword} from '../utils/hash/password';
import CategorieAnimationConferenceMetier from '../metier/CategorieAnimationConferenceMetier';
import CategorieAnimationFormationMetier from '../metier/CategorieAnimationFormationMetier';
import CategorieAnimationIncentiveMetier from '../metier/CategorieAnimationIncentiveMetier';
import CategorieSportifMetier from '../metier/CategorieSportifMetier';
import CentreInteretMetier from '../metier/CentreInteretMetier';
import SportMetier from '../metier/SportMetier';
import RechercheSituationSportifMetier from '../metier/RechercheSituationSportifMetier';
import DomaineCompetenceMetier from '../metier/DomaineCompetenceMetier';
import DomaineConnaissanceMetier from '../metier/DomaineConnaissanceMetier';
import LangueMetier from '../metier/LangueMetier';
import NiveauLangueMetier from '../metier/NiveauLangueMetier';
import ExperienceProfessionnelleSportifMetier from '../metier/ExperienceProfessionnelleSportifMetier';
import MetierMetier from '../metier/MetierMetier';
import TypeSponsoringMetier from '../metier/TypeSponsoringMetier';
import SponsoringSportifMetier from '../metier/SponsoringSportifMetier';
import DimensionSportiveMetier from '../metier/DimensionSportiveMetier';


const fs = require('fs');
const config = require('../../config_app');
const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://localhost:9200',
  requestTimeout: 990000,
  //log: 'trace'
});

//thematique_animation_incentive_evenementiel

const client_server = new elasticsearch.Client({
  //host: 'http://somar:logitech03@localhost:9200',
  host: 'http://37.187.23.89:9200',
  requestTimeout: 990000,
  //log: 'trace'
});

const client = client_server;

const categorieAnimationConferenceMetier = new CategorieAnimationConferenceMetier(client);
const categorieAnimationFormationMetier = new CategorieAnimationFormationMetier(client);
const categorieAnimationIncentiveMetier = new CategorieAnimationIncentiveMetier(client);
const categorieSportifMetier = new CategorieSportifMetier(client);
const centreInteretMetier = new CentreInteretMetier(client);
const sportMetier = new SportMetier(client);
const rechercheSituationSportifMetier = new RechercheSituationSportifMetier(client);
const domaineCompetenceMetier = new DomaineCompetenceMetier(client);
const domaineConnaissanceMetier = new DomaineConnaissanceMetier(client);
const langueMetier = new LangueMetier(client);
const niveauLangueMetier = new NiveauLangueMetier(client);
const sponsoringSportifMetier = new SponsoringSportifMetier(client);
const metierMetier = new MetierMetier(client);
const typeSponsoringMetier = new TypeSponsoringMetier(client);
const experienceProfessionnelleSportifMetier = new ExperienceProfessionnelleSportifMetier(client);
const dimensionSportiveMetier = new DimensionSportiveMetier(client);

let nbAdded = 0;
const nbToAdd = 400;

function copyData(){
  let bulk = [];

  dimensionSportiveMetier.find()
    .then((dimensions) => {
      for(const d of dimensions){
        bulk.push({index: {_index: d._index, _type: d._type, _id: d._id}});
        bulk.push(d._source);
      }

      sportMetier.findAll()
        .then((sports) => {
          for(const s of sports){
            bulk.push({index: {_index: s._index, _type: s._type, _id: s._id}});
            bulk.push(s._source);
          }

          client_server.bulk({
            body: bulk
          });
        });
    });
}

function generateSportif() {
  const prenoms = ["Lucas", "Louis", "Gabriel", "Jules", "Thiméo", "Hugo", "Arthur",
    "Ethan", "Raphael", "Mael", "Tom", "Noah", "Mathis", "Théo", "Pierre", "Adan", "Clément", "Julian", "Chloé", "Léa",
    "Jade", "Manon", "Louise", "Zoé", "Lilou", "Léna", "Sarah", "Camille", "Lina", "Eva", "Louna", "Clara", "Aline", "Anais"];

  const noms = ["Martin", "Bernard", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon",
    "Michel", "Leroy", "Roux", "David", "Morel", "Fournier", "Girard", "Bonnet", "Dupont", "Lambert", "Faure", "Mercier",
    "Garnier", "Chevalier", "Roussel", "Gautier", "Marchand", "Duval", "Denis", "Brun", "Blanchard", "Guiraud"];

  //Mélange noms + prénoms
  prenoms.sort(() => Math.random() * 2 - 1);
  noms.sort(() => Math.random() * 2 - 1);

  //On hash le mot de passe
  hashPassword('s', (error, hash) => {
    if (error) {
      return;
    }

    let sportif = {
      nom_sportif: noms[Math.floor(Math.random() * noms.length)],
      prenom_sportif: prenoms[Math.floor(Math.random() * prenoms.length)],
      password: hash,
      activated: true,
      animations_conference: [],
      animations_formation: [],
      animations_incentive_evenementiel: [],
      domaines_competence: [],
      recherche_situation_sportif: [],
    };

    //On récup les animations de conférence
    categorieAnimationConferenceMetier.find()
      .then((animationsConference) => {
        const animationConference1 = animationsConference[Math.floor(Math.random() * animationsConference.length)];

        for (const a of animationConference1._source.thematique_animation_conference) {
          sportif.animations_conference.push(
            {
              id_thematique_animation_conference: a.id,
              montant_minimum: 999,
              nom_thematique_animation_conference: a.nom_thematique_animation_conference,
            }
          );
        }

        categorieAnimationFormationMetier.find()
          .then((animationsFormation) => {
            const animationFormation1 = animationsFormation[Math.floor(Math.random() * animationsFormation.length)];

            for (const a of animationFormation1._source.thematique_animation_formation) {
              sportif.animations_formation.push(
                {
                  id_thematique_animation_formation: a.id,
                  animer_seul: true,
                  nom_thematique_animation_formation: a.nom_thematique_animation_formation,
                }
              );
            }

            categorieAnimationIncentiveMetier.find()
              .then((animationsIncentiveEvenementielMetier) => {
                const animationIncentiveEvenementielMetier1 = animationsIncentiveEvenementielMetier[Math.floor(Math.random() * animationsIncentiveEvenementielMetier.length)];

                for (const a of animationIncentiveEvenementielMetier1._source.thematique_animation_incentive) {
                  sportif.animations_incentive_evenementiel.push(
                    {
                      id_thematique_animation_incentive_evenementiel: a.id,
                      animer_seul: true,
                      nom_thematique_animation_incentive_evenementiel: a.nom_thematique_animation_incentive,
                    }
                  );
                }

                sportMetier.findAll()
                  .then((sports) => {
                    const sport = sports[Math.floor(Math.random() * sports.length)];
                    sportif.current_sport_sportif = {
                      _id: sport._id,
                      nom_sport: sport._source.nom_sport,
                    };

                    rechercheSituationSportifMetier.find()
                      .then((recherchesSituation) => {
                        for (const r of recherchesSituation) {
                          sportif.recherche_situation_sportif.push({
                            _id: r._id,
                            nom_recherche_situation_sportif: r._source.nom_recherche_situation_sportif,
                          });
                        }

                        //On ajoute le sportif
                        client.index({
                          index: "sport",
                          type: "sportif",
                          refresh: true,
                          body: sportif
                        })
                          .then((response) => {
                            if (!response._id) {
                              return;
                            }

                            sportif._id = response._id;

                            console.log(sportif._id);

                            //On ajoute 4 metiers
                            metierMetier.findRandom(30)
                              .then((metiers) => {
                                const metier = metiers[Math.floor(Math.random() * metiers.length)];

                                if (!metier) {
                                  return;
                                }

                                experienceProfessionnelleSportifMetier.add(
                                  sportif._id,
                                  "2017-05-29",
                                  "2017-06-28",
                                  {
                                    nom: 'Montélimar, France',
                                    _id: 'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                    location: {lat: 44.556944, lon: 4.749496000000022}
                                  },
                                  "Google",
                                  {
                                    libelle_metier: metier._source.libelle_metier,
                                    _id: metier._id,
                                  },
                                  undefined,
                                  undefined,
                                  undefined,
                                  false,
                                )
                                  .then(() => {

                                    const metier = metiers[Math.floor(Math.random() * metiers.length)];

                                    experienceProfessionnelleSportifMetier.add(
                                      sportif._id,
                                      "2017-05-29",
                                      "2017-06-28",
                                      {
                                        nom: 'Montélimar, France',
                                        _id: 'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                        location: {lat: 44.556944, lon: 4.749496000000022}
                                      },
                                      "Google",
                                      {
                                        libelle_metier: metier._source.libelle_metier,
                                        _id: metier._id,
                                      },
                                      undefined,
                                      undefined,
                                      undefined,
                                      false,
                                    )
                                      .then(() => {
                                        const metier = metiers[Math.floor(Math.random() * metiers.length)];

                                        experienceProfessionnelleSportifMetier.add(
                                          sportif._id,
                                          "2017-05-29",
                                          "2017-06-28",
                                          {
                                            nom: 'Montélimar, France',
                                            _id: 'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                            location: {lat: 44.556944, lon: 4.749496000000022}
                                          },
                                          "Google",
                                          {
                                            libelle_metier: metier._source.libelle_metier,
                                            _id: metier._id,
                                          },
                                          undefined,
                                          undefined,
                                          undefined,
                                          false,
                                        )
                                          .then(() => {
                                            const metier = metiers[Math.floor(Math.random() * metiers.length)];

                                            experienceProfessionnelleSportifMetier.add(
                                              sportif._id,
                                              "2017-05-29",
                                              "2017-06-28",
                                              {
                                                nom: 'Montélimar, France',
                                                _id: 'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                                location: {lat: 44.556944, lon: 4.749496000000022}
                                              },
                                              "Google",
                                              {
                                                libelle_metier: metier._source.libelle_metier,
                                                _id: metier._id,
                                              },
                                              undefined,
                                              undefined,
                                              undefined,
                                              false,
                                            )
                                              .then(() => {

                                                typeSponsoringMetier.find()
                                                  .then((typesSponsoringMetier) => {
                                                    if (!typesSponsoringMetier) {
                                                      return;
                                                    }

                                                    const typeSponso = typesSponsoringMetier[Math.floor(Math.random() * typesSponsoringMetier.length)];

                                                    //On ajoute le sponsoring
                                                    sponsoringSportifMetier.add(
                                                      sportif._id,
                                                      typeSponso,
                                                      '2017-01-01',
                                                      '2019-12-12',
                                                      'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                                      44.556944,
                                                      4.749496000000022,
                                                      'Montélimar, France',
                                                      'Une description',
                                                      getRandomArbitrary(0, 12000)
                                                    )
                                                      .then(() => {
                                                        const typeSponso = typesSponsoringMetier[Math.floor(Math.random() * typesSponsoringMetier.length)];

                                                        //On ajoute le sponsoring
                                                        sponsoringSportifMetier.add(
                                                          sportif._id,
                                                          typeSponso,
                                                          '2017-01-01',
                                                          '2019-12-12',
                                                          'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                                          44.556944,
                                                          4.749496000000022,
                                                          'Montélimar, France',
                                                          'Une description',
                                                          getRandomArbitrary(0, 12000)
                                                        )
                                                          .then(() => {
                                                            const typeSponso = typesSponsoringMetier[Math.floor(Math.random() * typesSponsoringMetier.length)];

                                                            //On ajoute le sponsoring
                                                            sponsoringSportifMetier.add(
                                                              sportif._id,
                                                              typeSponso,
                                                              '2017-01-01',
                                                              '2019-12-12',
                                                              'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                                              44.556944,
                                                              4.749496000000022,
                                                              'Montélimar, France',
                                                              'Une description',
                                                              getRandomArbitrary(0, 12000)
                                                            )
                                                              .then(() => {
                                                                const typeSponso = typesSponsoringMetier[Math.floor(Math.random() * typesSponsoringMetier.length)];

                                                                //On ajoute le sponsoring
                                                                sponsoringSportifMetier.add(
                                                                  sportif._id,
                                                                  typeSponso,
                                                                  '2017-01-01',
                                                                  '2019-12-12',
                                                                  'ChIJVTp9SCBrtRIRwFXy-n6yXTg',
                                                                  44.556944,
                                                                  4.749496000000022,
                                                                  'Montélimar, France',
                                                                  'Une description',
                                                                  getRandomArbitrary(0, 12000)
                                                                )
                                                                  .then(() => {
                                                                    nbAdded++;

                                                                    console.log(nbAdded);

                                                                    if (nbAdded < nbToAdd) {
                                                                      generateSportif();
                                                                    }
                                                                  });
                                                              });
                                                          });
                                                      });
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

generateSportif();
//copyData();

