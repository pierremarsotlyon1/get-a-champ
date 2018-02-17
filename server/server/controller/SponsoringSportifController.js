/**
 * Created by pierremarsot on 10/02/2017.
 */
import elasticsearch from '../db';
import SponsoringSportifMetier from '../metier/SponsoringSportifMetier';

class SponsoringSportifController {
  constructor(server) {
    server.get('/api/sportif/sponsoring', this.find);
    server.get('/api/search/sportif/sponsoring', this.search);
    server.post('/api/sportif/sponsoring', this.add);
    server.del('/api/sportif/sponsoring/:id', this.remove);
  }

  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const id_sponsoring_sportif = req.params.id;
    if (!id_sponsoring_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du sponsoring'
      });
      return next();
    }

    const sponsoringSportifMetier = new SponsoringSportifMetier(elasticsearch);
    sponsoringSportifMetier.remove(id_sportif, id_sponsoring_sportif)
      .then((id_sponsoring_sportif) => {
        res.send(200, {
          id_sponsoring_sportif: id_sponsoring_sportif,
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

  find(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const sponsoringSportifMetier = new SponsoringSportifMetier(elasticsearch);
    sponsoringSportifMetier.find(id_sportif)
      .then((sponsorings_sportif) => {
        res.send(200, {
          sponsorings_sportif: sponsorings_sportif,
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

  search(req, res, next) {
    const {
      id_type_sponsoring,
      montant_recherche,
      date_depart,
      date_fin,
    } = req.params;

    if (!id_type_sponsoring) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du type de sponsoring'
      });
      return next();
    }

    if (!montant_recherche) {
      res.send(404, {
        error: 'Erreur lors de la récupération du montant recherché'
      });
      return next();
    }

    if (!date_depart) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de départ'
      });
      return next();
    }

    if (!date_fin) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de fin'
      });
      return next();
    }

    const sponsoringSportifMetier = new SponsoringSportifMetier(elasticsearch);
    sponsoringSportifMetier.search(
      id_type_sponsoring,
      montant_recherche,
      date_depart,
      date_fin,
    )
      .then((sportifs) => {
        res.send(200, {
          search_sportif_sponsoring: sportifs
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
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const date_depart_sponsoring_sportif = req.params.date_depart_sponsoring_sportif;
    if (!date_depart_sponsoring_sportif) {
      res.send(404, {
        error: 'Vous devez spécifier une date de départ',
      });
      return next();
    }

    const date_fin_sponsoring_sportif = req.params.date_fin_sponsoring_sportif;
    if (!date_fin_sponsoring_sportif) {
      res.send(404, {
        error: 'Vous devez spécifier une date de fin'
      });
      return next();
    }

    const lieu_sponsoring_sportif = req.params.lieu_sponsoring_sportif;
    if (!lieu_sponsoring_sportif || !lieu_sponsoring_sportif.location || !lieu_sponsoring_sportif.nom
      || !lieu_sponsoring_sportif._id) {
      res.send(404, {
        error: 'Vous devez spécifier un lieu'
      });
      return next();
    }

    const type_sponsoring_sportif = req.params.type_sponsoring_sportif;
    if (!type_sponsoring_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération du type de sponsoring'
      });
      return next();
    }

    const montant_recherche = req.params.montant_recherche;
    if (!montant_recherche) {
      res.send(404, {
        error: 'Erreur lors de la récupération du montant'
      });
      return next();
    }

    const description_sponsoring_sportif = req.params.description_sponsoring_sportif;

    const sponsoringSportifMetier = new SponsoringSportifMetier(elasticsearch);
    sponsoringSportifMetier.add(
      id_sportif,
      type_sponsoring_sportif,
      date_depart_sponsoring_sportif,
      date_fin_sponsoring_sportif,
      lieu_sponsoring_sportif._id,
      lieu_sponsoring_sportif.location.lat,
      lieu_sponsoring_sportif.location.lon,
      lieu_sponsoring_sportif.nom,
      description_sponsoring_sportif,
      montant_recherche)
      .then((id_sponsoring_sportif) => {
        res.send(200, {
          id_sponsoring_sportif: id_sponsoring_sportif,
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

module.exports = SponsoringSportifController;