/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./animation/index').default,
        require('./sponsoring/index').default,
        require('./offre_emploi/index').default,
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../../components/profil_entreprise/ManagerProfilEntreprise').default,
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../containers/profil/entreprise/BackendEntreprise').default)
    })
  }
};

export default rootRoute;