import EntrepriseDao from "../dao/EntrepriseDao";
import AuthentificationMetier from "./AuthentificationMetier";
import TailleEntrepriseMetier from '../metier/TailleEntrepriseMetier';
import validator from "validator";
import validUrl from 'valid-url';

class EntrepriseMetier {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
  }

  /**
   * Permet de modifier le profil d'une entreprise
   * @param id_entreprise - Id de l'entreprise
   * @param profil_entreprise - Nouvelles données de l'entreprise
   * @returns {Promise} - Erreur ou nouveau document
   */
  updateProfil(id_entreprise, profil_entreprise) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de l\'identifiant de votre compte');
      }

      this.exist(id_entreprise)
        .then(async(exists) => {
          if (!exists) {
            return reject('Erreur lors de la récupération de votre compte');
          }

          //Script qui servira à l'update du document de l'entreprise
          let scriptUpdateProfilEntreprise = '';

          //On regarde si on a les informations du profil
          if (!profil_entreprise) {
            return reject('Erreur lors de la récupération des informations de votre profil');
          }

          //On vérifie les informations du profil
          //on regarde si on a le nom
          if (!profil_entreprise.nom_gerant || profil_entreprise.nom_gerant.length === 0) {
            return reject('Vous devez spécifier un nom de gérant');
          }

          scriptUpdateProfilEntreprise += 'ctx._source.nom_gerant = params.nom_gerant; ';

          //On regarde si on a le prénom
          if (!profil_entreprise.prenom_gerant || profil_entreprise.prenom_gerant.length === 0) {
            return reject('Vous devez spécifier un prénom de gérant');
          }

          scriptUpdateProfilEntreprise += 'ctx._source.prenom_gerant = params.prenom_gerant; ';

          //On regarde si on a le nom de l'entreprise
          if (!profil_entreprise.nom_entreprise || profil_entreprise.nom_entreprise.length === 0) {
            return reject('Vous devez spécifier le nom de votre entreprise');
          }

          scriptUpdateProfilEntreprise += 'ctx._source.nom_entreprise = params.nom_entreprise; ';

          //On regarde si on a le numéro de SIRET
          if (!profil_entreprise.siret_entreprise || profil_entreprise.siret_entreprise.length === 0) {
            return reject('Vous devez spécifier votre numéro de SIRET');
          }

          scriptUpdateProfilEntreprise += 'ctx._source.siret_entreprise = params.siret_entreprise; ';

          //On regarde si on a les url des réseaux sociaux et si elle sont au bon format
          if (profil_entreprise.url_page_facebook_entreprise) {
            if (!validUrl.isUri(profil_entreprise.url_page_facebook_entreprise)) {
              return reject('L\'url de la page Facebook n\'est pas au bon format');
            }
            else {
              scriptUpdateProfilEntreprise += 'ctx._source.url_page_facebook_entreprise = params.url_page_facebook_entreprise; ';
            }
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("url_page_facebook_entreprise"); ';
          }

          if (profil_entreprise.url_page_instagram_entreprise) {
            if (!validUrl.isUri(profil_entreprise.url_page_instagram_entreprise)) {
              return reject('L\'url de la page Instagram n\'est pas au bon format');
            }
            else {
              scriptUpdateProfilEntreprise += 'ctx._source.url_page_instagram_entreprise = params.url_page_instagram_entreprise; ';
            }
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("url_page_instagram_entreprise"); ';
          }

          if (profil_entreprise.url_page_twitter_entreprise) {
            if (!validUrl.isUri(profil_entreprise.url_page_twitter_entreprise)) {
              return reject('L\'url de la page Twitter n\'est pas au bon format');
            }
            else {
              scriptUpdateProfilEntreprise += 'ctx._source.url_page_twitter_entreprise = params.url_page_twitter_entreprise; ';
            }
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("url_page_twitter_entreprise"); ';
          }

          if (profil_entreprise.url_site_web_entreprise) {
            if (!validUrl.isUri(profil_entreprise.url_site_web_entreprise)) {
              return reject('L\'url de votre site perso entreprise n\'est pas au bon format');
            }
            else {
              scriptUpdateProfilEntreprise += 'ctx._source.url_site_web_entreprise = params.url_site_web_entreprise; ';
            }
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("url_site_web_entreprise"); ';
          }

          //On regarde si on a l'activité de l'entreprise
          if (!profil_entreprise.activite_entreprise || profil_entreprise.activite_entreprise.length === 0) {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("activite_entreprise"); ';
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.activite_entreprise = params.activite_entreprise; ';
          }

          //On regarde si on a une description de l'entreprise
          if (!profil_entreprise.description_entreprise || profil_entreprise.description_entreprise.length === 0) {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("description_entreprise"); ';
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.description_entreprise = params.description_entreprise; ';
          }

          //On regarde si on a le téléphone de l'entreprise
          if (!profil_entreprise.telephone_entreprise || profil_entreprise.telephone_entreprise.length === 0) {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("telephone_entreprise"); ';
          }
          else {
            scriptUpdateProfilEntreprise += 'ctx._source.telephone_entreprise = params.telephone_entreprise; ';
          }

          //On regarde si on a une taille d'entreprise
          if (!profil_entreprise.taille_entreprise || !profil_entreprise.taille_entreprise._id) {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("taille_entreprise"); ';
          }
          else {
            const tailleEntrepriseMetier = new TailleEntrepriseMetier(this._bdd);
            try {
              const taille_entreprise = await tailleEntrepriseMetier.get(profil_entreprise.taille_entreprise._id);
              if (!taille_entreprise) {
                return reject('Erreur lors de la récupération de la taille de l\'entreprise');
              }

              profil_entreprise.taille_entreprise = {
                _id: taille_entreprise._id,
                nom_taille_entreprise: taille_entreprise._source.nom_taille_entreprise,
              };
              scriptUpdateProfilEntreprise += 'ctx._source.taille_entreprise = params.taille_entreprise; ';
            }
            catch (e) {
              return reject(e);
            }
          }

          //On regarde si on a le siège social
          if(profil_entreprise.lieu_entreprise)
          {
            //On regarde si on a bien toutes les données
            const lieu_entreprise = profil_entreprise.lieu_entreprise;
            if(!lieu_entreprise._id || !lieu_entreprise.nom || !lieu_entreprise.location)
            {
              return reject('Les coordonnées GPS du siège social sont incorrectes');
            }

            //On regarde la latitude et longitude
            const location = lieu_entreprise.location;
            if(!location.lat || !location.lon)
            {
              return reject('Les coordonnées GPS du siège social sont incorrectes');
            }

            const lat = Number.parseFloat(location.lat);
            if(!lat)
            {
              return reject('Les coordonnées GPS du siège social sont incorrectes');
            }

            const lon = Number.parseFloat(location.lon);
            if(!lon)
            {
              return reject('Les coordonnées GPS du siège social sont incorrectes');
            }

            profil_entreprise.lieu_entreprise = {
              _id: lieu_entreprise._id,
              location: {
                lat: lat,
                lon: lon,
              },
              nom: lieu_entreprise.nom,
            };
            scriptUpdateProfilEntreprise += 'ctx._source.lieu_entreprise = params.lieu_entreprise; ';
          }
          else
          {
            scriptUpdateProfilEntreprise += 'ctx._source.remove("lieu_entreprise"); ';
          }

          const entrepriseDao = new EntrepriseDao(this._bdd);
          entrepriseDao.updateByScript(id_entreprise, profil_entreprise, scriptUpdateProfilEntreprise)
            .then((profil_entreprise) => {
              return resolve(profil_entreprise);
            })
            .catch((error) => {
              return reject(error);
            });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet de récupérer une entreprise via son id
   * @param id_entreprise - Id de l'entreprise
   * @returns {Promise} - Erreur ou document de l'entreprise
   */
  getById(id_entreprise) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      const entrepriseDao = new EntrepriseDao(this._bdd);
      entrepriseDao.get(id_entreprise)
        .then((profil_entreprise) => {
          if (!profil_entreprise) {
            return reject('Erreur lors de la récupération de l\'entreprise');
          }

          return resolve(profil_entreprise);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  /**
   * Permet d'ajouter une entreprise
   * @param nom_gerant - Nom du gérant
   * @param prenom_gerant - Prénom du gérant
   * @param siret_entreprise - Numéro SIRET
   * @param email - Email
   * @param password - Mot de passe
   * @param confirm_password - Confirmation du mot de passe
   * @param nom_entreprise - Nom de l'entreprise
   * @returns {Promise} - Erreur ou token
   */
  add(nom_gerant, prenom_gerant, siret_entreprise, email, password, confirm_password,
      nom_entreprise) {
    return new Promise((resolve, reject) => {
      if (!validator.isEmail(email)) {
        return reject('L\'email n\'est pas au bon format');
      }

      if (password !== confirm_password) {
        return reject('Vos mot de passe doivent être identiques');
      }

      const entrepriseDao = new EntrepriseDao(this._bdd);
      entrepriseDao.add(nom_gerant, prenom_gerant, siret_entreprise, email, password,
        nom_entreprise)
        .then((idEntreprise) => {
          const authentificationMetier = new AuthentificationMetier();
          const token = authentificationMetier.encode(idEntreprise);
          if (!token) {
            return reject('Erreur lors de la génération du token d\'authentification');
          }

          return resolve(token);
        }).catch((error) => {
        return reject(error);
      });
    });
  }

  /**
   * Permet de savoir si une entreprise existe via son id
   * @param id_entreprise - Id de l'entreprise
   * @returns {Promise} - Erreur ou boolean de l'existance de l'entreprise
   */
  exist(id_entreprise) {
    return new Promise((resolve, reject) => {
      if (!id_entreprise) {
        return reject('Erreur lors de la récupération de l\'identifiant de l\'entreprise');
      }

      const entrepriseDao = new EntrepriseDao(this._bdd);
      entrepriseDao.existById(id_entreprise)
        .then((exists) => {
          return resolve(exists);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  }

  update_by_script(id_entreprise, data, script){
    return new Promise((resolve, reject) => {
      if(!id_entreprise){
        return reject('Erreur lors de la récupération de l\'identifiant');
      }

      if(!data){
        return reject('Erreur lors de la récupération des données à modifier');
      }

      if(!script){
        return reject('Erreur lors de la récupération du script de modification');
      }

      const entrepriseDao = new EntrepriseDao(this._bdd);
      entrepriseDao.updateByScript(id_entreprise, data, script)
        .then((profil_entreprise) => {
          return resolve(profil_entreprise);
        })
        .catch((error) => {
          return reject(error);
        });

    });
  }
}

export default EntrepriseMetier;