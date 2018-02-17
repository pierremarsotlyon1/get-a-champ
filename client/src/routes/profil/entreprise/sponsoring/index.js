/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/sponsoring',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../components/sponsoring_entreprise/ManagerSponsoringEntreprise').default)
    })
  }
};

export default rootRoute;