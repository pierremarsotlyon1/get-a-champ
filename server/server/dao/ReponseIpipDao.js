/**
 * Created by pierremarsot on 29/03/2017.
 */
class ReponseIpipDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'ipip';
    this._type = 'reponse';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des réponses');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des réponses');
        });
    });
  }
}

export default ReponseIpipDao;