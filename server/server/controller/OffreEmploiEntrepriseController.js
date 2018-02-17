/**
 * Created by pierremarsot on 25/03/2017.
 */
import elasticsearch from '../db';
import OffreEmploiEntrepriseMetier from '../metier/OffreEmploiEntrepriseMetier';

class OffreEmploiEntrepriseController {
  constructor(server) {
    server.post('/api/entreprise/offre_emploi', this.add);
    server.get('/api/entreprise/offre_emploi', this.find);
    server.del('/api/entreprise/offre_emploi/:id', this.remove);
    server.get('/api/entreprise/offre_emploi/:id/matching', this.search);
  }

  search(req, res, next){
    const id_entreprise = req.id_user;
    if (!id_entreprise) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const id_offre_emploi = req.params.id;
    if (!id_offre_emploi) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de l\'offre d\'emploi',
      });
      return next();
    }

    const offreEmploiEntrepriseMetier = new OffreEmploiEntrepriseMetier(elasticsearch);
    offreEmploiEntrepriseMetier.searchSportif(id_entreprise, id_offre_emploi)
      .then((sportifs) => {
        res.send(200, {
          sportifs: sportifs,
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
    const id_entreprise = req.id_user;
    if (!id_entreprise) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const id_offre_emploi = req.params.id;
    if (!id_offre_emploi) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de l\'offre d\'emploi',
      });
      return next();
    }

    const offreEmploiEntrepriseMetier = new OffreEmploiEntrepriseMetier(elasticsearch);
    offreEmploiEntrepriseMetier.remove(id_entreprise, id_offre_emploi)
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
    const id_entreprise = req.id_user;
    if (!id_entreprise) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const offreEmploiEntrepriseMetier = new OffreEmploiEntrepriseMetier(elasticsearch);
    offreEmploiEntrepriseMetier.find(id_entreprise)
      .then((offres_emploi) => {
        res.send(200, {
          offres_emploi: offres_emploi,
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
    const id_entreprise = req.id_user;
    if (!id_entreprise) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const id_poste = req.params.id_poste;
    if (!id_poste) {
      res.send(404, {
        error: 'Vous devez renseigner un poste'
      });
      return next();
    }

    const lieu_poste = req.params.lieu_poste;
    if (!lieu_poste) {
      res.send(404, {
        error: 'Vous devez renseigner le lieu du poste'
      });
      return next();
    }

    const description_offre = req.params.description_offre;
    if (!description_offre) {
      res.send(404, {
        error: 'Vous devez renseigner la description de l\'offre'
      });
      return next();
    }

    const mission = req.params.mission;
    if (!mission) {
      res.send(404, {
        error: 'Vous devez renseigner la mission de l\'offre'
      });
      return next();
    }

    const prerequis = req.params.prerequis;
    if (!prerequis) {
      res.send(404, {
        error: 'Vous devez renseigner les prerequis de l\'offre'
      });
      return next();
    }

    const id_salaire = req.params.id_salaire;
    if(!id_salaire){
      res.send(404, {
        error: 'Vous devez renseigner une tranche de salaire'
      });
      return next();
    }

    const id_niveau_etude = req.params.id_niveau_etude;
    const matcher_sportif = req.params.matcher_sportif;
    const chasser_tete = req.params.chasser_tete;
    const diffuser = req.params.diffuser;
    const ids_dimensions_sportives = req.params.ids_dimensions_sportives;
    const recherche_confidentielle = req.params.recherche_confidentielle;

    const offreEmploiEntrepriseMetier = new OffreEmploiEntrepriseMetier(elasticsearch);
    offreEmploiEntrepriseMetier.add(
      id_entreprise,
      id_poste,
      lieu_poste,
      id_niveau_etude,
      id_salaire,
      description_offre,
      mission,
      prerequis,
      matcher_sportif,
      chasser_tete,
      diffuser,
      ids_dimensions_sportives,
      recherche_confidentielle
    )
      .then((offre_emploi) => {
        res.send(200, {
          offre_emploi: offre_emploi,
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

module.exports = OffreEmploiEntrepriseController;