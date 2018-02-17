/**
 * Created by pierremarsot on 29/03/2017.
 */
import elasticsearch from '../db';
import DomaineCompetenceMetier from '../metier/DomaineCompetenceMetier';

class DomaineCompetenceController {
  constructor(server) {
    server.get('/domaine/competence/:name', this.search);
  }

  search(req, res, next) {
    const name = req.params.name;
    if (!name) {
      res.send(404, {
        error: 'Vous devez renseigner une recherche'
      });
      return next();
    }

    const domaineCompetenceMetier = new DomaineCompetenceMetier(elasticsearch);
    domaineCompetenceMetier.search(name)
      .then((domaines_competences) => {
        res.send(200, {
          domaines_competences: domaines_competences
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

module.exports = DomaineCompetenceController;