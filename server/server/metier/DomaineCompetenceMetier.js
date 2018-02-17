/**
 * Created by pierremarsot on 29/03/2017.
 */
import DomaineCompetenceDao from '../dao/DomaineCompetenceDao';

class DomaineCompetenceMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const domaineCompetenceDao = new DomaineCompetenceDao(this._elasticsearch);
      domaineCompetenceDao.findAll()
        .then((domainesCompetence) => {
          return resolve(domainesCompetence);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  search(name) {
    return new Promise((resolve, reject) => {
      if (!name || name.length === 0) {
        return reject('Erreur lors de la récupération de votre recherche');
      }

      const domaineCompetenceDao = new DomaineCompetenceDao(this._elasticsearch);
      domaineCompetenceDao.search(name)
        .then((domaines_competences) => {
          return resolve(domaines_competences);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      if (!id || id.length === 0) {
        return reject('Erreur lors de la récupération de l\'identifiant du domaine de compétence');
      }

      const domaineCompetenceDao = new DomaineCompetenceDao(this._elasticsearch);
      domaineCompetenceDao.get(id)
        .then((domaine_competence) => {
          return resolve(domaine_competence);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default DomaineCompetenceMetier;