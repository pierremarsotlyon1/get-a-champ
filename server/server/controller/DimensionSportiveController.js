/**
 * Created by pierremarsot on 25/03/2017.
 */
import DimensionSportiveMetier from '../metier/DimensionSportiveMetier';
import elasticsearch from '../db';

class DimensionSportiveController {
  constructor(server) {
    server.get('dimensions_sportive', this.find);
  }

  find(req, res, next) {
    const dimensionSportiveMetier = new DimensionSportiveMetier(elasticsearch);
    dimensionSportiveMetier.find()
      .then((dimensions_sportives) => {
        res.send(200, {
          dimensions_sportives: dimensions_sportives,
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

module.exports = DimensionSportiveController;