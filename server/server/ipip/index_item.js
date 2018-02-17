/*var node_xj = require("xls-to-json");
 node_xj({
 input: __dirname + '/IPIP-NEO-ItemKey.xls',  // input xls
 output: __dirname + '/IPIP-NEO-ItemKey.json', // output json
 }, function(err, result) {
 if(err) {
 console.error(err);
 } else {
 console.log(result);
 }
 });*/
var asyncMutex = require('async-mutex').Mutex;

const fs = require('fs');
const elasticsearch = require('elasticsearch');
let obj = fs.readFileSync(__dirname + '/IPIP-NEO-ItemKey.json');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  requestTimeout: 990000,
  //log: 'trace'
});

let id_categorie_globle = 1;
let id_sous_categorie_globle = 1;
let id_question_globle = 1;
const mutex = new asyncMutex();

function o(release) {
  setTimeout(() => {
    console.log('timesou');
    release();
  }, 2000);
}

if (obj && obj.length > 0) {
  obj = JSON.parse(obj);
  if (obj) {

    let categories = [
      {
        nom_categorie: 'Neurotisme',
        key_categorie: 'N',
        sous_categories: [],
      },
      {
        nom_categorie: 'Conscience',
        key_categorie: 'C',
        sous_categories: [],
      },
      {
        nom_categorie: 'Franchise',
        key_categorie: 'O',
        sous_categories: [],
      },
      {
        nom_categorie: 'Extraversion',
        key_categorie: 'E',
        sous_categories: [],
      },
      {
        nom_categorie: 'Agréabilité',
        key_categorie: 'A',
        sous_categories: [],
      }
    ];

    for (const item of obj) {
      const ite = item.Item;
      const full = item['Full#'];
      const short = item['Short#'];
      const positif = item.Sign && item.Sign.length > 0 ? item.Sign.includes('+') : false;
      const key = item.Key;
      const facet = item.Facet;

      if (ite && ite.length > 0 && key && key.length === 2 && facet && facet.length > 0) {
        //On récup la key de la catégorie associée
        const key_categorie = key[0];
        if (!key_categorie) {
          continue;
        }

        //On regarde dans quelle catégorie l'item va aller
        let categorie_find;
        for (const categorie of categories) {
          if (categorie.key_categorie !== key_categorie) {
            continue;
          }

          categorie_find = categorie;
          break;
        }

        if (!categorie_find) {
          continue;
        }

        //On regarde si on a la sous_categorie
        let sous_categorie_find;
        for (const sous_categorie of categorie_find.sous_categories) {
          if (sous_categorie.key_sous_categorie !== key) {
            continue;
          }

          sous_categorie_find = sous_categorie;
          break;
        }

        //Si on ne l'a pas, on la crée
        if (!sous_categorie_find) {
          sous_categorie_find = {
            key_sous_categorie: key,
            nom_sous_categorie: facet,
            questions: [],
          };
          categorie_find.sous_categories.push(sous_categorie_find);
        }

        //On regarde si

        //On ajoute l'item dans la sous_categorie
        sous_categorie_find.questions.push({
          text: ite,
          is_positive_question: positif,
          is_short_test: Boolean(short && short.length > 0),
          is_full_test: Boolean(full && full.length > 0),
        });
      }
    }

    for (const cat of categories) {
      if (!cat) {
        continue;
      }

      add_categorie(cat.nom_categorie, cat.key_categorie)
        .then((id_categorie) => {
          if (cat.sous_categories) {
            let promises_sc = [];
            for (const sc of cat.sous_categories) {
              if (!sc) {
                continue;
              }

              promises_sc.push(add_sous_categorie(id_categorie, sc.key_sous_categorie, sc.nom_sous_categorie));
            }

            Promise.all(promises_sc)
              .then((ids) => {
                update_categorie(id_categorie, ids);
                for (let i = 0; i < cat.sous_categories.length; i++) {

                  const id_sous_categorie = ids[i];
                  const sc = cat.sous_categories[i];

                  if (sc.questions) {
                    let promises = [];
                    for (const q of sc.questions) {
                      if (!q) {
                        continue;
                      }

                      promises.push(add_question(id_sous_categorie, q.is_full_test, q.is_positive_question, q.is_short_test, q.text));
                    }

                    Promise.all(promises)
                      .then((ids) => {
                        console.log(ids);

                        update_sous_categorie(id_sous_categorie, ids);
                      });
                  }
                }
              });
          }
        })
        .catch(() => {
          return false;
        });
    }
  }
}

function add_categorie(nom, key) {
  return new Promise((resolve, reject) => {

    if (!nom) {
      return reject();
    }

    mutex
      .acquire()
      .then((release) => {
        client_local.index({
          index: 'ipip',
          type: 'categorie',
          id: id_categorie_globle,
          body: {
            nom_categorie: nom,
            key_categorie: key,
          }
        })
          .then(() => {
            id_categorie_globle = id_categorie_globle + 1;
            release();
            return resolve(id_categorie_globle);
          })
          .catch(() => {
            release();
            return reject();
          });
      });

  });
}

function add_sous_categorie(id_categorie, key_sous_categorie, nom_sous_categorie) {
  return new Promise((resolve, reject) => {
    mutex
      .acquire()
      .then((release) => {
        client_local.index({
          index: 'ipip',
          type: 'sous_categorie',
          id: id_sous_categorie_globle,
          body: {
            id_categorie: id_categorie,
            key_sous_categorie: key_sous_categorie,
            nom_sous_categorie: nom_sous_categorie,
          }
        })
          .then(() => {
            id_sous_categorie_globle = id_sous_categorie_globle + 1;
            release();
            return resolve(id_sous_categorie_globle - 1);
          })
          .catch(() => {
            release();
            return reject();
          });
      });

  });
}

function add_question(id_sous_categorie, is_full_test, is_positive_question, is_short_test, text) {
  return new Promise((resolve, reject) => {
      mutex
        .acquire()
        .then((release) => {
          client_local.index({
            index: 'ipip',
            type: 'question',
            id: id_question_globle,
            body: {
              id_sous_categorie: id_sous_categorie,
              is_full_test: is_full_test,
              is_positive_question: is_positive_question,
              is_short_test: is_short_test,
              text: text,
            }
          })
            .then(() => {
              id_question_globle = id_question_globle + 1;
              release();
              return resolve(id_question_globle - 1);
            })
            .catch(() => {
              release();
              return reject();
            });
        });


    }
  )
    ;
}

function update_sous_categorie(id_sous_categorie, ids_question) {
  return new Promise((resolve, reject) => {
    mutex
      .acquire()
      .then((release) => {
        client_local.update({
          index: 'ipip',
          type: 'sous_categorie',
          id: id_sous_categorie,
          body: {
            doc: {
              ids_question: ids_question,
            }
          }
        })
          .then(() => {
            release();
            return resolve();
          })
          .catch(() => {
            release();
            return reject();
          });
      });
  });
}

function update_categorie(id_categorie, ids_sous_categorie) {
  return new Promise((resolve, reject) => {
    mutex
      .acquire()
      .then((release) => {
        client_local.update({
          index: 'ipip',
          type: 'categorie',
          id: id_categorie,
          body: {
            doc: {
              ids_sous_categorie: ids_sous_categorie,
            }
          }
        })
          .then(() => {
            release();
            return resolve();
          })
          .catch(() => {
            release();
            return reject();
          });
      });

  });
}