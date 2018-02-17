/**
 * Created by pierremarsot on 28/01/2017.
 */

import DomaineCompetenceSportifMetier from '../metier/DomaineCompetenceSportifMetier';
import elasticsearch from '../db';

class DomaineCompetenceSportifController {
  constructor(server) {
    server.get('/api/sportif/domaines/competences', this.find);
    server.post('/api/sportif/domaines/competence', this.add);
    server.del('/api/sportif/domaines/competence/:id', this.remove);
  }

  /**
   * @api {get} /api/sportif/domaines/competences Find
   * @apiGroup Domaine competence sportive
   * @apiName Find
   * @apiSuccess
   *      {Array} domaines_competence_sportif - Array des domaines de competence du sportif
   * @apiError
   *       {String} error - Message d'erreur.
   */
  find(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accèder à cette fonctionnalité',
      });
      return next();
    }

    const domaineCompetenceSportifMetier = new DomaineCompetenceSportifMetier(elasticsearch);

    //On récup tous les domaines de connaissances du sportif
    domaineCompetenceSportifMetier.find(id_sportif)
      .then((domaines_competence_sportif) => {
        res.send(200, {
          domaines_competence_sportif: domaines_competence_sportif,
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

  add(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accèder à cette fonctionnalité',
      });
      return next();
    }

    const id_domaine_competence = req.params.id_domaine_competence;
    if (!id_domaine_competence) {
      res.send(404, {
        error: 'Erreur lors de la récupération du domaine de compétence'
      });
      return next();
    }

    const id_niveau_domaine_competence = req.params.id_niveau_domaine_competence;
    if (!id_niveau_domaine_competence) {
      res.send(404, {
        error: 'Erreur lors de la récupération du niveau du domaine de compétence'
      });
      return next();
    }

    const domaineCompetenceSportifMetier = new DomaineCompetenceSportifMetier(elasticsearch);

    //On ajoute le domaine de connaissance au sportif
    domaineCompetenceSportifMetier.add(id_sportif, id_domaine_competence, id_niveau_domaine_competence)
      .then((domaine_competence_sportif) => {
        if (!domaine_competence_sportif) {
          res.send(404, {
            error: 'Erreur lors de l\'ajout du domaine de compétence'
          });
          return next();
        }

        res.send(200, {
          domaine_competence_sportif: domaine_competence_sportif
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

  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accèder à cette fonctionnalité',
      });
      return next();
    }

    const id_domaine_competence_sportif = req.params.id;
    if (!id_domaine_competence_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du domaine de connaissance'
      });
      return next();
    }

    const domaineCompetenceSportifMetier = new DomaineCompetenceSportifMetier(elasticsearch);

    //On supprime le domaine de connaissance au sportif
    domaineCompetenceSportifMetier.remove(id_sportif, id_domaine_competence_sportif)
      .then(() => {
        res.send(200);
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

module.exports = DomaineCompetenceSportifController;