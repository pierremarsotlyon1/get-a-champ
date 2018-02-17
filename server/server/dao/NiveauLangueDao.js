/**
 * Created by pierremarsot on 21/02/2017.
 */
class NiveauLangueDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'niveau_langue';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
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
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des niveaux de langues');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des niveaux de langues');
        });
    });
  }

  get(id_niveau_langue) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_niveau_langue,
      })
        .then((niveau_langue) => {
          if (!niveau_langue) {
            return reject('Erreur lors de la récupération du niveau de la langue');
          }

          return resolve(niveau_langue);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du niveau de la langue');
        });
    });
  }
}

export default NiveauLangueDao;