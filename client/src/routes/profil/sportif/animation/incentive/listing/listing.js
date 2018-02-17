/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation/incentive/listing',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_incentive_sportif/AffichageCategorieAnimationIncentive').default)
    })
  }
};

export default rootRoute;