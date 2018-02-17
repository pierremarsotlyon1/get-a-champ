/**
 * Created by pierremarsot on 23/03/2017.
 */
class CategorieAnimationConferenceDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'categorie_animation_conference';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match_all: {}
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des catégories d\'animation de conférence');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des catégories d\'animation de conférence');
        });
    });
  }

  getByThematique(id_thematique) {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            nested: {
              path: "thematique_animation_conference",
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        "thematique_animation_conference.id": id_thematique
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits || response.hits.total === 0)
          {
            return reject('Erreur lors de la récupération de la thématique de conférence');
          }

          return resolve(response.hits.hits[0]);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique de conférence');
        });
    });
  }
}

export default CategorieAnimationConferenceDao;