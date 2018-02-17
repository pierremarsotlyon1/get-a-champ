import UserDao from "../dao/UserDao";
import AuthentificationMetier from "./AuthentificationMetier";
import BaseMetier from "./BaseMetier";
import validator from "validator";

class UserMetier extends BaseMetier {
    constructor(elasticsearch)
    {
        super();
        this._bdd = elasticsearch;
    }

    logIn(email, password)
    {
        return new Promise((resolve, reject) => {
          //On vérifie que l'email soit valide
          if(!validator.isEmail(email))
          {
            reject("L'email n'est pas au bon format");
          }

          //Création de l'user dao
          const userDao = new UserDao(this._bdd);

          //On récup le compte utilisateur
          userDao.get(email, password).then((user) => {
            //Si on arrive pas à récup l'id, en envoie une erreur
            if(!user || !user.id || !user.type)
            {
              reject("Erreur lors de la récupération de votre compte");
            }

            //Génération d'un token
            const authentificationMetier = new AuthentificationMetier();
            const token = authentificationMetier.encode(user.id);
            if(!token)
            {
              reject("Erreur lors de la génération du token d'authentification");
            }

            resolve({
              token: token,
              type: user.type === "sportif" ? 1 : 2
            });
          }, (error) => {
            reject(error);
          });
        });
    }

    logOut()
    {
        //On récup le token de la requête
        const token = this.getToken();

        if(!token)
        {
            return new Promise.reject(this.generateResponse(404, "Erreur lors de la récupération du token"));
        }

        const authentificationMetier = new AuthentificationMetier();
        if(!authentificationMetier.invalid(token))
        {
            return new Promise.reject(this.generateResponse(404, "Erreur lors de la déconnexion"));
        }

        return new Promise.reject(this.generateResponse(200));
    }
}

export default UserMetier;