/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/missions',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./contrat').default,
        require('./promotion_image').default,
      ])
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/sportif/mission_entreprise/MissionEntrepriseSportif').default)
    })
  }
};

export default rootRoute;