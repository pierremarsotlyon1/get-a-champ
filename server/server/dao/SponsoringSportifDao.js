/**
 * Created by pierremarsot on 10/02/2017.
 */
class SponsoringSportifDao {
  constructor(elasticsearch) {
    this._bdd = elasticsearch;
    this._index = 'sport';
    this._type = 'sponsoring_sportif';
  }

  /**
   * Permet de retrouver tous les sponsorings d'un sportif
   * @param id_sportif - Id du sportif
   * @returns {Promise} - Erreur ou array des sponsorings
   */
  find(id_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.search({
        index: this._index,
        type: this._type,
        body: {
          query: {
            has_parent: {
              type: 'sportif',
              query: {
                match: {
                  _id: id_sportif
                }
              }
            }
          },
          sort : [
            {
              date_depart_sponsoring_sportif: "desc"
            }
          ],
        }
      })
        .then((response) => {
          if (!response || !response.hits || !response.hits.hits) {
            return reject('Erreur lors de la récupération des sponsoring');
          }

          return resolve(response.hits.hits);
        })
        .catch(() => {
          return reject('Erreur lors de la récupération des sponsoring');
        });
    });
  }

  /**
   * Permet d'ajouter un sponsoring à un sportif
   * @param id_sportif - Id du sportif
   * @param sponsoring_sportif - L'objet sponsoring à ajouter
   * @returns {Promise} - Erreur ou identifiant du sponsoring ajouté
   */
  add(id_sportif, sponsoring_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.index({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        body: sponsoring_sportif,
      })
        .then((response) => {
          if (!response || !response._id) {
            return reject('Erreur lors de l\'ajout du sponsoring');
          }

          return resolve(response._id);
        })
        .catch(() => {
          return reject('Erreur lors de l\'ajout du sponsoring');
        });
    });
  }

  /**
   * Permet de supprimer un sponsoring d'un sportif
   * @param id_sportif - Id du sportif
   * @param id_sponsoring_sportif - Id du sponsoring à supprimer
   * @returns {Promise} - Erreur ou id du sponsoring supprimé
   */
  remove(id_sportif, id_sponsoring_sportif) {
    return new Promise((resolve, reject) => {
      this._bdd.delete({
        index: this._index,
        type: this._type,
        parent: id_sportif,
        id: id_sponsoring_sportif,
      })
        .then((response) => {
          if (!response) {
            return reject('Erreur lors de la suppression du sponsoring');
          }

          return resolve(id_sponsoring_sportif);
        })
        .catch(() => {
          return reject('Erreur lors de la suppression du sponsoring');
        });
    });
  }
}

export default SponsoringSportifDao;