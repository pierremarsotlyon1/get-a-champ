/**
 * Created by pierremarsot on 31/01/2017.
 */
class InterventionEntrepriseSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'sportif';
  }

  /**
   * Permet de récupérer toutes les animations de formation d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array nested des animations de formation du sportif
   */
  find_animation_formation(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_sportif,
        _source: ['animations_formation']
      })
        .then((response) => {
          if (!response || !response._source) {
            return reject('Erreur lors de la récupération des animations formation');
          }

          return resolve(response._source.animations_formation);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des animations formation');
        });
    });
  }

  /**
   * Permet de récupérer toutes les formations incentives/evenementielles d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array nested des formations incentives/evenementielles du sportif
   */
  find_animations_incentive_evenementiel(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_sportif,
        _source: ['animations_incentive_evenementiel']
      })
        .then((response) => {
          if (!response || !response._source) {
            return reject('Erreur lors de la récupération des animations formation');
          }

          return resolve(response._source.animations_incentive_evenementiel);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des animations formation');
        });
    });
  }

  /**
   * Permet de récupérer toutes les formations de conférence d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array nested des formations de conférence du sportif
   */
  find_animations_conference(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_sportif,
        _source: ['animations_conference']
      })
        .then((response) => {
          if (!response || !response._source) {
            return reject('Erreur lors de la récupération des animations formation');
          }

          return resolve(response._source.animations_conference);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des animations formation');
        });
    });
  }
}

export default InterventionEntrepriseSportifDao;