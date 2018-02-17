/**
 * Created by pierremarsot on 25/03/2017.
 */
import TypeContratTravailDao from '../dao/TypeContratTravailDao';

class TypeContratTravailMetier {
  constructor(elasticsearch) {
    this._elasticsearch = elasticsearch;
  }

  find() {
    return new Promise((resolve, reject) => {
      const typeContratTravailDao = new TypeContratTravailDao(this._elasticsearch);
      typeContratTravailDao.find()
        .then((types_contrat_travail) => {
          return resolve(types_contrat_travail);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      const typeContratTravailDao = new TypeContratTravailDao(this._elasticsearch);
      typeContratTravailDao.get(id)
        .then((type_contrat_travail) => {
          return resolve(type_contrat_travail);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }
}

export default TypeContratTravailMetier;