/**
 * Created by pierremarsot on 25/03/2017.
 */
class TypeContratTravailDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'type_contrat_travail';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          sort: [
            {
              _uid: "asc"
            }
          ]
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des contrats de travail');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des contrats de travail');
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this._elasticsearch.get({
        index: this._index,
        type: this._type,
        id: id,
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la récupération du type de contrat de travail');
          }

          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du type de contrat de travail');
        });
    });
  }
}

export default TypeContratTravailDao;