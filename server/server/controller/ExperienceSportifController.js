/**
 * Created by pierremarsot on 18/01/2017.
 */
import elasticsearch from '../db';
import ExperienceSportifMetier from '../metier/ExperienceSportifMetier';

class ExperienceSportifController {
  constructor(server) {
    server.get('/api/experience', this.find);
    server.post('/api/experience', this.add);
    server.del('/api/experience/:id', this.remove);
    server.put('/api/experience/:id', this.update);
  }

  update(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const id_experience = req.params.id;
    if (!id_experience) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de l\'experience sportive',
      });
      return next();
    }

    const lieu_experience = req.params._source.lieu_experience_sportif;
    if (!lieu_experience) {
      res.send(404, {
        error: 'Vous devez spécifier un lieu d\'experience',
      });
      return next();
    }

    const id_sport_experience = req.params._source.sport_experience_sportif;
    if (!id_sport_experience) {
      res.send(404, {
        error: 'Vous devez spécifier un sport',
      });
      return next();
    }

    const date_debut_experience = req.params._source.date_debut_experience_sportif;
    if (!date_debut_experience) {
      res.send(404, {
        error: 'Vous devez spécifier une date de début d\'experience',
      });
      return next();
    }

    const date_fin_experience = req.params._source.date_fin_experience_sportif;
    if (!date_fin_experience) {
      res.send(404, {
        error: 'Vous devez spécifier une date de fin d\'experience',
      });
      return next();
    }

    const nom_club_experience_sportif = req.params._source.nom_club_experience_sportif;
    if (!nom_club_experience_sportif) {
      res.send(404, {
        error: 'Vous devez spécifier un nom de club',
      });
      return next();
    }

    const description_experience = req.params._source.description_experience_sportif;

    const experienceSportifMetier = new ExperienceSportifMetier(elasticsearch);
    experienceSportifMetier.update(
      id_sportif,
      id_experience,
      lieu_experience,
      id_sport_experience,
      date_debut_experience,
      date_fin_experience,
      description_experience,
      nom_club_experience_sportif)
      .then((response) => {
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
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const id_experience_sportif = req.params.id;
    if (!id_experience_sportif) {
      res.send(409, {
        error: 'Erreur lors de la récupération de l\'experience à supprimer'
      });
      return next();
    }

    const experienceSportifMetier = new ExperienceSportifMetier(elasticsearch);
    experienceSportifMetier.remove(id_sportif, id_experience_sportif)
      .then((id_experience_sportif) => {
        res.send(200, {
          id_experience_sportif: id_experience_sportif,
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
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const lieu_experience = req.params._source.lieu_experience_sportif;
    if (!lieu_experience) {
      res.send(404, {
        error: 'Vous devez spécifier un lieu d\'experience',
      });
      return next();
    }

    const id_sport_experience = req.params._source.sport_experience_sportif;
    if (!id_sport_experience) {
      res.send(404, {
        error: 'Vous devez spécifier un sport',
      });
      return next();
    }

    const date_debut_experience = req.params._source.date_debut_experience_sportif;
    if (!date_debut_experience) {
      res.send(404, {
        error: 'Vous devez spécifier une date de début d\'experience',
      });
      return next();
    }

    const date_fin_experience = req.params._source.date_fin_experience_sportif;
    if (!date_fin_experience) {
      res.send(404, {
        error: 'Vous devez spécifier une date de fin d\'experience',
      });
      return next();
    }

    const nom_club_experience_sportif = req.params._source.nom_club_experience_sportif;
    if (!nom_club_experience_sportif) {
      res.send(404, {
        error: 'Vous devez spécifier un nom de club',
      });
      return next();
    }

    const description_experience = req.params._source.description_experience_sportif;

    const experienceSportifMetier = new ExperienceSportifMetier(elasticsearch);
    experienceSportifMetier.add(
      id_sportif,
      lieu_experience,
      id_sport_experience,
      date_debut_experience,
      date_fin_experience,
      description_experience,
      nom_club_experience_sportif
    )
      .then((id_experience_sportif) => {
        res.send(200, {
          id_experience_sportif: id_experience_sportif,
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

  find(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const experienceSportifMetier = new ExperienceSportifMetier(elasticsearch);
    experienceSportifMetier.find(id_sportif)
      .then((experiences_sportif) => {
        res.send(200, {
          experiences_sportif: experiences_sportif,
        });

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      })
  }
}

module.exports = ExperienceSportifController;