import client from '../db';

client.indices.create({
  index: 'sport',
  body: {
    mappings: {
      sportif: {
        properties: {
          nom: {
            type: 'string'
          },
          prenom: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          email: {
            type: 'string',
            analyser: 'uax_url_email'
          }
        }
      },
      entreprise: {
        properties: {
          nom_gerant: {
            type: 'string'
          },
          prenom_gerant: {
            type: 'string'
          },
          siret_entreprise: {
            type: 'string'
          },
          email_gerant: {
            type: 'string',
            analyser: 'uax_url_email'
          },
          password: {
            type: 'string'
          },
          nom_entreprise: {
            type: 'string'
          }
        }
      },
      "categorie_sport": {
        "nom_categorie_sport": {
          "type": "text"
        },
        "sports_categorie_sport": {
          "type": "nested",
          "properties": {
            "nom_sport": {
              "type": "text"
            },
            "collectif_sport": {
              "type": "boolean"
            },
            "face_adversaire_sport": {
              "type": "boolean"
            },
            "individuel_sport": {
              "type": "boolean"
            },
            "niveau_exposition_media_sport": {
              "type": "byte"
            }
          }
        }
      }
    }
  }
});