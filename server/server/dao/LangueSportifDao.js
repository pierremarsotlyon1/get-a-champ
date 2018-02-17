/**
 * Created by pierremarsot on 21/02/2017.
 */
class LangueSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'sportif';
  }

  /**
   * Permet de récupérer toutes les langues du sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des langues du sportif
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_sportif,
        _source: ['langues_sportif']
      })
        .then((response) => {
          if (!response || !response._source) {
            return reject('Erreur lors de la récupération de vos langues');
          }

          if (!response._source.langues_sportif) {
            return resolve([]);
          }

          return resolve(response._source.langues_sportif);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de vos langues');
        });
    });
  }
}

export default LangueSportifDao;