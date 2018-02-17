/**
 * Created by pierremarsot on 25/03/2017.
 */
class NiveauEtudeDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'niveau_formation';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des niveau d\'étude');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des niveau d\'étude');
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
        .then((response) => {
        if(!response){
          return reject('Erreur lors de la récupération du niveau d\'étude');
        }

        return resolve(response);
        })
        .catch(() => {
        return reject('Erreur lors de la récupération du niveau d\'étude');
        });
    })
  }
}

export default NiveauEtudeDao;