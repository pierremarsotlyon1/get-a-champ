/**
 * Created by pierremarsot on 23/03/2017.
 */
import elasticsearch from '../db';
import CategorieAnimationIncentiveMetier from '../metier/CategorieAnimationIncentiveMetier';

class CategorieAnimationIncentiveController {
  constructor(server) {
    server.get('/categorie/animation/incentive', this.find);
  }

  find(req, res, next) {
    const categorieAnimationIncentiveMetier = new CategorieAnimationIncentiveMetier(elasticsearch);
    categorieAnimationIncentiveMetier.find()
      .then((categories_animation_incentive) => {
        res.send(200, {
          categories_animation_incentive: categories_animation_incentive
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

module.exports = CategorieAnimationIncentiveController;