import UserMetier from "../metier/UserMetier";
import elasticsearch from "../db";

class UserController {

  constructor(server) {
    //Création routes
    server.get("/login", this.logIn);
    server.get("/logout", this.logOut);
  }

  /**
   * @api {get} /entreprise Connexion d'un utilisateur
   * @apiName Connexion d'un utilisateur
   * @apiGroup User
   *
   * @apiExample Body :
   *      {
     *          email : "email",
     *          password : "password"
     *      }
   *
   * @apiSuccess
   *      {String} Token.
   * @apiError
   *       {String} Message d'erreur.
   */
  logIn(req, res, next) {
    if (!req.query.email) {
      res.send(404, {
        error: 'Vous devez spécifier un email'
      });
      return next();
    }

    //On vérifie qu'on ait le mot de passe
    if (!req.query.password) {
      res.send(404, {
        error: 'Vous devez spécifier un mot de passe'
      });
      return next();
    }

    //On récup les informations
    const email = req.query.email;
    const password = req.query.password;

    const userMetier = new UserMetier(elasticsearch);
    return userMetier.logIn(email, password)
      .then((results) => {
        res.send(200, {
          token: results.token,
          type_user: results.type,
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
   * @api {get} /logout Déconnexion d'un utilisateur
   * @apiName Déconnexion d'un utilisateur
   * @apiGroup User
   *
   * @apiExample Body :
   *      {
     *          token : "token"
     *      }
   *
   * @apiSuccess
   *      {String} Message de succès.
   * @apiError
   *       {String} Message d'erreur.
   */
  logOut(req, res, next) {
    const userMetier = new UserMetier(elasticsearch);
    userMetier.logOut((error, results) => {
      if (error) {
        res.send(error.status, error.message);
        return next();
      }

      res.send(results.status, results.message);
      return next();
    });
  }
}

module.exports = UserController;
