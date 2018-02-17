/**
 * Created by pierremarsot on 31/01/2017.
 */

import elasticsearch from '../db';
import ThematiqueAnimationConferenceMetier from '../metier/ThematiqueAnimationConferenceMetier';

class ThematiqueAnimationConferenceController {
  constructor(server) {
    server.get('/thematique/animation/conference', this.find);
  }

  find(req, res, next) {
    const thematiqueAnimationConferenceMetier = new ThematiqueAnimationConferenceMetier(elasticsearch);
    thematiqueAnimationConferenceMetier.find()
      .then((thematiquesAnimationConference) => {
        res.send(200, {
          thematiques_animation_conference: thematiquesAnimationConference,
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

module.exports = ThematiqueAnimationConferenceController;