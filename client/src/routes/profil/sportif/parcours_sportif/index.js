/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/parcours_sportif',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/sportif/ParcoursSportif').default)
    })
  }
};

export default rootRoute;