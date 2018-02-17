/**
 * Created by pierremarsot on 31/01/2017.
 */
class ThematiqueAnimationIncentiveEvenementielDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'thematique_animation_incentive_evenementiel';
  }

  /**
   * Permet de récupérer toutes les thématiques d'animation incentive
   * @returns {Promise} - Erreur ou Array des documents des thématiques d'animation incentive
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        size: 9999,
        body: {
          query: {
            match_all: {}
          }
        }
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des thématiques d\'animation incentive');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des thématiques d\'animation incentive');
        });
    });
  }

  /**
   * Permet de récupérer une thématique d'animation incentive
   * @param id_thematique_animation_incentive - Id de la thématique d'animation de incentive
   * @returns {Promise}
   */
  get(id_thematique_animation_incentive) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_thematique_animation_incentive
      })
        .then((thematique_animation_incentive) => {
          if (!thematique_animation_incentive) {
            return reject('Erreur lors de la récupération de la thématique incentive');
          }
          return resolve(thematique_animation_incentive);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique incentive');
        });
    });
  }

  exists(id_thematique_animation_incentive) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_thematique_animation_incentive
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique incentive');
        });
    });
  }
}

export default ThematiqueAnimationIncentiveEvenementielDao;