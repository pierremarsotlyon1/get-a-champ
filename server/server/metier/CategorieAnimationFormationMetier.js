/**
 * Created by pierremarsot on 23/03/2017.
 */
import CategorieAnimationFormationDao from '../dao/CategorieAnimationFormationDao';

class CategorieAnimationFormationMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const categorieAnimationFormationDao = new CategorieAnimationFormationDao(this._elasticsearch);
      categorieAnimationFormationDao.find()
        .then((categories_animation_formation) => {
          return resolve(categories_animation_formation);
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

      const categorieAnimationFormationDao = new CategorieAnimationFormationDao(this._elasticsearch);
      categorieAnimationFormationDao.getByThematique(id_thematique)
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

      if(!categorie || !categorie._source || !categorie._source.thematique_animation_formation){
        return reject('Erreur lors de la récupération de la catégorie');
      }

      return resolve(categorie._source.thematique_animation_formation.find((thematique) => {
        return thematique.id == id_thematique;
      }));
    });
  }
}

export default CategorieAnimationFormationMetier;