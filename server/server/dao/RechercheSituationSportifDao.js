/**
 * Created by pierremarsot on 25/02/2017.
 */
class RechercheSituationSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'recherche_situation_sportif';
  }

  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des situations de recherche des sportifs');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des situations de recherche des sportifs');
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id,
      })
        .then((recherche_situation_sportif) => {
          return resolve(recherche_situation_sportif);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la recherche de situation sportive');
        });
    });
  }

  getByIds(ids) {
    return new Promise((resolve, reject) => {
      this._bdd.mget({
        index: this._index,
        type: this._type,
        body: {
          ids: ids
        }
      })
        .then((recherches_situation_sportif) => {
          if(!recherches_situation_sportif || !recherches_situation_sportif.docs)
          {
            return reject('Erreur lors de la récupération des recherches de situations sportif');
          }

          if(recherches_situation_sportif.docs.length === 0)
          {
            return resolve([]);
          }

          return resolve(recherches_situation_sportif.docs);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des recherches de situations sportif');
        });
    });
  }
}

export default RechercheSituationSportifDao;