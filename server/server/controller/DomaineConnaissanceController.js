/**
 * Created by pierremarsot on 21/01/2017.
 */
import DomaineConnaissanceMetier from '../metier/DomaineConnaissanceMetier';
import elasticsearch from '../db';

class DomaineConnaissanceController {
  constructor(server) {
    server.get('/domaine/connaissance/:nom', this.search);
  }

  /**
   * @api {get} /domaine/connaissance/:nom Search
   * @apiGroup Domaine de connaissance
   * @apiName Search
   * @apiSuccess
   *      {Array} domaines_connaissances - Array des documents des domaines de connaissances trouvé
   * @apiError
   *       {String} error - Message d'erreur.
   */
  search(req, res, next) {
    //On récup le nom recherché du domaine
    const nom_domaine_connaissance = req.params.nom;
    if (!nom_domaine_connaissance) {
      res.send(404, {
        error: 'Erreur lors de la récupération du nom du domaine de connaissance'
      });
      return next();
    }

    const domaineConnaissanceMetier = new DomaineConnaissanceMetier(elasticsearch);
    //On cherche le domaine via le nom de domaine de connaissance
    domaineConnaissanceMetier.search(nom_domaine_connaissance)
      .then((domaines_connaissances) => {
        res.send(200, {
          domaines_connaissances: domaines_connaissances
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
   * @api {get} /domaine/connaissance Find
   * @apiGroup Domaine de connaissance
   * @apiName Find
   * @apiSuccess
   *      {Array} domaines_connaissances - Array des documents des domaines de connaissances
   * @apiError
   *       {String} error - Message d'erreur.
   */
  find(req, res, next) {
    const domaineConnaissanceMetier = new DomaineConnaissanceMetier(elasticsearch);
    //On récup tous les domaines de connaissances
    domaineConnaissanceMetier.find()
      .then((domaines_connaissances) => {
        res.send(200, {
          domaines_connaissances: domaines_connaissances
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
   * @api {get} /domaine/connaissance/:id Get
   * @apiGroup Domaine de connaissance
   * @apiName Get
   * @apiSuccess
   *      {Object} domaine_connaissance - Document du domaine de connaissance
   * @apiError
   *       {String} error - Message d'erreur.
   */
  get(req, res, next) {
    const id_domaine_connaissance = req.params.id;
    if (!id_domaine_connaissance) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du domaine de connaissance'
      });
      return next();
    }

    const domaineConnaissanceMetier = new DomaineConnaissanceMetier(elasticsearch);

    //On récup le domaine de connaissance via l'id
    domaineConnaissanceMetier.get(id_domaine_connaissance)
      .then((domaine_connaissance) => {
        res.send(200, {
          domaine_connaissance: domaine_connaissance
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

module.exports = DomaineConnaissanceController;