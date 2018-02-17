/**
 * Created by pierremarsot on 22/02/2017.
 */
import elasticsearch from '../db';
import TypeSponsoringMetier from '../metier/TypeSponsoringMetier';

class TypeSponsoringController {
  constructor(server) {
    server.get('/type/sponsoring', this.find);
    server.get('/type/sponsoring/:id', this.get);
  }

  find(req, res, next) {
    const typeSponsoringMetier = new TypeSponsoringMetier(elasticsearch);
    typeSponsoringMetier.find()
      .then((types_sponsoring) => {
        res.send(200, {
          types_sponsoring: types_sponsoring,
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
    const id_type_sponsoring = req.params.id;
    if(!id_type_sponsoring)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du type de sponsoring'
      });
      return next();
    }

    const typeSponsoringMetier = new TypeSponsoringMetier(elasticsearch);
    typeSponsoringMetier.get(id_type_sponsoring)
      .then((type_sponsoring) => {
        res.send(200, {
          type_sponsoring: type_sponsoring,
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

module.exports = TypeSponsoringController;