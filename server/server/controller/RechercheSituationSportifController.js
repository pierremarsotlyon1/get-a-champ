/**
 * Created by pierremarsot on 25/02/2017.
 */
import elasticsearch from '../db';
import RechercheSituationSportifMetier from '../metier/RechercheSituationSportifMetier';

class RechercheSituationSportifController {
  constructor(server) {
    server.get('/recherche/situation/sportif', this.find);
  }

  find(req, res, next) {
    const rechercheSituationSportifMetier = new RechercheSituationSportifMetier(elasticsearch);
    rechercheSituationSportifMetier.find()
      .then((recherches_situations_sportif) => {
        res.send(200, {
          recherches_situations_sportif: recherches_situations_sportif,
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

module.exports = RechercheSituationSportifController;