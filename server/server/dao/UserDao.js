import {hashPassword, decryptPassword} from '../utils/hash/password';

class UserDao {
  constructor(elasticsearch) {
    this._index = "sport";
    this._bdd = elasticsearch;
  }

  /**
   * Permet de récupérer un compte sportif ou entreprise
   * @param email - Email du compte
   * @param password - Mot de passe du compte
   * @returns {Promise} - Erreur ou document du compte
   */
  get(email, password) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: "sportif,entreprise",
        body: {
          query: {
            bool: {
              must: [
                {
                  term: {
                    email: email
                  }
                },
                {
                  term: {
                    activated: true
                  }
                }
              ]
            }
          }
        }
      }).then((response) => {
        if (!response.hits) {
          return reject('Erreur lors de la récupération de votre compte, merci de vérifier vos informations ' +
            'de connexion')
        }

        if (response.hits.total === 0 || response.hits.total > 1) {
          return reject('Erreur lors de la récupération de votre compte, merci de vérifier vos informations ' +
            'de connexion');
        }

        const user = response.hits.hits[0];
        if (!user) {
          return reject('Erreur lors de la récupération de votre compte, merci de vérifier vos informations ' +
            'de connexion');
        }

        //On décrypte le mot de passe pour voir si il correspond à celui du document
        decryptPassword(password, user._source.password, (success) => {
          if (!success) {
            return reject('Erreur lors de la récupération de votre compte, merci de vérifier vos informations ' +
              'de connexion');
          }

          return resolve({
            id: user._id,
            type: user._type,
          });
        });
      }).catch(() => {
        return reject('Erreur lors de la récupération de votre compte, merci de vérifier vos informations ' +
          'de connexion');
      });
    });

  };
}

export default UserDao;