/**
 * Created by pierremarsot on 23/03/2017.
 */
class CategorieAnimationIncentiveDao{
  constructor(elasticsearch){
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'categorie_animation_incentive';
  }

  find(){
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match_all: {

            }
          }
        }
      })
        .then((response) => {
          if(!response || !response.hits){
            return reject('Erreur lors de la récupération des catégories d\'animation incentive');
          }

          if(response.hits.total === 0)
          {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des catégories d\'animation incentive');
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
              path: "thematique_animation_incentive",
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        "thematique_animation_incentive.id": id_thematique
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
            return reject('Erreur lors de la récupération de la thématique incentive');
          }

          return resolve(response.hits.hits[0]);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique incentive');
        });
    });
  }
}

export default CategorieAnimationIncentiveDao;