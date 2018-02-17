/**
 * Created by pierremarsot on 29/03/2017.
 */
class QuestionIpipDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'ipip';
    this._type = 'question';
  }

  findShortQuestion() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match: {
              is_short_test: true,
            }
          },
          size: 300,
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des questions');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des questions');
        });
    });
  }

  findFullQuestion() {
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match: {
              is_full_test: true,
            }
          },
          size: 300,
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des questions');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des questions');
        });
    });
  }
}

export default QuestionIpipDao;