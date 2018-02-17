/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/animation/conference/demande',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_entreprise/animation_conference/DemandeSpecifiqueAnimationConferenceEntreprise').default)
    })
  }
};

export default rootRoute;