/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./langues/index').default,
        require('./domaines_connaissances/index').default,
        require('./domaines_competences/index').default,
        require('./parcours_sportif/index').default,
        require('./parcours_professionnel/index').default,
        require('./animation/index').default,
        require('./mission/index').default,
        require('./sponsoring/index').default,
        require('./calendar/index').default,
        require('./diplomes/index').default,
        require('./ipip/index').default,
        require('./jobs/index').default,
      ])
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../../containers/profil/sportif/ProfilSportif').default,
      })
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../containers/profil/sportif/BackendSportif').default)
    })
  }
};

export default rootRoute;