/**
 * Created by pierremarsot on 23/03/2017.
 */
import CategorieAnimationIncentiveDao from '../dao/CategorieAnimationIncentiveDao';

class CategorieAnimationIncentiveMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const categorieAnimationIncentiveDao = new CategorieAnimationIncentiveDao(this._elasticsearch);
      categorieAnimationIncentiveDao.find()
        .then((categories_animation_incentive) => {
          return resolve(categories_animation_incentive);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  getByThematique(id_thematique) {
    return new Promise((resolve, reject) => {
      if (!id_thematique) {
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      const categorieAnimationIncentiveDao = new CategorieAnimationIncentiveDao(this._elasticsearch);
      categorieAnimationIncentiveDao.getByThematique(id_thematique)
        .then((categorie_thematique) => {
          return resolve(categorie_thematique);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  extractThematique(id_thematique, categorie){
    return new Promise((resolve, reject) => {
      if(!id_thematique){
        return reject('Erreur lors de la récupération de l\'identifiant de la thématique');
      }

      if(!categorie || !categorie._source || !categorie._source.thematique_animation_incentive){
        return reject('Erreur lors de la récupération de la catégorie');
      }

      return resolve(categorie._source.thematique_animation_incentive.find((thematique) => {
        return thematique.id == id_thematique;
      }));
    });
  }
}

export default CategorieAnimationIncentiveMetier;