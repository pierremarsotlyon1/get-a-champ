/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/missions/promotion_image',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/sportif/mission_entreprise/lancement_produit/ManagerLancementProduit').default)
    })
  }
};

export default rootRoute;