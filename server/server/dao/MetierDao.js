/**
 * Created by pierremarsot on 04/03/2017.
 */
class MetierDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'metier';
  }

  search(metier) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match: {
              libelle_metier: metier,
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des métiers');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des métiers');
        })
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id,
      })
        .then((metier) => {
          return resolve(metier);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du métier');
        });
    });
  }

  find(size = 10) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        size: size,
        body: {
          query: {
            match_all: {}
          }
        }
      })
        .then((metiers) => {
          if (!metiers || !metiers.hits || !metiers.hits.hits) {
            return reject('Erreur lors de la récupération des métiers');
          }
          return resolve(metiers.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des métiers');
        });
    });
  }

  randomFind(size = 10){
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        size: size,
        body: {
          query: {
            function_score : {
              query : { match_all: {} },
              random_score : {}
            }
          }
        }
      })
        .then((metiers) => {
          if (!metiers || !metiers.hits || !metiers.hits.hits) {
            return reject('Erreur lors de la récupération des métiers');
          }
          return resolve(metiers.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des métiers');
        });
    });
  }
}

export default MetierDao;