/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/offre_emploi/:id/matching',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/offre_emploi_entreprise/MatchingSportifOffreEmploiEntreprise').default)
    })
  }
};

export default rootRoute;