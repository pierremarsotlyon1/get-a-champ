/**
 * Created by pierremarsot on 04/03/2017.
 */
import elasticsearch from '../db';
import MetierMetier from '../metier/MetierMetier';
import SportifMetier from '../metier/SportifMetier';

class MetierController {
  constructor(server) {
    server.get('/search/metier', this.search);
    server.get('/search/metier/sportif', this.search_sportif_by_metier);
  }

  search_sportif_by_metier(req, res, next) {
    const {id_metier} = req.params;
    if (!id_metier) {
      req.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant du métier'
      });
      return next();
    }

    const sportifMetier = new SportifMetier(elasticsearch);
    sportifMetier.search_by_metier(id_metier)
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
      })
  }

  search(req, res, next) {
    const {metier} = req.params;

    if (!metier) {
      res.send(404, {
        error: 'Erreur lors de la récupération du métier voulu'
      });
      return next();
    }

    const metierMetier = new MetierMetier(elasticsearch);
    metierMetier.search(metier)
      .then((metiers) => {
        res.send(200, {
          search_metier: metiers
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

module.exports = MetierController;