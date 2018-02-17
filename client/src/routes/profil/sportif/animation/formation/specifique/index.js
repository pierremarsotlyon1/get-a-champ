/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/animation/formation/specifique',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_formation_sportif/DemandeSpecifiqueAnimationFormationSportif').default)
    })
  }
};

export default rootRoute;