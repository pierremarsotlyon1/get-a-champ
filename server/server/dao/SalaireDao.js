/**
 * Created by pierremarsot on 28/03/2017.
 */
class SalaireDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'salaire';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          sort : [
            {
              _uid : {
                order : "asc"
              }
            }
          ]
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des salaires');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des salaires');
        });
    });
  }

  get(id){
    return new Promise((resolve, reject) => {
      this._elasticsearch.get({
        index: this._index,
        type: this._type,
        id: id,
      })
        .then((salaire) => {
          if (!salaire) {
            return reject('Erreur lors de la récupération du salaire');
          }

          return resolve(salaire);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du salaire');
        });
    });
  }
}

export default SalaireDao;