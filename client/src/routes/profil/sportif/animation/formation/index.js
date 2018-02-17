/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation/formation',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./add/add').default,
        require('./listing/listing').default,
        require('./specifique/index').default,
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../../../../containers/profil/sportif/intervention_entreprise_sportif/animation_formation/ManagerAnimationFormation').default,
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../containers/profil/sportif/intervention_entreprise_sportif/BaseManagerIntervention').default)
    })
  },
};

export default rootRoute;