/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/domaines_connaissances/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/domaine_connaisance_sportif/AddDomaineConnaissanceSportif').default)
    })
  }
};

export default rootRoute;