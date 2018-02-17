/**
 * Created by pierremarsot on 04/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  add_contrats_mission_entreprise_sportif,
} from '../../actions/contrats_mission_entreprise_sportif';

import {
  load_domaine_connaissance_sportif,
} from '../../actions/domaine_connaissance_sportif';

class AddContratMissionEntrepriseSportif extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      id_domaine_connaissance_sportif: undefined,
    };
  }

  componentDidMount() {
    const {
      domaines_connaissance_sportif,
    } = this.props;

    if (!domaines_connaissance_sportif || domaines_connaissance_sportif.length === 0) {
      this.props.dispatch(load_domaine_connaissance_sportif());
    }
  }

  handleCloseModalAddContratMissionEntrepriseSportif = () => {
    this.setState({
      openModal: false,
    });
  };

  handleOpenModalAddContratMissionEntrepriseSportif = () => {
    this.setState({
      openModal: true,
    });
  };

  changeDomaineCompetence = (event, key, domaine_connaissance_sportif) => {
    this.setState({
      id_domaine_connaissance_sportif: domaine_connaissance_sportif,
    });
  };

  handleSubmitModalAddContratMissionEntrepriseSportif = () => {
    const {
      domaines_connaissance_sportif,
    } = this.props;

    const domaine_connaissance_sportif = domaines_connaissance_sportif.find((domaine_connaissance_sportif) => {
      return domaine_connaissance_sportif._id === this.state.id_domaine_connaissance_sportif;
    });

    if (!domaine_connaissance_sportif) {
      return false;
    }

    this.props.dispatch(add_contrats_mission_entreprise_sportif(domaine_connaissance_sportif));
  };

  render() {
    const {
      domaines_connaissance_sportif,
    } = this.props;

    const {
      id_domaine_connaissance_sportif
    } = this.state;

    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModalAddContratMissionEntrepriseSportif}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onTouchTap={this.handleSubmitModalAddContratMissionEntrepriseSportif}
      />,
    ];

    let domaines_connaissance_sportif_local = [];

    if (domaines_connaissance_sportif && domaines_connaissance_sportif.length > 0) {
      domaines_connaissance_sportif.forEach((domaine_connaissance_sportif) => {
        domaines_connaissance_sportif_local.push(
          /*<MenuItem
            key={domaine_connaissance_sportif._id}
            value={domaine_connaissance_sportif._id}
            primaryText={domaine_connaissance_sportif._source.nom_domaine_connaissance}
          />*/
        );
      })
    }

    return (
      <div id="add-contrat-mission-entreprise-sportif">
        <div className="col-md-12">
          <div className="pull-right">
            <RaisedButton label="Ajouter un contrat de mission d'entreprise" primary={true}
                          onTouchTap={this.handleOpenModalAddContratMissionEntrepriseSportif}/>
            <Dialog
              title="Ajouter un contrat de mission d'entreprise"
              actions={actions}
              modal={false}
              open={this.state.openModal}
              autoScrollBodyContent={true}
              onRequestClose={this.handleCloseModalAddContratMissionEntrepriseSportif}
            >
              <div className="form-group">
                <SelectField
                  floatingLabelText="Les domaines de compétences"
                  value={id_domaine_connaissance_sportif}
                  onChange={this.changeDomaineCompetence}
                >
                  {domaines_connaissance_sportif_local}
                </SelectField>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {domainesConnaissanceSportif} = state;
  return {
    domaines_connaissance_sportif: domainesConnaissanceSportif.domaines_connaissance_sportif,
  };
}

export default connect(mapStateToProps)(AddContratMissionEntrepriseSportif);