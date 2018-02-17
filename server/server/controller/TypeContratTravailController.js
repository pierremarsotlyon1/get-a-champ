/**
 * Created by pierremarsot on 25/03/2017.
 */
import TypeContratTravailMetier from '../metier/TypeContratTravailMetier';
import elasticsearch from '../db';

class TypeContratTravailController {
  constructor(server) {
    server.get('/type_contrat_travail', this.find);
  }

  find(req, res, next) {
    const typeContratTravailMetier = new TypeContratTravailMetier(elasticsearch);
    typeContratTravailMetier.find()
      .then((types_contrat_travail) => {
        res.send(200, {
          types_contrat_travail: types_contrat_travail,
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

module.exports = TypeContratTravailController;