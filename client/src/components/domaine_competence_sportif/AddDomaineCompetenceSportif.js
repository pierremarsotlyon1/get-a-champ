/**
 * Created by pierremarsot on 31/01/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import browserHistory from 'react-router/lib/browserHistory';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

import {
  search_domaines_competence
} from '../../actions/domaine_competence';

import {
  load_niveau_domaine_connaissance
} from '../../actions/niveau_domaine_connaissance';

import {
  add_domaine_competence_sportif
} from '../../actions/domaine_competence_sportif';

class AddDomaineCompetenceSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_domaine_competence: undefined,
      id_niveau_domaine_connaissance_competence: undefined,
    }
  }

  componentDidMount() {
    const {
      niveaux_domaine_connaissance,
    } = this.props;

    if (!niveaux_domaine_connaissance || niveaux_domaine_connaissance.length === 0) {
      this.props.dispatch(load_niveau_domaine_connaissance());
    }
  }

  handleSubmitAddDomaineCompetenceSportif = () => {
    const {
      id_domaine_competence,
      id_niveau_domaine_connaissance_competence,
    } = this.state;

    if (!id_domaine_competence) {
      return false;
    }

    if (!id_niveau_domaine_connaissance_competence) {
      return false;
    }

    this.props.dispatch(add_domaine_competence_sportif(id_domaine_competence, id_niveau_domaine_connaissance_competence));
    browserHistory.push('/profil/sportif/domaines_competences');
  };

  changeDomaineCompetence = (domaine_competence) => {
    this.setState({
      id_domaine_competence: domaine_competence.value,
    });
  };

  changeNiveauDomaineCompetence = (event, key, id_niveau_domaine_connaissance_competence) => {
    this.setState({
      id_niveau_domaine_connaissance_competence: id_niveau_domaine_connaissance_competence,
    });
  };

  searchDomaineCompetence = (search_text) => {
    this.props.dispatch(search_domaines_competence(search_text));
  };

  render() {
    const {
      domaines_competences,
      niveaux_domaine_connaissance,
    } = this.props;

    const {
      id_niveau_domaine_connaissance_competence,
    } = this.state;

    let niveau_domaine_connaissance_local = [];
    let domaines_competences_local = [];

    if (niveaux_domaine_connaissance && niveaux_domaine_connaissance.length > 0) {
      niveaux_domaine_connaissance.forEach((niveau_domaine_connaissance) => {
        niveau_domaine_connaissance_local.push(
          <MenuItem
            key={niveau_domaine_connaissance._id}
            value={niveau_domaine_connaissance._id}
            primaryText={niveau_domaine_connaissance._source.nom_niveau_domaine_connaissance_competence}
          />
        );
      })
    }

    if (domaines_competences && domaines_competences.length > 0) {
      domaines_competences.forEach((domaine_competence) => {
        domaines_competences_local.push({
          text: domaine_competence._source.nom_domaine_competence,
          value: domaine_competence._id,
        });
      });
    }

    return (
      <div id="add-animation-conference-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <div className="panel panel-bordered">
              <h4>Ajouter un domaine de compétence</h4>
              <div className="panel-body">
                <div className="form-group">
                  <AutoComplete
                    hintText="Saisissez un domaine de compétence"
                    dataSource={domaines_competences_local}
                    onNewRequest={this.changeDomaineCompetence}
                    onUpdateInput={this.searchDomaineCompetence}
                    fullWidth={true}
                    filter={(searchText, key) => true}
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    floatingLabelText="Les niveaux de compétence"
                    value={id_niveau_domaine_connaissance_competence}
                    onChange={this.changeNiveauDomaineCompetence}
                    fullWidth={true}
                  >
                    {niveau_domaine_connaissance_local}
                  </SelectField>
                </div>

                <div className="form-group text-center padding-bottom-20">
                  <div className="btn btn--primary type--uppercase"
                       onClick={this.handleSubmitAddDomaineCompetenceSportif}>
              <span className="btn__text">
                            Ajouter le domaine de compétence
                          </span>
                  </div>
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
  const {
    niveauDomaineConnaissance,
    domaineCompetence,
  } = state;

  return {
    domaines_competences: domaineCompetence.domaines_competences,
    niveaux_domaine_connaissance: niveauDomaineConnaissance.niveaux_domaine_connaissance,
  };
}

export default connect(mapStateToProps)(AddDomaineCompetenceSportif);