/**
 * Created by pierremarsot on 23/03/2017.
 */
import elasticsearch from '../db';
import CategorieAnimationFormationMetier from '../metier/CategorieAnimationFormationMetier';

class CategorieAnimationFormationController{
  constructor(server){
    server.get('/categorie/animation/formation', this.find);
  }

  find(req, res, next){
    const categorieAnimationFormationMetier = new CategorieAnimationFormationMetier(elasticsearch);
    categorieAnimationFormationMetier.find()
      .then((categories_animation_formation) => {
        res.send(200, {
          categories_animation_formation: categories_animation_formation,
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }
}

module.exports = CategorieAnimationFormationController;