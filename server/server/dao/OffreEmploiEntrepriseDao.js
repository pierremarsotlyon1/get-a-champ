/**
 * Created by pierremarsot on 25/03/2017.
 */
class OffreEmploiEntrepriseDao {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
    this._index = 'sport';
    this._type = 'entreprise';
  }

  find(id_entreprise) {
    return new Promise((resolve, reject) => {
      this._elasticsearch.get({
        index: this._index,
        type: this._type,
        id: id_entreprise,
        _source: ["offres_emploi"]
      })
        .then((response) => {
          return resolve(response._source.offres_emploi);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des offres d\'emploi');
        });
    });
  }
}

export default OffreEmploiEntrepriseDao;