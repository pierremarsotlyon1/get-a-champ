/**
 * Created by pierremarsot on 22/02/2017.
 */
import elasticsearch from '../db';
import SituationEntrepriseMetier from '../metier/SituationEntrepriseMetier';

class SituationEntrepriseController {
  constructor(server) {
    server.get('/situation/entreprise', this.find);
    server.get('/situation/entreprise/:id', this.get);
  }

  find(req, res, next) {
    const situationEntrepriseMetier = new SituationEntrepriseMetier(elasticsearch);
    situationEntrepriseMetier.find()
      .then((situations_entreprise) => {
        res.send(200, {
          situations_entreprise: situations_entreprise,
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

  get(req, res, next) {
    const id_situation_entreprise = req.params.id;
    if (!id_situation_entreprise) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la situation entreprise',
      });
      return next();
    }

    const situationEntrepriseMetier = new SituationEntrepriseMetier(elasticsearch);
    situationEntrepriseMetier.get(id_situation_entreprise)
      .then((situation_entreprise) => {
        res.send(200, {
          situation_entreprise: situation_entreprise,
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

module.exports = SituationEntrepriseController;