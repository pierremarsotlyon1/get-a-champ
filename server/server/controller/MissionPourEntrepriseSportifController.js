/**
 * Created by pierremarsot on 04/02/2017.
 */
import elasticsearch from '../db';
import MissionPourEntrepriseSportifMetier from '../metier/MissionPourEntrepriseSportifMetier';

class MissionPourEntrepriseSportifController {
  constructor(server) {
    server.get('/api/sportif/settings/lancement_produit_promotion_image', this.get_settings_lancement_produit_promotion);
    server.post('/api/sportif/settings/lancement_produit_promotion_image', this.update_settings_lancement_produit_promotion);
    server.get('/api/sportif/contrats_mission_entreprise', this.contrats_mission_entreprise);
    server.post('/api/sportif/contrats_mission_entreprise', this.add_contrats_mission_entreprise);
    server.del('/api/sportif/contrats_mission_entreprise/:id_domaine_competence_sportif', this.remove_contrats_mission_entreprise);
  }

  get_settings_lancement_produit_promotion(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const missionPourEntrepriseSportifMetier = new MissionPourEntrepriseSportifMetier(elasticsearch);
    missionPourEntrepriseSportifMetier.get_settings_lancement_produit_promotion(id_sportif)
      .then((settings_lancement_produit_promotion_image_sportif) => {
        res.send(200, {
          promotionProduit: settings_lancement_produit_promotion_image_sportif.promotionProduit,
          promotionImage: settings_lancement_produit_promotion_image_sportif.promotionImage,
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

  update_settings_lancement_produit_promotion(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const promotionProduit = req.params.promotionProduit;
    const promotionImage = req.params.promotionImage;

    const missionPourEntrepriseSportifMetier = new MissionPourEntrepriseSportifMetier(elasticsearch);
    missionPourEntrepriseSportifMetier.update_settings_lancement_produit_promotion(
      id_sportif,
      promotionProduit,
      promotionImage,
    )
      .then((updated) => {
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

  contrats_mission_entreprise(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const missionPourEntrepriseSportifMetier = new MissionPourEntrepriseSportifMetier(elasticsearch);
    missionPourEntrepriseSportifMetier.get_contracts_mission_entreprise_sportif(id_sportif)
      .then((contrats_mission_entreprise_sportif) => {
        res.send(200, {
          contrats_mission_entreprise_sportif: contrats_mission_entreprise_sportif,
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

  add_contrats_mission_entreprise(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const id_domaine_connaissance_sportif = req.params.id_domaine_connaissance_sportif;
    if (!id_domaine_connaissance_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération de votre domaine de compétence'
      });
      return next();
    }

    const missionPourEntrepriseSportifMetier = new MissionPourEntrepriseSportifMetier(elasticsearch);
    missionPourEntrepriseSportifMetier.add_contrats_mission_entreprise(id_sportif, id_domaine_connaissance_sportif)
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
    return next();
  }

  remove_contrats_mission_entreprise(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const id_domaine_competence_sportif = req.params.id_domaine_competence_sportif;
    if (!id_domaine_competence_sportif) {
      res.send(404, {
        error: 'Erreur lors de la récupération de votre domaine de compétence'
      });
      return next();
    }

    const missionPourEntrepriseSportifMetier = new MissionPourEntrepriseSportifMetier(elasticsearch);
    missionPourEntrepriseSportifMetier.remove_contrats_mission_entreprise(id_sportif, id_domaine_competence_sportif)
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
    return next();
  }
}

module.exports = MissionPourEntrepriseSportifController;