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
  load_domaine_connaissance_sportif,
  remove_domaine_connaissance_sportif,
} from '../../actions/domaine_connaissance_sportif';

import {
  remove_contrats_mission_entreprise_sportif_when_remove_domaine_competence
} from '../../actions/contrats_mission_entreprise_sportif';

class AffichageDomaineConnaissanceSportif extends React.Component {
  componentDidMount() {
    const {
      domaines_connaissance_sportif
    } = this.props;

    if (!domaines_connaissance_sportif || domaines_connaissance_sportif.length === 0) {
      this.props.dispatch(load_domaine_connaissance_sportif());
    }
  }

  componentWillReceiveProps() {

  }

  removeDomaineConnaissanceSportif = (id_domaine_connaissance_sportif) => {
    if (!id_domaine_connaissance_sportif) {
      return false;
    }

    this.props.dispatch(remove_domaine_connaissance_sportif(id_domaine_connaissance_sportif));
    this.props.dispatch(remove_contrats_mission_entreprise_sportif_when_remove_domaine_competence(id_domaine_connaissance_sportif));
  };

  render() {
    const {
      domaines_connaissance_sportif
    } = this.props;

    return (
      <div id="dommainesConnaissanceSportif">
        <div className="boxed boxed--md boxed--border">
          <div className="row">
            <div className="col-sm-7">
              <h4>Vos domaines de connaissance</h4>
            </div>
            <div className="col-sm-5">
              <Link to="/profil/sportif/domaines_connaissances/add"
                    className="btn btn--primary type--uppercase pull-right">
              <span className="btn__text">
                            Ajouter un domaine de connaissance
                          </span>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {
                !domaines_connaissance_sportif || domaines_connaissance_sportif.length === 0 ?
                  (
                    <div className="alert alert-info">
                      Vous n'avez pas encore ajouté de domaines de connaissances
                    </div>
                  ) :
                  (
                    <div>
                      <div className="row">
                        {

                          domaines_connaissance_sportif.map((domaine_connaissance_sportif) => {
                            return (
                              <div className="block-domaine-connaissance">
                                <div className="col-sm-5 col-md-4" key={domaine_connaissance_sportif.id_domaine_connaissance}>
                                  <div className="feature feature-1 boxed boxed--border">
                                    <h5>{domaine_connaissance_sportif.nom_domaine_connaissance}</h5>
                                    <p>
                                      {domaine_connaissance_sportif.nom_niveau_domaine_connaissance_competence}
                                    </p>
                                    <div className="margin-top-15">
                                      <RaisedButton
                                        className="m-l-md m-b-md m-r-md"
                                        label="Supprimer"
                                        secondary={true}
                                        onClick={() => this.removeDomaineConnaissanceSportif(domaine_connaissance_sportif.id_domaine_connaissance)}
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
                  )
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
    domainesConnaissanceSportif
  } = state;
  return {
    domaines_connaissance_sportif: domainesConnaissanceSportif.domaines_connaissance_sportif,
  };
}

export default connect(mapStateToProps)(AffichageDomaineConnaissanceSportif);