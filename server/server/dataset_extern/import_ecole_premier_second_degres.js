/**
 * Created by pierremarsot on 25/02/2017.
 */
Math.tanh = Math.tanh || function (x) {
    if (x === Infinity) {
      return 1;
    } else if (x === -Infinity) {
      return -1;
    } else {
      return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
    }
  };

Math.atanh = Math.atanh || function (x) {
    return Math.log((1 + x) / (1 - x)) / 2;
  };

function lambert93toWGPS(lambertE, lambertN) {

  var constantes = {
    GRS80E: 0.081819191042816,
    LONG_0: 3,
    XS: 700000,
    YS: 12655612.0499,
    n: 0.7256077650532670,
    C: 11754255.4261
  }

  var delX = lambertE - constantes.XS;
  var delY = lambertN - constantes.YS;
  var gamma = Math.atan(-delX / delY);
  var R = Math.sqrt(delX * delX + delY * delY);
  var latiso = Math.log(constantes.C / R) / constantes.n;
  var sinPhiit0 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * Math.sin(1)));
  var sinPhiit1 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit0));
  var sinPhiit2 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit1));
  var sinPhiit3 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit2));
  var sinPhiit4 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit3));
  var sinPhiit5 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit4));
  var sinPhiit6 = Math.tanh(latiso + constantes.GRS80E * Math.atanh(constantes.GRS80E * sinPhiit5));

  var longRad = Math.asin(sinPhiit6);
  var latRad = gamma / constantes.n + constantes.LONG_0 / 180 * Math.PI;

  var longitude = latRad / Math.PI * 180;
  var latitude = longRad / Math.PI * 180;

  return {longitude: longitude, latitude: latitude};
}

var parse = require('csv-parse');
var fs = require('fs');
var iconv = require('iconv-lite');

const elasticsearch = require('elasticsearch');
const client_local = new elasticsearch.Client({
  host: 'http://somar:logitech03@localhost:9200',
  //log: 'trace'
});

const pathCsv = './DEPP-etab-1D2D.csv';
var input = fs.readFileSync(pathCsv, {encoding: "binary"});
var output = iconv.decode(input, "ISO-8859-1");

parse(output, {delimiter: ';'}, function (err, output) {
  let first = true;
  let added = 0;
  let bulk = [];
  for (const ecole of output) {
    if (first) {
      first = false;
      continue;
    }
    if (!ecole) {
      continue;
    }

    const numero_immatriculation_ecole = ecole[0];
    const appellation_officielle_ecole = ecole[1];
    const denomination_principale_ecole = ecole[2];
    const secteur_ecole = ecole[4];
    const adresse_ecole = ecole[5];
    const ville_ecole = ecole[9];
    const cp_ecole = ecole[8];
    let lat_ecole = ecole[10];
    let lon_ecole = ecole[11];
    let code_nature_ecole = ecole[14];
    let code_nature_libelle_ecole = ecole[15];

    lat_ecole = lat_ecole.replace(',', '.');
    lon_ecole = lon_ecole.replace(',', '.');

    const location = lambert93toWGPS(lat_ecole, lon_ecole);
    if (!location) {
      continue;
    }

    lat_ecole = location.latitude;
    lon_ecole = location.longitude;

    if (numero_immatriculation_ecole && appellation_officielle_ecole && denomination_principale_ecole && secteur_ecole
      && adresse_ecole && ville_ecole && cp_ecole && lat_ecole && lon_ecole && code_nature_libelle_ecole && code_nature_ecole) {

      code_nature_ecole = Number.parseInt(code_nature_ecole);
      lat_ecole = Number.parseFloat(lat_ecole);
      lon_ecole = Number.parseFloat(lon_ecole);

      if (numero_immatriculation_ecole.length === 0
        || appellation_officielle_ecole.length === 0
        || denomination_principale_ecole.length === 0
        || secteur_ecole.length === 0
        || adresse_ecole.length === 0
        || ville_ecole.length === 0
        || cp_ecole.length === 0
        || !lat_ecole
        || !lon_ecole
        || code_nature_libelle_ecole.length === 0
        || !code_nature_ecole) {
        continue;
      }

      const ecole = {
        adresse_ecole: adresse_ecole.trim(),
        appellation_officielle_ecole: appellation_officielle_ecole.trim(),
        code_nature_ecole: code_nature_ecole,
        code_nature_libelle_ecole: code_nature_libelle_ecole.trim(),
        code_postal_ecole: cp_ecole.trim(),
        denomination_principale_ecole: denomination_principale_ecole.trim(),
        location_ecole: {
          lat: lat_ecole,
          lon: lon_ecole,
        },
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

      //On regarde si on a pas déjà cette école
      /*client_local.exists({
        index: 'sport',
        type: 'ecoles',
        id: numero_immatriculation_ecole.trim()
      })
        .then((exists) => {
          if (!exists) {
            client_local.index({
              index: 'sport',
              type: 'ecoles',
              id: numero_immatriculation_ecole.trim(),
              body: ecole,
            })
              .then((response) => {
added++;
              })
              .catch((error) => {

              });
          }
        });*/
    }
  }

  client_local.bulk({
    body: bulk
  }, function (err, resp) {
    console.log(err);
    console.log(resp);
  });
});