/**
 * Created by pierremarsot on 28/01/2017.
 */

import DomaineConnaissanceSportifMetier from '../metier/DomaineConnaissanceSportifMetier';
import elasticsearch from '../db';

class DomaineConnaissanceSportifController {
  constructor(server) {
    server.get('/api/sportif/domaines/connaissances', this.find);
    server.post('/api/sportif/domaines/connaissance', this.add);
    server.del('/api/sportif/domaines/connaissance/:id', this.remove);
  }

  /**
   * @api {get} /api/sportif/domaines/connaissances Find
   * @apiGroup Domaine connaissance sportive
   * @apiName Find
   * @apiSuccess
   *      {Array} domaines_connaissance_sportif - Array des domaines de connaissance du sportif
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

    const domaineConnaissanceSportifMetier = new DomaineConnaissanceSportifMetier(elasticsearch);

    //On récup tous les domaines de connaissances du sportif
    domaineConnaissanceSportifMetier.find(id_sportif)
      .then((domaines_connaissance_sportif) => {
        res.send(200, {
          domaines_connaissance_sportif: domaines_connaissance_sportif,
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

  /**
   * @api {post} /api/sportif/domaines/connaissance Add
   * @apiGroup Domaine connaissance sportive
   * @apiName Add
   * @apiExample Body :
   *      {
     *          id_domaine_connaissance: String,
     *          id_niveau_domaine_connaissance: String
     *      }
   * @apiSuccess
   *      {int} id_domaine_connaissance - Id du domaine de connaissance ajouté
   * @apiError
   *       {String} error - Message d'erreur.
   */
  add(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accèder à cette fonctionnalité',
      });
      return next();
    }

    const id_domaine_connaissance = req.params.id_domaine_connaissance;
    if (!id_domaine_connaissance) {
      res.send(404, {
        error: 'Erreur lors de la récupération du domaine de connaissance'
      });
      return next();
    }

    const id_niveau_domaine_connaissance = req.params.id_niveau_domaine_connaissance;
    if (!id_niveau_domaine_connaissance) {
      res.send(404, {
        error: 'Erreur lors de la récupération du niveau du domaine de connaissance'
      });
      return next();
    }

    const domaineConnaissanceSportifMetier = new DomaineConnaissanceSportifMetier(elasticsearch);

    //On ajoute le domaine de connaissance au sportif
    domaineConnaissanceSportifMetier.add(id_sportif, id_domaine_connaissance, id_niveau_domaine_connaissance)
      .then((domaine_connaissance_sportif) => {
        if (!domaine_connaissance_sportif) {
          res.send(404, {
            error: 'Erreur lors de l\'ajout du domaine de connaissance'
          });
          return next();
        }

        res.send(200, {
          domaine_connaissance_sportif: domaine_connaissance_sportif
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

  /**
   * @api {delete} /api/sportif/domaines/connaissance/:id Suppression
   * @apiGroup Domaine connaissance sportive
   * @apiName Suppression
   * @apiError
   *       {String} error - Message d'erreur.
   */
  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accèder à cette fonctionnalité',
      });
      return next();
    }

    const id_domaine_connaissance_sportif = req.params.id;
    if (!id_domaine_connaissance_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du domaine de connaissance'
      });
      return next();
    }

    const domaineConnaissanceSportifMetier = new DomaineConnaissanceSportifMetier(elasticsearch);

    //On supprime le domaine de connaissance au sportif
    domaineConnaissanceSportifMetier.remove(id_sportif, id_domaine_connaissance_sportif)
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

module.exports = DomaineConnaissanceSportifController;