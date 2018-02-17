/**
 * Created by pierremarsot on 17/01/2017.
 */
import elasticsearch from '../db';
import CompetitionMetier from '../metier/CompetitionMetier';

class CompetitionController {
  constructor(server) {
    server.post('/api/competition', this.add);
    //server.post('/api/competition/:id/video', this.uploadVideo);
    server.put('/api/competition/:id/video', this.uploadVideo);
    server.del('/api/competition/:id/video', this.removeVideo);
    server.get('/api/competition', this.find);
    server.del('/api/competition/:id', this.remove);
    server.put('/api/competition/:id', this.update);
  }

  uploadVideo(req, res, next) {
    const id_sportif = req.id_user;
    if(!id_sportif)
    {
      res.send(409, {
        error: 'Vous devez être authentifié pour accéder à cette page'
      });
      return next();
    }

    const id_competition_sportive = req.params.id;
    if(!id_competition_sportive)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de la compétition',
      });
      return next();
    }

    const urlVideo = req.params.urlYoutube;
    if(!urlVideo)
    {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'url de la vidéo'
      });
      return next();
    }

    const competitionMetier = new CompetitionMetier(elasticsearch);
    competitionMetier.addVideo(id_sportif, id_competition_sportive, urlVideo)
      .then((path_video) => {
        res.send(200, {
          path_video: path_video
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

  /*uploadVideo(req, res, next) {
    const competitionMetier = new CompetitionMetier(elasticsearch);
    competitionMetier.addVideo(req)
      .then((path_video) => {
        res.send(200, {
          path_video: path_video
        });
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error
        });
        return next();
      });
  }*/

  removeVideo(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    //On recup l'id de la compétition
    const id_competition_sportive = req.params.id;
    if (!id_competition_sportive || id_competition_sportive < 1) {
      res.send(404, {
        error: 'L\'index de compétition est invalid',
      });
      return next();
    }

    //On supprime la vidéo de la compétition
    const competitionMetier = new CompetitionMetier(elasticsearch);
    competitionMetier.removeVideo(id_sportif, id_competition_sportive)
      .then((deleted) => {
        if (!deleted) {
          res.send(404, {error: 'Erreur lors de la suppression de la vidéo'});
          return next();
        }

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

  /**
   * @api {put} /api/competition/:id Modifier
   * @apiName Update
   * @apiGroup Competition sportive
   * @apiExample Body :
   *      {
     *          index_competition : String,
     *          _source.lieu_competition : Object,
     *          _source.sport_competition_sportif : Object,
     *          _source.niveau_competition_sportif : String,
     *          _source.date_debut_competition_sportif : String,
     *          _source.date_fin_competition_sportif: String,
     *          _source.rang_competiton_sportif: Int,
     *      }
   * @apiSuccess
   *      {Object} competition - Nouveau document de la compétition sportive
   * @apiError
   *       {String} error - Message d'erreur.
   */
  update(req, res, next) {
    //On récupère l'identifiant de l'user
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    //On recup l'id de la compétition
    const index_competition = req.params.id;
    if (!index_competition || index_competition < 1) {
      res.send(404, {
        error: 'L\'index de compétition est invalid',
      });
      return next();
    }

    //Création du metier de compétition
    const competitionMetier = new CompetitionMetier(elasticsearch);

    //On extrait les données reçues et on regarde si elles sont correctes
    competitionMetier.extract_competition(req)
      .then((tab) => {

        //On update la compétition
        competitionMetier.update(id_sportif, index_competition, ...tab)
          .then((competition) => {
            res.send(200, {
              competition: competition,
            });
            return next();
          })
          .catch((error) => {
            res.send(404, {
              error: error,
            });
            return next();
          });
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  /**
   * @api {delete} /api/competition/:id Supprimer
   * @apiName Remove
   * @apiGroup Competition sportive
   * @apiSuccess
   *      {String} id_competition - Id de la compétition sportive supprimée
   * @apiError
   *       {String} error - Message d'erreur.
   */
  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    //On recup l'id de la compétition
    const id_competition = req.params.id;
    if (!id_competition) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la compétition'
      });
      return next();
    }

    const competitionMetier = new CompetitionMetier(elasticsearch);

    //On supprime la compétition
    competitionMetier.remove(id_sportif, id_competition)
      .then((id_competition_sportif) => {
        res.send(200, {
          id_competition: id_competition_sportif,
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

  /**
   * @api {get} /api/competition Récupérer toutes les compétitions sportives d'un sportif
   * @apiGroup Competition sportive
   * @apiName Find
   * @apiSuccess
   *      {Array} competitions_sportif - Array contenant les documents des compétitions sportives du sportif
   * @apiError
   *       {String} error - Message d'erreur.
   */
  find(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const competitionMetier = new CompetitionMetier(elasticsearch);

    //On cherche toutes les compétition du sportif
    competitionMetier.find(id_sportif)
      .then((competition_sportif) => {
        res.send(200, {
          competitions_sportif: competition_sportif,
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

  /**
   * @api {post} /api/competition Création
   * @apiGroup Competition sportive
   * @apiName Add
   * @apiExample Body :
   *      {
     *          _source.lieu_competition : Object,
     *          _source.sport_competition_sportif : Object,
     *          _source.niveau_competition_sportif : String,
     *          _source.date_debut_competition_sportif : String,
     *          _source.date_fin_competition_sportif: String,
     *          _source.rang_competiton_sportif: Int,
     *      }
   * @apiSuccess
   *      {int} id_competition_sportif - Id de la compétition créée
   * @apiError
   *       {String} error - Message d'erreur.
   */
  add(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette fonctionnalité'
      });
      return next();
    }

    const competitionMetier = new CompetitionMetier(elasticsearch);

    //On extrait les données reçues et on regarde si elles sont correctes
    competitionMetier.extract_competition(req)
      .then((tab) => {

        //On ajoute la compétition au sportif
        competitionMetier.add(id_sportif, ...tab)
          .then((competition) => {
            res.send(200, {
              competition: competition,
            });

            return next();
          })
          .catch((error) => {
            res.send(404, {
              error: error,
            });
            return next();
          });
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }
}

module.exports = CompetitionController;