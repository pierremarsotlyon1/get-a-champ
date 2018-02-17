/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation/conference/add/:id',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_conference_sportif/AddAnimationConferenceSportif').default)
    })
  }
};

export default rootRoute;