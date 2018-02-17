/**
 * Created by pierremarsot on 31/01/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Table from 'material-ui/Table/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'react-router/lib/Link';

import {
  load_domaine_competence_sportif,
  remove_domaine_competence_sportif
} from '../../actions/domaine_competence_sportif';

import {
  remove_contrats_mission_entreprise_sportif_when_remove_domaine_competence
} from '../../actions/contrats_mission_entreprise_sportif';

class AffichageDomaineCompetenceSportif extends React.Component {
  componentDidMount() {
    const {
      domaines_competence_sportif
    } = this.props;

    if (!domaines_competence_sportif || domaines_competence_sportif.length === 0) {
      this.props.dispatch(load_domaine_competence_sportif());
    }
  }

  componentWillReceiveProps() {

  }

  removeDomaineCompetenceSportif = (id_domaine_competence_sportif) => {
    if (!id_domaine_competence_sportif) {
      return false;
    }

    this.props.dispatch(remove_domaine_competence_sportif(id_domaine_competence_sportif));
    //this.props.dispatch(remove_contrats_mission_entreprise_sportif_when_remove_domaine_competence(id_domaine_competence_sportif));
  };

  render() {
    const {
      domaines_competence_sportif
    } = this.props;

    return (
      <div id="dommainesCompetenceSportif">
        <div className="boxed boxed--md boxed--border">
          <div className="row">
            <div className="col-sm-7">
              <h4>Vos domaines de compétence</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/domaines_competences/add"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Ajouter un domaine de compétence
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {
                !domaines_competence_sportif || domaines_competence_sportif.length === 0 ?
                  (
                    <div className="alert alert-info">
                      Vous n'avez pas encore ajouté de domaines de connaissances
                    </div>
                  ) :
                  domaines_competence_sportif.map((domaine_competence_sportif) => {
                    return (
                      <div className="block-domaine-connaissance">
                        <div className="col-sm-5 col-md-4" key={domaine_competence_sportif.id_domaine_competence}>
                          <div className="feature feature-1 boxed boxed--border">
                            <h5>{domaine_competence_sportif.nom_domaine_competence}</h5>
                            <p>
                              {domaine_competence_sportif.nom_niveau_domaine_connaissance_competence}
                            </p>
                            <div className="margin-top-15">
                              <RaisedButton
                                className="m-l-md m-b-md m-r-md"
                                label="Supprimer"
                                secondary={true}
                                onClick={() => this.removeDomaineCompetenceSportif(domaine_competence_sportif.id_domaine_competence)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {
    domainesCompetenceSportif
  } = state;
  return {
    domaines_competence_sportif: domainesCompetenceSportif.domaines_competence_sportif,
  };
}

export default connect(mapStateToProps)(AffichageDomaineCompetenceSportif);