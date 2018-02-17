import {hashPassword} from '../utils/hash/password';

class EntrepriseDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'entreprise';
  }

  /**
   * Permet de modifier via un script un document entreprise
   * @param id_entreprise - Id de l'entreprise
   * @param new_profil_entreprise - Nouvelles données de l'entreprise
   * @param script - Le script à appliquer
   * @returns {Promise} - Erreur ou nouveau document de l'entreprise
   */
  updateByScript(id_entreprise, new_profil_entreprise, script) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Vous devez spécifier un identifiant de compte');
      }

      if (!new_profil_entreprise) {
        return reject('Erreur lors de la récupération du profil entreprise avec les nouvelles données');
      }

      if (!script) {
        return reject('Erreur lors de la récupération du script');
      }

      this._bdd.update({
        index: this._index,
        type: this._type,
        id: id_entreprise,
        body: {
          script: {
            inline: script,
            lang: 'painless',
            params: new_profil_entreprise,
          },
        }
      }).then((response) => {
        if (!response) {
          return reject('Erreur lors de la mise à jour de votre profil');
        }
        return resolve(response);
      })
        .catch(() => {
          return reject('Erreur lors de la mise à jour de votre profil');
        });
    });
  }

  /**
   * Permet d'ajouter une entreprise
   * @param nom_gerant - Nom du gérent
   * @param prenom_gerant - Prénom du gérant
   * @param siret_entreprise - SIRET de l'entreprise
   * @param email - Email du compte entreprise
   * @param password - Mot de passe du compte entreprise
   * @param nom_entreprise - Nom de l'entreprise
   * @returns {Promise} - Erreur ou Id du nouveau document
   */
  add(nom_gerant, prenom_gerant, siret_entreprise, email, password,
      nom_entreprise) {

    return new Promise((resolve, reject) => {
      this.exist(email).then((exists) => {
        if (exists === true) {
          return reject('Un compte existe déjà avec ces identifiants');
        }

        hashPassword(password, (error, passwordHash) => {
          if (error) {
            return reject('Erreur lors du hashage du mot de passe');
          }

          this._bdd.index({
            index: this._index,
            type: this._type,
            body: {
              nom_gerant: nom_gerant,
              prenom_gerant: prenom_gerant,
              email: email,
              password: passwordHash,
              siret_entreprise: siret_entreprise,
              nom_entreprise: nom_entreprise,
              activated: true,
            }
          }).then((response) => {
            if (!response || !response.created) {
              return reject("Erreur lors de l'ajout de votre compte");
            }

            return resolve(response._id);
          }).catch(() => {
            return reject("Erreur lors de l'ajout de votre compte");
          });
        });
      }).catch((error) => {
        return reject(error);
      });
    });
  }

  /**
   * Permet de récupérer une entreprise via son id
   * @param id - Id de l'entreprise
   * @returns {Promise} - Erreur ou document de l'entreprise
   */
  get(id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id
      }).then((response) => {
        return resolve(response);
      }).catch(() => {
        return reject('Erreur lors de la récupération de votre compte');
      });
    });
  };

  /**
   * Permet de savoir si une entreprise existe via un mail
   * @param email - Email à vérifier
   * @returns {Promise} - Erreur ou boolean de l'existence
   */
  exist(email) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            bool: {
              should: [
                {
                  match: {
                    email: email
                  }
                }
              ]
            }
          }
        }
      }).then((response) => {
        if (!response.hits) {
          return reject('Une erreur est survenue');
        }

        return resolve(response.hits.total > 0);
      }).catch(() => {
        return reject('Une erreur est survenue lors de la vérification des comptes');
      });
    });
  };

  /**
   * Permet de savoir si une entreprise existe via son id
   * @param id - Id de l'entreprise
   * @returns {Promise} - Erreur ou boolean de l'existance de l'entreprise
   */
  existById(id) {
    return new Promise((resolve, reject) => {
      this._bdd.exists({
        index: this._index,
        type: this._type,
        id: id,
      })
        .then((exists) => {
          return resolve(exists);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de l\'entreprise');
        });
    });
  }

  /*update_by_script(entreprise) {
   return new Promise((resolve, reject) => {
   this._bdd.update({
   index: this._index,
   type: this._type,
   id: entreprise._id,
   body: {
   doc: entreprise
   }
   })
   .then((response) => {
   return resolve(response);
   })
   .catch(() => {
   return reject('Erreur lors de la modification de votre profil');
   });
   });
   }*/
}

export default EntrepriseDao;