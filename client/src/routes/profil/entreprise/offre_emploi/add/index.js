/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/offre_emploi/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/offre_emploi_entreprise/AddOrUpdateOffreEmploiEntreprise').default)
    })
  }
};

export default rootRoute;