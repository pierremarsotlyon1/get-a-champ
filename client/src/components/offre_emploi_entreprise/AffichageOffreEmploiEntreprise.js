/**
 * Created by pierremarsot on 24/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';

import '../../assets/styles/work.min-v2.2.0.css';

import {
  load_offres_emploi_entreprise,
  remove_offre_emploi_entreprise
} from '../../actions/offre_emploi_entreprise';
import browserHistory from 'react-router/lib/browserHistory';

class AffichageOffreEmploiEntreprise extends React.Component {

  componentDidMount() {
    const {
      offres_emploi
    } = this.props;

    if (!offres_emploi || offres_emploi.length === 0) {
      this.props.dispatch(load_offres_emploi_entreprise());
    }
  }

  redirectMatchingSportifOffreEmploi = (id_metier) => {
    if (!id_metier) {
      return false;
    }

    browserHistory.push('/profil/entreprise/offre_emploi/' + id_metier + "/matching");
  };

  removeOffreEmploi = (id_offre_emploi) => {
    this.props.dispatch(remove_offre_emploi_entreprise(id_offre_emploi));
  };

  render() {
    const {
      offres_emploi
    } = this.props;

    const offres_emploi_local = [];
    for (const offre_emploi of offres_emploi) {
      const urlMatching = "/profil/entreprise/offre_emploi/"+offre_emploi._id+"/matching";
      offres_emploi_local.push(
        <tr key={offre_emploi._id}>
          <td className="subject">
            <div className="table-content">
              <p className="blue-grey-500">{offre_emploi.metier.libelle_metier}</p>
            </div>
          </td>
          <td>
            <Link to={urlMatching} className="btn btn--primary type--uppercase">
                <span className="btn__text">
                  Matcher des sportifs
                </span>
            </Link>
          </td>
          <td>
            <p className="btn btn--danger type--uppercase" onClick={() => this.removeOffreEmploi(offre_emploi._id)}>
                <span className="btn__text">
                  Supprimer
                </span>
            </p>
          </td>
        </tr>
      );
    }

    return (
      <div className="app-work">
        <div className=" boxed boxed--lg boxed--border">
          <div className="panel">
            <div className="panel-heading">
              <h4 className="pull-left">Offres d'emploi</h4>
              <Link to="/profil/entreprise/offre_emploi/add" className="btn btn--primary type--uppercase pull-right">
                <span className="btn__text">
                  Ajouter une offre d'emploi
                </span>
              </Link>
            </div>
            <div className="panel-body">
              {
                offres_emploi_local && offres_emploi_local.length > 0
                  ?
                  <table className="border--round table--alternate-row">
                    <thead>
                    <tr>
                      <th>Titre du poste</th>
                      <th>Matcher</th>
                      <th>Supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {offres_emploi_local}
                    </tbody>
                  </table>
                  :
                  <div className="alert alert-info">
                    Vous n'avez pas encore ajouté d'offre d'emploi
                  </div>
              }
            </div>
            <div className="panel-footer">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {offreEmploiEntreprise} = state;
  return {
    offres_emploi: offreEmploiEntreprise.offres_emploi,
  };
}

export default connect(mapStateToProps)(AffichageOffreEmploiEntreprise);