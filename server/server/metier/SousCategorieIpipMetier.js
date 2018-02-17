/**
 * Created by pierremarsot on 14/01/2017.
 */
import SousCategorieIpipDao from '../dao/SousCategorieIpipDao';

class SousCategorieIpipMetier {
  constructor(elasticsearch) {
    this.elasticsearch = elasticsearch;
  }

  /**
   * Permet de récupérer toutes les situations sportives
   * @returns {Promise} - Erreur ou Array des documents des situations sportives
   */
  find() {
    return new Promise((resolve, reject) => {
      const sousCategorieIpipDao = new SousCategorieIpipDao(this.elasticsearch);
      sousCategorieIpipDao.find()
        .then((sousCategories) => {
          return resolve(sousCategories);
        })
        .catch((error) => {
          return reject(error);
        });
    })
  }
}

export default SousCategorieIpipMetier;