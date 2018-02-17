/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/ipip/short',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/ipip_sportif/ShortTest').default)
    })
  }
};

export default rootRoute;