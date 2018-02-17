/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/langues/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/langue_sportif/AddLangueSportif').default)
    })
  }
};

export default rootRoute;