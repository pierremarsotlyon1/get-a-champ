/**
 * Created by pierremarsot on 14/01/2017.
 */
import CategorieSportifMetier from '../metier/CategorieSportifMetier';
import elasticsearch from '../db';

class CategorieSportifController {
  constructor(server) {
    server.get("/categorie_sportif", this.find);
  }

  /**
   * @api {get} /categorie_sportif Permet de récupérer toutes les catégories sportives
   * @apiName Catégorie sportive
   * @apiSuccess
   *      {Array} categories_sportif - Array contenant les documents des catégories sportives.
   * @apiError
   *       {String} Message d'erreur.
   */
  find(req, res, next) {
    //On instancie le metier des catégories et on récupère tout
    const categorieSportifMetier = new CategorieSportifMetier(elasticsearch);
    categorieSportifMetier.getAll()
      .then((categories_sportif) => {
        res.send(200, {
          categories_sportif: categories_sportif
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

module.exports = CategorieSportifController;
