/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation/formation/listing',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_formation_sportif/AffichageCategorieAnimationFormation').default)
    })
  }
};

export default rootRoute;