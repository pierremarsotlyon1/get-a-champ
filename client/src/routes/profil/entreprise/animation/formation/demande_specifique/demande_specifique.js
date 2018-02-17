/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/animation/formation/demande',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_entreprise/animation_formation_entreprise/DemandeSpecifiqueAnimationFormationEntreprise').default)
    })
  }
};

export default rootRoute;