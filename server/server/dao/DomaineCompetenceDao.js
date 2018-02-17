/**
 * Created by pierremarsot on 29/03/2017.
 */
class DomaineCompetenceDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'domaine_competence';
  }

  findAll(){
    return new Promise((resolve, reject) => {
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        size: 999,
        body: {
          query: {
            match_all: {}
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des domaines de compétence');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des domaines de compétence');
        });
    });
  }

  search(name) {
    return new Promise((resolve, reject) => {
      name = name.toLowerCase();
      this._elasticsearch.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            match_phrase_prefix: {
              nom_domaine_competence: name
            }
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits) {
            return reject('Erreur lors de la récupération des domaines de compétences');
          }

          if (response.hits.total === 0) {
            return resolve([]);
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des domaines de compétences');
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
            return reject('Erreur lors de la récupération du domaine de compétence');
          }

          return resolve(response);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération du domaine de compétence');
        });
    });
  }
}

export default DomaineCompetenceDao;