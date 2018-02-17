/**
 * Created by pierremarsot on 31/01/2017.
 */
import InterventionEntrepriseSportifMetier from '../metier/InterventionEntrepriseSportifMetier';
import elasticsearch from '../db';

class InterventionEntrepriseSportifController {
  constructor(server) {
    server.get('/api/user/sportif/intervention/entreprise/animation/formation', this.find_animation_formation);
    server.get('/api/search/sportif/animation/formation', this.search_sportif_animation_formation);
    server.post('/api/user/sportif/intervention/entreprise/animation/formation', this.add_animation_formation);
    server.del('/api/user/sportif/intervention/entreprise/animation/formation/:id', this.remove_animation_formation);
    server.get('/api/user/sportif/intervention/entreprise/animation/incentive', this.find_animation_incentive);
    server.get('/api/search/sportif/animation/incentive', this.search_animation_incentive);
    server.post('/api/user/sportif/intervention/entreprise/animation/incentive', this.add_animation_incentive);
    server.del('/api/user/sportif/intervention/entreprise/animation/incentive/:id', this.remove_animation_incentive);
    server.get('/api/user/sportif/intervention/entreprise/animation/conference', this.find_animation_conference);
    server.get('/api/search/sportif/animation/conference', this.search_animation_conference);
    server.post('/api/user/sportif/intervention/entreprise/animation/conference', this.add_animation_conference);
    server.del('/api/user/sportif/intervention/entreprise/animation/conference/:id', this.remove_animation_conference);
  }

  find_animation_formation(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.find_animation_formation(id_sportif)
      .then((animations_formation_sportif) => {
        res.send(200, {
          animations_formation_sportif: animations_formation_sportif,
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

  search_sportif_animation_formation(req, res, next) {
    const {idThematique, montant_max} = req.params;
    if (!idThematique) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique',
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.search_animation_formation(
      idThematique,
      montant_max
    )
      .then((sportif) => {
        res.send(200, {
          search_sportif_animation_formation: sportif,
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

  add_animation_formation(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_thematique_animation_formation = req.params.id_thematique_animation_formation;
    if (!id_thematique_animation_formation) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique'
      });
      return next();
    }

    const animer_seul = req.params.animer_seul;
    if (animer_seul === undefined) {
      res.send(404, {
        error: 'Vous devez spécifier si vous pouvez animer seul cette formation'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.add_animation_formation(id_sportif, id_thematique_animation_formation, animer_seul)
      .then((added) => {
        if (added) {
          res.send(200);
        }
        else {
          res.send(404);
        }

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  remove_animation_formation(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_thematique_animation_formation = req.params.id;
    if (!id_thematique_animation_formation) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.remove_animation_formation(id_sportif, id_thematique_animation_formation)
      .then((removed) => {
        if (removed) {
          res.send(200);
        }
        else {
          res.send(404);
        }

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  find_animation_incentive(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.find_animations_incentive_evenementiel(id_sportif)
      .then((animations_formation_incentive_sportif) => {
        res.send(200, {
          animations_formation_incentive_evenementiel_sportif: animations_formation_incentive_sportif,
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

  search_animation_incentive(req, res, next)
  {
    const {idThematique, montant_max} = req.params;
    if (!idThematique) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique',
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.search_animation_incentive(
      idThematique,
      montant_max
    )
      .then((sportif) => {
        res.send(200, {
          search_sportif_animation_incentive: sportif,
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

  add_animation_incentive(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_thematique_animation_incentive = req.params.id_thematique_animation_incentive;
    if (!id_thematique_animation_incentive) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique'
      });
      return next();
    }

    const animer_seul = req.params.animer_seul;
    if (animer_seul === undefined) {
      res.send(404, {
        error: 'Vous devez spécifier si vous pouvez animer seul cette formation'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.add_animation_incentive_evenementiel(
      id_sportif,
      id_thematique_animation_incentive,
      animer_seul)
      .then((added) => {
        if (added) {
          res.send(200);
        }
        else {
          res.send(404);
        }

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  remove_animation_incentive(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_thematique_animation_incentive = req.params.id;
    if (!id_thematique_animation_incentive) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.remove_animation_incentive_evenementiel(id_sportif, id_thematique_animation_incentive)
      .then((removed) => {
        if (removed) {
          res.send(200);
        }
        else {
          res.send(404);
        }

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  find_animation_conference(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.find_animations_conference(id_sportif)
      .then((animations_conference_sportif) => {
        res.send(200, {
          animations_conference_sportif: animations_conference_sportif,
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

  search_animation_conference(req, res, next)
  {
    const {idThematique, montant_max} = req.params;
    if (!idThematique) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique',
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.search_animation_conference(
      idThematique,
      montant_max
    )
      .then((sportif) => {
        res.send(200, {
          search_sportif_animation_conference: sportif,
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

  add_animation_conference(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_thematique_animation_conference = req.params.id_thematique_animation_conference;
    if (!id_thematique_animation_conference) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique'
      });
      return next();
    }

    const montant_minimum = req.params.montant_minimum;
    if (!montant_minimum || montant_minimum === undefined) {
      res.send(404, {
        error: 'Vous devez spécifier un montant minimum de rémunération'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.add_animation_conference(id_sportif, id_thematique_animation_conference, montant_minimum)
      .then((added) => {
        if (added) {
          res.send(200);
        }
        else {
          res.send(404);
        }

        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  remove_animation_conference(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const id_thematique_animation_conference = req.params.id;
    if (!id_thematique_animation_conference) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la thématique'
      });
      return next();
    }

    const interventionEntrepriseSportifMetier = new InterventionEntrepriseSportifMetier(elasticsearch);
    interventionEntrepriseSportifMetier.remove_animation_conference(id_sportif, id_thematique_animation_conference)
      .then((removed) => {
        if (removed) {
          res.send(200);
        }
        else {
          res.send(404);
        }

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

module.exports = InterventionEntrepriseSportifController;