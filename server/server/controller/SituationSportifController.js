/**
 * Created by pierremarsot on 14/01/2017.
 */
import elasticsearch from '../db';
import SituationSportifMetier from '../metier/SituationSportifMetier';

class SituationSportifController {
  constructor(server) {
    server.get('/situation_sportif', this.find);
  }

  find(req, res, next) {
    const situationSportifMetier = new SituationSportifMetier(elasticsearch);
    situationSportifMetier.find()
      .then((response) => {
        res.send(200, {
          situation_sportif: response
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error
        });
        return next();
      })
  }
}

module.exports = SituationSportifController;