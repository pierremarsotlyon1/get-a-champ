import SportifMetier from "../metier/SportifMetier";
import elasticsearch from '../db';

class SportifController {
  constructor(server) {
    server.post("/user/sportif", this.register);
    server.put('/api/user/sportif', this.update);
    server.get("/api/user/sportif", this.get_profil_sportif);
    server.get("/api/user/sportif/resultats/test/short", this.getResultatsShortTest);
    server.get("/api/user/sportif/resultats/test/full", this.getResultatsFullTest);
  }

  getResultatsShortTest(req, res, next){
    const id_user = req.id_user;
    if (!id_user) {
      res.send(403, {
        error: 'Vous n\'êtes pas autorisé à accéder à cette page'
      });
      return next();
    }

    const sportifMetier = new SportifMetier(elasticsearch);
    sportifMetier.getResultatsShortTest(id_user)
      .then((resultatsShortTest) => {
        res.send(200, {
          resultatsShortTest: resultatsShortTest
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error
        });
        return next();
      })
  }

  getResultatsFullTest(req, res, next){
    const id_user = req.id_user;
    if (!id_user) {
      res.send(403, {
        error: 'Vous n\'êtes pas autorisé à accéder à cette page'
      });
      return next();
    }

    const sportifMetier = new SportifMetier(elasticsearch);
    sportifMetier.getResultatsFullTest(id_user)
      .then((resultatsFullTest) => {
        res.send(200, {
          resultatsFullTest: resultatsFullTest
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error
        });
        return next();
      })
  }

  get_profil_sportif(req, res, next) {
    const id_user = req.id_user;
    if (!id_user) {
      res.send(409, {
        error: 'Vous n\'êtes pas autorisé à accéder à cette page'
      });
      return next();
    }

    const sportifMetier = new SportifMetier(elasticsearch);
    sportifMetier.get_profil(id_user)
      .then((profil_sportif) => {
        res.send(200, {
          profil_sportif: profil_sportif
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error
        });
        return next();
      })
  }

  update(req, res, next) {
    const id_user = req.id_user;
    if(!id_user)
    {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const nom_sportif = req.params.nom_sportif;
    if (!nom_sportif) {
      res.send(404, {
        error: 'Vous devez spécifier un nom'
      });
      return next();
    }

    const prenom_sportif = req.params.prenom_sportif;
    if (!prenom_sportif) {
      res.send(404, {
        error: 'Vous devez spécifier un prénom'
      });
      return next();
    }

    const lieu_naissance_sportif = req.params.lieu_naissance_sportif;
    const date_naissance_sportif = req.params.date_naissance_sportif;
    const sport_sportif = req.params.current_sport_sportif;
    const categorie_sportif = req.params.categorie_sportif;
    const situation_sportif = req.params.situation_sportif;
    const centres_interet_sportif = req.params.centres_interets_sportif;
    const numero_ss_sportif = req.params.numero_ss_sportif;
    const situation_entreprise_sportif = req.params.situation_entreprise_sportif;
    const recherche_situation_sportif = req.params.recherche_situation_sportif;

    const sportifMetier = new SportifMetier(elasticsearch);
    sportifMetier.update(
      id_user,
      nom_sportif,
      prenom_sportif,
      lieu_naissance_sportif,
      date_naissance_sportif,
      sport_sportif,
      categorie_sportif,
      situation_sportif,
      centres_interet_sportif,
      numero_ss_sportif,
      situation_entreprise_sportif,
      recherche_situation_sportif)
      .then((profil_sportif) => {
        res.send(200, {
          profil_sportif: profil_sportif
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
   * @api {post} /sportif Ajouter un sportif
   * @apiName Ajouter un sportif
   * @apiGroup User
   *
   * @apiExample Body :
   *      {
     *          nom : "nom",
     *          prenom : "prenom",
     *          email : "email",
     *          password : "password"
     *      }
   *
   * @apiSuccess
   *      {String} Token.
   * @apiError
   *       {String} Message d'erreur.
   */
  register(req, res, next) {
    const nom = req.params.nom;
    if (!nom) {
      res.send(404, {
        error: 'Vous devez spécifier un nom',
      });
      return next();
    }

    const prenom = req.params.prenom;
    if (!prenom) {
      res.send(404, {
        error: 'Vous devez spécifier un prénom',
      });
      return next();
    }

    /*const siret = req.body.siret;
     if(!siret)
     {
     res.send(404, {
     error: 'Vous devez spécifier un numéro de siret',
     });
     return next();
     }*/

    const email = req.params.email;
    if (!email) {
      res.send(404, {
        error: 'Vous devez spécifier un email',
      });
      return next();
    }

    const password = req.params.password;
    if (!password) {
      res.send(404, {
        error: 'Vous devez spécifier un mot de passe',
      });
      return next();
    }

    const confirm_password = req.params.confirm_password;
    if (!confirm_password) {
      res.send(404, {
        error: 'Vous devez confirmer votre mot de passe',
      });
      return next();
    }

    if (password !== confirm_password) {
      res.send(404, {
        error: 'Vos mot de passe ne sont pas identiques',
      });
      return next();
    }

    const sportifMetier = new SportifMetier(elasticsearch);
    sportifMetier.add(nom, prenom, email, password, confirm_password)
      .then((results) => {
        res.send(200, {
          token: results,
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

module.exports = SportifController;