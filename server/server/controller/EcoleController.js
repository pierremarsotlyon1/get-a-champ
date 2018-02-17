/**
 * Created by pierremarsot on 27/02/2017.
 */
import EcoleMetier from '../metier/EcoleMetier';
import elasticsearch from '../db';

class EcoleController {
  constructor(server) {
    server.get('/ecoles/:ecole', this.search);
  }

  search(req, res, next) {
    const ecole = req.params.ecole;
    if (!ecole || ecole.length === 0) {
      res.send(404, {
        error: 'Erreur lors de la récupération de votre recherche'
      });

      return next();
    }

    const ecoleMetier = new EcoleMetier(elasticsearch);
    ecoleMetier.search(ecole)
      .then((ecoles) => {
        res.send(200, {
          ecoles: ecoles,
        });

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      })
  }
}

module.exports = EcoleController;