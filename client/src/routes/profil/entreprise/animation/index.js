/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/animation',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./conference/index').default,
        require('./formation/index').default,
        require('./incentive/index').default,
      ])
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/entreprise/animation/Animation').default)
    })
  }
};

export default rootRoute;