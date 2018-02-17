/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/animation/incentive',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./recherche/recherche_sportif').default,
        require('./demande_specifique/demande_specifique').default,
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../../../../components/animation_entreprise/animation_formation_incentive/AffichageCategorieAnimationIncentiveEntreprise').default,
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../containers/profil/entreprise/animation/AnimationIncentive').default)
    })
  }
};

export default rootRoute;