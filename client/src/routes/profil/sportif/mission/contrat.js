/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/profil/sportif/missions/contrat',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../../containers/profil/sportif/mission_entreprise/contrat_mission/ManagerContratMissionEntreprise').default)
    })
  }
};

export default rootRoute;