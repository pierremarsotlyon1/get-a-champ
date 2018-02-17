/**
 * Created by pierremarsot on 10/02/2017.
 */
class SousCategorieIpipDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'ipip';
    this._type = 'sous_categorie';
  }

  find(){
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        size: 9999,
      })
        .then((sousCategories) => {
          if (!sousCategories || !sousCategories.hits) {
            return reject('Erreur lors de la récupération des sous catégories');
          }

          if (sousCategories.hits.total === 0) {
            return resolve([]);
          }

          return resolve(sousCategories.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des sous catégories');
        });
    });
  }
}

export default SousCategorieIpipDao;