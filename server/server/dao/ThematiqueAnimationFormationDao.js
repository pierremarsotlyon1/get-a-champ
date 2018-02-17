/**
 * Created by pierremarsot on 31/01/2017.
 */
class ThematiqueAnimationFormationDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'thematique_animation_formation';
  }

  /**
   * Permet de récupérer toutes les thématiques d'animations de formation
   * @returns {Promise} - Erreur ou Array des documents des thématiques d'animations de formation
   */
  find() {
    return new Promise((resolve, reject) => {
      this._bdd.search({
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
            return reject('Erreur lors de la récupération des thématiques d\'animation de formation');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des thématiques d\'animation de formation');
        });
    });
  }

  /**
   * Permet de récupérer le document d'une thématique d'animation de formation
   * @param id_thematique_animation_formation - Id de la thématique d'animation de formation
   * @returns {Promise} - Erreur ou document de la thématique d'animation de formation
   */
  get(id_thematique_animation_formation) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_thematique_animation_formation
      })
        .then((thematique_animation_formation) => {
          if (!thematique_animation_formation) {
            return reject('Erreur lors de la récupération de la thématique de formation');
          }
          return resolve(thematique_animation_formation);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique de formation');
        });
    });
  }

  exists(id_thematique_animation_formation) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_thematique_animation_formation
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique de formation');
        });
    });
  }
}

export default ThematiqueAnimationFormationDao;