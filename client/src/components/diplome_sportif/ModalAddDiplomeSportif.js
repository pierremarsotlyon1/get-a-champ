/**
 * Created by pierremarsot on 27/02/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

import {
  search_ecole,
} from '../../actions/ecole';

class ModalAddDiplomeSportif extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      open: false,
      diplome: {},
    };
  }

  _getStateDiplome = () => {
    return this.state.diplome;
  };

  _setStateDiplome = (diplome) => {
    this.setState({
      diplome: diplome,
    });
  };

  handleOpenModal = () => {
    this.setState({
      open: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      open: false,
    });
  };

  handleSearchEcole = (ecole) => {
    this.props.dispatch(search_ecole(ecole));
  };

  handleSaveEcole = (ecole, index) => {
    const diplome = this._getStateDiplome();

    diplome.ecole = ecole.value;

    this._setStateDiplome(diplome);
  };

  handleSubmitModal = () => {

  };

  render()
  {
    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onTouchTap={this.handleCloseModal}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        onTouchTap={this.handleSubmitModal}
      />,
    ];

    let ecoles_local = [];

    for (const ecole of this.props.ecoles) {
      ecoles_local.push({
        value: ecole._id,
        text: ecole._source.appellation_officielle_ecole,
      });
    }

    return (
      <div className="modal-add-diplome-sportif">
        <div className="col-md-12">
          <div className="pull-right">
            <RaisedButton label="Ajouter un diplome" primary={true}
                          onTouchTap={this.handleOpenModal}/>
            <Dialog
              title="Ajouter un diplome"
              actions={actions}
              modal={false}
              open={this.state.open}
              autoScrollBodyContent={true}
              onRequestClose={this.handleCloseModal}
            >
              <div className="form-group">
                <AutoComplete
                  floatingLabelText="Saisissez une école"
                  hintText="2 lettres minimum"
                  filter={AutoComplete.noFilter}
                  dataSource={ecoles_local}
                  onUpdateInput={this.handleSearchEcole}
                  onNewRequest={this.handleSaveEcole}
                  value={this.state.langue}
                  fullWidth={true}
                />
              </div>
              <div className="form-group">
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}

ModalAddDiplomeSportif.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state)
{
  const {ecole} = state;
  return {
    ecoles: ecole.ecoles,
  };
}

export default connect(mapStateToProps)(ModalAddDiplomeSportif);