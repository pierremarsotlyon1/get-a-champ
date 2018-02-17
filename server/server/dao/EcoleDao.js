/**
 * Created by pierremarsot on 27/02/2017.
 */
class EcoleDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'ecoles';
  }

  search(ecole) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match: {
              appellation_officielle_ecole: ecole
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des écoles');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch((error) => {
          return reject('Erreur lors de la récupération des écoles');
        });
    });
  }
}

export default EcoleDao;