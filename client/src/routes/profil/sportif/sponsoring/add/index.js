/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/sponsoring/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/sponsoring_sportif/ModalAddSponsoringSportif').default)
    })
  }
};

export default rootRoute;