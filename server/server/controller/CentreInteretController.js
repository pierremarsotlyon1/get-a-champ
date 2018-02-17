/**
 * Created by pierremarsot on 14/01/2017.
 */
import CentreInteretMetier from '../metier/CentreInteretMetier';
import elasticsearch from '../db';

class CentreInteretController {
  constructor(server)
  {
    server.get("/centres_interet", this.find);
  }

  /**
   * @api {get} /centres_interet Permet de récupérer tous les centres d'interet
   * @apiName Centres d'interet
   * @apiSuccess
   *      {Array} centres_interet - Array contenant les documents des centres d'interet.
   * @apiError
   *       {String} Message d'erreur.
   */
  find(req, res, next)
  {
    //On instancie le métier des centres d'intêrets et on recup tout
    const centreInteretController = new CentreInteretMetier(elasticsearch);
    centreInteretController.find()
      .then((centres_interet) => {
        res.send(200, {
          centres_interet: centres_interet
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

module.exports = CentreInteretController;