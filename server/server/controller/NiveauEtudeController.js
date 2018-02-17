/**
 * Created by pierremarsot on 25/03/2017.
 */
import elasticsearch from '../db';
import NiveauEtudeMetier from '../metier/NiveauEtudeMetier';

class NiveauEtudeController {
  constructor(server) {
    server.get('/niveaux_etude', this.find);
  }

  find(req, res, next) {
    const niveauEtudeMetier = new NiveauEtudeMetier(elasticsearch);
    niveauEtudeMetier.find()
      .then((niveaux_etude) => {
        res.send(200, {
          niveaux_etude: niveaux_etude,
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

module.exports = NiveauEtudeController;