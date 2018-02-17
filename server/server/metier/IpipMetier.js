/**
 * Created by pierremarsot on 29/03/2017.
 */
import QuestionIpipDao from '../dao/QuestionIpipDao';
import ReponseIpipDao from '../dao/ReponseIpipDao';
import SousCategorieIpipMetier from '../metier/SousCategorieIpipMetier';
import SportifMetier from '../metier/SportifMetier';

class IpipMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  saveAnswerShortTest(idSportif, reponses) {
    return new Promise((resolve, reject) => {
      if (!idSportif || idSportif.length === 0) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!reponses || reponses.length === 0) {
        return reject('Vous devez répondre aux questions');
      }

      //On récupère les questions au short test
      this.findShortQuestion()
        .then((questions) => {
          if (!questions || questions.length === 0) {
            return reject('Erreur lors de la récupération des questions');
          }

          //On récupère les sous catégories pour pouvoir calculer le score pour chacune d'elles
          const sousCategorieIpipMetier = new SousCategorieIpipMetier(this._elasticsearch);
          sousCategorieIpipMetier.find()
            .then((sousCategories) => {
              if (!sousCategories || sousCategories.length === 0) {
                return reject('Erreur lors de la récupération des sous catégories');
              }

              //on récupère les réponses
              this.findReponses()
                .then((reponsesBdd) => {
                  if (!reponsesBdd || reponsesBdd.length === 0) {
                    return reject('Erreur lors de la récupération des réponses');
                  }

                  //On parcourt toutes les sous catégories
                  let resultatsShortTest = [];

                  for (const sousCategorie of sousCategories) {
                    if (!sousCategorie || !sousCategorie._source || !sousCategorie._id) {
                      continue;
                    }

                    let scoreSousCategorie = 0;

                    //On parcourt toutes les questions qui sont dans la sous catégories pour calculer le score
                    for (const idQuestion of sousCategorie._source.ids_question) {

                      if (!idQuestion) {
                        continue;
                      }

                      //On cherche dans les réponses de l'utilisateur la question courante
                      const reponseUtilisateur = reponses.find((r) => {
                        return Number.parseInt(r.id_question) === idQuestion;
                      });

                      if (!reponseUtilisateur) {
                        continue;
                      }

                      //On cherche la réponse de la bdd qui correspond à la réponse de l'utilisateur
                      const reponseBdd = reponsesBdd.find((r) => {
                        return r._id === reponseUtilisateur.id_reponse;
                      });

                      if (!reponseBdd) {
                        continue;
                      }

                      //On cherche la question de la bdd qui correspond à la question de l'utilisateur
                      const questionBdd = questions.find((q) => {
                        return q._id === reponseUtilisateur.id_question;
                      });

                      if (!questionBdd) {
                        continue;
                      }

                      if (questionBdd._source.is_positive_question) {
                        scoreSousCategorie += reponseBdd._source.value_postive_question;
                      }
                      else {
                        scoreSousCategorie += reponseBdd._source.value_negative_question;
                      }
                    }

                    //On ajoute dans le tableau des résultats le résultat pour la sous catégorie
                    resultatsShortTest.push({
                      id_sous_categorie: sousCategorie._id,
                      nom_sous_categorie: sousCategorie._source.nom_sous_categorie,
                      score: scoreSousCategorie,
                      commentaire: '',
                      max_score: 5 * sousCategorie._source.ids_question.length,
                    });
                  }

                  //Création du script
                  const script = "ctx._source.resultats_short_test = params.resultats_short_test;";

                  //On sauvegarde le resultat dans le document du sportif
                  const sportifMetier = new SportifMetier(this._elasticsearch);
                  sportifMetier.updateByScript(idSportif, script, {
                    resultats_short_test: resultatsShortTest,
                  })
                    .then(() => {
                      return resolve(resultatsShortTest);
                    })
                    .catch((error) => {
                    console.log(error);
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

  saveAnswerFullTest(idSportif, reponses) {
    return new Promise((resolve, reject) => {
      if (!idSportif || idSportif.length === 0) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      if (!reponses || reponses.length === 0) {
        return reject('Vous devez répondre aux questions');
      }

      //On récupère les questions au short test
      this.findFullQuestion()
        .then((questions) => {
          if (!questions || questions.length === 0) {
            return reject('Erreur lors de la récupération des questions');
          }

          //On récupère les sous catégories pour pouvoir calculer le score pour chacune d'elles
          const sousCategorieIpipMetier = new SousCategorieIpipMetier(this._elasticsearch);
          sousCategorieIpipMetier.find()
            .then((sousCategories) => {
              if (!sousCategories || sousCategories.length === 0) {
                return reject('Erreur lors de la récupération des sous catégories');
              }

              //on récupère les réponses
              this.findReponses()
                .then((reponsesBdd) => {
                  if (!reponsesBdd || reponsesBdd.length === 0) {
                    return reject('Erreur lors de la récupération des réponses');
                  }

                  //On parcourt toutes les sous catégories
                  let resultatsFullTest = [];

                  for (const sousCategorie of sousCategories) {
                    if (!sousCategorie || !sousCategorie._source || !sousCategorie._id) {
                      continue;
                    }

                    let scoreSousCategorie = 0;

                    //On parcourt toutes les questions qui sont dans la sous catégories pour calculer le score
                    for (const idQuestion of sousCategorie._source.ids_question) {

                      if (!idQuestion) {
                        continue;
                      }

                      //On cherche dans les réponses de l'utilisateur la question courante
                      const reponseUtilisateur = reponses.find((r) => {
                        return Number.parseInt(r.id_question) === idQuestion;
                      });

                      if (!reponseUtilisateur) {
                        continue;
                      }

                      //On cherche la réponse de la bdd qui correspond à la réponse de l'utilisateur
                      const reponseBdd = reponsesBdd.find((r) => {
                        return r._id === reponseUtilisateur.id_reponse;
                      });

                      if (!reponseBdd) {
                        continue;
                      }

                      //On cherche la question de la bdd qui correspond à la question de l'utilisateur
                      const questionBdd = questions.find((q) => {
                        return q._id === reponseUtilisateur.id_question;
                      });

                      if (!questionBdd) {
                        continue;
                      }

                      //On calcul le score du sportif
                      if (questionBdd._source.is_positive_question) {
                        scoreSousCategorie += reponseBdd._source.value_postive_question;
                      }
                      else {
                        scoreSousCategorie += reponseBdd._source.value_negative_question;
                      }
                    }

                    //On ajoute dans le tableau des résultats le résultat pour la sous catégorie
                    resultatsFullTest.push({
                      id_sous_categorie: sousCategorie._id,
                      nom_sous_categorie: sousCategorie._source.nom_sous_categorie,
                      score: scoreSousCategorie,
                      commentaire: '',
                      max_score: 5 * sousCategorie._source.ids_question.length,
                    });
                  }

                  //Création du script
                  const script = "ctx._source.resultats_full_test = params.resultats_full_test;";

                  //On sauvegarde le resultat dans le document du sportif
                  const sportifMetier = new SportifMetier(this._elasticsearch);
                  sportifMetier.updateByScript(idSportif, script, {
                    resultats_full_test: resultatsFullTest,
                  })
                    .then(() => {
                      return resolve(resultatsFullTest);
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

  findReponses() {
    return new Promise((resolve, reject) => {
      const reponseIpipDao = new ReponseIpipDao(this._elasticsearch);
      reponseIpipDao.find()
        .then((reponses) => {
          return resolve(reponses);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  findFullQuestion() {
    return new Promise((resolve, reject) => {
      const questionIpipDao = new QuestionIpipDao(this._elasticsearch);
      questionIpipDao.findFullQuestion()
        .then((questions) => {
          return resolve(questions);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  findShortQuestion() {
    return new Promise((resolve, reject) => {
      const questionIpipDao = new QuestionIpipDao(this._elasticsearch);
      questionIpipDao.findShortQuestion()
        .then((questions) => {
          return resolve(questions);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default IpipMetier;