/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation/conference/listing',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_conference_sportif/AffichageCategorieAnimationConference').default)
    })
  }
};

export default rootRoute;