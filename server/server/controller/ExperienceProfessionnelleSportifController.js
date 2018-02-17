/**
 * Created by pierremarsot on 20/01/2017.
 */
import elasticsearch from '../db';
import ExperienceProfessionnelleSportifMetier from '../metier/ExperienceProfessionnelleSportifMetier';

class ExperienceProfessionnelleSportifController {
  constructor(server) {
    server.get('/api/sportif/experience/professionnelle', this.find);
    server.post('/api/sportif/experience/professionnelle', this.add);
    server.del('/api/sportif/experience/professionnelle/:id', this.remove);
    server.put('/api/sportif/experience/professionnelle/:id', this.update);
  }

  update(req, res, next)
  {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour acéder à cette ressource'
      });
      return next();
    }

    const id_experience_professionnelle_sportif = req.params.id;
    if(!id_experience_professionnelle_sportif)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle',
      });
      return next();
    }

    const date_debut_experience_professionnelle_sportif = req.params.date_debut_experience_professionnelle_sportif;
    if (!date_debut_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de début'
      });
      return next();
    }

    const lieu_experience_professionnelle_sportif = req.params.lieu_experience_professionnelle_sportif;
    if (!lieu_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du lieu'
      });
      return next();
    }

    const nom_entreprise_experience_professionnelle_sportif = req.params.nom_entreprise_experience_professionnelle_sportif;
    if (!nom_entreprise_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du nom de l\'entreprise'
      });
      return next();
    }

    const metier_experience_professionnelle_sportif = req.params.metier_experience_professionnelle_sportif;
    if (!metier_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du titre du poste'
      });
      return next();
    }

    const date_fin_experience_professionnelle_sportif = req.params.date_fin_experience_professionnelle_sportif;
    const description_poste_experience_professionnelle_sportif = req.params.description_poste_experience_professionnelle_sportif;
    const mission_poste_experience_professionnelle_sportif = req.params.mission_poste_experience_professionnelle_sportif;
    const realisation_poste_experience_professionnelle_sportif = req.params.realisation_poste_experience_professionnelle_sportif;
    const toujours_en_poste_experience_professionnelle_sportif = req.params.toujours_en_poste_experience_professionnelle_sportif;

    const experience_professionnelle_sportif_metier = new ExperienceProfessionnelleSportifMetier(elasticsearch);
    experience_professionnelle_sportif_metier.update(
      id_sportif,
      id_experience_professionnelle_sportif,
      date_debut_experience_professionnelle_sportif,
      date_fin_experience_professionnelle_sportif,
      lieu_experience_professionnelle_sportif,
      nom_entreprise_experience_professionnelle_sportif,
      metier_experience_professionnelle_sportif,
      description_poste_experience_professionnelle_sportif,
      mission_poste_experience_professionnelle_sportif,
      realisation_poste_experience_professionnelle_sportif,
      toujours_en_poste_experience_professionnelle_sportif,
    )
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

  find(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour acéder à cette ressource'
      });
      return next();
    }

    const experience_professionnelle_sportif_metier = new ExperienceProfessionnelleSportifMetier(elasticsearch);
    experience_professionnelle_sportif_metier.find(id_sportif)
      .then((experience_professionnelle_sportif) => {
        res.send(200, {
          experience_professionnelle_sportif: experience_professionnelle_sportif,
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

  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour acéder à cette ressource'
      });
      return next();
    }

    const id_experience_professionnelle_sportif = req.params.id;
    if (!id_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de l\'experience professionnelle'
      });
      return next();
    }

    const experience_professionnelle_sportif_metier = new ExperienceProfessionnelleSportifMetier(elasticsearch);
    experience_professionnelle_sportif_metier.remove(id_sportif, id_experience_professionnelle_sportif)
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

  add(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour acéder à cette ressource'
      });
      return next();
    }

    const date_debut_experience_professionnelle_sportif = req.params.date_debut_experience_professionnelle_sportif;
    if (!date_debut_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de début'
      });
      return next();
    }

    const lieu_experience_professionnelle_sportif = req.params.lieu_experience_professionnelle_sportif;
    if (!lieu_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du lieu'
      });
      return next();
    }

    const nom_entreprise_experience_professionnelle_sportif = req.params.nom_entreprise_experience_professionnelle_sportif;
    if (!nom_entreprise_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du nom de l\'entreprise'
      });
      return next();
    }

    const metier_experience_professionnelle_sportif = req.params.metier_experience_professionnelle_sportif;
    if (!metier_experience_professionnelle_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du titre du poste'
      });
      return next();
    }

    const date_fin_experience_professionnelle_sportif = req.params.date_fin_experience_professionnelle_sportif;
    const description_poste_experience_professionnelle_sportif = req.params.description_poste_experience_professionnelle_sportif;
    const mission_poste_experience_professionnelle_sportif = req.params.mission_poste_experience_professionnelle_sportif;
    const realisation_poste_experience_professionnelle_sportif = req.params.realisation_poste_experience_professionnelle_sportif;
    const toujours_en_poste_experience_professionnelle_sportif = req.params.toujours_en_poste_experience_professionnelle_sportif;

    const experience_professionnelle_sportif_metier = new ExperienceProfessionnelleSportifMetier(elasticsearch);

    experience_professionnelle_sportif_metier.add(
      id_sportif,
      date_debut_experience_professionnelle_sportif,
      date_fin_experience_professionnelle_sportif,
      lieu_experience_professionnelle_sportif,
      nom_entreprise_experience_professionnelle_sportif,
      metier_experience_professionnelle_sportif,
      description_poste_experience_professionnelle_sportif,
      mission_poste_experience_professionnelle_sportif,
      realisation_poste_experience_professionnelle_sportif,
      toujours_en_poste_experience_professionnelle_sportif,
    )
      .then((id_experience_professionnelle_sportif) => {
        res.send(200, {
          id_experience_professionnelle_sportif: id_experience_professionnelle_sportif,
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

module.exports = ExperienceProfessionnelleSportifController;