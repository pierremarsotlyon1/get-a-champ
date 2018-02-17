/**
 * Created by pierremarsot on 28/03/2017.
 */
import elasticsearch from '../db';
import SalaireMetier from '../metier/SalaireMetier';

class SalaireController {
  constructor(server) {
    server.get('/salaires', this.find);
  }

  find(req, res, next) {
    const salaireMetier = new SalaireMetier(elasticsearch);
    salaireMetier.find()
      .then((salaires) => {
        res.send(200, {
          salaires: salaires
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

module.exports = SalaireController;