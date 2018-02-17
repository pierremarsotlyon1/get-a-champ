/**
 * Created by pierremarsot on 31/01/2017.
 */
class ThematiqueAnimationConferenceDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'categorie_animation_conference';
  }

  /**
   * Permet de récupérer toutes les thématiques d'animation de conférence
   * @returns {Promise} - Erreur ou Array des documents des thématiques d'animations de conférence
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
            return reject('Erreur lors de la récupération des thématiques d\'animation de conférence');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des thématiques d\'animation de conférence');
        });
    });
  }

  /**
   * Permet de récupérer une thématique d'animation de conférence via son id
   * @param id_thematique_animation_conference - Id de la thématique d'animation de conférence
   * @returns {Promise} - Erreur ou document de la thématique d'animation de conférence
   */
  get(id_thematique_animation_conference) {
    return new Promise((resolve, reject) => {
      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_thematique_animation_conference
      })
        .then((thematique_animation_conference) => {
          if (!thematique_animation_conference) {
            return reject('Erreur lors de la récupération de la thématique de conférence');
          }
          return resolve(thematique_animation_conference);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique de fonférence');
        });
    });
  }

  count(id_thematique_animation_conference) {
    return new Promise((resolve, reject) => {
      this._bdd.count({
        index: this._index,
        type: this._type,
        body: {
          query: {
            nested : {
              path : "thematique_animation_conference",
              query : {
                bool : {
                  must : [
                    {
                      match : {
                        "thematique_animation_conference.id" : id_thematique_animation_conference
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      })
        .then((response) => {
          return resolve(response.count);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique de conférence');
        });
    });
  }

  /*exists(id_thematique_animation_conference) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id_thematique_animation_conference
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de la thématique de conférence');
        });
    });
  }*/
}

export default ThematiqueAnimationConferenceDao;