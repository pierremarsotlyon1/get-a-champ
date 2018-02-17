/**
 * Created by pierremarsot on 31/01/2017.
 */

import elasticsearch from '../db';
import ThematiqueAnimationFormationMetier from '../metier/ThematiqueAnimationFormationMetier';

class ThematiqueAnimationFormationController {
  constructor(server) {
    server.get('/thematique/animation/formation', this.find);
  }

  find(req, res, next) {
    const thematiqueAnimationFormationMetier = new ThematiqueAnimationFormationMetier(elasticsearch);
    thematiqueAnimationFormationMetier.find()
      .then((thematiquesAnimationFormation) => {
        res.send(200, {
          thematiques_animation_formation: thematiquesAnimationFormation,
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error
        });
        return next();
      });
  }
}

module.exports = ThematiqueAnimationFormationController;