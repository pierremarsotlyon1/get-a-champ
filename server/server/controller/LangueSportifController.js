/**
 * Created by pierremarsot on 21/02/2017.
 */
import elasticsearch from '../db';
import LangueSportifMetier from '../metier/LangueSportifMetier';

class LangueSportifController {
  constructor(server) {
    server.get('/api/sportif/langues', this.find);
    server.post('/api/sportif/langues', this.add);
    server.del('/api/sportif/langues/:id', this.remove);
  }

  find(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const langueSportifMetier = new LangueSportifMetier(elasticsearch);
    langueSportifMetier.find(id_sportif)
      .then((langues_sportif) => {
        res.send(200, {
          langues_sportif: langues_sportif,
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

  add(req, res, next) {

    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_langue = req.params.id_langue;
    if(!id_langue)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la langue',
      });
      return next();
    }

    const id_niveau_langue = req.params.id_niveau_langue;
    if(!id_niveau_langue)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du niveau de la langue',
      });
      return next();
    }

    const langueSportifMetier = new LangueSportifMetier(elasticsearch);
    langueSportifMetier.add(id_sportif, id_langue, id_niveau_langue)
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

  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_langue = req.params.id;
    if(!id_langue)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la langue',
      });
      return next();
    }

    const langueSportifMetier = new LangueSportifMetier(elasticsearch);
    langueSportifMetier.remove(id_sportif, id_langue)
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
}

module.exports = LangueSportifController;