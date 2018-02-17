/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/ipip',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./ipip_short_test/index').default,
        require('./ipip_full_test/index').default,
      ])
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/sportif/ipip/ManagerIpipSportif').default)
    })
  }
};

export default rootRoute;