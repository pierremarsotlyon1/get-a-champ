/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/parcours_professionnel/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/parcours_professionnel_sportif/AddExperienceProfessionnelleSportif').default)
    })
  }
};

export default rootRoute;