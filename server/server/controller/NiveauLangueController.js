/**
 * Created by pierremarsot on 21/02/2017.
 */
import elasticsearch from '../db';
import NiveauLangueMetier from '../metier/NiveauLangueMetier';

class NiveauLangueController {
  constructor(server) {
    server.get('/niveau/langue', this.find);
  }

  find(req, res, next) {
    const niveauLangueMetier = new NiveauLangueMetier(elasticsearch);
    niveauLangueMetier.find()
      .then((niveaux_langue) => {
        res.send(200, {
          niveaux_langue: niveaux_langue
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

module.exports = NiveauLangueController;