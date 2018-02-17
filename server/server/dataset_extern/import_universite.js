var parse = require('csv-parse');
var fs = require('fs');
var iconv = require('iconv-lite');

const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  //log: 'trace'
});

const pathCsv = './fr-esr-implantations_etablissements_d_enseignement_superieur_publics.json';
var input = JSON.parse(fs.readFileSync(pathCsv, 'utf8'));
console.log(input.length);

if (input) {
  let bulk = [];
  for (const ecole of input) {

    const fields = ecole.fields;
    if (fields) {
      const adresse_ecole = fields.adresse_uai;
      const appellation_officielle_ecole = fields.siege_lib;
      const code_nature_ecole = Number.parseInt(fields.nature_uai);
      const code_nature_libelle_ecole = fields.type_uai;
      const code_postal_ecole = fields.com_code;
      const denomination_principale_ecole = fields.type_d_etablissement;
      const location_ecole = {
        lat: fields.coordonnees[0],
        lon: fields.coordonnees[1]
      };
      const numero_immatriculation_ecole = fields.uai;
      const secteur_ecole = fields.type_d_etablissement;
      const ville_ecole = fields.com_nom;

      if (numero_immatriculation_ecole && appellation_officielle_ecole && denomination_principale_ecole && secteur_ecole
        && adresse_ecole && ville_ecole && code_postal_ecole && code_nature_libelle_ecole && code_nature_ecole) {
        if (numero_immatriculation_ecole.length === 0
          || appellation_officielle_ecole.length === 0
          || denomination_principale_ecole.length === 0
          || secteur_ecole.length === 0
          || adresse_ecole.length === 0
          || ville_ecole.length === 0
          || code_postal_ecole.length === 0
          || code_nature_libelle_ecole.length === 0
          || !code_nature_ecole) {
          continue;
        }

        const ecole = {
          adresse_ecole: adresse_ecole.trim(),
          appellation_officielle_ecole: appellation_officielle_ecole.trim(),
          code_nature_ecole: code_nature_ecole,
          code_nature_libelle_ecole: code_nature_libelle_ecole.trim(),
          code_postal_ecole: code_postal_ecole.trim(),
          denomination_principale_ecole: denomination_principale_ecole.trim(),
          location_ecole: location_ecole,
          numero_immatriculation_ecole: numero_immatriculation_ecole.trim(),
          secteur_ecole: secteur_ecole.trim(),
          ville_ecole: ville_ecole.trim(),
        };

        bulk.push({
          index: {
            _index: 'sport',
            _type: 'ecoles',
            _id: numero_immatriculation_ecole.trim()
          }
        });
        bulk.push(ecole);

      }
      else {
        console.log('noon');
      }
    }
  }

  if (bulk.length > 0) {
    client_local.bulk({
      body: bulk
    }, function (err, resp) {
      console.log(err);
      console.log(resp);
    });
  }
}