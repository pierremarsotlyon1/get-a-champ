import elasticsearch from "../db";
import EntrepriseMetier from "../metier/EntrepriseMetier";

class EntrepriseController {
  constructor(server) {
    server.post("/user/entreprise", this.register);
    server.get('/api/profil/entreprise', this.get);
    server.put('/api/profil/entreprise', this.update);
  }

  update(req, res, next) {
    const id_entreprise = req.id_user;
    if (!id_entreprise) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const profil_entreprise = req.params.profil_entreprise;
    if (!profil_entreprise) {
      res.send(404, {
        error: 'Erreur lors de la récupération des informations de votre profil'
      });
      return next();
    }

    const entrepriseMetier = new EntrepriseMetier(elasticsearch);
    entrepriseMetier.updateProfil(id_entreprise, profil_entreprise)
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

  get(req, res, next) {
    const id_entreprise = req.id_user;
    if (!id_entreprise) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const entrepriseMetier = new EntrepriseMetier(elasticsearch);
    entrepriseMetier.getById(id_entreprise)
      .then((profil_entreprise) => {
        res.send(200, {
          profil_entreprise: profil_entreprise,
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
   * @api {post} /entreprise Ajouter une entreprise
   * @apiName Ajouter une entreprise
   * @apiGroup User
   *
   * @apiExample Body :
   *      {
     *          nomEntreprise : "nomEntreprise",
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
    const nom_gerant = req.params.nom_gerant;
    if (!nom_gerant) {
      res.send(404, {
        error: 'Vous devez spécifier un nom de gérant'
      });
      return next();
    }

    const prenom_gerant = req.params.prenom_gerant;
    if (!prenom_gerant) {
      res.send(404, {
        error: 'Vous devez spécifier un prénom'
      });
      return next();
    }

    const siret_entreprise = req.params.siret_entreprise;
    if (!siret_entreprise) {
      res.send(404, {
        error: 'VOus devez spécifier un numéro de siret'
      });
      return next();
    }

    const email = req.params.email;
    if (!email) {
      res.send(404, {
        error: 'Vous devez spécifier un email'
      });
      return next();
    }

    const password = req.params.password;
    if (!password) {
      res.send(404, {
        error: 'Vous devez spécifier un mot de passe'
      });
      return next();
    }

    const confirm_password = req.params.confirm_password;
    if (!confirm_password) {
      res.send(404, {
        error: 'Vous devez confirmer votre mot de passe'
      });
      return next();
    }

    const nom_entreprise = req.params.nom_entreprise;
    if (!nom_entreprise) {
      res.send(404, {
        error: 'Vous devez spécifier un nom d\'entreprise'
      });
      return next();
    }

    const entrepriseMetier = new EntrepriseMetier(elasticsearch);
    entrepriseMetier.add(nom_gerant, prenom_gerant, siret_entreprise, email, password, confirm_password,
      nom_entreprise)
      .then((token) => {
        res.send(200, {
          token: token
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

module.exports = EntrepriseController;