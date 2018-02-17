/**
 * Created by pierremarsot on 17/01/2017.
 */
import NiveauCompetitionMetier from '../metier/NiveauCompetitionMetier';
import elasticsearch from '../db';

class NiveauCompetitionController {
  constructor(server) {
    server.get('/niveaux_competition', this.find);
  }

  find(req, res, next) {
    const niveauCompetitionMetier = new NiveauCompetitionMetier(elasticsearch);
    niveauCompetitionMetier.find()
      .then((niveaux_competition) => {
        res.send(200, {
          niveaux_competition: niveaux_competition,
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

module.exports = NiveauCompetitionController;