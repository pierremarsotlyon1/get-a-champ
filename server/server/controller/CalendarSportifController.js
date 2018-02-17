/**
 * Created by pierremarsot on 17/02/2017.
 */
import elasticsearch from '../db';
import CalendarSportifMetier from '../metier/CalendarSportifMetier';

class CalendarSportifController {
  constructor(server) {
    server.get('/api/sportif/calendar/event/:debut/:fin', this.get);
    server.post('/api/sportif/calendar/event', this.add);
    server.del('/api/sportif/calendar/event/:id', this.remove);
  }

  remove(req, res, next) {
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const id_event = req.params.id;
    if (!id_event) {
      res.send(404, {
        error: 'Erreur lors de la récupération de l\'identifiant de l\'évenement'
      });
      return next();
    }

    const calendarSportifMetier = new CalendarSportifMetier(elasticsearch);
    calendarSportifMetier.remove(id_sportif, id_event)
      .then((id_event_removed) => {
        res.send(200, {
          id_event_removed: id_event_removed,
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

    const titre = req.params.titre;
    if (!titre) {
      res.send(404, {
        error: 'Vous devez spécifier le titre de l\'évenement'
      });
      return next();
    }

    const date_debut = req.params.date_debut;
    if (!date_debut) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de début'
      });
      return next();
    }

    const date_fin = req.params.date_fin;
    if (!date_fin) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de fin'
      });
      return next();
    }

    const description = req.params.description;

    const calendarSportifMetier = new CalendarSportifMetier(elasticsearch);
    calendarSportifMetier.add(id_sportif, titre, description, date_debut, date_fin)
      .then((id_event) => {
        res.send(200, {
          id_event: id_event
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
    const id_sportif = req.id_user;
    if (!id_sportif) {
      res.send(409, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const date_debut = req.params.debut;
    if (!date_debut) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de début'
      });
      return next();
    }

    const date_fin = req.params.fin;
    if (!date_fin) {
      res.send(404, {
        error: 'Erreur lors de la récupération de la date de fin'
      });
      return next();
    }

    const calendarSportifMetier = new CalendarSportifMetier(elasticsearch);
    calendarSportifMetier.get(id_sportif, date_debut, date_fin)
      .then((events) => {
        res.send(200, {
          events: events
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
}

module.exports = CalendarSportifController;