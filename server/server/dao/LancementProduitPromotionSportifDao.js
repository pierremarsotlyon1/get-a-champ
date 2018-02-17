/**
 * Created by pierremarsot on 04/02/2017.
 */
class LancementProduitPromotionSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'sportif';
  }

  /**
   * Permet de récupérer l'objet concernant le lancement des produits/image/promotion d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou objet concernant le lancement des produits/image/promotion du sportif
   */
  get_settings_lancement_produit_promotion(id_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_sportif,
        _source: ['lancement_produit_promotion_image_sportif']
      })
        .then((response) => {
          if (!response || !response._source) {
            return reject('Erreur lors de la récupération de vos paramètres de lancement de produit');
          }

          return resolve(response._source.lancement_produit_promotion_image_sportif);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de vos paramètres de lancement de produit');
        });
    });
  }
}

export default LancementProduitPromotionSportifDao;