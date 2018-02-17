/**
 * Created by pierremarsot on 27/01/2017.
 */

import NiveauDomaineConnaissanceMetier from '../metier/NiveauDomaineConnaissanceMetier';
import elasticsearch from '../db';

class NiveauDomaineConnaissanceController {
  constructor(server) {
    server.get('/niveau_domaine_connaissance/:id', this.get);
    server.get('/niveaux_domaine_connaissance', this.find);
  }

  find(req, res, next) {
    const niveauDomaineConnaissanceMetier = new NiveauDomaineConnaissanceMetier(elasticsearch);
    niveauDomaineConnaissanceMetier.find()
      .then((niveaux_domaine_connaissance) => {
        res.send(200, {
          niveaux_domaine_connaissance: niveaux_domaine_connaissance,
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
    const id_niveau_domaine_connaissance = req.params.id;
    if (!id_niveau_domaine_connaissance) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du niveau de compétence',
      });
      return next();
    }

    const niveauDomaineConnaissanceMetier = new NiveauDomaineConnaissanceMetier(elasticsearch);
    niveauDomaineConnaissanceMetier.get(id_niveau_domaine_connaissance)
      .then((niveaux_domaine_connaissance) => {
        res.send(200, {
          niveaux_domaine_connaissance: niveaux_domaine_connaissance,
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

module.exports = NiveauDomaineConnaissanceController;