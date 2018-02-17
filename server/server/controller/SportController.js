import elasticsearch from "../db";
import SportMetier from '../metier/SportMetier';

class SportController {
  constructor(server) {
    server.get('/sport/:sport', this.get);
  }

  get(req, res, next) {
    const sport = req.params.sport;
    if (!sport) {
      res.send(404, {
        error: 'Vous devez spécifier un sport'
      });
      return next();
    }

    const sportMetier = new SportMetier(elasticsearch);
    sportMetier.searchSport(sport)
      .then((sports) => {
        res.send(200, {
          sports: sports
        });
        return next();
      })
      .catch((error) => {
        res.send(404, error);
        return next();
      });
  }
}

module.exports = SportController;