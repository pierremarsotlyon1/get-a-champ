/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/domaines_competences/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../../components/domaine_competence_sportif/AddDomaineCompetenceSportif').default)
    })
  }
};

export default rootRoute;