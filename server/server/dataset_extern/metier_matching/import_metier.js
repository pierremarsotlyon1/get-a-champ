/**
 * Created by pierremarsot on 28/02/2017.
 */
const fs = require('fs');
const parser = require('xml2json');
const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  //log: 'trace'
});
const entities = require('entities');

const tampon_insert_metier = 5000;
const index_elasticsearch = 'sport';

let categories_metier = new Map();
let metiers = new Map();
let competences = new Map();
let connaissances = new Map();

//On lit le dossier où il y a toutes les fiches metiers
const folderResources = './resources/';

function metierHaveEmploiProche(metier, code_ogr_metier_cible) {
  if (!metier || !metier.emplois_proche_metier) {
    return true;
  }

  for (const emploi_proche of metier.emplois_proche_metier) {
    if (emploi_proche.code_ogr === code_ogr_metier_cible) {
      return true;
    }
  }

  return false;
}

function getConnaissances(code_ogr) {
  if (!code_ogr) {
    return null;
  }

  code_ogr = Number.parseInt(code_ogr);
  if (!code_ogr) {
    return null;
  }

  return connaissances.get(code_ogr);
}

function nullOrEmpty(data) {
  if (!data) {
    return true;
  }

  return data.length === 0;
}

function nullOrEmptyArray(array) {
  if (!array || array.length === 0) {
    return true;
  }

  for (const a of array) {
    if (nullOrEmpty(a)) {
      return true;
    }
  }

  return false;
}

function haveCategorieMetier(code_rome) {
  if (!categories_metier) {
    return true;
  }

  if (categories_metier.length === 0) {
    return false;
  }

  code_rome = Number.parseInt(code_rome);
  if (!code_rome) {
    return false;
  }

  return categories_metier.has(code_rome);
}

function getMetier(code_ogr) {
  if (!metiers) {
    return null;
  }

  code_ogr = Number.parseInt(code_ogr);
  if (!code_ogr) {
    return null;
  }

  return metiers.get(code_ogr);
}

function getCategorieMetier(code_rome) {
  //code_rome = Number.parseInt(code_rome);
  if (!code_rome) {
    return null;
  }

  return categories_metier.get(code_rome);
}

function getCompetence(code_ogr) {
  code_ogr = Number.parseInt(code_ogr);
  if (!code_ogr) {
    return null;
  }

  return competences.get(code_ogr);
}

function decodeUtf8(str) {
  try {
    const str_decode = entities.decode(str);
    if (!str_decode) {
      return str;
    }

    return str_decode;
  }
  catch (e) {
    console.log(e);
    return str;
  }
}

fs.readdir(folderResources, (err, files) => {
  if (files && files.length > 0) {
    for (const file of files) {
      if (!file || file.length === 0) {
        continue;
      }

      //On récup le xml
      let xml = fs.readFileSync(__dirname + '/resources/' + file);
      if (!xml || xml.length === 0) {
        continue;
      }

      //On convertit le xml en json (string)
      let json = parser.toJson(xml);
      if (!json || json.length === 0) {
        continue;
      }

      //On convertit le string json en object
      json = JSON.parse(json);
      if (!json || json.length === 0) {
        continue;
      }

      //On récup la fiche de l'emploi
      const {fiche_emploi_metier} = json;
      if (!fiche_emploi_metier) {
        continue;
      }

      //On récup le bloc du code rome de la catégorie de la fiche métier
      const {bloc_code_rome} = fiche_emploi_metier;
      if (!bloc_code_rome) {
        continue;
      }

      //On récup les données de la catégorie métier et on regarde si on a les données
      let {code_rome, intitule, code_ogr} = bloc_code_rome;
      if (nullOrEmptyArray([code_rome, intitule, code_ogr])) {
        console.log('empty array');
        continue;
      }

      //On regarde si on a déjà la catégorie métier, sinon on l'ajoute
      if (!haveCategorieMetier(code_rome)) {
        code_ogr = Number.parseInt(code_ogr);
        if (!code_ogr) {
          continue;
        }

        categories_metier.set(code_rome, {
          intitule_categorie_metier: decodeUtf8(intitule),
          code_ogr_categorie_metier: code_ogr,
          metiers_lies: [],
        });
      }

      //On récup les metiers
      const {bloc_appellation} = fiche_emploi_metier;
      if (!bloc_appellation || bloc_appellation.length === 0) {
        continue;
      }

      let {item_app, nbItemAppellation} = bloc_appellation;
      let metier_temp = [];
      let competence_temp = [];
      let connaissance_temp = [];

      //On itère sur les metiers
      nbItemAppellation = Number.parseInt(nbItemAppellation);

      if (nbItemAppellation === 1) {
        extractMetier(item_app, metier_temp, code_rome);
      }
      else if (nbItemAppellation > 1) {
        for (const item of item_app) {
          extractMetier(item, metier_temp, code_rome);
        }
      }
      else {
        continue;
      }

      //On associe les métiers de la catégorie aux autres métiers de la même catégorie
      for (const m of metier_temp) {
        let metier = getMetier(m.code_ogr);
        for (const m2 of metier_temp) {
          if (m2 === m) {
            continue;
          }

          const num = Number.parseInt(m2.code_ogr);
          if (!num) {
            continue;
          }

          metier.emplois_direct_metier.push({
            code_ogr: num,
            libelle: m2.libelle,
          });
          metier.id_emplois_direct_metier.push(num);
        }
      }

      //On lie les métier temp à la catégorie
      let categorie_metier = getCategorieMetier(code_rome);
      if (categorie_metier) {
        categorie_metier.metiers_lies = metier_temp;
      }

      const {definition} = fiche_emploi_metier;
      if (!nullOrEmpty(definition)) {
        let categorie_metier = getCategorieMetier(code_rome);
        if (categorie_metier) {
          categorie_metier.definition_categorie_metier = decodeUtf8(definition);
          categories_metier.set(code_rome, categorie_metier);
        }
      }

      const {acces_emploi_metier} = fiche_emploi_metier;
      if (!nullOrEmpty(acces_emploi_metier)) {
        let categorie_metier = getCategorieMetier(code_rome);
        if (categorie_metier) {
          categorie_metier.acces_emploi_categorie_metier = decodeUtf8(acces_emploi_metier);
          categories_metier.set(code_rome, categorie_metier);
        }
      }

      const {condition_exercice_activite} = fiche_emploi_metier;
      if (!nullOrEmpty(condition_exercice_activite)) {
        let categorie_metier = getCategorieMetier(code_rome);
        if (categorie_metier) {
          categorie_metier.condition_exercice_activite_categorie_metier = decodeUtf8(condition_exercice_activite);
          categories_metier.set(code_rome, categorie_metier);
        }
      }

      //On récup le bloc des compétences / connaissances de base
      const {bloc_activites_de_base} = fiche_emploi_metier;
      if (bloc_activites_de_base && bloc_activites_de_base.activites_de_base) {
        //On récup les compétences de base
        const {activites_de_base} = bloc_activites_de_base;
        if (activites_de_base && activites_de_base.item_ab) {
          //On regarde si on a qu'un objet ou un tableau
          const nbActiviteAb = Number.parseInt(activites_de_base.nbItemActivite_AB);

          if (nbActiviteAb === 1) {
            //On parse les infos
            extractComptence(activites_de_base.item_ab, metier_temp, code_rome, competence_temp);
          }
          else if (nbActiviteAb > 1) {
            //On récup le tableau des compétences
            const {item_ab} = activites_de_base;

            //On itère sur les compétences
            for (const item of item_ab) {
              extractComptence(item, metier_temp, code_rome, competence_temp);
            }
          }

          //On affecte les compétences aux métiers courant
          for (const competence of competence_temp) {
            for (const m of metier_temp) {
              //On récup le metier dans notre base de métier global
              let metier = getMetier(m.code_ogr);
              if (!metier || !metier.competences_metier) {
                continue;
              }

              //On regarde si le métier a déjà la compétence
              let find = false;
              for (const c of metier.competences_metier) {
                if (!c.code_ogr) {
                  continue;
                }

                if (c.code_ogr === competence.code_ogr) {
                  find = true;
                  break;
                }
              }

              if (find) {
                continue;
              }

              //Si le métier n'a pas déjà la compétence, on l'ajoute
              metier.competences_metier.push({
                code_ogr: competence.code_ogr,
                libelle: decodeUtf8(competence.libelle),
              });
            }
          }
        }

        //On récup les connaissances
        const {savoir_theorique_et_proceduraux} = bloc_activites_de_base;
        if (savoir_theorique_et_proceduraux && savoir_theorique_et_proceduraux.nbItemSTP_AB) {
          let {nbItemSTP_AB} = savoir_theorique_et_proceduraux;
          nbItemSTP_AB = Number.parseInt(nbItemSTP_AB);

          if (nbItemSTP_AB === 1) {
            const {item_ab_stp} = savoir_theorique_et_proceduraux;
            if (item_ab_stp) {
              extractConnaissance(item_ab_stp, metier_temp, code_rome, connaissance_temp);
            }
          }
          else if (nbItemSTP_AB > 1) {
            const {item_ab_stp} = savoir_theorique_et_proceduraux;
            if (item_ab_stp) {
              for (const item of item_ab_stp) {
                extractConnaissance(item, metier_temp, code_rome, connaissance_temp);
              }
            }
          }

          //On affecte les connaissances aux métiers courant
          for (const connaissance of connaissance_temp) {
            for (const m of metier_temp) {
              //On récup le metier dans notre base de métier global
              let metier = getMetier(m.code_ogr);
              if (!metier || !metier.connaissances_metier) {
                continue;
              }

              //On regarde si le métier a déjà la connaissance
              let find = false;
              for (const c of metier.connaissances_metier) {
                if (!c.code_ogr) {
                  continue;
                }

                if (c.code_ogr === connaissance.code_ogr) {
                  find = true;
                  break;
                }
              }

              if (find) {
                continue;
              }

              //Si le métier n'a pas déjà la compétence, on l'ajoute
              metier.connaissances_metier.push({
                code_ogr: connaissance.code_ogr,
                libelle: decodeUtf8(connaissance.libelle),
              });
            }
          }
        }
      }

      /*for(const [key, m] of metiers)
       {
       console.log(m);
       }

       for(const [key, m] of competences)
       {
       console.log(m);
       }

       for(const [key, m] of connaissances)
       {
       console.log(m);
       }*/
    }

    for (const file of files) {
      if (!file || file.length === 0) {
        continue;
      }

      //On récup le xml
      let xml = fs.readFileSync(__dirname + '/resources/' + file);
      if (!xml || xml.length === 0) {
        continue;
      }

      //On convertit le xml en json (string)
      let json_document = parser.toJson(xml);
      if (!json_document || json_document.length === 0) {
        continue;
      }

      //On convertit le string json en object
      json_document = JSON.parse(json_document);
      if (!json_document || json_document.length === 0) {
        continue;
      }

      //On récup la fiche de l'emploi
      const {fiche_emploi_metier} = json_document;
      if (!fiche_emploi_metier) {
        continue;
      }

      const {bloc_mobilites} = fiche_emploi_metier;
      if (bloc_mobilites) {
        const {mobilites_proches} = bloc_mobilites;
        if (mobilites_proches) {

          let {nbItemMob, item_mob_pr} = mobilites_proches;
          nbItemMob = Number.parseInt(nbItemMob);

          if (nbItemMob === 1) {
            extractMobilite(item_mob_pr, json_document);
          }
          else if (nbItemMob > 1) {
            for (const item of item_mob_pr) {
              extractMobilite(item, json_document);
            }
          }
        }

        const {mobilites_si_evolution} = bloc_mobilites;
        if (mobilites_si_evolution && mobilites_proches.item_mob_ev) {

        }
      }
    }

    //On insert les métiers via un tampon
    insertMetier(null, metiers)
      .then(() => {
        let bulk = [];

        for (const [key, competence] of competences) {
          bulk.push({
            index: {
              _index: index_elasticsearch,
              _type: 'competence',
              _id: key
            }
          });
          bulk.push(competence);
        }

        for (const [key, connaissance] of connaissances) {
          bulk.push({
            index: {
              _index: index_elasticsearch,
              _type: 'connaissance',
              _id: key
            }
          });
          bulk.push(connaissance);
        }

        //Insertion du bulk
        if (bulk.length > 0) {
          client_local.bulk({
            body: bulk
          }, function (err, resp) {
            if (err) {
              console.log(err);
            }
            if (resp) {
              console.log('success');
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

});

function insertMetier(index, metiers) {
  return new Promise((resolve, reject) => {
    let bulk = [];
    let find = false;
    let count = 0;
    for (const [key, metier] of metiers) {
      if (!index) {
        find = true;
      }
      else if (!find) {
        if (index === key) {
          index = key;
          find = true;
          continue;
        }
      }

      if (!find) {
        continue;
      }

      bulk.push({
        index: {
          _index: index_elasticsearch,
          _type: 'metier',
          _id: key
        }
      });
      bulk.push(metier);
      count++;
      index = key;

      if (count === tampon_insert_metier) {
        break;
      }
    }

    if (bulk.length > 0) {
      client_local.bulk({
        body: bulk
      }, function (err, resp) {
        if (err) {
          return reject(false);
        }
        if (resp) {
          console.log('success', index);
          return insertMetier(index, metiers)
            .then(() => {
              return resolve(true);
            });
        }
      });
    }
    else {
      return resolve(true);
    }
  });
}

function extractMetier(item, metier_temp, code_rome) {
  if (!item) {
    return null;
  }

  //On récup les infos du metier
  let {code_ogr, libelle, libelle_court} = item;
  if (nullOrEmptyArray([code_ogr, libelle, libelle_court])) {
    return null;
  }

  code_ogr = Number.parseInt(code_ogr);
  if (!code_ogr) {
    return null;
  }

  //On récup le métier dans notre base globale
  let metier = getMetier(code_ogr);

  //Si on a pas le métier, on l'ajoute
  if (!metier) {
    metiers.set(code_ogr, {
      libelle_metier: decodeUtf8(libelle),
      libelle_court_metier: decodeUtf8(libelle_court),
      categories_metier: [code_rome],
      emplois_proche_metier: [],
      id_emplois_proche_metier: [],
      emplois_direct_metier: [],
      id_emplois_direct_metier: [],
      emplois_envisageable_metier: [],
      competences_metier: [],
      connaissances_metier: [],
    });
  }
  else {
    //Sinon on ajoute juste la catégorie au metier
    metier.categories_metier.push(code_rome);
    metiers.set(code_ogr, metier);
  }

  //On ajoute les métiers courant dans un tableau temp pour pouvoir leurs affecter les compétences/connaissances/metiers mobiles
  metier_temp.push({
    code_ogr: code_ogr,
    libelle: decodeUtf8(libelle),
  });
}

function extractComptence(item, metier_temp, code_rome, competence_temp) {
  let {
    code_ogr,
    libelle,
    code_type_activite,
    code_type_item_activite,
  } = item;

  code_ogr = Number.parseInt(code_ogr);
  code_type_activite = Number.parseInt(code_type_activite);
  code_type_item_activite = Number.parseInt(code_type_item_activite);

  if (!code_ogr || !code_type_activite || !code_type_item_activite) {
    return null;
  }

  if (nullOrEmptyArray([libelle])) {
    return null;
  }

  let competence = getCompetence(code_ogr);
  if (!competence) {
    competences.set(code_ogr, {
      libelle_competence: decodeUtf8(libelle),
      code_type_activite_competence: code_type_activite,
      code_type_item_activite_competence: code_type_item_activite,
      categories_metier_competence: [code_rome],
      metiers_lies_competence: metier_temp,
    });
  }
  else {
    //Si on a déjà la compétence, on ajoute les métiers et la catégorie métier
    let {metiers_lies} = competence;
    if (!metiers_lies) {
      metiers_lies = [];
    }

    let new_metier = metiers_lies;

    for (const m of metier_temp) {
      let find = false;
      for (const m2 of metiers_lies) {
        if (m2.code_ogr === m.code_ogr) {
          find = true;
          break;
        }
      }

      if (find) {
        continue;
      }

      new_metier.push({
        code_ogr: m.code_ogr,
        libelle: decodeUtf8(m.libelle),
      });
    }

    competence.metiers_lies_competence = new_metier;
    competence.categories_metier_competence.push(code_rome);
    competences.set(code_ogr, competence);
  }

  competence_temp.push({
    code_ogr: code_ogr,
    libelle: decodeUtf8(libelle),
  });
}

function extractConnaissance(item, metier_temp, code_rome, connaissance_temp) {
  let {
    code_ogr,
    libelle,
    code_type_competence,
  } = item;

  if (!nullOrEmptyArray([code_ogr, libelle, code_type_competence])) {
    code_ogr = Number.parseInt(code_ogr);
    code_type_competence = Number.parseInt(code_type_competence);

    if (code_ogr && code_type_competence) {
      //On regarde si on a pas déjà ce savoir
      let connaissance = getConnaissances(code_ogr);
      if (!connaissance) {
        //On ajoute la connaissance dans notre base générale
        connaissance = {
          libelle_connaissance: decodeUtf8(libelle),
          categories_metier_connaissance: [code_rome],
          metiers_lies_connaissance: metier_temp,
        };

        connaissances.set(code_ogr, connaissance);
      }
      else {
        //Si on a déjà la connaissance, on ajoute les métiers et la catégorie métier
        let {metiers_lies} = connaissance;
        if (!metiers_lies) {
          metiers_lies = [];
        }

        let new_metier = metiers_lies;

        for (const m of metier_temp) {
          let find = false;
          for (const m2 of metiers_lies) {
            if (m2.code_ogr === m.code_ogr) {
              find = true;
              break;
            }
          }

          if (find) {
            continue;
          }

          new_metier.push({
            code_ogr: m.code_ogr,
            libelle: decodeUtf8(m.libelle),
          });
        }

        //Sinon on ajoute la catégorie métier dans la connaissance
        connaissance.metiers_lies_connaissance = new_metier;
        connaissance.categories_metier_connaissance.push(code_rome);
        connaissances.set(code_ogr, connaissance);
      }

      connaissance_temp.push({
        code_ogr: code_ogr,
        libelle: decodeUtf8(libelle),
      });
    }
  }
}

function extractMobilite(item_mob_pr, json_document) {
//On récup les éléments de l'item
  const {
    liste_appellation_source,
    code_rome_cible,
    libelle_rome_cible,
    liste_appellation_cible
  } = item_mob_pr;

  if (liste_appellation_source && code_rome_cible && libelle_rome_cible && liste_appellation_cible) {
    //On récup la liste des métiers destination
    let metier_cible_a_affecter = [];
    const {
      code_appellation_cible,
    } = liste_appellation_cible;

    if (code_appellation_cible) {
      //On regarde si c'est un array ou juste un objet
      const typeof_code_appellation_cible = typeof(code_appellation_cible);

      if (typeof_code_appellation_cible === "string") {
        //Si c'est === 0, c'est que ça concerne tous les métiers de la catégorie
        if (code_appellation_cible === "0") {
          //On récup la catégorie métier cible
          let categorie_metier_cible = getCategorieMetier(code_rome_cible);
          if (categorie_metier_cible) {
            //On ajoute tous les métiers de la catégorie cible
            for (const metier_categorie_cible of categorie_metier_cible.metiers_lies) {
              if (!metier_categorie_cible.code_ogr) {
                continue;
              }

              const num = Number.parseInt(metier_categorie_cible.code_ogr);
              if (!num) {
                continue;
              }

              metier_cible_a_affecter.push(num);
            }
          }
        }
        //Sinon c'est que ça concerne un métier précis de la catégorie
        else {
          const num = Number.parseInt(code_appellation_cible);
          if (num) {
            metier_cible_a_affecter.push(num);
          }
        }
      }
      else if (typeof_code_appellation_cible === "object") {
        for (let num of code_appellation_cible) {
          num = Number.parseInt(num);
          if (!num) {
            continue;
          }

          metier_cible_a_affecter.push(num);
        }
      }
    }

    //Si on a trouvé des métiers cible, on associe chaque métier source à tous les métiers cible
    if (metier_cible_a_affecter.length > 0) {
      //On récup la liste des métiers source
      const {
        code_appellation_source,
      } = liste_appellation_source;

      if (code_appellation_source) {
        //On regarde si c'est un array ou juste un objet
        const typeof_code_appellation_source = typeof(code_appellation_source);
        if (typeof_code_appellation_source === "string") {
          //Si c'est === 0, c'est que ça concerne tous les métiers de la catégorie source
          if (code_appellation_source === "0") {
            const {fiche_emploi_metier} = json_document;
            if (fiche_emploi_metier) {
              const {
                bloc_code_rome
              } = fiche_emploi_metier;

              if (bloc_code_rome) {
                const {
                  code_rome
                } = bloc_code_rome;
                if (code_rome) {
                  let categorie_metier_source = getCategorieMetier(code_rome);
                  if (categorie_metier_source && categorie_metier_source.metiers_lies && categorie_metier_source.metiers_lies.length > 0) {
                    for (const id_m_c_a_a of metier_cible_a_affecter) {
                      const m_c_a_a = getMetier(id_m_c_a_a);
                      if (!m_c_a_a) {
                        continue;
                      }

                      //On ajoute le métier m_c_a_a à la catégorie source
                      for (const metier_categorie_cible of categorie_metier_source.metiers_lies) {
                        if (!metier_categorie_cible.code_ogr) {
                          continue;
                        }

                        const num = Number.parseInt(metier_categorie_cible.code_ogr);
                        if (!num) {
                          continue;
                        }

                        const m_c_c = getMetier(num);
                        if (!m_c_c) {
                          continue;
                        }

                        if (metierHaveEmploiProche(m_c_c, id_m_c_a_a)) {
                          continue;
                        }

                        m_c_c.emplois_proche_metier.push({
                          code_ogr: id_m_c_a_a,
                          libelle: decodeUtf8(m_c_a_a.libelle_metier),
                        });
                        m_c_c.id_emplois_proche_metier.push(id_m_c_a_a);
                      }
                    }
                  }
                }
              }
            }
          }
          //Sinon c'est que ça concerne un métier précis de la catégorie source
          else {
            const num = Number.parseInt(code_appellation_source);
            if (num) {
              const metier_source = getMetier(num);
              if (metier_source) {
                for (const id_m_c_a_a of metier_cible_a_affecter) {
                  const m_c_a_a = getMetier(id_m_c_a_a);
                  if (!m_c_a_a) {
                    continue;
                  }

                  if (metierHaveEmploiProche(metier_source, id_m_c_a_a)) {
                    continue;
                  }
                  //On ajoute le métier m_c_a_a à la catégorie source
                  metier_source.emplois_proche_metier.push({
                    code_ogr: id_m_c_a_a,
                    libelle: decodeUtf8(m_c_a_a.libelle_metier),
                  });
                  metier_source.id_emplois_proche_metier.push(id_m_c_a_a);
                }
              }
            }
          }
        }
        //Sinon c'est un array (et donc forcément que des métiers (par l'ensemble d'une catégorie)
        else if (typeof_code_appellation_source === "object") {
          for (let num of code_appellation_source) {
            num = Number.parseInt(num);
            if (!num) {
              continue;
            }

            let metier_source = getMetier(num);
            if (!metier_source) {
              continue;
            }

            for (const id_m_c_a_a of metier_cible_a_affecter) {
              const m_c_a_a = getMetier(id_m_c_a_a);
              if (!m_c_a_a) {
                continue;
              }

              if (metierHaveEmploiProche(metier_source, id_m_c_a_a)) {
                continue;
              }

              //On ajoute le métier m_c_a_a à la catégorie source
              metier_source.emplois_proche_metier.push({
                code_ogr: id_m_c_a_a,
                libelle: decodeUtf8(m_c_a_a.libelle_metier),
              });
              metier_source.id_emplois_proche_metier.push(id_m_c_a_a);
            }
          }
        }
      }
    }
  }
}