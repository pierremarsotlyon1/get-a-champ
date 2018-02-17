/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/domaines_competences',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./add/index').default,
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../../../components/domaine_competence_sportif/AffichageDomaineCompetenceSportif').default,
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/sportif/DomainesCompetence').default)
    })
  }
};

export default rootRoute;