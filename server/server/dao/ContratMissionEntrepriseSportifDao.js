/**
 * Created by pierremarsot on 04/02/2017.
 */
class ContratMissionEntrepriseSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'sportif';
  }

  /**
   * Permet de récupérer le tableau nested des contrats de mission pour entreprise d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou Array des contrats de mission pour l'entreprise du sportif
   */
  get_contrat_mission_entreprise_sportif(id_sportif) {
    return new Promise((resolve, reject) => {
      if (!id_sportif) {
        return reject('Erreur lors de la récupération de votre identifiant');
      }

      this._bdd.get({
        index: this._index,
        type: this._type,
        id: id_sportif,
        _source: ['contrats_mission_entreprise_sportif']
      })
        .then((response) => {
          if (!response || !response._source) {
            return reject('Erreur lors de la récupération de vos contrats de mission');
          }

          return resolve(response._source.contrats_mission_entreprise_sportif);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération de vos contrats de mission');
        });
    });
  }
}

export default ContratMissionEntrepriseSportifDao;