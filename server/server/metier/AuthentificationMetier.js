import jwt from 'jsonwebtoken';

class AuthentificationMetier {
  constructor() {
    this._key = "MEETWINKEYSH256@AUTHENTIFCATION#SPORT";
  }

  /**
   * Permet de récupérer le token passé dans la requête
   * @param req - La requête
   * @returns {*} - Null ou le token de la requête
   */
  getToken(req) {
    //On parse le token via la requête
    let token = null;

    if (req.params && req.params.token) {
      token = req.params.token;
    }
    else if (req.body && req.body.token) {
      token = req.body.token;
    }
    else if (req.query && req.query.token) {
      token = req.query.token;
    }

    return token;
  }

  /**
   * Permet de créer un token
   * @param idUser - Id de l'user
   * @returns {*} - Token
   */
  encode(idUser) {
    try {
      return jwt.sign({idUser: idUser}, this._key);
    }
    catch (e) {
      return null;
    }
  }

  /**
   * Permet de décoder un token
   * @param token - Le token à décoder
   * @returns {*} - Id de l'user ou null
   */
  decode(token) {
    try {
      const user = jwt.verify(token, this._key);
      if (!user || !user.idUser) {
        return null;
      }

      return user.idUser;
    } catch (err) {
      return null;
    }

  }

  /**
   * Permet de supprimer un token
   * @param token - Le token à supprimer
   * @returns {*} - Boolean de succès
   */
  invalid(token) {
    try {
      return jwt.verify(token, 'wrong-secret');
    } catch (err) {
      return false;
    }
  }
}

export default AuthentificationMetier;