/**
 * Created by pierremarsot on 29/03/2017.
 */
import elasticsearch from '../db';
import IpipMetier from '../metier/IpipMetier';

class IpipController {
  constructor(server) {
    server.get('/ipip/questions/short', this.findQuestionShortTest);
    server.get('/ipip/questions/full', this.findQuestionFullTest);
    server.get('/ipip/reponses', this.findReponses);
    server.post('/api/ipip/reponses/short', this.saveAnswerShortTest);
    server.post('/api/ipip/reponses/full', this.saveAnswerFullTest);
  }

  saveAnswerShortTest(req, res, next){
    const idSportif = req.id_user;
    if (!idSportif) {
      res.send(403, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const reponses = req.params.reponses;
    if(!reponses){
      res.send(403, {
        error: 'Vous devez répondre aux questions'
      });
      return next();
    }

    const ipipMetier = new IpipMetier(elasticsearch);
    ipipMetier.saveAnswerShortTest(idSportif, reponses)
      .then((resultatsShortTest) => {
        res.send(200, {
          resultatsShortTest: resultatsShortTest,
        });
        return next();
      })
      .catch((error) => {
        res.send(403, {
          error: error,
        });
        return next();
      });
  }

  saveAnswerFullTest(req, res, next){
    const idSportif = req.id_user;
    if (!idSportif) {
      res.send(403, {
        error: 'Vous devez être identifié pour accéder à cette page'
      });
      return next();
    }

    const reponses = req.params.reponses;
    if(!reponses){
      res.send(403, {
        error: 'Vous devez répondre aux questions'
      });
      return next();
    }

    const ipipMetier = new IpipMetier(elasticsearch);
    ipipMetier.saveAnswerFullTest(idSportif, reponses)
      .then((resultatsFullTest) => {
        res.send(200, {
          resultatsFullTest: resultatsFullTest,
        });
        return next();
      })
      .catch((error) => {
        res.send(403, {
          error: error,
        });
        return next();
      });
  }

  findReponses(req, res, next){
    const ipipMetier = new IpipMetier(elasticsearch);
    ipipMetier.findReponses()
      .then((reponses) => {
        res.send(200, {
          reponses: reponses,
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

  findQuestionShortTest(req, res, next) {
    let start = new Date();
    const ipipMetier = new IpipMetier(elasticsearch);
    ipipMetier.findShortQuestion()
      .then((questions) => {
        res.send(200, {
          short_questions: questions,
        });
        let end = new Date();
        return next();
      })
      .catch((error) => {
        res.send(404, {
          error: error,
        });
        return next();
      });
  }

  findQuestionFullTest(req, res, next) {
    const ipipMetier = new IpipMetier(elasticsearch);
    ipipMetier.findFullQuestion()
      .then((questions) => {
        res.send(200, {
          full_questions: questions,
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

module.exports = IpipController;