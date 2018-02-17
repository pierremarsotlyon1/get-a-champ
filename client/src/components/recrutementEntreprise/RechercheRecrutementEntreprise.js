/**
 * Created by pierremarsot on 09/03/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

import {
  search_metier,
} from '../../actions/metier';

import {
  search_recrutement_sportif,
  set_metier_recherche_sportif,
} from '../../actions/recrutement_entreprise';

class RechercheRecrutementEntreprise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metier: undefined,
    };
  }

  handleChangeTitrePoste = (metier) => {
    this.props.dispatch(search_metier(metier));
  };

  handleSaveTitrePoste = (metier) => {
    let new_metier;
    if (metier && metier.value) {
      new_metier = metier;
    }
    else {
      new_metier = undefined;
    }

    this.props.dispatch(set_metier_recherche_sportif(metier.value));
    this.setState({
      metier: new_metier,
    });
  };

  handleSearch = () => {
    this.props.dispatch(search_recrutement_sportif());
  };

  render() {
    const {
      search_metier
    } = this.props;

    let metiers = [];
    for (const metier of search_metier) {
      metiers.push({
        value: metier._id,
        text: metier._source.libelle_metier,
      });
    }

    return (
      <div className="col-md-3">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Rechercher un sportif</h3>
          </div>
          <div className="panel-body">
            <div className="form-group form-material row">
              <div className="form-group">
                <AutoComplete
                  floatingLabelText="Titre du poste occupé"
                  hintText="2 lettres minimum"
                  filter={AutoComplete.noFilter}
                  dataSource={metiers}
                  onUpdateInput={this.handleChangeTitrePoste}
                  onNewRequest={this.handleSaveTitrePoste}
                  fullWidth={true}
                  value={this.state.metier ?
                    this.state.metier.value : undefined}
                />
              </div>
              <div className="form-group">
                <RaisedButton
                  label="Rechercher"
                  primary={true}
                  onTouchTap={this.handleSearch}
                  fullWidth={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {metier} = state;
  return {
    search_metier: metier.search_metier,
  };
}

export default connect(mapStateToProps)(RechercheRecrutementEntreprise);