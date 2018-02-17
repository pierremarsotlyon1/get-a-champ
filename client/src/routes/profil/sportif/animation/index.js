/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./conference/index').default,
        require('./formation/index').default,
        require('./incentive/index').default,
      ])
    })
  },
};

export default rootRoute;