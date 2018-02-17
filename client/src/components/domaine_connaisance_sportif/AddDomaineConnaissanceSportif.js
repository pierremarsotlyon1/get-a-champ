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
  search_domaines_connaissance
} from '../../actions/domaine_connaissance';

import {
  load_niveau_domaine_connaissance
} from '../../actions/niveau_domaine_connaissance';

import {
  add_domaine_connaissance_sportif
} from '../../actions/domaine_connaissance_sportif';

class AddDomaineConnaissanceSportif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_domaine_connaissance: undefined,
      id_niveau_domaine_connaissance: undefined,
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

  handleSubmitAddDomaineConnaissanceSportif = () => {
    const {
      id_domaine_connaissance,
      id_niveau_domaine_connaissance,
    } = this.state;

    if (!id_domaine_connaissance) {
      return false;
    }

    if (!id_niveau_domaine_connaissance) {
      return false;
    }

    this.props.dispatch(add_domaine_connaissance_sportif(id_domaine_connaissance, id_niveau_domaine_connaissance));
    browserHistory.push('/profil/sportif/domaines_connaissances');
  };

  changeDomaineConnaissance = (domaine_connaissance) => {
    this.setState({
      id_domaine_connaissance: domaine_connaissance.value,
    });
  };

  changeNiveauDomaineConnaissance = (event, key, id_niveau_domaine_connaissance) => {
    this.setState({
      id_niveau_domaine_connaissance: id_niveau_domaine_connaissance,
    });
  };

  searchDomaineConnaissance = (search_text) => {
    this.props.dispatch(search_domaines_connaissance(search_text));
  };

  render() {
    const {
      domaines_connaissances,
      niveaux_domaine_connaissance,
    } = this.props;

    const {
      id_niveau_domaine_connaissance,
    } = this.state;

    let niveau_domaine_connaissance_local = [];
    let domaines_connaissances_local = [];

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

    if (domaines_connaissances && domaines_connaissances.length > 0) {
      domaines_connaissances.forEach((domaine_connaissance) => {
        domaines_connaissances_local.push({
          text: domaine_connaissance._source.nom_domaine_connaissance,
          value: domaine_connaissance._id,
        });
      });
    }

    return (
      <div id="add-animation-conference-sportif">
        <div className="col-md-12">
          <div className="boxed boxed--md boxed--border">
            <div className="panel panel-bordered">
              <h4>Ajouter un domaine de connaissance</h4>
              <div className="panel-body">
                <div className="form-group">
                  <AutoComplete
                    hintText="Saisissez un domaine de connaissance"
                    dataSource={domaines_connaissances_local}
                    onNewRequest={this.changeDomaineConnaissance}
                    onUpdateInput={this.searchDomaineConnaissance}
                    fullWidth={true}
                    filter={(searchText, key) => true}
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    floatingLabelText="Les niveaux de connaissance"
                    value={id_niveau_domaine_connaissance}
                    onChange={this.changeNiveauDomaineConnaissance}
                    fullWidth={true}
                  >
                    {niveau_domaine_connaissance_local}
                  </SelectField>
                </div>

                <div className="form-group text-center padding-bottom-20">
                  <div className="btn btn--primary type--uppercase"
                       onClick={this.handleSubmitAddDomaineConnaissanceSportif}>
              <span className="btn__text">
                            Ajouter le domaine de connaissance
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
    domainesConnaissance,
  } = state;

  return {
    domaines_connaissances: domainesConnaissance.domaines_connaissances,
    niveaux_domaine_connaissance: niveauDomaineConnaissance.niveaux_domaine_connaissance,
  };
}

export default connect(mapStateToProps)(AddDomaineConnaissanceSportif);