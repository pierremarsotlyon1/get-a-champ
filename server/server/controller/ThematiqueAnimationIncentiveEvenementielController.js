/**
 * Created by pierremarsot on 31/01/2017.
 */

import elasticsearch from '../db';
import ThematiqueAnimationIncentiveEvenementielMetier from '../metier/ThematiqueAnimationIncentiveEvenementielMetier';

class ThematiqueAnimationIncentiveEvenementiel {
  constructor(server) {
    server.get('/thematique/animation/formation_incentive_evenementiel', this.find);
  }

  find(req, res, next) {
    const thematiqueAnimationIncentiveEvenementielMetier = new ThematiqueAnimationIncentiveEvenementielMetier(elasticsearch);
    thematiqueAnimationIncentiveEvenementielMetier.find()
      .then((thematiquesAnimationIncentiveEvenementiel) => {
        res.send(200, {
          thematiques_animation_incentive_evenementiel: thematiquesAnimationIncentiveEvenementiel,
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

module.exports = ThematiqueAnimationIncentiveEvenementiel;