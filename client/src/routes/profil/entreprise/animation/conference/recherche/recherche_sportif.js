/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/animation/conference/:id/sportifs',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_entreprise/animation_conference/RechercheAnimationConferenceEntreprise').default)
    })
  }
};

export default rootRoute;