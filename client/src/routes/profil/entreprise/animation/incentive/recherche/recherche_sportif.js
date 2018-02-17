/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/entreprise/animation/incentive/:id/sportifs',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../../components/animation_entreprise/animation_formation_incentive/RechercheAnimationIncentiveEntreprise').default)
    })
  }
};

export default rootRoute;