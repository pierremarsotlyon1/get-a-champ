/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/offre_emploi',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./add/index').default,
        require('./matching/index').default,
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../../../components/offre_emploi_entreprise/AffichageOffreEmploiEntreprise').default,
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/entreprise/OffreEmploiEntreprise').default)
    })
  }
};

export default rootRoute;