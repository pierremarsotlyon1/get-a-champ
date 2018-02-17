/**
 * Created by pierremarsot on 24/02/2017.
 */
import elasticsearch from '../db';
import TailleEntrepriseMetier from '../metier/TailleEntrepriseMetier';

class TailleEntrepriseController {
  constructor(server) {
    server.get('/taille/entreprise', this.find);
  }

  find(req, res, next) {
    const tailleEntrepriseMetier = new TailleEntrepriseMetier(elasticsearch);
    tailleEntrepriseMetier.find()
      .then((tailles_entreprise) => {
        res.send(200, {
          tailles_entreprise: tailles_entreprise
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

module.exports = TailleEntrepriseController;