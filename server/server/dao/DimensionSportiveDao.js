/**
 * Created by pierremarsot on 25/03/2017.
 */
class DimensionSportiveDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'dimension_sportive';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        size: 50,
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des dimesions sportives');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des dimensions sportives');
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
          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la dimension sportive');
        });
    });
  }

  mget(ids) {
    return new Promise((resolve, reject) => {
      this._elasticsearch.mget({
        index: this._index,
        type: this._type,
        body: {
          ids: ids
        }
      })
        .then((response) => {
          if (!response || !response.docs) {
            return reject('Erreur lors de la récupération des dimensions sportives');
          }

          if (response.docs.length === 0) {
            return resolve([]);
          }

          return resolve(response.docs);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des dimensions sportives');
        });
    });
  }
}

export default DimensionSportiveDao;