/**
 * Created by pierremarsot on 23/03/2017.
 */
import elasticsearch from '../db';
import CategorieAnimationConferenceMetier from '../metier/CategorieAnimationConferenceMetier';

class CategorieAnimationConferenceController {
  constructor(server) {
    server.get('/categorie/animation/conference', this.find);
  }

  find(req, res, next) {
    const categorieAnimationConferenceMetier = new CategorieAnimationConferenceMetier(elasticsearch);
    categorieAnimationConferenceMetier.find()
      .then((categories_animation_conference) => {
        res.send(200, {
          categories_animation_conference: categories_animation_conference,
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

module.exports = CategorieAnimationConferenceController;