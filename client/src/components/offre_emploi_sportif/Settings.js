/**
 * Created by pierremarsot on 14/07/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link';
import Toggle from 'material-ui/Toggle';
import Margin from '../../styles/Margin';
import FontSize from '../../styles/FontSize';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import {load_types_contrat} from '../../actions/type_contrat';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rechercheJob: false,
    };
  }

  componentDidMount() {
    if (this.props.typesContrat.length === 0) {
      this.props.dispatch(load_types_contrat());
    }
  }

  handleToogleRechercheJob = (e, isActivated) => {
    this.setState({
      rechercheJob: isActivated,
    });
  };

  render() {
    const {rechercheJob} = this.state;
    const {typesContrat} = this.props;

    let formulaire = [];
    if (rechercheJob) {
      formulaire.push(
        <div key="jobs_interest" className="form-group">
          <div className="row">
            <div className="col-md-12">
              <p style={Object.assign({}, Margin.noMargin, FontSize.dixhuit)}>
                <strong>
                  Quels postes vous intéressent ?
                </strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <FlatButton
                target="_blank"
                label="Ajouter un poste"
                primary={true}
                icon={<FontIcon className="muidocs-icon-custom-github"/>}
              />
            </div>
          </div>
        </div>
      );

      formulaire.push(
        <div key="jobs_places" className="form-group">
          <div className="row">
            <div className="col-md-12">
              <p style={Object.assign({}, Margin.noMargin, FontSize.dixhuit)}>
                <strong>
                  Quels sont les lieux où vous aimeriez travailler ?
                </strong>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <FlatButton
                target="_blank"
                label="Ajouter un lieu"
                primary={true}
                icon={<FontIcon className="muidocs-icon-custom-github"/>}
              />
            </div>
          </div>
        </div>
      );

      //On génère les types de contrat de travail
      const typesContratLocal = [];

      if (typesContrat.length > 0) {
        for (const contrat of typesContrat) {
          typesContratLocal.push(
            <div key={"typesContrat" + contrat._id} className="col-md-12" style={Margin.m15}>
              <Checkbox
                label={contrat._source.nom_type_contrat_travail}
              />
            </div>
          );
        }
      }
      else {
        typesContratLocal.push(
          <div className="alert alert-info" key="typesContrat_empty">
            Chargement des types de contrat de travail ...
          </div>
        );
      }

      formulaire.push(
        <div key="jobs_types_contrats" className="form-group">
          <div className="row">
            <div className="col-md-12">
              <p style={Object.assign({}, Margin.noMargin, FontSize.dixhuit)}>
                <strong>
                  Quels types de contrats vous intéressent ?
                </strong>
              </p>
            </div>
          </div>
          <div className="row">
            {typesContratLocal}
          </div>
        </div>
      );
    }

    return (
      <div className="app-work" id="jobSportif">
        <div className="boxed boxed--lg boxed--border">
          <div className="panel">
            <div className="panel-heading">
              <h4 className="pull-left">Objectifs professionnels</h4>
              <Link to="/profil/sportif/jobs/settings" className="btn btn--primary type--uppercase pull-right">
                <span className="btn__text">
                  Sauvegarder
                </span>
              </Link>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-8">
                          <p style={Object.assign({}, Margin.noMargin, Margin.ml15, FontSize.dixhuit)}>
                            <strong>
                              Faites savoir aux recruteurs que vous êtes réceptif
                            </strong>
                          </p>
                        </div>
                        <div className="col-md-4">
                          <Toggle
                            onToggle={this.handleToogleRechercheJob}
                            defaultToggled={rechercheJob}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <p>
                            Nous faisons notre possible pour ne pas indiquer à votre entreprise actuelle que vous êtes
                            un
                            candidat réceptif, néanmoins, nous ne pouvons garantir une confidentialité complète.
                          </p>
                        </div>
                      </div>
                    </div>
                    {formulaire}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    typesContrat: state.typeContrat.types_contrat,
  };
}

export default connect(mapStateToProps)(Settings);
