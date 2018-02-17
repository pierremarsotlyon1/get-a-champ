/**
 * Created by pierremarsot on 21/02/2017.
 */
import elasticsearch from '../db';
import LangueMetier from '../metier/LangueMetier';

class LangueController {
  constructor(server) {
    server.get('/langue/search/:langue', this.search);
    server.get('/langue/:id', this.get);
  }

  search(req, res, next) {
    const langue = req.params.langue;
    if (!langue) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la langue'
      });
      return next();
    }

    const langueMetier = new LangueMetier(elasticsearch);
    langueMetier.search(langue)
      .then((langues) => {
        res.send(200, {
          langues: langues
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

  get(req, res, next) {
    const id_langue = req.params.id;
    if (!id_langue) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la langue'
      });
      return next();
    }

    const langueMetier = new LangueMetier(elasticsearch);
    langueMetier.get(id_langue)
      .then((langue) => {
        res.send(200, {
          langue: langue
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

module.exports = LangueController;